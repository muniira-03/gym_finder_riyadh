// Logo URLs - Using SVG or image URLs
const bfitLogo = 'https://via.placeholder.com/400x200/d4a574/ffffff?text=B-Fit';
const xfitLogo = 'https://via.placeholder.com/400x200/2563eb/ffffff?text=XFit';
const nineRoundLogo = 'https://via.placeholder.com/400x200/ef4444/ffffff?text=9Round';
const faresAcademyLogo = 'https://via.placeholder.com/400x200/7c3aed/ffffff?text=Fares+Academy';
const bodyMastersLogo = 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Body+Masters';
const gymNationLogo = 'https://via.placeholder.com/400x200/10b981/ffffff?text=GymNation';
const bodyMotionsLogo = 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Body+Motions';
const fitnessTimeLogo = 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Fitness+Time';
const puregym = 'https://via.placeholder.com/400x200/6366f1/ffffff?text=PureGym';

// تعريف مصفوفة الاندية
export const mockGyms = [
  {
    id: "1",
    nameArabic: "نادي وقت اللياقة",
    nameEnglish: "Fitness Time",
    location: "حي الملقا، الرياض",
    rating: 4.5,
    image: fitnessTimeLogo,
    facilities: ["مسبح سباحة", "واي فاي مجاني", "موقف سيارات", "تدريب شخصي", "تمارين جماعية", "ساونا"],
    equipment: ["أجهزة كارديو", "أوزان حرة", "أجهزة قوة", "تدريب وظيفي"],
    hours: "5:00 صباحاً - 12:00 منتصف الليل",
    description: "نادي رياضي متطور مع أحدث المعدات والمدربين المحترفين في قلب الرياض.",
    phone: "+966 11 123 4567",
    website: "www.waqtfitness.com.sa",
    gender: "مختلط"
  },

  {
    id: "2",
    nameArabic: "أكاديمية فارس",
    nameEnglish: "Fares Academy",
    location: "حي النرجس، الرياض",
    rating: 4.3,
    image: faresAcademyLogo,
    facilities: ["وصول 24/7", "واي فاي مجاني", "موقف سيارات", "تدريب شخصي", "غرفة بخار"],
    equipment: ["أجهزة كارديو", "أوزان حرة", "أجهزة قوة", "منطقة تمارين جماعية"],
    hours: "24 ساعة",
    description: "أكاديمية تدريب شاملة تقدم برامج متخصصة للتطوير البدني والرياضي.",
    phone: "+966 11 234 5678",
    website: "www.faresacademy.com.sa",
    gender: "رجال"
  },
  
   {
    id: "3",
    nameArabic: "إكس فت",
    nameEnglish: "XFit",
    location: "حي العليا، الرياض",
    rating: 4.7,
    image: xfitLogo,
    facilities: ["مسبح سباحة", "واي فاي مجاني", "موقف سيارات", "تمارين جماعية", "تدريب شخصي", "ساونا", "غرفة بخار"],
    equipment: ["أجهزة كارديو متطورة", "أوزان حرة", "أجهزة قوة", "معدات استوديو"],
    hours: "6:00 صباحاً - 11:00 مساءً",
    description: "نادي رياضي عصري مع مرافق متكاملة وتجربة تدريب فريدة.",
    phone: "+966 11 345 6789",
    website: "www.xfit.com.sa",
    gender: "مختلط"
  },
  {
    id: "4",
    nameArabic: "بي فت",
    nameEnglish: "B-Fit",
    location: "حي المربع، الرياض",
    rating: 4.2,
    image: bfitLogo,
    facilities: ["واي فاي مجاني", "موقف سيارات", "تدريب شخصي", "تمارين جماعية"],
    equipment: ["أوزان حرة", "أجهزة قوة", "تدريب وظيفي", "أجهزة كارديو"],
    hours: "5:00 صباحاً - 11:00 مساءً",
    description: "نادي رياضي يركز على القوة مع معدات متخصصة لرياضة كمال الأجسام.",
    phone: "+966 11 456 7890",
    website: "www.befit.com.sa",
    gender: "رجال"
  },
  {
    id: "5",
    nameArabic: "ناين راوند",
    nameEnglish: "9 Round",
    location: "حي النخيل، الرياض",
    rating: 4.6,
    image: nineRoundLogo,
    facilities: ["مسبح سباحة", "وصول 24/7", "واي فاي مجاني", "موقف سيارات", "تدريب شخصي", "تمارين جماعية"],
    equipment: ["أجهزة كارديو", "أوزان حرة", "أجهزة قوة", "معدات استوديو", "تدريب وظيفي"],
    hours: "24 ساعة",
    description: "نادي لياقة فاخر يقدم مرافق متميزة وبرامج تدريب مخصصة.",
    phone: "+966 11 567 8901",
    website: "www.9round.com.sa",
    gender: "مختلط"
  },
  {
    id: "6",
    nameArabic: "بودي ماسترز",
    nameEnglish: "Body Masters",
    location: "حي الصحافة، الرياض",
    rating: 4.1,
    image: bodyMastersLogo,
    facilities: ["واي فاي مجاني", "موقف سيارات", "تمارين جماعية", "تدريب شخصي"],
    equipment: ["أجهزة كارديو", "أوزان حرة", "تدريب وظيفي", "أجهزة قوة"],
    hours: "6:00 صباحاً - 10:00 مساءً",
    description: "نادي رياضي بأسعار معقولة مع معدات حديثة وأجواء ودية.",
    phone: "+966 11 678 9012",
    website: "www.bodymasters.com.sa",
    gender: "رجال"
  },
  {
    id: "7",
    nameArabic: "بودي موشنز",
    nameEnglish: "Body Motions",
    location: "حي الازدهار، الرياض",
    rating: 4.4,
    image: bodyMotionsLogo,
    facilities: ["مسبح سباحة", "واي فاي مجاني", "موقف سيارات", "ساونا", "غرفة بخار", "تدريب شخصي"],
    equipment: ["أجهزة كارديو حديثة", "أوزان حرة", "أجهزة قوة", "منطقة يوغا"],
    hours: "5:30 صباحاً - 11:30 مساءً",
    description: "نادي نسائي متكامل يقدم تجربة تدريب مميزة ومرافق حديثة.",
    phone: "+966 11 789 0123",
    website: "www.bodymotions.com.sa",
    gender: "نساء"
  },
  {
    id: "8",
    nameArabic: "بيور جيم",
    nameEnglish: "PureGym",
    location: "حي الياسمين، الرياض",
    rating: 4.4,
    image: puregym,
    facilities: ["مسبح سباحة", "واي فاي مجاني", "موقف سيارات", "ساونا", "غرفة بخار", "تدريب شخصي"],
    equipment: ["أجهزة كارديو حديثة", "أوزان حرة", "أجهزة قوة", "منطقة يوغا"],
    hours: "5:30 صباحاً - 11:30 مساءً",
    description: "نادي رياضي شامل يهدف إلى تحقيق اللياقة البدنية المثالية.",
    phone: "+966 11 789 0123",
    website: "www.puregymarabia.com.sa",
    gender: "مختلط"
  },
  {
    id: "9",
    nameArabic: "جيمينيشن",
    nameEnglish: "GymNation",
    location: "حي الورود، الرياض",
    rating: 4.8,
    image: gymNationLogo,
    facilities: ["وصول 24/7", "مسبح سباحة", "واي فاي مجاني", "موقف سيارات", "ساونا", "غرفة بخار", "تدريب شخصي", "تمارين جماعية"],
    equipment: ["أجهزة كارديو متطورة", "أوزان حرة احترافية", "أجهزة قوة", "معدات كروس فت", "تدريب وظيفي"],
    hours: "24 ساعة",
    description: "أحد أفضل الأندية الرياضية في الرياض مع مرافق عالمية ومعدات حديثة.",
    phone: "+966 11 890 1234",
    website: "www.gymnation.com.sa",
    gender: "مختلط"
  }

]
