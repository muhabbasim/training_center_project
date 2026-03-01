import { Company, Major, TrainingField } from '../types';

// Sample company data
const companyTemplates = [
  {
    name: 'شركة التقنية المتقدمة',
    industry: 'تقنية المعلومات',
    email: 'info@tech-advanced.sa',
    majors: ['علوم الحاسب', 'تقنية المعلومات', 'هندسة البرمجيات'] as Major[]
  },
  {
    name: 'مجموعة الابتكار الرقمي',
    industry: 'التحول الرقمي',
    email: 'hr@digital-innovation.sa',
    majors: ['الذكاء الاصطناعي', 'علوم الحاسب', 'هندسة البرمجيات'] as Major[]
  },
  {
    name: 'شركة الحلول الذكية',
    industry: 'حلول البرمجيات',
    email: 'careers@smart-solutions.sa',
    majors: ['هندسة البرمجيات', 'تقنية المعلومات', 'علوم الحاسب'] as Major[]
  },
  {
    name: 'مؤسسة الطاقة والكهرباء',
    industry: 'الطاقة',
    email: 'jobs@power-energy.sa',
    majors: ['الهندسة الكهربائية'] as Major[]
  },
  {
    name: 'شركة الأعمال والاستشارات',
    industry: 'استشارات إدارية',
    email: 'recruitment@business-consult.sa',
    majors: ['إدارة الأعمال', 'المحاسبة', 'التسويق'] as Major[]
  },
  {
    name: 'بنك المستقبل',
    industry: 'الخدمات المصرفية',
    email: 'hr@future-bank.sa',
    majors: ['المحاسبة', 'إدارة الأعمال', 'تقنية المعلومات'] as Major[]
  },
  {
    name: 'شركة التسويق الإلكتروني',
    industry: 'التسويق الرقمي',
    email: 'info@emarketing.sa',
    majors: ['التسويق', 'إدارة الأعمال'] as Major[]
  },
  {
    name: 'معهد الذكاء الاصطناعي',
    industry: 'البحث والتطوير',
    email: 'contact@ai-institute.sa',
    majors: ['الذكاء الاصطناعي', 'علوم الحاسب', 'هندسة البرمجيات'] as Major[]
  },
  {
    name: 'شركة الأنظمة الكهربائية',
    industry: 'الهندسة الكهربائية',
    email: 'hr@electrical-systems.sa',
    majors: ['الهندسة الكهربائية'] as Major[]
  },
  {
    name: 'مركز المحاسبة المالية',
    industry: 'المحاسبة والتدقيق',
    email: 'jobs@finance-center.sa',
    majors: ['المحاسبة', 'إدارة الأعمال'] as Major[]
  },
  {
    name: 'شركة التطوير البرمجي',
    industry: 'تطوير البرمجيات',
    email: 'dev@software-dev.sa',
    majors: ['هندسة البرمجيات', 'علوم الحاسب', 'تقنية المعلومات'] as Major[]
  },
  {
    name: 'مجموعة الاتصالات الذكية',
    industry: 'الاتصالات وتقنية المعلومات',
    email: 'careers@smart-telecom.sa',
    majors: ['تقنية المعلومات', 'علوم الحاسب', 'الهندسة الكهربائية'] as Major[]
  },
];

// Generate mock companies with realistic data
export const generateMockCompanies = (): Company[] => {
  return companyTemplates.map((template, index) => {
    const trainingFields: TrainingField[] = template.majors.map(major => ({
      field: major,
      availableSeats: Math.floor(Math.random() * 5) + 3, // 3-7 available seats
      totalSeats: Math.floor(Math.random() * 5) + 8, // 8-12 total seats
    }));

    // Assign random city from major cities
    const majorCities = ['الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة'];
    const city = majorCities[index % majorCities.length];

    return {
      id: `company-${index + 1}`, // Stable ID for reference
      email: template.email,
      password: 'demo123', // Demo password
      role: 'company',
      companyName: template.name,
      industry: template.industry,
      city,
      trainingFields,
      assignedGraduates: [],
      profileCompleted: true,
      createdAt: new Date().toISOString(),
    };
  });
};

// Export the generated companies
export const mockCompanies = generateMockCompanies();

// Initialize mock companies in storage if needed (deprecated - use initMockData instead)
export const initializeMockCompanies = (): void => {
  const existingCompanies = localStorage.getItem('dalin_companies');
  
  // Only initialize if no companies exist
  if (!existingCompanies || JSON.parse(existingCompanies).length === 0) {
    localStorage.setItem('dalin_companies', JSON.stringify(mockCompanies));
    console.log('✅ Initialized mock companies:', mockCompanies.length);
  }
};
