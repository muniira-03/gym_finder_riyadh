import Navbar from '../components/Navbar.jsx';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* العنوان الرئيسي على اليمين */}
          <h1 className="text-4xl font-bold text-teal-900 mb-4 text-center">من نحن</h1>

          {/* النص في المنتصف */}
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              في مدينة تعجّ بالحياة والنشاط، جاءت منصتنا لتكون دليلك الذكي لاكتشاف الأندية الرياضية في الرياض بسهولة وسلاسة.  
              نجمع لك مجموعة متنوعة من النوادي في مكان واحد، لتتعرّف على المرافق والخدمات المتوفّرة في كل نادٍ دون الحاجة للبحث المتعب.  
              <br /><br />
              نؤمن أن اختيار النادي المناسب هو خطوة أساسية نحو أسلوب حياة صحي ومتوازن، لذلك صمّمنا واجهة بسيطة وأنيقة تساعدك على تصفّح الأندية، ومقارنة المزايا، واختيار المكان الأنسب لك بكل راحة.  
            </p>

            <p className="text-teal-800 font-extrabold text-lg leading-relaxed">
              رؤيتنا هي بناء مجتمع يهتمّ بالرياضة والنشاط، ويعيش تجربة أفضل في كل تمرين وكل لحظة داخل النادي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
