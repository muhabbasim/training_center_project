import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, Menu, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/10 backdrop-blur-md'
      }`}
      style={{ background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 space-x-reverse gap-2">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <Network className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">دال إن</span>
          </div>
          
          <div className="hidden md:flex gap-2 space-x-8 space-x-reverse items-center">
            <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              كيف يعمل
            </a>
            <a href="#algorithm" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              الخوارزمية
            </a>
            <a href="#benefits" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              المميزات
            </a>
            {isAuthenticated && user ? (
              <Link 
                to={user.role === 'graduate' ? '/dashboard/graduate/profile' : '/dashboard/company/profile'}
                className="gradient-bg text-white px-6 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                لوحة التحكم
              </Link>
            ) : (
              <Link to="/login" className="gradient-bg text-white px-6 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                تسجيل الدخول
              </Link>
            )}
          </div>
          
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden glass-effect border-t transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a href="#how-it-works" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
            كيف يعمل
          </a>
          <a href="#algorithm" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
            الخوارزمية
          </a>
          <a href="#benefits" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
            المميزات
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;