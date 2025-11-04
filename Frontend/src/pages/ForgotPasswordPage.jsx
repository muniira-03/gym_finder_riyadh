import { useState, useEffect } from 'react';
import { Mail, Shield, Dumbbell, ArrowRight, CheckCircle, AlertCircle, Loader2, Clock, RefreshCw, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateEmail = () => {
    const errors = {};
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    
    if (!email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else {
      // Check basic format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
      } else {
        // Check if email contains only English characters
        if (!/^[a-zA-Z0-9._%+-@]+$/.test(email)) {
          errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
        } else {
          // Check domain
          const domain = email.split('@')[1]?.toLowerCase();
          if (!domain || !allowedDomains.includes(domain)) {
            errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
          }
        }
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOTP = () => {
    const errors = {};
    if (!otp.trim()) {
      errors.otp = 'رمز التحقق مطلوب';
    } else if (otp.length !== 6) {
      errors.otp = 'رمز التحقق يجب أن يكون 6 أرقام';
    } else if (!/^\d{6}$/.test(otp)) {
      errors.otp = 'رمز التحقق يجب أن يحتوي على أرقام فقط';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswords = () => {
    const errors = {};
    if (!newPassword.trim()) {
      errors.newPassword = 'كلمة المرور الجديدة مطلوبة';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = 'كلمة المرور غير متطابقة';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendResetOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message);
        setStep('otp');
        setCountdown(60); // 60 seconds countdown
      } else {
        setError(data.detail || 'فشل في إرسال رمز التحقق');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setSuccess('');
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message);
        setCountdown(60);
      } else {
        setError(data.detail || 'فشل في إرسال رمز التحقق');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateOTP()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp, 
          new_password: newPassword 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      } else {
        setError(data.detail || 'رمز التحقق غير صحيح');
      }
    } catch (err) {
      setError(err.message || 'رمز التحقق غير صحيح');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setValidationErrors({});
    setCountdown(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Dumbbell className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-teal-900 mb-2">
                {step === 'email' ? 'نسيت كلمة المرور؟' : step === 'otp' ? 'تحقق من بريدك الإلكتروني' : 'إدخال كلمة المرور الجديدة'}
              </h1>
              <p className="text-teal-600">
                {step === 'email' 
                  ? 'أدخل بريدك الإلكتروني وسنرسل لك رمز الاستعادة' 
                  : step === 'otp'
                  ? `تم إرسال رمز الاستعادة إلى ${email}`
                  : 'أدخل كلمة المرور الجديدة'
                }
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            )}

            {/* Email Step */}
            {step === 'email' && (
              <form onSubmit={handleSendResetOTP} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-teal-700">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${validationErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="example@email.com"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="text-white font-semibold py-3 rounded-lg w-full transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(to right, #2EC4B6, #1CA89E)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      جاري الإرسال...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      إرسال رمز الاستعادة
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </div>
                  )}
                </button>
              </form>
            )}

            {/* OTP Step */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                {/* Email field (readonly) */}
                <div>
                  <Label htmlFor="email-display" className="text-sm font-medium text-teal-700">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="email-display"
                      type="email"
                      value={email}
                      className="pl-10 bg-gray-50 text-gray-600 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>

                {/* OTP field */}
                <div>
                  <Label htmlFor="otp" className="text-sm font-medium text-teal-700">
                    رمز التحقق
                  </Label>
                  <div className="relative mt-1">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className={`pl-10 text-center text-lg tracking-widest ${validationErrors.otp ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="123456"
                      maxLength="6"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.otp && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.otp}</p>
                  )}
                </div>

                {/* New Password field */}
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium text-teal-700">
                    كلمة المرور الجديدة
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`pl-10 ${validationErrors.newPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password field */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-teal-700">
                    تأكيد كلمة المرور
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 ${validationErrors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="text-white font-semibold py-3 rounded-lg w-full transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(to right, #2EC4B6, #1CA89E)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      جاري التحقق...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      تغيير كلمة المرور
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </div>
                  )}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-sm text-teal-600 mb-2">
                    لم تستلم الرمز؟
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isLoading}
                    className="text-teal-600 border-teal-300 hover:bg-teal-50"
                  >
                    {countdown > 0 ? (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        إعادة الإرسال بعد {countdown} ثانية
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        إعادة إرسال الرمز
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Back to Email */}
            {step === 'otp' && (
              <div className="mt-6 text-center">
                <button
                  onClick={resetForm}
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
                  disabled={isLoading}
                >
                  ← العودة لتغيير البريد الإلكتروني
                </button>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link 
                to="/auth" 
                className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
              >
                ← العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
