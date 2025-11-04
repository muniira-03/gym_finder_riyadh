import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') || localStorage.getItem('app_lang')) : null;
    const initial = saved === 'en' ? 'en' : 'ar';
    setLang(initial);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const t = (key) => {
    const dict = {
      ar: {
        hello: 'مرحباً',
        nada: 'ندى',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        loginSignup: 'تسجيل / إنشاء حساب',
        logout: 'تسجيل الخروج',
        cancel: 'إلغاء',
        backHome: 'العودة إلى الصفحة الرئيسية',
      },
      en: {
        hello: 'Hello',
        nada: 'Nada',
        login: 'Login',
        signup: 'Signup',
        loginSignup: 'Login / Signup',
        logout: 'Logout',
        cancel: 'Cancel',
        backHome: 'Back to Home',
      },
    };
    return (dict[lang] && dict[lang][key]) || key;
  };

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}


