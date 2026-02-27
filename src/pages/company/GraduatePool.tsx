import { useState } from 'react';
import { Users, Search, Filter, GraduationCap, MapPin, Mail, CheckCircle, Check, X, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Company, Major, Graduate } from '../../types';
import { getGraduates, getExamResultByGraduateId, updateGraduate, updateCompany } from '../../utils/storage';
import { saudiCities } from '../../data/cities';

interface GraduateMatch {
  graduate: Graduate;
  matchScore: number;
  breakdown: {
    majorMatch: number;
    examPerformance: number;
    compatibility: number;
    locationBonus: number;
  };
}

export default function GraduatePool() {
  const { user, updateUser } = useAuth();
  const company = user as Company;
  const [activeTab, setActiveTab] = useState<'interested' | 'all'>('interested');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<Major | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [processingGraduateId, setProcessingGraduateId] = useState<string | null>(null);

  if (!company) return null;

  // Calculate match scores for all graduates
  const calculateMatches = (): GraduateMatch[] => {
    const allGraduates = getGraduates().filter(g => g.examCompleted);
    const matches: GraduateMatch[] = [];

    allGraduates.forEach(graduate => {
      // Check if company has matching field with available seats
      const matchingField = company.trainingFields.find(
        field => field.field === graduate.major && field.availableSeats > 0
      );

      if (!matchingField) return;

      const examResult = getExamResultByGraduateId(graduate.id);
      if (!examResult) return;

      // Calculate match score
      const majorMatch = 100; // Perfect major match
      const examPerformance = examResult.overallScore;
      const compatibility = examResult.compatibilityScore;
      const locationBonus = company.city === graduate.city ? 10 : 0;

      // Weighted score: 35% major + 25% exam + 25% compatibility + 15% location
      const matchScore = Math.min(
        100,
        Math.round(
          (majorMatch * 0.35) +
          (examPerformance * 0.25) +
          (compatibility * 0.25) +
          (locationBonus * 1.5)
        )
      );

      matches.push({
        graduate,
        matchScore,
        breakdown: {
          majorMatch,
          examPerformance,
          compatibility,
          locationBonus
        }
      });
    });

    return matches;
  };

  const allMatches = calculateMatches();

  // Filter by tab selection
  let filteredMatches = activeTab === 'interested'
    ? allMatches.filter(m => m.graduate.selectedCompanyId === company.id)
    : allMatches;

  // Apply filters
  filteredMatches = filteredMatches.filter(match => {
    const { graduate } = match;

    // Search filter
    if (searchTerm && !graduate.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Major filter
    if (selectedMajor !== 'all' && graduate.major !== selectedMajor) {
      return false;
    }

    // City filter
    if (selectedCity !== 'all' && graduate.city !== selectedCity) {
      return false;
    }

    // Match score filter
    if (match.matchScore < minMatchScore) {
      return false;
    }

    return true;
  });

  // Sort by match score (highest first)
  const sortedMatches = [...filteredMatches].sort((a, b) => b.matchScore - a.matchScore);

  const interestedCount = allMatches.filter(m => m.graduate.selectedCompanyId === company.id).length;

  // Handle accepting a graduate who selected the company
  const handleAcceptGraduate = async (graduateId: string) => {
    setProcessingGraduateId(graduateId);
    
    try {
      // Update graduate status to assigned
      updateGraduate(graduateId, {
        trainingStatus: 'assigned'
      });

      // Add graduate to company's assigned list
      const updatedAssignedGraduates = [...(company.assignedGraduates || []), graduateId];
      updateCompany(company.id, {
        assignedGraduates: updatedAssignedGraduates
      });
      
      updateUser({
        assignedGraduates: updatedAssignedGraduates
      });

      // Decrease available seats for the matching field
      const graduate = getGraduates().find(g => g.id === graduateId);
      if (graduate) {
        const updatedFields = company.trainingFields.map(field => {
          if (field.field === graduate.major && field.availableSeats > 0) {
            return { ...field, availableSeats: field.availableSeats - 1 };
          }
          return field;
        });
        
        updateCompany(company.id, { trainingFields: updatedFields });
        updateUser({ trainingFields: updatedFields });
      }

      alert('✅ تم قبول الخريج بنجاح!');
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error accepting graduate:', error);
      alert('حدث خطأ أثناء قبول الخريج');
    } finally {
      setProcessingGraduateId(null);
    }
  };

  // Handle rejecting a graduate who selected the company
  const handleRejectGraduate = async (graduateId: string) => {
    if (!confirm('هل أنت متأكد من رفض هذا الخريج؟')) return;
    
    setProcessingGraduateId(graduateId);
    
    try {
      // Clear the graduate's selection
      updateGraduate(graduateId, {
        selectedCompanyId: undefined,
        trainingStatus: 'pending'
      });

      alert('تم رفض الطلب');
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error rejecting graduate:', error);
      alert('حدث خطأ أثناء رفض الطلب');
    } finally {
      setProcessingGraduateId(null);
    }
  };

  // Handle sending request to a graduate in the general pool
  const handleSendRequest = async (graduateId: string) => {
    setProcessingGraduateId(graduateId);
    
    try {
      // For now, we'll just mark that company is interested
      // In a full implementation, this would create a "request" record
      alert(`✉️ تم إرسال طلب تدريب للخريج!\n\nسيتم إشعار الخريج بطلبكم. يمكنه قبول أو رفض الطلب.`);
      
      // TODO: In future, implement a requests system where:
      // 1. Create a request record
      // 2. Notify graduate
      // 3. Graduate can accept/reject
    } catch (error) {
      console.error('Error sending request:', error);
      alert('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setProcessingGraduateId(null);
    }
  };

  return (
    <div className="max-w-6xlx">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">مجموعة المواهب</h1>
        <p className="text-slate-600">الخريجين المؤهلين للانضمام إلى فريقك</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 mb-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('interested')}
            className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
              activeTab === 'interested'
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>المهتمين بشركتك</span>
              {interestedCount > 0 && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {interestedCount}
                </span>
              )}
            </div>
            {activeTab === 'interested' && (
              <div className="absolute bottom-0 right-0 left-0 h-1 gradient-bg rounded-t"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
              activeTab === 'all'
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>جميع الخريجين المتوافقين</span>
              <span className="bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {allMatches.length}
              </span>
            </div>
            {activeTab === 'all' && (
              <div className="absolute bottom-0 right-0 left-0 h-1 gradient-bg rounded-t"></div>
            )}
          </button>
        </div>

        {/* Tab Description */}
        <div className="px-6 py-4 bg-slate-50 rounded-b-2xl">
          <p className="text-sm text-slate-600">
            {activeTab === 'interested' 
              ? '✨ هؤلاء الخريجون اختاروا شركتك كخيارهم الأول للتدريب'
              : '📊 جميع الخريجين المتوافقين مع تخصصات التدريب المتوفرة لديكم'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">البحث والتصفية</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">البحث بالاسم</label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-11 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="ابحث عن خريج..."
              />
            </div>
          </div>

          {/* Major Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">التخصص</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value as Major | 'all')}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">جميع التخصصات</option>
              {company.trainingFields.map(field => (
                <option key={field.field} value={field.field}>{field.field}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">المدينة</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">جميع المدن</option>
              {saudiCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Match Score Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              الحد الأدنى للتوافق: {minMatchScore}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minMatchScore}
              onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600">
          عرض <span className="font-semibold text-indigo-600">{sortedMatches.length}</span> خريج
        </p>
      </div>

      {/* Graduates List */}
      <div className="space-y-4">
        {sortedMatches.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
            <p className="text-slate-600">
              {activeTab === 'interested'
                ? 'لا يوجد خريجين مهتمين حالياً. جرب تبويب "جميع الخريجين المتوافقين"'
                : 'جرب تعديل معايير البحث'
              }
            </p>
          </div>
        ) : (
          sortedMatches.map((match, index) => {
            const { graduate, matchScore, breakdown } = match;
            const isInterested = graduate.selectedCompanyId === company.id;
            const isSameCity = graduate.city === company.city;

            return (
              <div 
                key={graduate.id} 
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all card-hover ${
                  isInterested ? 'border-green-300 ring-2 ring-green-100' : 'border-slate-100'
                } ${index === 0 ? 'ring-4 ring-indigo-100' : ''}`}
              >
                {index === 0 && (
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-t-2xl text-center font-semibold text-sm">
                    ⭐ الأكثر توافقاً
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {graduate.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-800">{graduate.name}</h3>
                          {isInterested && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              مهتم
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <GraduationCap className="w-4 h-4" />
                            {graduate.major}
                          </span>
                          <span className={`flex items-center gap-1 ${isSameCity ? 'text-green-600 font-semibold' : 'text-slate-600'}`}>
                            <MapPin className="w-4 h-4" />
                            {graduate.city}
                            {isSameCity && ' ✓'}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {graduate.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center ml-4">
                      <div className="text-4xl font-bold gradient-text mb-1">{matchScore}%</div>
                      <div className="text-xs text-slate-600">نسبة التوافق</div>
                    </div>
                  </div>

                  {/* Match Breakdown */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{breakdown.majorMatch}%</div>
                      <div className="text-xs text-slate-600">التخصص</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{breakdown.examPerformance}%</div>
                      <div className="text-xs text-slate-600">الأداء</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800">{breakdown.compatibility}%</div>
                      <div className="text-xs text-slate-600">التوافق</div>
                    </div>
                    <div className={`rounded-lg p-3 text-center ${isSameCity ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <div className={`text-lg font-bold ${isSameCity ? 'text-green-600' : 'text-slate-800'}`}>
                        {breakdown.locationBonus > 0 ? '+' : ''}{breakdown.locationBonus}%
                      </div>
                      <div className="text-xs text-slate-600">الموقع</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isInterested ? (
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 text-center mb-4">
                        ✅ هذا الخريج مهتم بالانضمام إلى شركتك
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAcceptGraduate(graduate.id)}
                          disabled={processingGraduateId === graduate.id || graduate.trainingStatus === 'assigned'}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                        >
                          <Check className="w-5 h-5" />
                          {graduate.trainingStatus === 'assigned' ? 'تم القبول' : 'قبول'}
                        </button>
                        <button
                          onClick={() => handleRejectGraduate(graduate.id)}
                          disabled={processingGraduateId === graduate.id || graduate.trainingStatus === 'assigned'}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                        >
                          <X className="w-5 h-5" />
                          رفض
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => handleSendRequest(graduate.id)}
                        disabled={processingGraduateId === graduate.id}
                        className="w-full flex items-center justify-center gap-2 gradient-bg hover:shadow-lg text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                        إرسال طلب تدريب
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
