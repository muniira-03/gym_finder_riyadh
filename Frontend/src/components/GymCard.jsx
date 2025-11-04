import { MapPin, Star, Wifi, Car, Waves, Dumbbell, Users, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import ImageWithFallback from './ImageWithFallback';

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

export function GymCard({ gym, onViewDetails }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 gradient-mint-card rounded-2xl">
      <div className="relative bg-white">
        <ImageWithFallback
          src={gym.image}
          alt={gym.nameArabic}
          className="w-full h-48 object-contain p-4"
        />
        {gym.logo && (
          <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
            <img 
              src={gym.logo} 
              alt={`${gym.nameEnglish} logo`}
              className="h-12 w-auto object-contain"
            />
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-teal-900 mb-1">{gym.nameArabic}</h3>
            <p className="text-sm text-teal-600">{gym.nameEnglish}</p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="mr-1 text-sm text-teal-700">{gym.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-teal-600 mb-4">
          <MapPin className="h-4 w-4 ml-1" />
          <span className="text-sm">{gym.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4" dir="rtl">
          {gym.facilities.slice(0, 4).map((facility) => {
            const Icon = facilityIcons[facility] || Dumbbell;
            return (
              <div key={facility} className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                <Icon className="h-3 w-3 text-teal-600 ml-1" />
                <span className="text-xs text-teal-700">{facility}</span>
              </div>
            );
          })}
          {gym.facilities.length > 4 && (
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-xs text-gray-600">+{gym.facilities.length - 4} المزيد</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onViewDetails(gym)}
          className="w-full gradient-dark-mint hover:shadow-lg rounded-xl transition-all duration-200"
        >
          عرض التفاصيل
        </Button>
      </CardContent>
    </Card>
  );
}
