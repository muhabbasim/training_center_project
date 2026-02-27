import { useEffect, useRef } from "react";

const PartnerLogos = () => {
  const partners = [
    { 
      name: 'أرامكو', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%233b82f6\' text-anchor=\'middle\' font-weight=\'bold\'%3EARAMCO%3C/text%3E%3C/svg%3E',
      category: 'طاقة',
      delay: 0
    },
    { 
      name: 'الاتصالات السعودية', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'14\' fill=\'%2310b981\' text-anchor=\'middle\' font-weight=\'bold\'%3ESTC%3C/text%3E%3C/svg%3E',
      category: 'اتصالات',
      delay: 0.2
    },
    { 
      name: 'البنك الأهلي', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'14\' fill=\'%236366f1\' text-anchor=\'middle\' font-weight=\'bold\'%3ENational%3C/text%3E%3C/svg%3E',
      category: 'بنوك',
      delay: 0.4
    },
    { 
      name: 'سابك', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%23ec4899\' text-anchor=\'middle\' font-weight=\'bold\'%3ESABIC%3C/text%3E%3C/svg%3E',
      category: 'صناعة',
      delay: 0.6
    },
    { 
      name: 'الراجحي', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%23f59e0b\' text-anchor=\'middle\' font-weight=\'bold\'%3EAlrajhi%3C/text%3E%3C/svg%3E',
      category: 'بنوك',
      delay: 0.2
    },
    { 
      name: 'زين', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%238b5cf6\' text-anchor=\'middle\' font-weight=\'bold\'%3EZAIN%3C/text%3E%3C/svg%3E',
      category: 'اتصالات',
      delay: 0.2
    },
    { 
      name: 'موبايلي', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'14\' fill=\'%23ef4444\' text-anchor=\'middle\' font-weight=\'bold\'%3EMobily%3C/text%3E%3C/svg%3E',
      category: 'اتصالات',
      delay: 0.2
    },
    { 
      name: 'المراعي', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%2314b8a6\' text-anchor=\'middle\' font-weight=\'bold\'%3EAlmarai%3C/text%3E%3C/svg%3E',
      category: 'غذاء',
      delay: 0.2
    },
    { 
      name: 'جرير', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%23a855f7\' text-anchor=\'middle\' font-weight=\'bold\'%3EJarir%3C/text%3E%3C/svg%3E',
      category: 'تجزئة',
      delay: 0.2
    },
    { 
      name: 'سامبا', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'16\' fill=\'%2306b6d4\' text-anchor=\'middle\' font-weight=\'bold\'%3ESamba%3C/text%3E%3C/svg%3E',
      category: 'بنوك',
      delay: 0.2
    },
    { 
      name: 'عبداللطيف جميل', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'12\' fill=\'%236b7280\' text-anchor=\'middle\' font-weight=\'bold\'%3ELatif%3C/text%3E%3C/svg%3E',
      category: 'سيارات',
      delay: 0.2
    },
    { 
      name: 'الكهرباء', 
      logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\' viewBox=\'0 0 120 60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%23f1f5f9\' rx=\'12\'/%3E%3Ctext x=\'60\' y=\'35\' font-family=\'Arial\' font-size=\'12\' fill=\'%23f97316\' text-anchor=\'middle\' font-weight=\'bold\'%3ESEC%3C/text%3E%3C/svg%3E',
      category: 'طاقة',
      delay: 0.2
    }
  ];
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);


  // Triple the array for seamless infinite scroll
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            شركاء النجاح
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            أكثر من 350 شركة رائدة تثق في دال إن
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            نفتخر بشراكاتنا مع كبرى الشركات في مختلف القطاعات لتوفير أفضل فرص التدريب للطلاب
          </p>
        </div>

        {/* Main Scrolling Carousel */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
          
          {/* Carousel Container */}
          <div className="overflow-hidden py-8">
            <div className="flex animate-scroll">
              {scrollingPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="flex-shrink-0 mx-3 group step-card"
                  style={{ transitionDelay: `${partner.delay}s` }}

                >
                  <div className="w-36 h-36 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    {/* Company Logo */}
                    <div className="w-20 h-20 mb-2 flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    
                    {/* Company Name & Category */}
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-slate-800 mb-0.5">{partner.name}</h4>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {partner.category}
                      </span>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/0 via-transparent to-transparent group-hover:from-indigo-500/5 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md">
            جميع القطاعات
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm border border-slate-200">
            بنوك وتمويل
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm border border-slate-200">
            اتصالات وتقنية
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm border border-slate-200">
            طاقة وصناعة
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm border border-slate-200">
            خدمات وتجزئة
          </button>
        </div>

        {/* Stats Counter */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-indigo-600">+350</div>
            <div className="text-sm text-slate-600">شركة شريكة</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-indigo-600">+15</div>
            <div className="text-sm text-slate-600">قطاع مختلف</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-indigo-600">+5000</div>
            <div className="text-sm text-slate-600">فرصة تدريب</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-indigo-600">98%</div>
            <div className="text-sm text-slate-600">رضا الشركاء</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;