import { Search, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function SearchBar({ onSearch, onFilterToggle, isFilterOpen }) {
  const [query, setQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const dropdownRef = useRef(null);

  const RIYADH_DISTRICTS = [
    "الصحافة", "الياسمين", "النرجس", "العقيق", "الملقا",
    "الروابي", "السليمانية", "العليا", "اليرموك", "الندى",
    "النفل", "الربوة", "غرناطة", "الروضة", "ظهرة لبن"
  ];

  const handleSearch = () => {
    onSearch(query, selectedLocation, selectedGender);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onSearch(query, selectedLocation, gender);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    onSearch(query, location, selectedGender);
  };

  const handleClearFilters = () => {
    setSelectedGender("");
    setSelectedLocation("");
    onSearch(query, "", "");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6" dir="rtl">
      <div className="relative w-full">

        {/* ✅ شريط البحث */}
        <div
          className="w-full h-16 rounded-3xl shadow-lg flex items-center gap-3 p-3"
          style={{ background: "linear-gradient(to right, #f0fdfa, #e6fffa)" }}
        >
          <button
            onClick={handleSearch}
            className="h-12 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 flex items-center gap-2"
            style={{ background: "linear-gradient(to right, #0d9488, #0f766e)" }}
          >
            <Search className="h-4 w-4 text-white" />
            <span className="text-white font-semibold text-sm">بحث</span>
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="   ابحث عن اسم النادي أو الموقع...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-12 pr-12 pl-4 text-base rounded-2xl border border-teal-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-100 bg-white text-gray-800 placeholder:text-gray-400 outline-none"
              dir="rtl"
            />
          </div>
        </div>

        {/* ✅ زر التصفية في اليسار تحت شريط البحث */}
        <div className="relative mt-4 flex justify-start w-full" dir="ltr">
          <button
            data-filter-button
            onClick={onFilterToggle}
            className="inline-flex items-center text-teal-600 border border-teal-300 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors"
          >
            <Filter className="h-5 w-5 ml-2" />
            <span className="text-sm">تصفية</span>
          </button>

          {/* ✅ القائمة المنبثقة تحت الزر مباشرة */}
          {isFilterOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-white border border-gray-200 rounded-xl shadow-xl p-6 text-right"
              style={{
                top: "110%",      // مسافة تحت الزر بشكل جميل
                left: "0",         // لمحاذاة الزر تمامًا
                width: "240px",
                zIndex: 9999,
                marginLeft: "0px" // تبعده عن الجدار 1 سم تقريبًا
              }}
              dir="rtl"
            >
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-gray-700 text-center">تصفية</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-3">نوع النادي</label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="رجال"
                        checked={selectedGender === "رجال"}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="ml-3 text-teal-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">رجال</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="سيدات"
                        checked={selectedGender === "سيدات"}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="ml-3 text-teal-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">سيدات</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-3">المنطقة</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 bg-white text-sm"
                    dir="rtl"
                  >
                    <option value="">اختر المنطقة</option>
                    {RIYADH_DISTRICTS.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  مسح الفلاتر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
