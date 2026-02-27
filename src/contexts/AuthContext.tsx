import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Graduate, Company, AuthContextType } from '../types';
import {
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
  findUserByEmail,
  addGraduate,
  addCompany,
  generateId,
  updateGraduate,
  updateCompany,
  getGraduateById,
  getCompanyById,
} from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = findUserByEmail(email);
    
    if (!foundUser) {
      return false;
    }

    if (foundUser.password !== password) {
      return false;
    }

    setUser(foundUser);
    saveCurrentUser(foundUser);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearCurrentUser();
  };

  // Register graduate
  const registerGraduate = async (
    data: Omit<Graduate, 'id' | 'role' | 'createdAt' | 'examCompleted' | 'trainingStatus'>
  ): Promise<boolean> => {
    // Check if email already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      return false;
    }

    const newGraduate: Graduate = {
      ...data,
      id: generateId(),
      role: 'graduate',
      createdAt: new Date().toISOString(),
      examCompleted: false,
      trainingStatus: 'pending',
    };

    addGraduate(newGraduate);
    setUser(newGraduate);
    saveCurrentUser(newGraduate);
    return true;
  };

  // Register company
  const registerCompany = async (
    data: Omit<Company, 'id' | 'role' | 'createdAt' | 'assignedGraduates'>
  ): Promise<boolean> => {
    // Check if email already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      return false;
    }

    const newCompany: Company = {
      ...data,
      id: generateId(),
      role: 'company',
      createdAt: new Date().toISOString(),
      assignedGraduates: [],
      profileCompleted: data.trainingFields && data.trainingFields.length > 0,
    };

    addCompany(newCompany);
    setUser(newCompany);
    saveCurrentUser(newCompany);
    return true;
  };

  // Update user
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    
    if (user.role === 'graduate') {
      updateGraduate(user.id, updatedUser as Partial<Graduate>);
      // Refresh user data from storage to ensure consistency
      const refreshedUser = getGraduateById(user.id);
      if (refreshedUser) {
        setUser(refreshedUser);
        saveCurrentUser(refreshedUser);
      }
    } else if (user.role === 'company') {
      updateCompany(user.id, updatedUser as Partial<Company>);
      // Refresh user data from storage to ensure consistency
      const refreshedUser = getCompanyById(user.id);
      if (refreshedUser) {
        setUser(refreshedUser);
        saveCurrentUser(refreshedUser);
      }
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    registerGraduate,
    registerCompany,
    updateUser,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
