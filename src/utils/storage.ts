import { Graduate, Company, ExamResult, Assignment, User } from '../types';

const STORAGE_KEYS = {
  GRADUATES: 'dalin_graduates',
  COMPANIES: 'dalin_companies',
  EXAM_RESULTS: 'dalin_exam_results',
  ASSIGNMENTS: 'dalin_assignments',
  CURRENT_USER: 'dalin_current_user',
};

// Generic storage helpers
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Graduates
export const getGraduates = (): Graduate[] => {
  return getFromStorage<Graduate[]>(STORAGE_KEYS.GRADUATES, []);
};

export const saveGraduates = (graduates: Graduate[]): void => {
  saveToStorage(STORAGE_KEYS.GRADUATES, graduates);
};

export const addGraduate = (graduate: Graduate): void => {
  const graduates = getGraduates();
  graduates.push(graduate);
  saveGraduates(graduates);
};

export const updateGraduate = (graduateId: string, updates: Partial<Graduate>): void => {
  const graduates = getGraduates();
  const index = graduates.findIndex(g => g.id === graduateId);
  if (index !== -1) {
    graduates[index] = { ...graduates[index], ...updates };
    saveGraduates(graduates);
  }
};

export const getGraduateById = (id: string): Graduate | undefined => {
  const graduates = getGraduates();
  return graduates.find(g => g.id === id);
};

// Companies
export const getCompanies = (): Company[] => {
  return getFromStorage<Company[]>(STORAGE_KEYS.COMPANIES, []);
};

export const saveCompanies = (companies: Company[]): void => {
  saveToStorage(STORAGE_KEYS.COMPANIES, companies);
};

export const addCompany = (company: Company): void => {
  const companies = getCompanies();
  companies.push(company);
  saveCompanies(companies);
};

export const updateCompany = (companyId: string, updates: Partial<Company>): void => {
  const companies = getCompanies();
  const index = companies.findIndex(c => c.id === companyId);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...updates };
    saveCompanies(companies);
  }
};

export const getCompanyById = (id: string): Company | undefined => {
  const companies = getCompanies();
  return companies.find(c => c.id === id);
};

// Exam Results
export const getExamResults = (): Record<string, ExamResult> => {
  return getFromStorage<Record<string, ExamResult>>(STORAGE_KEYS.EXAM_RESULTS, {});
};

export const saveExamResult = (result: ExamResult): void => {
  const results = getExamResults();
  results[result.graduateId] = result;
  saveToStorage(STORAGE_KEYS.EXAM_RESULTS, results);
};

export const getExamResultByGraduateId = (graduateId: string): ExamResult | undefined => {
  const results = getExamResults();
  return results[graduateId];
};

// Assignments
export const getAssignments = (): Assignment[] => {
  return getFromStorage<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, []);
};

export const saveAssignment = (assignment: Assignment): void => {
  const assignments = getAssignments();
  // Check if assignment already exists
  const existingIndex = assignments.findIndex(a => a.graduateId === assignment.graduateId);
  if (existingIndex !== -1) {
    assignments[existingIndex] = assignment;
  } else {
    assignments.push(assignment);
  }
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);
};

export const getAssignmentByGraduateId = (graduateId: string): Assignment | undefined => {
  const assignments = getAssignments();
  return assignments.find(a => a.graduateId === graduateId);
};

export const getAssignmentsByCompanyId = (companyId: string): Assignment[] => {
  const assignments = getAssignments();
  return assignments.filter(a => a.companyId === companyId);
};

// Current User
export const getCurrentUser = (): User | null => {
  return getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
};

export const saveCurrentUser = (user: User | null): void => {
  saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// User lookup (search both graduates and companies)
export const findUserByEmail = (email: string): User | undefined => {
  const graduates = getGraduates();
  const companies = getCompanies();
  
  const graduate = graduates.find(g => g.email === email);
  if (graduate) return graduate;
  
  const company = companies.find(c => c.email === email);
  if (company) return company;
  
  return undefined;
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Clear all data (for testing/reset)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
