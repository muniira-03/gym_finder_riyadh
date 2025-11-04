import { useState } from 'react';
import { GymCard } from './components/GymCard';
import { SearchBar } from './components/SearchBar';
import { GymDetailsPage } from './pages/GymDetailsPage';
import { mockGyms } from './data/gyms';
import { Search, Dumbbell } from 'lucide-react';
import hero from './assets/e426b0c61f3eca5846906b9ed97ccb5b797027f4.png';
import Navigation from './components/Navigation.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Link } from 'react-router-dom';

export default function App() {
  const [selectedGym, setSelectedGym] = useState(null);
  const [filteredGyms, setFilteredGyms] = useState(mockGyms);
  const [isLoggedIn] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (query, location, gender) => {
    let filtered = mockGyms;
    
    // Filter by search query
    if (query?.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(gym =>
        gym.nameArabic.toLowerCase().includes(q) ||
        gym.nameEnglish.toLowerCase().includes(q) ||
        gym.location.toLowerCase().includes(q) ||
        gym.facilities.some(f => f.toLowerCase().includes(q)) ||
        gym.equipment.some(eq => eq.toLowerCase().includes(q))
      );
    }
    
    // Filter by location
    if (location?.trim()) {
      filtered = filtered.filter(gym =>
        gym.location.includes(location)
      );
    }
    
    // Filter by gender
    if (gender?.trim()) {
      filtered = filtered.filter(gym =>
        gym.gender === gender
      );
    }
    
    setFilteredGyms(filtered);
  };

  const handleViewDetails = (gym) => setSelectedGym(gym);
  const handleBack = () => setSelectedGym(null);
  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  // Keep homepage accessible without requiring login

  if (selectedGym) return <GymDetailsPage gym={selectedGym} onBack={handleBack} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <Navbar />
      <div className="pt-16">
      
      {/* ✅ Hero Section (expanded height/impact) */}
      <div className="relative shadow-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${hero})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "12rem", paddingBottom: "12rem" }}>

          {/* 🔹 Title */}
          <div className="text-center mt-10 md:mt-16">
            <div className="flex items-center justify-center mb-4">
              <Dumbbell className="h-10 w-10 text-white ml-3" />
              <h1 
                 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                 style={{ lineHeight: "1.1", letterSpacing: "1px" }}
              >
                 GymFinder Riyadh
              </h1>

            </div>
            <p className="text-white text-lg max-w-3xl mx-auto">
              اكتشف أفضل الأندية الرياضية في الرياض واعثر على النادي المثالي لتحقيق أهدافك
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} onFilterToggle={handleFilterToggle} isFilterOpen={isFilterOpen} />
        </div>

        {/* ✅ Results Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-900 mb-6">الأندية المتاحة ({filteredGyms.length})</h2>

          {filteredGyms.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-teal-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-teal-700 mb-2">لم نجد أي نتائج</h3>
                <p className="text-teal-600">جرب البحث بكلمات مختلفة أو عدّل المرشحات</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
        </div>

        {/* ✅ Contact CTA Section */}
        <div className="text-center py-12 border-t border-teal-200">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">لا تجد النادي المناسب؟</h3>
            <p className="text-teal-600 mb-6">
              نضيف أندية جديدة باستمرار. تواصل معنا لاقتراح نادي جديد.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="border border-teal-300 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-50 transition-all duration-200">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Footer content moved to global footer component */}
      </div>
      </div>
      <Footer />
    </div>
  );
}
