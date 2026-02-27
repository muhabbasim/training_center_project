import { User, Mail, Phone, GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate } from '../../types';

export default function GraduateProfile() {
  const { user } = useAuth();
  const graduate = user as Graduate;

  if (!graduate) return null;

  return (
    <div className="max-w-4xlx">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">الملف الشخصي</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        {/* Header with Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl">
            {graduate.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">{graduate.name}</h2>
            <p className="text-slate-600">خريج • {graduate.major}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">الاسم الكامل</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{graduate.name}</p>
          </div>

          {/* Email */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">البريد الإلكتروني</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{graduate.email}</p>
          </div>

          {/* Phone */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">رقم الجوال</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{graduate.phone}</p>
          </div>

          {/* Major */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">التخصص</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 mr-13">{graduate.major}</p>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">حالة الحساب</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${graduate.examCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <div>
                <p className="text-sm text-slate-600">الاختبار</p>
                <p className="font-semibold text-slate-800">
                  {graduate.examCompleted ? 'مكتمل' : 'غير مكتمل'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${
                graduate.trainingStatus === 'assigned' ? 'bg-green-500' : 
                graduate.trainingStatus === 'in-progress' ? 'bg-blue-500' : 
                'bg-gray-500'
              }`}></div>
              <div>
                <p className="text-sm text-slate-600">حالة التدريب</p>
                <p className="font-semibold text-slate-800">
                  {graduate.trainingStatus === 'pending' && 'قيد الانتظار'}
                  {graduate.trainingStatus === 'assigned' && 'تم التعيين'}
                  {graduate.trainingStatus === 'in-progress' && 'جاري التدريب'}
                  {graduate.trainingStatus === 'completed' && 'مكتمل'}
                </p>
              </div>
            </div>

            {graduate.examScore !== undefined && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm text-slate-600">درجة الاختبار</p>
                  <p className="font-semibold text-slate-800">{graduate.examScore}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {!graduate.examCompleted && (
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-slate-800 mb-2">الخطوة التالية</h3>
          <p className="text-slate-600 mb-4">قم بإجراء الاختبار لبدء عملية المطابقة مع الشركات</p>
          <a
            href="/dashboard/graduate/exam"
            className="inline-block gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            ابدأ الاختبار
          </a>
        </div>
      )}
    </div>
  );
}
