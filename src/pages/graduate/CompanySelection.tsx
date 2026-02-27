import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate, Company } from '../../types';
import { getCompanies, getExamResultByGraduateId, updateGraduate } from '../../utils/storage';

interface CompanyMatch {
  company: Company;
  matchScore: number;
  breakdown: {
    majorMatch: number;
    examPerformance: number;
    compatibility: number;
    locationBonus: number;
  };
}

export default function CompanySelection() {
  const { user, updateUser } = useAuth();
  const graduate = user as Graduate;
  const navigate = useNavigate();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!graduate) return null;

  const examResult = getExamResultByGraduateId(graduate.id);

  // Calculate match scores for all companies
  const calculateMatches = (): CompanyMatch[] => {
    const allCompanies = getCompanies();
    const matches: CompanyMatch[] = [];

    allCompanies.forEach(company => {
      // Check if company has matching field with available seats
      const matchingField = company.trainingFields.find(
        field => field.field === graduate.major && field.availableSeats > 0
      );

      if (!matchingField || !examResult) return;

      // Calculate match score
      const majorMatch = 100; // Perfect major match
      const examPerformance = examResult.overallScore;
      const compatibility = examResult.compatibilityScore;
      const locationBonus = company.city === graduate.city ? 10 : 0; // 10% bonus for same city

      // Weighted score: 35% major + 25% exam + 25% compatibility + 15% location
      const matchScore = Math.min(
        100,
        Math.round(
          (majorMatch * 0.35) +
          (examPerformance * 0.25) +
          (compatibility * 0.25) +
          (locationBonus * 1.5) // 15% max from location
        )
      );

      matches.push({
        company,
        matchScore,
        breakdown: {
          majorMatch,
          examPerformance,
          compatibility,
          locationBonus
        }
      });
    });

    // Sort by match score (highest first)
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const matches = calculateMatches();

  const handleSelectCompany = async (companyId: string) => {
    setIsSubmitting(true);
    
    try {
      // Update graduate with selected company
      updateUser({
        selectedCompanyId: companyId,
        trainingStatus: 'pending' // Will be updated when company confirms
      });

      updateGraduate(graduate.id, {
        selectedCompanyId: companyId,
        trainingStatus: 'pending'
      });

      // Navigate to training status
      setTimeout(() => {
        navigate('/dashboard/graduate/training');
      }, 1000);
    } catch (error) {
      console.error('Error selecting company:', error);
      setIsSubmitting(false);
    }
  };

  // Show message if exam not completed
  if (!graduate.examCompleted || !examResult) {
    return (
      <div className="max-w-4xlx">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">اختيار الشركة</h1>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">يجب إكمال الاختبار أولاً</h2>
          <p className="text-slate-600 mb-6">
            لعرض الشركات المتاحة ونسب التوافق، يرجى إكمال الاختبار التقييمي
          </p>
          <Link
            to="/dashboard/graduate/exam"
            className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            ابدأ الاختبار
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xlx">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">الشركات الموصى بها</h1>
        <p className="text-slate-600">
          بناءً على نتائجك في الاختبار، إليك أفضل الشركات المتوافقة مع ملفك الشخصي
        </p>
      </div>

      {/* Exam Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">تم إكمال التقييم بنجاح</h3>
              <p className="text-sm text-slate-600">عدد الشركات المتاحة: {matches.length}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">{examResult.overallScore}%</div>
            <div className="text-sm text-slate-600">درجتك</div>
          </div>
        </div>
      </div>

      {/* Company Matches */}
      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد شركات متاحة حالياً</h3>
          <p className="text-slate-600">سيتم إضافة المزيد من الشركات قريباً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match, index) => {
            const matchingField = match.company.trainingFields.find(f => f.field === graduate.major);
            const isSelected = selectedCompanyId === match.company.id;
            const isSameCity = match.company.city === graduate.city;

            return (
              <div
                key={match.company.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all ${
                  isSelected ? 'border-indigo-500 shadow-xl' : 'border-slate-100 hover:border-indigo-200'
                } ${index === 0 ? 'ring-4 ring-green-100' : ''}`}
              >
                {index === 0 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-t-2xl text-center font-semibold text-sm">
                    ⭐ الأكثر توافقاً معك
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                        {match.company.companyName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                          {match.company.companyName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Briefcase className="w-4 h-4" />
                            {match.company.industry}
                          </span>
                          <span className={`flex items-center gap-1 ${isSameCity ? 'text-green-600 font-semibold' : 'text-slate-600'}`}>
                            <MapPin className="w-4 h-4" />
                            {match.company.city}
                            {isSameCity && ' ✓'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center ml-4">
                      <div className="text-4xl font-bold gradient-text mb-1">{match.matchScore}%</div>
                      <div className="text-xs text-slate-600">نسبة التوافق</div>
                    </div>
                  </div>

                  {/* Match Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{match.breakdown.majorMatch}%</div>
                      <div className="text-xs text-slate-600">تطابق التخصص</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{match.breakdown.examPerformance}%</div>
                      <div className="text-xs text-slate-600">الأداء</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{match.breakdown.compatibility}%</div>
                      <div className="text-xs text-slate-600">التوافق</div>
                    </div>
                    <div className={`rounded-lg p-3 text-center ${isSameCity ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <div className={`text-lg font-bold ${isSameCity ? 'text-green-600' : 'text-slate-800'}`}>
                        {match.breakdown.locationBonus > 0 ? '+' : ''}{match.breakdown.locationBonus}%
                      </div>
                      <div className="text-xs text-slate-600">الموقع</div>
                    </div>
                  </div>

                  {/* Training Details */}
                  <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">التخصص المتاح</div>
                        <div className="font-semibold text-slate-800">{graduate.major}</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-slate-600 mb-1">المقاعد المتاحة</div>
                        <div className="font-semibold text-green-600">{matchingField?.availableSeats} مقعد</div>
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => handleSelectCompany(match.company.id)}
                    disabled={isSubmitting}
                    className="w-full gradient-bg text-white py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'اختيار هذه الشركة'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-slate-800 mb-2">💡 كيف يتم حساب نسبة التوافق؟</h4>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• <strong>35%</strong> تطابق التخصص مع احتياجات الشركة</li>
          <li>• <strong>25%</strong> أداؤك في الاختبار</li>
          <li>• <strong>25%</strong> مدى التوافق مع متطلبات التخصص</li>
          <li>• <strong>15%</strong> المسافة الجغرافية (مكافأة للمدينة نفسها)</li>
        </ul>
      </div>
    </div>
  );
}
