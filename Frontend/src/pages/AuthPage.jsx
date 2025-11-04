import { useState, useEffect } from 'react';
import { Mail, Lock, User, Shield, Dumbbell, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { Button } from '../components/ui/button';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register, verifyEmail, resendOTP, isLoading } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'verify'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [countdown, setCountdown] = useState(0);

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
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
      } else {
        if (!/^[a-zA-Z0-9._%+-@]+$/.test(email)) {
          errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
        } else {
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

  const validatePassword = () => {
    const errors = {};
    if (!password.trim()) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateName = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'الاسم مطلوب';
    } else if (name.trim().length < 2) {
      errors.name = 'الاسم يجب أن يكون حرفين على الأقل';
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateEmail() || !validatePassword()) {
      return;
    }
    
    try {
      await login(email, password);
      setSuccess('تم تسجيل الدخول بنجاح');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateName() || !validateEmail() || !validatePassword()) {
      return;
    }
    
    try {
      const result = await register(name, email, password);
      setSuccess(result.message);
      setMode('verify');
      setCountdown(60);
    } catch (err) {
      setError(err.message || 'فشل في إنشاء الحساب');
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateOTP()) {
      return;
    }
    
    try {
      const result = await verifyEmail(email, otp);
      setSuccess(result.message);
      setTimeout(() => {
        setMode('login');
        setEmail('');
        setPassword('');
        setOtp('');
        setError('');
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.message || 'رمز التحقق غير صحيح');
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setSuccess('');
    
    try {
      const result = await resendOTP(email);
      setSuccess(result.message);
      setCountdown(60);
    } catch (err) {
      setError(err.message || 'فشل في إرسال رمز التحقق');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Dumbbell className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-teal-900 mb-2">
                {mode === 'login' ? 'مرحباً بك!' : mode === 'signup' ? 'إنشاء حساب جديد' : 'تحقق من بريدك الإلكتروني'}
              </h1>
              <p className="text-teal-600">
                {mode === 'login' 
                  ? 'سجل دخولك للوصول إلى حسابك' 
                  : mode === 'signup'
                  ? 'أنشئ حساباً جديداً للبدء'
                  : `تم إرسال رمز التحقق إلى ${email}`}
              </p>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            )}

            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6">
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

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-teal-700">
                    كلمة المرور
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${validationErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>

                {/* ✅ زر تسجيل الدخول */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white font-semibold py-3 rounded-xl w-full transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(to right, #2EC4B6, #1CA89E)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  تسجيل الدخول
                </button>

                <div className="text-center space-y-6">
                  <div>
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <p className="text-sm text-teal-600">
                    ليس لديك حساب؟{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-green-600 hover:text-green-800 font-medium transition-colors"
                    >
                      إنشاء حساب جديد
                    </button>
                  </p>
                </div>
              </form>
            )}

            {mode === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-teal-700">
                    الاسم
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`pl-10 ${validationErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="الاسم الكامل"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>

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

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-teal-700">
                    كلمة المرور
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${validationErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-teal-300 focus:border-teal-500 focus:ring-teal-500'}`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>

                {/* ✅ زر إنشاء الحساب */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white font-semibold py-3 rounded-xl w-full transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(to right, #2EC4B6, #1CA89E)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  إنشاء الحساب
                </button>

                <div className="text-center">
                  <p className="text-sm text-teal-600">
                    لديك حساب بالفعل؟{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-green-600 hover:text-green-800 font-medium transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </div>
              </form>
            )}

            {mode === 'verify' && (
              <form onSubmit={handleVerifyEmail} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#2EC4B6] to-[#1CA89E] text-white font-semibold py-3 rounded-xl text-center hover:opacity-90 transition-all duration-200 cursor-pointer"
                >
                  تأكيد البريد الإلكتروني
                </button>

                <div className="text-center">
                  <p className="text-sm text-teal-600 mb-2">
                    لم تستلم الرمز؟
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isLoading}
                    className="text-teal-600 border border-teal-300 hover:bg-teal-50 transition-all duration-200 px-4 py-2 rounded-xl"
                  >
                    {countdown > 0 ? `إعادة الإرسال بعد ${countdown} ثانية` : 'إعادة إرسال الرمز'}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center">
              <div className="flex justify-center space-x-4 rtl:space-x-reverse text-xs text-teal-500">
                <Link to="/terms" className="hover:text-teal-700 transition-colors">
                  شروط الاستخدام
                </Link>
                <span>|</span>
                <Link to="/privacy" className="hover:text-teal-700 transition-colors">
                  سياسة الخصوصية
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
