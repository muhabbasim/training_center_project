import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Network, User, FileText, BarChart, Building2, Users, Briefcase, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate, Company } from '../../types';

interface NavItem {
  path: string;
  icon: typeof User;
  label: string;
}

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  // Define navigation items based on user role
  const graduateNavItems: NavItem[] = [
    { path: '/dashboard/graduate/profile', icon: User, label: 'الملف الشخصي' },
    { path: '/dashboard/graduate/exam', icon: FileText, label: 'الاختبار' },
    { path: '/dashboard/graduate/companies', icon: Building2, label: 'اختيار الشركة' },
    { path: '/dashboard/graduate/training', icon: BarChart, label: 'حالة التدريب' },
  ];

  const companyNavItems: NavItem[] = [
    { path: '/dashboard/company/profile', icon: Building2, label: 'بيانات الشركة' },
    { path: '/dashboard/company/pool', icon: Users, label: 'الخريجين' },
    { path: '/dashboard/company/opportunities', icon: Briefcase, label: 'فرص التدريب' },
  ];

  const navItems = user.role === 'graduate' ? graduateNavItems : companyNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserName = (): string => {
    if (user.role === 'graduate') {
      return (user as Graduate).name;
    }
    return (user as Company).companyName;
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed right-0 top-0 h-full w-64 bg-white shadow-lg flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <Network className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">دال إن</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {getUserName().charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{getUserName()}</p>
              <p className="text-xs text-slate-500">
                {user.role === 'graduate' ? 'خريج' : 'شركة'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'gradient-bg text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 right-0 left-0 h-16 bg-white shadow-md z-50">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">دال إن</span>
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Network className="text-white w-5 h-5" />
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="p-6 border-b border-slate-200">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Network className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold gradient-text">دال إن</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {getUserName().charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{getUserName()}</p>
                  <p className="text-xs text-slate-500">
                    {user.role === 'graduate' ? 'خريج' : 'شركة'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'gradient-bg text-white shadow-lg'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="md:mr-64 min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
