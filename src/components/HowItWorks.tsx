import { useEffect, useRef } from 'react';
import { ClipboardCheck, BrainCircuit, Handshake, Rocket, Workflow } from 'lucide-react';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: ClipboardCheck,
      title: 'تقييم القدرات',
      description: 'يقوم الطالب بإكمال تقييم شامل يشمل المهارات الأكاديمية والتقنية والشخصية',
      tags: ['مهارات تقنية', 'مهارات اجتماعية'],
      delay: 0,
    },
    {
      icon: BrainCircuit,
      title: 'تحليل دال إن',
      description: 'تقوم الخوارزمية بتحليل البيانات وإنشاء ملف شخصي دقيق للطالب',
      tags: [],
      delay: 0.2,
    },
    {
      icon: Handshake,
      title: 'التطابق الذكي',
      description: 'مطابقة فورية مع الشركات التي تبحث عن المهارات والقدرات المحددة',
      tags: [],
      delay: 0.4,
    },
    {
      icon: Rocket,
      title: 'بدء التدريب',
      description: 'التواصل المباشر مع الشركة وبدء رحلة التدريب التعاوني',
      tags: ['متابعة مستمرة'],
      delay: 0.6,
    },
    {
      icon: Workflow,
      title: 'سوق العمل',
      description: 'عرض النتائج لسوق العمل مما يساهم في توظيف أسرع واكثر مؤائمة',
      tags: ['توظيف'],
      delay: 0.8,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">كيف يعمل النظام</h2>
          <p className="text-xl text-slate-600">رحلة متكاملة من التقييم إلى الاختيار</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="step-card bg-white rounded-2xl p-6 shadow-xl border border-slate-100 card-hover"
                style={{ transitionDelay: `${step.delay}s` }}
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4 mx-auto relative">
                  <step.icon className="text-white w-8 h-8" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-slate-800">{step.title}</h3>
                <p className="text-slate-600 text-center text-sm leading-relaxed">{step.description}</p>
                {step.tags.length > 0 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {step.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs ${
                          i === 0
                            ? 'bg-indigo-100 text-indigo-700'
                            : i === 1
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {step.title === 'تحليل دال إن' && (
                  <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-500 text-center">
                    AI Matching Algorithm
                  </div>
                )}
                {step.title === 'التطابق الذكي' && (
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                      <Handshake className="w-4 h-4" />
                      تطابق مؤكد
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;