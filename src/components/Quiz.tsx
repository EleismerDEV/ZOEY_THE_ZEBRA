import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import type { WeeklyTheme } from '../data/themes';
import { generateWeeklyQuizzes } from '../data/quizData';

interface QuizProps {
  currentWeek: number;
  currentTheme: WeeklyTheme;
  quizType: 'reading' | 'spelling' | 'grammar' | 'math';
  language: 'en' | 'de';
  translations: any;
  onComplete: (scores: any, accuracy: number, totalQuestions: number, correctAnswers: number) => void;
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  questionDe?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  explanationDe?: string;
  type: 'multiple-choice' | 'input' | 'true-false';
}

const Quiz: React.FC<QuizProps> = ({
  currentWeek,
  currentTheme,
  quizType,
  language,
  translations: t,
  onComplete,
  onBack
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    const quizData = generateWeeklyQuizzes(currentWeek, currentTheme);
    setQuestions(quizData[quizType]);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(300);
    setIsTimerActive(true);
  }, [currentWeek, currentTheme, quizType]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsTimerActive(false);
            handleSubmitQuiz();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, showResults]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleSubmitQuiz = () => {
    setIsTimerActive(false);
    setShowResults(true);
    
    let correctCount = 0;
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim()) {
        correctCount++;
      }
    });

    const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    const scores = { [quizType]: accuracy };
    
    onComplete(scores, accuracy, questions.length, correctCount);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowResults(false);
    setTimeLeft(300);
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-theme-primary mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = questions.filter((q, index) => 
      answers[index] && answers[index].toLowerCase().trim() === q.correctAnswer.toString().toLowerCase().trim()
    ).length;
    const accuracy = (correctAnswers / questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="mb-6">
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Quiz Complete! {currentTheme.emoji}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {currentTheme.motivational[language]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl">
                <p className="text-sm opacity-90">Score</p>
                <p className="text-3xl font-bold">{accuracy.toFixed(1)}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl">
                <p className="text-sm opacity-90">Correct Answers</p>
                <p className="text-3xl font-bold">{correctAnswers}/{questions.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-xl">
                <p className="text-sm opacity-90">Time Taken</p>
                <p className="text-3xl font-bold">{formatTime(300 - timeLeft)}</p>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Review Answers</h3>
            {questions.map((question, index) => {
              const userAnswer = answers[index] || '';
              const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim();
              
              return (
                <div key={index} className={`p-4 rounded-xl border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {question.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Your answer:</span> {userAnswer || 'No answer'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                        </p>
                        {question.explanation && (
                          <p className="text-blue-600 dark:text-blue-400 mt-2">
                            💡 {language === 'de' && question.explanationDe ? question.explanationDe : question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-theme-primary text-white rounded-xl font-medium hover:bg-theme-primary/90 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t.backToDashboard}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentTheme.name} - {t[quizType]} Quiz {currentTheme.emoji}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-theme-primary'}`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-theme-primary to-theme-secondary h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {language === 'de' && question.questionDe ? question.questionDe : question.question}
        </h2>

        {question.type === 'multiple-choice' && question.options ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-theme-primary bg-theme-primary/10'
                    : 'border-gray-200 dark:border-gray-600 hover:border-theme-primary/50 bg-white dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-theme-primary bg-theme-primary'
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        ) : question.type === 'true-false' ? (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-theme-primary bg-theme-primary/10'
                    : 'border-gray-200 dark:border-gray-600 hover:border-theme-primary/50 bg-white dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-theme-primary bg-theme-primary'
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {option === 'True' ? '✅ True' : '❌ False'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => handleAnswerSelect(e.target.value)}
            className="w-full p-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-theme-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Type your answer here..."
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentQuestion === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            !selectedAnswer
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-theme-primary text-white hover:bg-theme-primary/90 shadow-lg shadow-theme-primary/30'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;