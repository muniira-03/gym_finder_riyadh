import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const isForgotPassword = location.pathname === '/forgot-password';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-sm border-b border-teal-100">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between" dir="rtl">
        {/* Right: Logo (only link to home) */}
        <div className="flex items-center">
          <Link to="/" className="inline-flex items-center gap-2 select-none hover:opacity-80 transition-opacity">
            <Dumbbell className="h-8 w-8 text-teal-600" />
            <span className="text-teal-900 font-semibold text-xl sm:text-2xl">GymFinder Riyadh</span>
          </Link>
        </div>
        {/* Left: Greeting + logout OR auth actions + language toggle */}
        <div className="flex items-center gap-4 text-teal-700 relative">
          {user ? (
            <>
              <button onClick={() => setMenuOpen((v) => !v)} className="text-sm hover:bg-gray-100 px-3 h-9 rounded-md transition-colors">
                {t('hello')} {user.name}
              </button>
              {menuOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-teal-100 rounded-lg shadow-md text-sm min-w-[10rem] p-2 transition-all duration-150 origin-top-left">
                  <button onClick={() => { setMenuOpen(false); logout(); navigate('/'); }} className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">{t('logout')}</button>
                  <button onClick={() => setMenuOpen(false)} className="w-full text-left mt-1 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">{t('cancel')}</button>
                </div>
              )}
            </>
          ) : (
            <>
              {!isAuth && !isForgotPassword && (
                <Link to="/auth" className="inline-flex items-center justify-center h-9 px-4 text-sm text-white rounded-md transition-colors gradient-dark-mint hover:shadow">{t('loginSignup')}</Link>
              )}
            </>
          )}
          <button onClick={toggleLang} className="inline-flex items-center justify-center h-9 px-3 text-sm border border-teal-200 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle language">
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>
      </nav>
    </header>
  );
}


