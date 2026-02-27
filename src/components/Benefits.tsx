import { GraduationCap, Building2, Check } from 'lucide-react';

const Benefits = () => {
  const studentBenefits = [
    'توصيات مخصصة بناءً على مهاراتك واهتماماتك',
    'توفير الوقت في البحث عن فرص التدريب المناسبة',
    'تقرير تحليلي مفصل لنقاط القوة والتطوير',
    'ضمان جودة الشركات من خلال نظام التقييم',
  ];

  const companyBenefits = [
    'وصول سريع لأفضل الكفاءات المتاحة',
    'تصفية ذكية حسب المتطلبات المحددة',
    'توفير 70% من وقت عملية الاختيار',
    'ضمان توافق المتدرب مع ثقافة الشركة',
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">لماذا دال إن؟</h2>
          <p className="text-xl text-slate-600">حلول مبتكرة للطلاب والشركات على حد سواء</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 card-hover">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">للطلاب</h3>
            </div>
            
            <ul className="space-y-4">
              {studentBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 card-hover">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Building2 className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">للشركات</h3>
            </div>
            
            <ul className="space-y-4">
              {companyBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-slate-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;