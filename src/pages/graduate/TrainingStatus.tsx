import { Building2, Mail, Briefcase, Calendar, Award, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate } from '../../types';
import { getCompanyById, getAssignmentByGraduateId } from '../../utils/storage';

export default function TrainingStatus() {
  const { user } = useAuth();
  const graduate = user as Graduate;

  if (!graduate) return null;

  const assignment = getAssignmentByGraduateId(graduate.id);
  const selectedCompany = graduate.selectedCompanyId ? getCompanyById(graduate.selectedCompanyId) : null;
  const assignedCompany = assignment ? getCompanyById(assignment.companyId) : null;

  return (
    <div className="max-w-4xlx">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">حالة التدريب</h1>

      {/* Status Card */}
      {!graduate.examCompleted && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">يرجى إكمال الاختبار</h2>
              <p className="text-slate-600">
                لاختيار الشركة المناسبة لك، يجب إكمال الاختبار التقييمي أولاً
              </p>
            </div>
          </div>
          <a
            href="/dashboard/graduate/exam"
            className="inline-block gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all mt-4"
          >
            ابدأ الاختبار الآن
          </a>
        </div>
      )}

      {/* Accepted by Company */}
      {graduate.examCompleted && graduate.trainingStatus === 'assigned' && selectedCompany && (
        <>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">مبروك! تم قبولك 🎉</h2>
                <p className="text-slate-600">قبلت الشركة طلبك للتدريب</p>
              </div>
            </div>
          </div>

          {/* Accepted Company Details */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">شركة التدريب</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">اسم الشركة</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.companyName}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">القطاع</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.industry}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">المدينة</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.city}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">البريد الإلكتروني</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.email}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-center mb-2">
                  ✅ تم قبولك بنجاح في برنامج التدريب
                </p>
                <p className="text-slate-600 text-sm text-center">
                  سيتم التواصل معك قريباً من قبل الشركة لتحديد تفاصيل التدريب
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Selected Company - Pending Approval */}
      {graduate.examCompleted && graduate.trainingStatus === 'pending' && selectedCompany && !assignedCompany && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">في انتظار الموافقة</h2>
                <p className="text-slate-600">تم إرسال طلبك إلى الشركة وبانتظار الرد</p>
              </div>
            </div>
          </div>

          {/* Selected Company Details */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">الشركة المختارة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">اسم الشركة</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.companyName}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">القطاع</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.industry}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">المدينة</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.city}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">البريد الإلكتروني</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{selectedCompany.email}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-600 text-center">
                سيتم التواصل معك من قبل الشركة خلال الأيام القادمة
              </p>
            </div>
          </div>
        </>
      )}

      {/* No Company Selected */}
      {graduate.examCompleted && !selectedCompany && !assignedCompany && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">جاهز لاختيار الشركة</h2>
              <p className="text-slate-600">
                لقد أكملت الاختبار بنجاح! يمكنك الآن اختيار الشركة المناسبة من القائمة
              </p>
            </div>
          </div>
          <a
            href="/dashboard/graduate/companies"
            className="inline-block gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all mt-4"
          >
            عرض الشركات المتاحة
          </a>
        </div>
      )}

      {/* Assigned Company */}
      {assignedCompany && assignment && (
        <>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">تم التعيين!</h2>
                <p className="text-slate-600">تمت مطابقتك بنجاح مع شركة مناسبة</p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">معلومات الشركة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">اسم الشركة</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{assignedCompany.companyName}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">القطاع</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{assignedCompany.industry}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">البريد الإلكتروني</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">{assignedCompany.email}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">تاريخ التعيين</span>
                </div>
                <p className="text-lg font-semibold text-slate-800 mr-13">
                  {new Date(assignment.assignedAt).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">نسبة التطابق</h3>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-bold gradient-text mb-2">{assignment.matchScore}%</div>
              <p className="text-slate-600">نسبة التوافق مع الشركة</p>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full gradient-bg rounded-full transition-all duration-1000"
                style={{ width: `${assignment.matchScore}%` }}
              ></div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-600 text-center">
                تم اختيار هذه الشركة بناءً على تطابق مهاراتك وتخصصك مع متطلبات التدريب المتاحة
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
