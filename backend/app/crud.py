from datetime import datetime, timedelta
from typing import Optional, List
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import select

from .config import settings
from . import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Password utilities
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# JWT utilities
def create_access_token(*, user_id: int, role: models.UserRole, expires_minutes: Optional[int] = None) -> str:
    to_encode = {"sub": str(user_id), "role": role.value}
    expire_minutes = expires_minutes if expires_minutes is not None else settings.ACCESS_TOKEN_EXPIRE_MINUTES
    expire = datetime.utcnow() + timedelta(minutes=expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


# Users
def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    stmt = select(models.User).where(models.User.email == email)
    return db.scalar(stmt)


def create_user(db: Session, user_in: schemas.UserCreate) -> models.User:
    """Create user with password and email_verified = false"""
    user = models.User(
        name=user_in.name,
        email=user_in.email,
        password=hash_password(user_in.password),
        email_verified="false",
        role=models.UserRole.user,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def verify_user_email(db: Session, email: str) -> Optional[models.User]:
    """Set email_verified = true for user"""
    user = get_user_by_email(db, email)
    if user:
        user.email_verified = "true"
        db.commit()
        db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> Optional[models.User]:
    """Authenticate user with email and password"""
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


# Gyms
def list_gyms(db: Session) -> List[models.Gym]:
    stmt = select(models.Gym).order_by(models.Gym.created_at.desc())
    return list(db.scalars(stmt).all())


def create_gym(db: Session, gym_in: schemas.GymCreate, added_by_user_id: int) -> models.Gym:
    gym = models.Gym(
        name_ar=gym_in.name_ar,
        name_en=gym_in.name_en,
        location=gym_in.location,
        description=gym_in.description,
        phone=gym_in.phone,
        website=gym_in.website,
        rating=gym_in.rating,
        opening_hours=gym_in.opening_hours,
        facilities=gym_in.facilities,
        equipment=gym_in.equipment,
        added_by=added_by_user_id,
    )
    db.add(gym)
    db.commit()
    db.refresh(gym)
    return gym


def get_gym(db: Session, gym_id: int) -> Optional[models.Gym]:
    stmt = select(models.Gym).where(models.Gym.id == gym_id)
    return db.scalar(stmt)


def update_gym(db: Session, gym: models.Gym, gym_in: schemas.GymUpdate) -> models.Gym:
    for field, value in gym_in.model_dump(exclude_unset=True).items():
        setattr(gym, field, value)
    db.add(gym)
    db.commit()
    db.refresh(gym)
    return gym


def delete_gym(db: Session, gym: models.Gym) -> None:
    db.delete(gym)
    db.commit()


# Gym Suggestions
def create_gym_suggestion(db: Session, user_id: int, data: schemas.GymSuggestionCreate) -> models.GymSuggestion:
    suggestion = models.GymSuggestion(
        user_id=user_id,
        gym_name=data.gym_name,
        location=data.location,
        notes=data.notes,
    )
    db.add(suggestion)
    db.commit()
    db.refresh(suggestion)
    return suggestion


def set_gym_suggestion_status(db: Session, suggestion: models.GymSuggestion, status: models.SuggestionStatus) -> models.GymSuggestion:
    suggestion.status = status
    db.add(suggestion)
    db.commit()
    db.refresh(suggestion)
    return suggestion


def get_gym_suggestion(db: Session, suggestion_id: int) -> Optional[models.GymSuggestion]:
    stmt = select(models.GymSuggestion).where(models.GymSuggestion.id == suggestion_id)
    return db.scalar(stmt)


# Contact Messages
def create_contact_message(db: Session, data: schemas.ContactMessageCreate) -> models.ContactMessage:
    message = models.ContactMessage(
        user_id=data.user_id,
        name=data.name,
        email=data.email,
        message=data.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

