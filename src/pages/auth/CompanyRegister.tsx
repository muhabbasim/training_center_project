import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, Building2, Mail, Lock, Briefcase, AlertCircle, CheckCircle, Plus, X, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Major, TrainingField } from '../../types';
import { saudiCities } from '../../data/cities';

const availableMajors: Major[] = [
  'علوم الحاسب',
  'تقنية المعلومات',
  'هندسة البرمجيات',
  'الهندسة الكهربائية',
  'إدارة الأعمال',
  'المحاسبة',
  'التسويق',
  'الذكاء الاصطناعي'
];

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    city: ''
  });
  const [trainingFields, setTrainingFields] = useState<TrainingField[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major | ''>('');
  const [seats, setSeats] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { registerCompany } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addTrainingField = () => {
    if (!selectedMajor || !seats || parseInt(seats) <= 0) {
      setError('يرجى اختيار التخصص وعدد المقاعد');
      return;
    }

    // Check if major already exists
    if (trainingFields.some(field => field.field === selectedMajor)) {
      setError('التخصص مضاف بالفعل');
      return;
    }

    const seatCount = parseInt(seats);
    setTrainingFields([
      ...trainingFields,
      {
        field: selectedMajor as Major,
        availableSeats: seatCount,
        totalSeats: seatCount
      }
    ]);
    setSelectedMajor('');
    setSeats('');
    setError('');
  };

  const removeTrainingField = (index: number) => {
    setTrainingFields(trainingFields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setIsLoading(false);
      return;
    }

    if (!formData.city) {
      setError('يرجى اختيار المدينة');
      setIsLoading(false);
      return;
    }

    // Training fields are now optional - can be added later
    // if (trainingFields.length === 0) {
    //   setError('يرجى إضافة تخصص واحد على الأقل');
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const success = await registerCompany({
        ...registrationData,
        trainingFields,
        profileCompleted: false
      });
      
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard/company/profile');
        }, 1500);
      } else {
        setError('البريد الإلكتروني مسجل مسبقاً');
      }
    } catch (err) {
      setError('حدث خطأ أثناء التسجيل');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <Network className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold gradient-text">دال إن</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-4">تسجيل شركة جديدة</h1>
          <p className="text-slate-600 mt-2">انضم إلى منصة التدريب التعاوني</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-600">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">تم التسجيل بنجاح! جاري التحويل...</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                اسم الشركة
              </label>
              <div className="relative">
                <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="شركة التقنية المتقدمة"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                القطاع
              </label>
              <div className="relative">
                <Briefcase className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="تقنية المعلومات"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                المدينة
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">اختر المدينة</option>
                  {saudiCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="company@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Training Fields */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">فرص التدريب المتاحة (اختياري)</h3>
              <p className="text-sm text-slate-600 mb-4">يمكنك إضافة فرص التدريب لاحقاً من لوحة التحكم</p>
              
              {/* Add Training Field */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="md:col-span-1">
                  <select
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value as Major)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">اختر التخصص</option>
                    {availableMajors.map((major) => (
                      <option key={major} value={major}>
                        {major}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 md:col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    placeholder="المقاعد"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={addTrainingField}
                    className="px-4 py-3 gradient-bg text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Training Fields List */}
              {trainingFields.length > 0 && (
                <div className="space-y-2">
                  {trainingFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {field.totalSeats}
                        </div>
                        <span className="font-medium text-slate-700">{field.field}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTrainingField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full gradient-bg text-white py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'جاري التسجيل...' : success ? 'تم التسجيل!' : 'إنشاء حساب'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-600 text-sm">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-slate-600 hover:text-indigo-600 transition-colors">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
