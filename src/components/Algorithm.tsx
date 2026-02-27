import { BarChart3, ShieldCheck, RefreshCw, Check, Cpu } from 'lucide-react';

const Algorithm = () => {
  return (
    <section id="algorithm" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
              خوارزمية متقدمة
            </div>
            <h2 className="text-4xl font-bold mb-6">
              خوارزمية دال إن<br />للتطابق الدقيق
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              تجمع خوارزميتنا بين التعلم الآلي وتحليل البيانات المتقدم لفهم عميق لاحتياجات 
              كل من الطلاب والشركات، مما يضمن تطابقاً دقيقاً يصل إلى 98%.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">تحليل متعدد الأبعاد</h4>
                  <p className="text-slate-400 text-sm">تقييم المهارات التقنية، الشخصية، والأكاديمية بشكل متكامل</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">تحقق ذكي</h4>
                  <p className="text-slate-400 text-sm">التحقق من صحة المعلومات والمطابقات قبل التوصية النهائية</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">تعلم مستمر</h4>
                  <p className="text-slate-400 text-sm">تحسين مستمر للخوارزمية بناءً على نتائج التدريبات السابقة</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-effect rounded-3xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-slate-400">نموذج التحليل</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="relative h-80 flex items-center justify-center">
                <div className="absolute grid grid-cols-3 gap-16 w-full h-full">
                  <div className="flex flex-col justify-around items-center">
                    <div className="neural-node w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center text-xs font-bold">
                      مهارات
                    </div>
                    <div className="neural-node w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center text-xs font-bold">
                      خبرة
                    </div>
                    <div className="neural-node w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center text-xs font-bold">
                      تخصص
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-around items-center">
                    <div className="neural-node w-14 h-14 rounded-full bg-purple-500/80 flex items-center justify-center">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div className="neural-node w-14 h-14 rounded-full bg-purple-500/80 flex items-center justify-center">
                      <Cpu className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center">
                    <div className="neural-node w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                      <Check className="w-8 h-8" />
                    </div>
                    <span className="mt-2 text-xs text-green-400 font-bold">تطابق مثالي</span>
                  </div>
                </div>
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                  <line x1="20%" y1="30%" x2="50%" y2="35%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
                  <line x1="20%" y1="50%" x2="50%" y2="35%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
                  <line x1="20%" y1="70%" x2="50%" y2="65%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
                  <line x1="50%" y1="35%" x2="80%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
                  <line x1="50%" y1="65%" x2="80%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
                </svg>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>دقة التطابق</span>
                  <span>98%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full gradient-bg rounded-full" style={{ width: '98%' }}></div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>سرعة المعالجة</span>
                  <span>2.3s</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Algorithm;