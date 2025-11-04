import { useState, useEffect } from 'react';
import { GymCard } from '../components/GymCard';
import { SearchBar } from '../components/SearchBar';
import { gymAPI } from '../config/api';

export default function Gyms() {
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    try {
      const data = await gymAPI.getAll();
      setGyms(data);
      setFilteredGyms(data);
    } catch (error) {
      setError('حدث خطأ في تحميل الأندية');
      console.error('Error fetching gyms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query, location, gender) => {
    let filtered = gyms;
    
    // Filter by search query
    if (query?.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(gym =>
        gym.name_ar.toLowerCase().includes(q) ||
        gym.name_en.toLowerCase().includes(q) ||
        gym.location.toLowerCase().includes(q) ||
        (gym.facilities && gym.facilities.toLowerCase().includes(q)) ||
        (gym.equipment && gym.equipment.toLowerCase().includes(q))
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

  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-teal-600 mt-4">جاري تحميل الأندية...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchGyms}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
      <h1 className="text-3xl text-teal-900 mb-6">الأندية</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} onFilterToggle={handleFilterToggle} isFilterOpen={isFilterOpen} />
      </div>
      <div>
        {filteredGyms.length === 0 ? (
          <div className="text-center text-teal-600 py-12">
            <p className="text-lg">لا توجد نتائج</p>
            <p className="text-sm mt-2">جرب البحث بكلمات مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <GymCard 
                key={gym.id} 
                gym={{
                  id: gym.id,
                  nameArabic: gym.name_ar,
                  nameEnglish: gym.name_en,
                  location: gym.location,
                  description: gym.description,
                  rating: gym.rating,
                  facilities: gym.facilities ? gym.facilities.split(',').map(f => f.trim()) : [],
                  equipment: gym.equipment ? gym.equipment.split(',').map(e => e.trim()) : [],
                  phone: gym.phone,
                  website: gym.website,
                  openingHours: gym.opening_hours
                }} 
                onViewDetails={() => {}} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


