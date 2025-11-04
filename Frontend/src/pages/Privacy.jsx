import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-teal-900 mb-4">سياسة الخصوصية</h1>
            <p className="text-teal-600">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">1. مقدمة</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن في GymFinder Riyadh نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. 
                تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">2. المعلومات التي نجمعها</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-teal-700 mb-2">المعلومات الشخصية:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>الاسم والبريد الإلكتروني</li>
                    <li>رقم الهاتف (اختياري)</li>
                    <li>معلومات الملف الشخصي</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-teal-700 mb-2">معلومات الاستخدام:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>عنوان IP والموقع الجغرافي</li>
                    <li>نوع المتصفح ونظام التشغيل</li>
                    <li>صفحات الموقع التي تزورها</li>
                    <li>وقت ومدة الزيارة</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">3. كيفية استخدام المعلومات</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                نستخدم المعلومات التي نجمعها لـ:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>توفير وتحسين خدماتنا</li>
                <li>إرسال رمز التحقق (OTP) لتسجيل الدخول</li>
                <li>الرد على استفساراتك وطلباتك</li>
                <li>تحليل استخدام الموقع لتحسين تجربة المستخدم</li>
                <li>منع الاحتيال وحماية أمن الموقع</li>
                <li>الامتثال للقوانين واللوائح المعمول بها</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">4. مشاركة المعلومات</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>بموافقتك الصريحة</li>
                <li>للمزودين الخدمات الذين يعملون نيابة عنا</li>
                <li>عندما يكون ذلك مطلوباً بموجب القانون</li>
                <li>لحماية حقوقنا أو حقوق المستخدمين الآخرين</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">5. أمان المعلومات</h2>
              <p className="text-gray-700 leading-relaxed">
                نستخدم تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به 
                أو التعديل أو الكشف أو التدمير. ومع ذلك، لا يمكن ضمان الأمان المطلق على الإنترنت.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">6. ملفات تعريف الارتباط (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتذكر تفضيلاتك. 
                يمكنك تعطيل ملفات تعريف الارتباط في إعدادات المتصفح، 
                ولكن قد يؤثر ذلك على وظائف الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">7. حقوقك</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                لديك الحق في:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح المعلومات غير الدقيقة</li>
                <li>حذف معلوماتك الشخصية</li>
                <li>الاعتراض على معالجة معلوماتك</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">8. التعديلات على السياسة</h2>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. 
                سنقوم بإشعارك بأي تغييرات مهمة عبر الموقع أو البريد الإلكتروني.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">9. الاتصال بنا</h2>
              <p className="text-gray-700 leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية معالجة معلوماتك، 
                يرجى الاتصال بنا عبر صفحة الاتصال أو البريد الإلكتروني.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

