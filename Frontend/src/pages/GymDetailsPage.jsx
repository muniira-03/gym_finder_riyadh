import { ArrowLeft, ArrowRight, MapPin, Clock, Phone, Globe, Star, Wifi, Car, Waves, Dumbbell, Users, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import ImageWithFallback from '../components/ImageWithFallback';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const facilityIcons = {
  'مسبح سباحة': Waves,
  'واي فاي مجاني': Wifi,
  'موقف سيارات': Car,
  'تدريب شخصي': Users,
  'وصول 24/7': Clock,
  'أجهزة كارديو': Dumbbell,
  'أوزان حرة': Dumbbell,
  'تمارين جماعية': Users,
  'ساونا': Waves,
  'غرفة بخار': Waves,
  'أجهزة قوة': Dumbbell,
  'تدريب وظيفي': Dumbbell
};

export function GymDetailsPage({ gym, onBack }) {
  // Scroll to top when this page mounts
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const { t, toggleLang, lang } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Additional back button in the top navigation area */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onBack();
            }}
            className="inline-flex items-center bg-white text-teal-600 hover:bg-teal-50 rounded-xl px-4 py-2 border border-teal-200 transition-all duration-200 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 ml-2" /> {t('backHome')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden rounded-2xl border border-teal-200">
              <div className="relative bg-white">
                <ImageWithFallback src={gym.image} alt={gym.nameArabic} className="w-full h-64 md:h-96 object-contain p-8" />
                {gym.logo && (
                  <div className="absolute top-6 right-6 bg-white rounded-xl p-3 shadow-xl">
                    <img src={gym.logo} alt={`${gym.nameEnglish} logo`} className="h-16 w-auto object-contain" />
                  </div>
                )}
              </div>
            </Card>

            <Card className="rounded-2xl border border-teal-200 gradient-mint-card">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl text-teal-900 mb-2">{gym.nameArabic}</h1>
                    <h2 className="text-xl text-teal-600 mb-4">{gym.nameEnglish}</h2>
                    <div className="flex items-center text-teal-600 mb-4">
                      <MapPin className="h-5 w-5 ml-2" />
                      <span>{gym.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-400 fill-current ml-1" />
                      <span className="text-lg text-teal-800">{gym.rating}</span>
                      <span className="text-teal-600 mr-2">(124 تقييم)</span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div>
                  <h3 className="text-lg mb-4 text-teal-800">نبذة عن النادي</h3>
                  <p className="text-teal-700 leading-relaxed">{gym.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-teal-200 gradient-mint-card">
              <CardContent className="p-8">
                <h3 className="text-lg mb-6 text-teal-800">المرافق والمعدات</h3>
                <div className="mb-8">
                  <h4 className="text-md mb-4 text-teal-600">المرافق المتاحة</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gym.facilities.map((facility) => {
                      const Icon = facilityIcons[facility] || Dumbbell;
                      return (
                        <div key={facility} className="flex items-center bg-teal-50 p-4 rounded-xl">
                          <Icon className="h-5 w-5 text-teal-600 ml-3" />
                          <span className="text-teal-700">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-md mb-4 text-teal-600">المعدات المتاحة</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gym.equipment.map((eq) => (
                      <div key={eq} className="flex items-center bg-emerald-50 p-4 rounded-xl">
                        <Dumbbell className="h-5 w-5 text-emerald-600 ml-3" />
                        <span className="text-emerald-700">{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl border border-teal-200 gradient-mint-card">
              <CardContent className="p-6">
                <h3 className="text-lg mb-6 text-teal-800">معلومات الاتصال</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-teal-600 ml-3" />
                    <div>
                      <div className="text-sm text-teal-500">ساعات العمل</div>
                      <div className="text-teal-700">{gym.hours}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-teal-600 ml-3" />
                    <div>
                      <div className="text-sm text-teal-500">رقم الهاتف</div>
                      <a 
                        href={`tel:${gym.phone}`}
                        className="text-teal-700 hover:text-teal-800 hover:underline transition-colors cursor-pointer" 
                        dir="ltr"
                      >
                        {gym.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-teal-600 ml-3" />
                    <div>
                      <div className="text-sm text-teal-500">الموقع الإلكتروني</div>
                      <a 
                        href={gym.website.startsWith('http') ? gym.website : `https://${gym.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 hover:underline transition-colors cursor-pointer break-all" 
                        dir="ltr"
                      >
                        {gym.website}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-teal-200 gradient-mint-card">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4 text-teal-800">الموقع</h3>
                <div className="bg-teal-100 rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-teal-500">خريطة تفاعلية</span>
                    <span className="block text-sm text-teal-400">قريباً</span>
                  </div>
                </div>
                <Button className="w-full mt-4 gradient-dark-mint rounded-xl cursor-pointer"
                onClick={() => {
                  const encodedLocation = encodeURIComponent(gym.location);
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
                }}
                >الحصول على الاتجاهات
                </Button>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
  
}
