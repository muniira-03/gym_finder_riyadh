import { NavLink, Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-teal-200 bg-white/60 backdrop-blur-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-teal-700">
      <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/about" className={({ isActive }) => `${isActive ? 'text-teal-900 font-semibold' : 'hover:text-teal-800'}`}>من نحن</NavLink>
        </nav>  
        <div className="text-sm">© {new Date().getFullYear()} GymFinder Riyadh</div> 
      </div>
    </footer>
  );
}


