// src/components/layout/MobileMenu.jsx
import { X } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 md:hidden"
      onClick={onClose} // close when clicking outside
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Menu Panel */}
      <div 
        className={`
          absolute top-0 right-0 h-full w-4/5 max-w-xs 
          glass-effect border-l border-white/10 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">د</span>
            </div>
            <span className="text-xl font-bold gradient-text">دال إن</span>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-5 space-y-2">
          <a 
            href="#how-it-works" 
            className="block py-3 px-4 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={onClose}
          >
            كيف يعمل
          </a>
          
          <a 
            href="#algorithm" 
            className="block py-3 px-4 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={onClose}
          >
            الخوارزمية
          </a>
          
          <a 
            href="#benefits" 
            className="block py-3 px-4 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={onClose}
          >
            المميزات
          </a>

          {/* Optional extra links */}
          <div className="pt-4 mt-4 border-t border-slate-700/50">
            <a 
              href="#contact" 
              className="block py-3 px-4 gradient-bg text-white font-medium rounded-lg text-center hover:shadow-lg transition-all"
              onClick={onClose}
            >
              ابدأ الآن
            </a>
          </div>
        </div>

        {/* Optional footer in mobile menu */}
        <div className="absolute bottom-6 left-0 right-0 px-5 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} دال إن
        </div>
      </div>
    </div>
  );
}