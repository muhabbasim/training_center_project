import { mockGraduates } from '../data/mockGraduates';
import { mockCompanies } from '../data/mockCompanies';
import { saveGraduates, getGraduates, saveCompanies, getCompanies, saveExamResult } from './storage';
import { ExamResult } from '../types';

/**
 * Initialize mock data if storage is empty
 */
export const initializeMockData = () => {
  // Check if companies already exist
  const existingCompanies = getCompanies();
  if (existingCompanies.length === 0) {
    console.log('Initializing mock companies...');
    saveCompanies(mockCompanies);
  }

  // Check if graduates already exist
  const existingGraduates = getGraduates();
  if (existingGraduates.length === 0) {
    console.log('Initializing mock graduates...');
    saveGraduates(mockGraduates);
    
    // Create exam results for graduates who completed the exam
    mockGraduates.forEach(graduate => {
      if (graduate.examCompleted && graduate.examScore && graduate.compatibilityScore) {
        const examResult: ExamResult = {
          graduateId: graduate.id,
          answers: [], // Mock answers (not displayed anywhere critical)
          overallScore: graduate.examScore,
          compatibilityScore: graduate.compatibilityScore,
          completedAt: new Date().toISOString(),
          categoryScores: {
            technical: Math.round(graduate.examScore * 0.95),
            'soft-skills': Math.round(graduate.examScore * 1.02),
            'problem-solving': Math.round(graduate.examScore * 0.98),
            'major-specific': graduate.compatibilityScore
          }
        };
        saveExamResult(examResult);
      }
    });
    
    console.log('Mock data initialized successfully!');
  }
};
