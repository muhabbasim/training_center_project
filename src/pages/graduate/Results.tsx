import { Link, useNavigate } from 'react-router-dom';
import { Award, TrendingUp, Target, CheckCircle, FileText, Clock, Building2, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate } from '../../types';
import { getExamResultByGraduateId, getCompanies } from '../../utils/storage';

export default function Results() {
  const { user } = useAuth();
  const graduate = user as Graduate;
  const navigate = useNavigate();

  if (!graduate) return null;

  const examResult = getExamResultByGraduateId(graduate.id);

  // Show message if exam not completed
  if (!graduate.examCompleted || !examResult) {
    return (
      <div className="max-w-4xlx">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">نتائج الاختبار</h1>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl p-12 text-center">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">لم تكمل الاختبار بعد</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            يجب عليك إكمال الاختبار التقييمي أولاً لعرض النتائج ومعرفة نسبة التوافق مع التخصص.
            الاختبار يتكون من جزئين (20 سؤال) ويستغرق حوالي 15-20 دقيقة.
          </p>
          <Link
            to="/dashboard/graduate/exam"
            className="inline-flex items-center gap-3 gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            <FileText className="w-5 h-5" />
            ابدأ الاختبار الآن
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">20 سؤال</h3>
            <p className="text-sm text-slate-600">جزئين من 10 أسئلة لكل جزء</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">تقييم شامل</h3>
            <p className="text-sm text-slate-600">مهارات تقنية وشخصية وتخصصية</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">مطابقة ذكية</h3>
            <p className="text-sm text-slate-600">مطابقة تلقائية مع أفضل الشركات</p>
          </div>
        </div>
      </div>
    );
  }

  const categoryNames = {
    'technical': 'المهارات التقنية',
    'soft-skills': 'المهارات الشخصية',
    'problem-solving': 'حل المشكلات',
    'major-specific': 'المهارات التخصصية'
  };

  // Get available companies for this graduate's major
  const allCompanies = getCompanies();
  const matchingCompanies = allCompanies.filter(company => 
    company.trainingFields.some(field => 
      field.field === graduate.major && field.availableSeats > 0
    )
  ).slice(0, 5); // Show top 5 companies

  return (
    <div className="max-w-4xlx">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">نتائج الاختبار</h1>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">تم إكمال الاختبار بنجاح!</h2>
            <p className="text-slate-600">نقوم الآن بمطابقتك مع أفضل الشركات المناسبة</p>
          </div>
        </div>
      </div>

      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Overall Score */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">الدرجة الإجمالية</h3>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold gradient-text mb-2">{examResult.overallScore}%</div>
            <p className="text-slate-600">من 100%</p>
          </div>
          <div className="mt-6 w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full gradient-bg rounded-full transition-all duration-1000"
              style={{ width: `${examResult.overallScore}%` }}
            ></div>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">التوافق مع التخصص</h3>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {examResult.compatibilityScore}%
            </div>
            <p className="text-slate-600">{graduate.major}</p>
          </div>
          <div className="mt-6 w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${examResult.compatibilityScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">التفصيل حسب الفئة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(examResult.categoryScores).map(([category, score]) => (
            <div key={category} className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-800">
                  {categoryNames[category as keyof typeof categoryNames]}
                </span>
                <span className="text-2xl font-bold gradient-text">{score}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full gradient-bg rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">التوصية</h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          بناءً على نتائجك المتميزة في الاختبار ونسبة التوافق العالية مع تخصص {graduate.major}، 
          نقوم الآن بمطابقتك مع أفضل الشركات التي تناسب مهاراتك واهتماماتك. يمكنك متابعة حالة التعيين 
          من صفحة حالة التدريب.
        </p>
        <button
          onClick={() => navigate('/dashboard/graduate/training')}
          className="gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          عرض حالة التدريب
        </button>
      </div>

      {/* Available Companies */}
      {matchingCompanies.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">الشركات المتاحة لتخصصك</h3>
              <p className="text-sm text-slate-600">شركات لديها فرص تدريب في {graduate.major}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchingCompanies.map(company => {
              const matchingField = company.trainingFields.find(f => f.field === graduate.major);
              return (
                <div key={company.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {company.companyName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{company.companyName}</h4>
                        <p className="text-sm text-slate-600">{company.industry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">المقاعد المتاحة</span>
                      <span className="font-semibold text-green-600">{matchingField?.availableSeats} مقعد</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">البريد الإلكتروني</span>
                      <span className="font-medium text-slate-700 text-xs">{company.email}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-600">التخصصات المتاحة:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {company.trainingFields.map((field, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            field.field === graduate.major
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {field.field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-slate-700 text-center">
              <strong>ملاحظة:</strong> سيتم مطابقتك تلقائياً مع أنسب شركة بناءً على نتائجك ومدى التوافق. 
              يمكنك متابعة حالة التعيين من صفحة <Link to="/dashboard/graduate/training" className="text-indigo-600 font-semibold hover:underline">حالة التدريب</Link>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
