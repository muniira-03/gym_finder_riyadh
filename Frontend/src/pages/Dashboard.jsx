import { useAuth } from '../context/AuthContext.jsx';
import { Dumbbell, User, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <Dumbbell className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-teal-900 mb-4">مرحباً بك في لوحة التحكم</h1>
            <p className="text-teal-600">مرحباً {user?.name}، يمكنك الآن استكشاف الأندية الرياضية</p>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="bg-teal-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-lg font-semibold text-teal-800">معلومات الحساب</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-teal-700"><strong>الاسم:</strong> {user?.name}</p>
                  <p className="text-teal-700"><strong>البريد الإلكتروني:</strong> {user?.email}</p>
                  <p className="text-teal-700"><strong>نوع الحساب:</strong> {user?.role === 'admin' ? 'مدير' : 'مستخدم'}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Dumbbell className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-800">الإجراءات السريعة</h3>
                </div>
                <div className="space-y-3">
                  <Link 
                    to="/gyms" 
                    className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    استكشاف الأندية
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block w-full bg-teal-600 text-white text-center py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    تواصل معنا
                  </Link>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <LogOut className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-lg font-semibold text-orange-800">إدارة الحساب</h3>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={handleLogout}
                    className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    تسجيل الخروج
                  </button>
                  <Link 
                    to="/" 
                    className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    العودة للرئيسية
                  </Link>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-100 to-green-100 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-800 mb-3">مرحباً بك في GymFinder Riyadh!</h3>
              <p className="text-teal-700 leading-relaxed">
                تم إنشاء حسابك بنجاح باستخدام رمز التحقق. يمكنك الآن استكشاف أفضل الأندية الرياضية في الرياض، 
                مقارنة المرافق والأسعار، واتخاذ القرار المناسب لتحقيق أهدافك الرياضية.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

