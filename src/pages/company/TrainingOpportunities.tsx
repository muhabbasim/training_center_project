import { Briefcase, GraduationCap, Award, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Company, Graduate } from '../../types';
import { getGraduates } from '../../utils/storage';

export default function TrainingOpportunities() {
  const { user } = useAuth();
  const company = user as Company;

  if (!company) return null;

  // Get all graduates who are assigned to this company
  const allGraduates = getGraduates();
  const assignedGraduates = allGraduates.filter(graduate => 
    graduate.trainingStatus === 'assigned' && 
    graduate.selectedCompanyId === company.id
  );

  return (
    <div className="max-w-6xlx">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">فرص التدريب</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            <span className="font-semibold text-slate-700">المتدربين الحاليين</span>
          </div>
          <div className="text-4xl font-bold gradient-text">{company.assignedGraduates.length}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-green-600" />
            <span className="font-semibold text-slate-700">المقاعد المتاحة</span>
          </div>
          <div className="text-4xl font-bold text-green-600">
            {company.trainingFields.reduce((sum, f) => sum + f.availableSeats, 0)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-slate-700">إجمالي المقاعد</span>
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {company.trainingFields.reduce((sum, f) => sum + f.totalSeats, 0)}
          </div>
        </div>
      </div>

      {/* Current Trainees */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">المتدربين الحاليين</h2>

        {assignedGraduates.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">لا يوجد متدربين حالياً</h3>
            <p className="text-slate-600">سيتم عرض المتدربين المقبولين هنا</p>
          </div>
        ) : (
          <div className="space-y-6">
            {assignedGraduates.map((graduate: Graduate) => (
              <div key={graduate.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                      {graduate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{graduate.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <GraduationCap className="w-4 h-4" />
                          {graduate.major}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {graduate.city}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✅ مقبول
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">{graduate.examScore}%</div>
                    <div className="text-xs text-slate-600">درجة الاختبار</div>
                  </div>
                </div>

                {/* Graduate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{graduate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      التوافق: {graduate.compatibilityScore}% | GPA: {graduate.gpa}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-green-200">
                  <a 
                    href={`mailto:${graduate.email}`}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    إرسال بريد إلكتروني
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
