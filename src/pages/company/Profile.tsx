import { Building2, Mail, Briefcase, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Company } from '../../types';

export default function CompanyProfile() {
  const { user } = useAuth();
  const company = user as Company;

  if (!company) return null;

  const totalSeats = company.trainingFields.reduce((sum, field) => sum + field.totalSeats, 0);
  const availableSeats = company.trainingFields.reduce((sum, field) => sum + field.availableSeats, 0);
  const assignedCount = company.assignedGraduates.length;

  return (
    <div className="max-w-4xlx">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">بيانات الشركة</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-3xl">
            {company.companyName.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">{company.companyName}</h2>
            <p className="text-slate-600">{company.industry}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">اسم الشركة</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{company.companyName}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">البريد الإلكتروني</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{company.email}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">القطاع</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{company.industry}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">المتدربين الحاليين</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{assignedCount} متدرب</p>
          </div>
        </div>
      </div>

      {/* Training Fields */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">فرص التدريب المتاحة</h3>
        
        <div className="space-y-4">
          {company.trainingFields.map((field, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg mb-2">{field.field}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">
                      المقاعد المتاحة: <span className="font-semibold text-green-600">{field.availableSeats}</span>
                    </span>
                    <span className="text-sm text-slate-600">
                      الإجمالي: <span className="font-semibold">{field.totalSeats}</span>
                    </span>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{field.availableSeats}</div>
                    <div className="text-xs">متاح</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${(field.availableSeats / field.totalSeats) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{totalSeats}</div>
            <p className="text-slate-600">إجمالي المقاعد</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{availableSeats}</div>
            <p className="text-slate-600">المقاعد المتاحة</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{assignedCount}</div>
            <p className="text-slate-600">متدربين حاليين</p>
          </div>
        </div>
      </div>
    </div>
  );
}
