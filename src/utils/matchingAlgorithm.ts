import { Graduate, Company, Assignment, ExamResult } from '../types';
import { 
  getGraduates, 
  getCompanies, 
  getExamResultByGraduateId,
  saveAssignment,
  updateGraduate,
  updateCompany
} from './storage';

interface MatchScore {
  graduateId: string;
  companyId: string;
  score: number;
  breakdown: {
    majorMatch: number;
    examPerformance: number;
    compatibility: number;
  };
}

/**
 * Calculate match score between a graduate and a company
 * Weights: Major Match (40%), Exam Performance (30%), Compatibility (30%)
 */
const calculateMatchScore = (
  graduate: Graduate,
  company: Company,
  examResult: ExamResult
): MatchScore | null => {
  // Check if company has training field matching graduate's major
  const matchingField = company.trainingFields.find(
    field => field.field === graduate.major && field.availableSeats > 0
  );

  if (!matchingField) {
    return null; // No available seats for this major
  }

  // Major Match Score (40% weight) - 100 if exact match, 0 otherwise
  const majorMatchScore = 100;

  // Exam Performance Score (30% weight) - Based on overall exam score
  const examPerformanceScore = examResult.overallScore;

  // Compatibility Score (30% weight) - Based on major compatibility
  const compatibilityScore = examResult.compatibilityScore;

  // Calculate weighted total score
  const totalScore = 
    (majorMatchScore * 0.4) +
    (examPerformanceScore * 0.3) +
    (compatibilityScore * 0.3);

  return {
    graduateId: graduate.id,
    companyId: company.id,
    score: Math.round(totalScore),
    breakdown: {
      majorMatch: majorMatchScore,
      examPerformance: examPerformanceScore,
      compatibility: compatibilityScore
    }
  };
};

/**
 * Find best company match for a graduate
 */
export const findBestMatch = (graduateId: string): Assignment | null => {
  const graduate = getGraduates().find(g => g.id === graduateId);
  if (!graduate || !graduate.examCompleted) {
    return null;
  }

  const examResult = getExamResultByGraduateId(graduateId);
  if (!examResult) {
    return null;
  }

  const companies = getCompanies();
  const matchScores: MatchScore[] = [];

  // Calculate match scores for all companies
  for (const company of companies) {
    const score = calculateMatchScore(graduate, company, examResult);
    if (score) {
      matchScores.push(score);
    }
  }

  if (matchScores.length === 0) {
    return null; // No suitable matches found
  }

  // Sort by score (highest first)
  matchScores.sort((a, b) => b.score - a.score);
  const bestMatch = matchScores[0];

  // Create assignment
  const assignment: Assignment = {
    graduateId: bestMatch.graduateId,
    companyId: bestMatch.companyId,
    assignedAt: new Date().toISOString(),
    matchScore: bestMatch.score
  };

  return assignment;
};

/**
 * Assign graduate to best matching company and update all records
 */
export const assignGraduateToCompany = (graduateId: string): boolean => {
  const assignment = findBestMatch(graduateId);
  
  if (!assignment) {
    console.warn(`No suitable company found for graduate ${graduateId}`);
    return false;
  }

  // Save assignment
  saveAssignment(assignment);

  // Update graduate status
  updateGraduate(graduateId, {
    assignedCompanyId: assignment.companyId,
    trainingStatus: 'assigned'
  });

  // Update company - decrement available seats and add graduate to assigned list
  const company = getCompanies().find(c => c.id === assignment.companyId);
  if (company) {
    const graduate = getGraduates().find(g => g.id === graduateId);
    if (graduate) {
      // Find the matching training field and decrement seats
      const updatedFields = company.trainingFields.map(field => {
        if (field.field === graduate.major && field.availableSeats > 0) {
          return {
            ...field,
            availableSeats: field.availableSeats - 1
          };
        }
        return field;
      });

      // Add graduate to assigned list
      const updatedAssignedGraduates = [...company.assignedGraduates, graduateId];

      updateCompany(assignment.companyId, {
        trainingFields: updatedFields,
        assignedGraduates: updatedAssignedGraduates
      });
    }
  }

  return true;
};

/**
 * Batch process all unassigned graduates who have completed exams
 */
export const processAllUnassignedGraduates = (): number => {
  const graduates = getGraduates();
  let assignedCount = 0;

  for (const graduate of graduates) {
    // Only process graduates who completed exam but are not assigned
    if (graduate.examCompleted && graduate.trainingStatus === 'pending') {
      const success = assignGraduateToCompany(graduate.id);
      if (success) {
        assignedCount++;
      }
    }
  }

  return assignedCount;
};

/**
 * Get all potential matches for a graduate (for display purposes)
 */
export const getAllMatches = (graduateId: string): MatchScore[] => {
  const graduate = getGraduates().find(g => g.id === graduateId);
  if (!graduate || !graduate.examCompleted) {
    return [];
  }

  const examResult = getExamResultByGraduateId(graduateId);
  if (!examResult) {
    return [];
  }

  const companies = getCompanies();
  const matchScores: MatchScore[] = [];

  for (const company of companies) {
    const score = calculateMatchScore(graduate, company, examResult);
    if (score) {
      matchScores.push(score);
    }
  }

  // Sort by score (highest first)
  matchScores.sort((a, b) => b.score - a.score);
  return matchScores;
};

/**
 * Check if a graduate can be matched (has completed exam and companies available)
 */
export const canBeMatched = (graduateId: string): boolean => {
  const graduate = getGraduates().find(g => g.id === graduateId);
  if (!graduate || !graduate.examCompleted) {
    return false;
  }

  const examResult = getExamResultByGraduateId(graduateId);
  if (!examResult) {
    return false;
  }

  const companies = getCompanies();
  
  // Check if any company has available seats for this major
  return companies.some(company => 
    company.trainingFields.some(
      field => field.field === graduate.major && field.availableSeats > 0
    )
  );
};
