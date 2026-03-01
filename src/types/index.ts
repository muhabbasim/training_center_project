// User Roles
export type UserRole = 'graduate' | 'company';

// Major options for graduates
export type Major = 
  | 'علوم الحاسب' 
  | 'تقنية المعلومات' 
  | 'هندسة البرمجيات'
  | 'الهندسة الكهربائية'
  | 'إدارة الأعمال'
  | 'المحاسبة'
  | 'التسويق'
  | 'الذكاء الاصطناعي'
  | 'نظم المعلومات'
  | 'الأمن السيبراني'
  | 'علم البيانات';

// Training status
export type TrainingStatus = 'pending' | 'assigned' | 'in-progress' | 'completed';

// Base user interface
export interface BaseUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

// Graduate specific fields
export interface Graduate extends BaseUser {
  role: 'graduate';
  name: string;
  phone: string;
  major: Major;
  city: string;
  examCompleted: boolean;
  graduationYear?: number;
  examScore?: number;
  compatibilityScore?: number;
  assignedCompanyId?: string;
  trainingStatus: TrainingStatus;
  selectedCompanyId?: string; // Company selected by graduate
  gpa?: number;
}

// Training field offered by companies
export interface TrainingField {
  field: Major;
  availableSeats: number;
  totalSeats: number;
}

// Company specific fields
export interface Company extends BaseUser {
  role: 'company';
  companyName: string;
  industry: string;
  city: string;
  trainingFields: TrainingField[];
  assignedGraduates: string[]; // Array of graduate IDs
  profileCompleted: boolean; // Track if company has completed profile setup
}

// User type union
export type User = Graduate | Company;

// Exam question structure
export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  category: 'technical' | 'soft-skills' | 'problem-solving' | 'major-specific';
  majorRelevance: Major[]; // Which majors this question is most relevant to
}

// Exam answer
export interface ExamAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

// Exam result
export interface ExamResult {
  graduateId: string;
  answers: ExamAnswer[];
  overallScore: number; // Percentage (0-100)
  compatibilityScore: number; // Compatibility with selected major (0-100)
  completedAt: string;
  categoryScores: {
    technical: number;
    'soft-skills': number;
    'problem-solving': number;
    'major-specific': number;
  };
}

// Assignment record
export interface Assignment {
  graduateId: string;
  companyId: string;
  assignedAt: string;
  matchScore: number; // Overall match score (0-100)
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerGraduate: (data: Omit<Graduate, 'id' | 'role' | 'createdAt' | 'examCompleted' | 'trainingStatus'>) => Promise<boolean>;
  registerCompany: (data: Omit<Company, 'id' | 'role' | 'createdAt' | 'assignedGraduates'>) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Storage schema
export interface StorageSchema {
  users: {
    graduates: Graduate[];
    companies: Company[];
  };
  examResults: Record<string, ExamResult>;
  assignments: Assignment[];
  currentUser: User | null;
}
