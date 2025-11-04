import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage
  if (typeof window !== 'undefined' && user === null) {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email) {
          // lazy set to avoid extra renders
          setUser(parsed);
        }
      }
    } catch (_) {}
  }

  const login = async (email, password) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    if (!password || password.length < 6) throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      
      const newUser = { 
        ...data.user, 
        token: data.access_token
      };
      
      setUser(newUser);
      try { localStorage.setItem('auth_user', JSON.stringify(newUser)); } catch (_) {}
      return { ok: true };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.trim().length < 2) throw new Error('الاسم يجب أن يكون حرفين على الأقل');
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    if (!password || password.length < 6) throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'فشل في إنشاء الحساب');
      }
      
      return { ok: true, message: data.message };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email, otp) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    if (!otp || otp.length !== 6) throw new Error('رمز التحقق يجب أن يكون 6 أرقام');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'رمز التحقق غير صحيح');
      }
      
      return { ok: true, message: data.message };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (email) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'فشل في إرسال رمز التحقق');
      }
      
      return { ok: true, message: data.message };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');

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
      
      if (!response.ok) {
        throw new Error(data.detail || 'فشل في إرسال رمز التحقق');
      }
      
      return { ok: true, message: data.message };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    // Simple client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    if (!otp || otp.length !== 6) throw new Error('رمز التحقق يجب أن يكون 6 أرقام');
    if (!newPassword || newPassword.length < 6) throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'فشل في تغيير كلمة المرور');
      }
      
      return { ok: true, message: data.message };
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('auth_user'); } catch (_) {}
  };

  const value = useMemo(() => ({ 
    user, 
    login, 
    register, 
    verifyEmail, 
    resendOTP, 
    forgotPassword,
    resetPassword,
    logout, 
    isLoading 
  }), [user, isLoading]);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}