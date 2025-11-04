import random
import string
import re
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas, models, crud
from ..services.redis_service import redis_service
from ..services.email_service import email_service

router = APIRouter(prefix="/auth", tags=["auth"])

# Allowed email domains
ALLOWED_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com']

def validate_email(email: str) -> bool:
    """Validate email format and domain"""
    # Check basic format
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        return False
    
    # Check if email contains only English characters
    if not re.match(r'^[a-zA-Z0-9._%+-@]+$', email):
        return False
    
    # Extract domain
    domain = email.split('@')[1].lower()
    
    # Check if domain is allowed
    return domain in ALLOWED_DOMAINS

def generate_otp() -> str:
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))


@router.post("/register", response_model=schemas.SendOTPResponse)
def register(request: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register new user and send email verification OTP"""
    email = request.email.lower()
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Check if user already exists
    existing_user = crud.get_user_by_email(db, email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="البريد الإلكتروني مسجل مسبقاً"
        )
    
    # Check rate limiting (60 seconds between requests)
    if redis_service.check_rate_limit(email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="يمكنك طلب رمز جديد بعد 60 ثانية."
        )
    
    # Check OTP requests limit (5 per 10 minutes)
    otp_requests_count = redis_service.get_otp_requests_count(email)
    if otp_requests_count >= 5:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="لقد تجاوزت الحد المسموح. الرجاء المحاولة لاحقاً."
        )
    
    # Create user with email_verified = false
    try:
        user = crud.create_user(db, request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="فشل في إنشاء الحساب"
        )
    
    # Generate OTP
    otp = generate_otp()
    
    # Store OTP in Redis with 5-minute TTL
    if not redis_service.set_otp(email, otp, ttl=300):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Set rate limit (60 seconds)
    redis_service.set_rate_limit(email, ttl=60)
    
    # Increment OTP requests counter
    redis_service.increment_otp_requests(email, window_minutes=10)
    
    # Send email via Mailtrap
    if not email_service.send_verification_email(email, otp):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Also print for development debugging
    print(f"Verification OTP for {email}: {otp}")
    
    return schemas.SendOTPResponse(
        message="تم إنشاء الحساب وإرسال رمز التحقق إلى بريدك الإلكتروني",
        success=True
    )


@router.post("/verify-email", response_model=schemas.VerifyEmailResponse)
def verify_email(request: schemas.VerifyEmailRequest, db: Session = Depends(get_db)):
    """Verify email with OTP during signup"""
    email = request.email.lower()
    otp = request.otp
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Get stored OTP from Redis
    stored_otp = redis_service.get_otp(email)
    if not stored_otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="رمز التحقق غير صحيح أو منتهي الصلاحية"
        )
    
    # Verify OTP
    if stored_otp != otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="رمز التحقق غير صحيح"
        )
    
    # Delete OTP after successful verification
    redis_service.delete_otp(email)
    
    # Set email_verified = true
    user = crud.verify_user_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="المستخدم غير موجود"
        )
    
    return schemas.VerifyEmailResponse(
        message="تم تفعيل البريد الإلكتروني بنجاح",
        success=True
    )


@router.post("/resend-otp", response_model=schemas.SendOTPResponse)
def resend_otp(request: schemas.SendOTPRequest, db: Session = Depends(get_db)):
    """Resend email verification OTP"""
    email = request.email.lower()
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Check if user exists
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="المستخدم غير موجود"
        )
    
    # Check if email is already verified
    if user.email_verified == "true":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="البريد الإلكتروني مفعل مسبقاً"
        )
    
    # Check rate limiting (60 seconds between requests)
    if redis_service.check_rate_limit(email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="يمكنك طلب رمز جديد بعد 60 ثانية."
        )
    
    # Check OTP requests limit (5 per 10 minutes)
    otp_requests_count = redis_service.get_otp_requests_count(email)
    if otp_requests_count >= 5:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="لقد تجاوزت الحد المسموح. الرجاء المحاولة لاحقاً."
        )
    
    # Generate OTP
    otp = generate_otp()
    
    # Store OTP in Redis with 5-minute TTL
    if not redis_service.set_otp(email, otp, ttl=300):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Set rate limit (60 seconds)
    redis_service.set_rate_limit(email, ttl=60)
    
    # Increment OTP requests counter
    redis_service.increment_otp_requests(email, window_minutes=10)
    
    # Send email via Mailtrap
    if not email_service.send_verification_email(email, otp):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Also print for development debugging
    print(f"Resend verification OTP for {email}: {otp}")
    
    return schemas.SendOTPResponse(
        message="تم إرسال رمز التحقق إلى بريدك الإلكتروني",
        success=True
    )


@router.post("/login", response_model=schemas.LoginResponse)
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    """Login with email and password"""
    email = request.email.lower()
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Authenticate user
    user = crud.authenticate_user(db, email, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="البريد الإلكتروني أو كلمة المرور غير صحيحة"
        )
    
    # Check if email is verified
    if user.email_verified == "false":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="يجب تفعيل بريدك الإلكتروني قبل تسجيل الدخول"
        )
    
    # Create access token
    access_token = crud.create_access_token(user_id=user.id, role=user.role)
    
    return schemas.LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )


@router.post("/forgot-password", response_model=schemas.ForgotPasswordResponse)
def forgot_password(request: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Send password reset OTP to user's email"""
    email = request.email.lower()
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Check if user exists
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="البريد الإلكتروني غير مسجل"
        )
    
    # Check rate limiting (60 seconds between requests)
    if redis_service.check_rate_limit(email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="يمكنك طلب رمز جديد بعد 60 ثانية."
        )
    
    # Check OTP requests limit (5 per 10 minutes)
    otp_requests_count = redis_service.get_otp_requests_count(email)
    if otp_requests_count >= 5:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="لقد تجاوزت الحد المسموح. الرجاء المحاولة لاحقاً."
        )
    
    # Generate OTP
    otp = generate_otp()
    
    # Store OTP in Redis with 5-minute TTL
    if not redis_service.set_otp(email, otp, ttl=300):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Set rate limit (60 seconds)
    redis_service.set_rate_limit(email, ttl=60)
    
    # Increment OTP requests counter
    redis_service.increment_otp_requests(email, window_minutes=10)
    
    # Send email via Mailtrap
    if not email_service.send_password_reset_email(email, otp):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="فشل في إرسال رمز التحقق عبر البريد الإلكتروني. يرجى التحقق من إعدادات SMTP أو المحاولة لاحقاً."
        )
    
    # Also print for development debugging
    print(f"Password reset OTP for {email}: {otp}")
    
    return schemas.ForgotPasswordResponse(
        message="تم إرسال رمز استعادة كلمة المرور إلى بريدك الإلكتروني",
        success=True
    )


@router.post("/reset-password", response_model=schemas.ResetPasswordResponse)
def reset_password(request: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password with OTP verification"""
    email = request.email.lower()
    otp = request.otp
    new_password = request.new_password
    
    # Validate email format and domain
    if not validate_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="الرجاء إدخال بريد إلكتروني صحيح"
        )
    
    # Validate new password
    if len(new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="كلمة المرور يجب أن تكون 6 أحرف على الأقل"
        )
    
    # Get stored OTP from Redis
    stored_otp = redis_service.get_otp(email)
    if not stored_otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="رمز التحقق غير صحيح أو منتهي الصلاحية"
        )
    
    # Verify OTP
    if stored_otp != otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="رمز التحقق غير صحيح"
        )
    
    # Delete OTP after successful verification
    redis_service.delete_otp(email)
    
    # Update user password
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="المستخدم غير موجود"
        )
    
    # Update password
    from ..crud import hash_password
    user.password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    
    return schemas.ResetPasswordResponse(
        message="تم تغيير كلمة المرور بنجاح",
        success=True
    )