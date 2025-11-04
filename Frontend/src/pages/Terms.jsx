import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-teal-900 mb-4">شروط الاستخدام</h1>
            <p className="text-teal-600">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">1. قبول الشروط</h2>
              <p className="text-gray-700 leading-relaxed">
                بوصولك واستخدامك لموقع GymFinder Riyadh، فإنك توافق على الالتزام بشروط الاستخدام هذه. 
                إذا كنت لا توافق على أي من هذه الشروط، فيرجى عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">2. وصف الخدمة</h2>
              <p className="text-gray-700 leading-relaxed">
                GymFinder Riyadh هو منصة إلكترونية تهدف إلى مساعدة المستخدمين في العثور على الأندية الرياضية 
                في مدينة الرياض. نحن نقدم معلومات عن الأندية الرياضية ومراجعات المستخدمين وخدمات أخرى ذات صلة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">3. استخدام الموقع</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                عند استخدام موقعنا، يجب عليك:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                <li>استخدام الموقع لأغراض قانونية فقط</li>
                <li>عدم محاولة الوصول غير المصرح به إلى أنظمة الموقع</li>
                <li>عدم نشر محتوى مسيء أو غير لائق</li>
                <li>احترام حقوق الملكية الفكرية للآخرين</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">4. الخصوصية</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. 
                يرجى مراجعة سياسة الخصوصية الخاصة بنا لفهم كيفية جمع واستخدام وحماية معلوماتك.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">5. إخلاء المسؤولية</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن لا نضمن دقة أو اكتمال المعلومات المقدمة على الموقع. 
                المستخدمون مسؤولون عن التحقق من صحة المعلومات قبل اتخاذ أي قرارات.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">6. التعديلات</h2>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. 
                سيتم إشعار المستخدمين بأي تغييرات مهمة عبر الموقع أو البريد الإلكتروني.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-800 mb-4">7. الاتصال بنا</h2>
              <p className="text-gray-700 leading-relaxed">
                إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، 
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

