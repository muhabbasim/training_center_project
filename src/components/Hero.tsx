import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Building2, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'منصة ذكية للتدريب التعاوني';
  const statsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  // Counter animation function
  const animateValue = (element: HTMLElement, start: number, end: number, duration: number, suffix: string = '') => {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.innerText = suffix + Math.floor(current).toString();
    }, 16);
  };

  useEffect(() => {
    // Typing effect
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);

    // Stats animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            const statElements = entry.target.querySelectorAll('.stat-number');
            statElements.forEach((stat) => {
              const element = stat as HTMLElement;
              const text = element.innerText;
              const num = parseInt(text.replace(/[^0-9]/g, ''));
              const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';
              
              if (num) {
                if (suffix === '%') {
                  animateValue(element, 0, num, 2000, '');
                  setTimeout(() => {
                    element.innerText = num + '%';
                  }, 2000);
                } else {
                  animateValue(element, 0, num, 2000, suffix);
                }
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      clearInterval(typing);
      observer.disconnect();
    };
  }, [animated, fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 algorithm-visual opacity-30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm floating">
          <span className="typing-effect">{typedText}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-slate-800">نوصلك بفرصتك</span>
          <span className="block gradient-text">المثالية للتدريب</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          باستخدام خوارزمية دال إن المتقدمة، نحلل قدراتك ونطابقك مع أفضل الشركات 
          <br className="hidden md:block" />
          لتحقيق تجربة تدريب مثالية ومثمرة
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/register/graduate" className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            أنا طالب
          </Link>
          <Link to="/register/company" className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            أنا شركة
          </Link>
        </div>
        
        {/* Stats with animation */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-4xl font-bold gradient-text mb-2">
              <span className="stat-number">+5000</span>
            </div>
            <div className="text-slate-600">طالب مسجل</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-4xl font-bold gradient-text mb-2">
              <span className="stat-number">+350</span>
            </div>
            <div className="text-slate-600">شركة شريكة</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 card-hover">
            <div className="text-4xl font-bold gradient-text mb-2">
              <span className="stat-number">98%</span>
            </div>
            <div className="text-slate-600">نسبة التطابق</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </div>
    </section>
  );
};

export default Hero;