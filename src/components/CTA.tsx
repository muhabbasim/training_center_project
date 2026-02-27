import { UserPlus, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="contact" className="py-24 gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '30px 30px' 
          }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ابدأ رحلتك الآن</h2>
        <p className="text-xl text-white/90 mb-10">
          انضم إلى آلاف الطلاب والشركات الذين يستخدمون دال إن لتحقيق أفضل تجربة تدريب
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register/graduate" className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5" />
            إنشاء حساب طالب
          </Link>
          <Link to="/register/company" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Briefcase className="w-5 h-5" />
            تسجيل شركة
          </Link>
        </div>
        
        <p className="mt-8 text-white/70 text-sm">
          مجاني تماماً للطلاب • اشتراكات مرنة للشركات
        </p>
      </div>
    </section>
  );
};

export default CTA;