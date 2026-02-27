import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Graduate, ExamAnswer, ExamResult } from '../../types';
import { examQuestions } from '../../data/examQuestions';
import { saveExamResult, updateGraduate } from '../../utils/storage';

export default function Exam() {
  const { user, updateUser } = useAuth();
  const graduate = user as Graduate;
  const navigate = useNavigate();

  const [currentPart, setCurrentPart] = useState<1 | 2>(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [part1Completed, setPart1Completed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if exam already completed
  useEffect(() => {
    if (graduate?.examCompleted) {
      navigate('/dashboard/graduate/companies');
    }
  }, [graduate, navigate]);

  if (!graduate) return null;

  const part1Questions = examQuestions.slice(0, 10);
  const part2Questions = examQuestions.slice(10, 20);
  const currentQuestions = currentPart === 1 ? part1Questions : part2Questions;

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const calculateResults = (): ExamResult => {
    const examAnswers: ExamAnswer[] = examQuestions.map(q => ({
      questionId: q.id,
      selectedAnswer: answers[q.id] ?? -1,
      isCorrect: answers[q.id] === q.correctAnswer
    }));

    // Calculate overall score
    const correctAnswers = examAnswers.filter(a => a.isCorrect).length;
    const overallScore = Math.round((correctAnswers / examQuestions.length) * 100);

    // Calculate category scores
    const categoryScores = {
      technical: 0,
      'soft-skills': 0,
      'problem-solving': 0,
      'major-specific': 0
    };

    examQuestions.forEach((q, index) => {
      if (examAnswers[index].isCorrect) {
        categoryScores[q.category]++;
      }
    });

    // Convert to percentages
    Object.keys(categoryScores).forEach(category => {
      const totalInCategory = examQuestions.filter(q => q.category === category).length;
      categoryScores[category as keyof typeof categoryScores] = 
        Math.round((categoryScores[category as keyof typeof categoryScores] / totalInCategory) * 100);
    });

    // Calculate major compatibility
    const majorRelevantQuestions = examQuestions.filter(q => 
      q.majorRelevance.includes(graduate.major)
    );
    const majorCorrectAnswers = majorRelevantQuestions.filter(q => 
      answers[q.id] === q.correctAnswer
    ).length;
    const compatibilityScore = majorRelevantQuestions.length > 0
      ? Math.round((majorCorrectAnswers / majorRelevantQuestions.length) * 100)
      : overallScore;

    return {
      graduateId: graduate.id,
      answers: examAnswers,
      overallScore,
      compatibilityScore,
      completedAt: new Date().toISOString(),
      categoryScores
    };
  };

  const handlePart1Submit = () => {
    // Check if all part 1 questions are answered
    const unansweredCount = part1Questions.filter(q => answers[q.id] === undefined).length;
    
    if (unansweredCount > 0) {
      setError(`يرجى الإجابة على جميع الأسئلة (${unansweredCount} سؤال لم تتم الإجابة عليه)`);
      return;
    }

    setPart1Completed(true);
    setCurrentPart(2);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    // Check if all part 2 questions are answered
    const unansweredCount = part2Questions.filter(q => answers[q.id] === undefined).length;
    
    if (unansweredCount > 0) {
      setError(`يرجى الإجابة على جميع الأسئلة (${unansweredCount} سؤال لم تتم الإجابة عليه)`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Calculate results
      const results = calculateResults();
      
      // Save exam results
      saveExamResult(results);

      // Update graduate record in context and localStorage
      const updatedData = {
        examCompleted: true,
        examScore: results.overallScore,
        compatibilityScore: results.compatibilityScore,
        trainingStatus: 'pending' as const // Set to pending, waiting for company selection
      };
      
      updateUser(updatedData);
      updateGraduate(graduate.id, updatedData);

      // Redirect to company selection page
      setTimeout(() => {
        navigate('/dashboard/graduate/companies');
      }, 1000);
    } catch (err) {
      setError('حدث خطأ أثناء حفظ النتائج');
      setIsSubmitting(false);
    }
  };

  const answeredCount = currentQuestions.filter(q => answers[q.id] !== undefined).length;
  const progress = (answeredCount / currentQuestions.length) * 100;

  return (
    <div className="max-w-4xlx">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">الاختبار التقييمي</h1>
        <p className="text-slate-600">أجب على جميع الأسئلة لتقييم مهاراتك وإيجاد أفضل فرصة تدريب</p>
      </div>

      {/* Part Indicator - Sticky */}
      <div className="sticky top-0 z-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">الجزء {currentPart} من 2</h3>
              <p className="text-sm text-slate-600">
                {currentPart === 1 ? 'الأسئلة 1-10' : 'الأسئلة 11-20'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-indigo-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">{answeredCount}/{currentQuestions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full gradient-bg transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Part 1 Completed Notice */}
      {part1Completed && currentPart === 2 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-600">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">تم إكمال الجزء الأول بنجاح! أكمل الجزء الثاني الآن</span>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {question.id}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">{question.text}</h3>
            </div>

            <div className="space-y-3 mr-14">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        {currentPart === 1 ? (
          <button
            onClick={handlePart1Submit}
            disabled={answeredCount < currentQuestions.length}
            className="px-8 py-4 gradient-bg text-white rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إكمال الجزء الأول والانتقال للجزء الثاني
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            disabled={answeredCount < currentQuestions.length || isSubmitting}
            className="px-8 py-4 gradient-bg text-white rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'جاري الحفظ...' : 'إنهاء الاختبار'}
          </button>
        )}
      </div>
    </div>
  );
}
