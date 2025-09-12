import React from 'react';
import { TrendingUp, Target, Award, Calendar, BookOpen, Calculator, Pen, Languages } from 'lucide-react';
import type { UserProgress } from '../App';
import type { WeeklyTheme } from '../data/themes';

interface DashboardProps {
  userProgress: UserProgress[];
  currentWeek: number;
  currentTheme: WeeklyTheme;
  language: 'en' | 'de';
  privateMode: boolean;
  translations: any;
  onStartQuiz: (type: 'reading' | 'spelling' | 'grammar' | 'math') => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userProgress,
  currentWeek,
  currentTheme,
  language,
  privateMode,
  translations: t,
  onStartQuiz
}) => {
  const currentWeekProgress = userProgress.filter(p => p.week === currentWeek);
  const latestProgress = currentWeekProgress[currentWeekProgress.length - 1];
  
  // Calculate overall statistics
  const totalQuestions = userProgress.reduce((sum, p) => sum + p.totalQuestions, 0);
  const totalCorrect = userProgress.reduce((sum, p) => sum + p.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
  
  // Calculate subject averages
  const subjectAverages = userProgress.length > 0 ? {
    reading: userProgress.reduce((sum, p) => sum + p.scores.reading, 0) / userProgress.length,
    spelling: userProgress.reduce((sum, p) => sum + p.scores.spelling, 0) / userProgress.length,
    grammar: userProgress.reduce((sum, p) => sum + p.scores.grammar, 0) / userProgress.length,
    math: userProgress.reduce((sum, p) => sum + p.scores.math, 0) / userProgress.length
  } : { reading: 0, spelling: 0, grammar: 0, math: 0 };

  const quizTypes = [
    { key: 'reading', icon: BookOpen, color: 'bg-blue-500', label: t.reading, emoji: '📚' },
    { key: 'spelling', icon: Pen, color: 'bg-green-500', label: t.spelling, emoji: '✏️' },
    { key: 'grammar', icon: Languages, color: 'bg-purple-500', label: t.grammar, emoji: '📝' },
    { key: 'math', icon: Calculator, color: 'bg-orange-500', label: t.math, emoji: '🔢' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {currentTheme.greeting[language]} {currentTheme.emoji}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {currentTheme.description[language]}
        </p>
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg">
          <Calendar className="w-5 h-5 text-theme-primary" />
          <span className="font-medium text-gray-900 dark:text-white">
            {t.week} {currentWeek} - {currentTheme.name}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      {!privateMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.accuracy}</p>
                <p className="text-3xl font-bold text-theme-primary">{overallAccuracy.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-theme-primary/20 rounded-full">
                <Target className="w-8 h-8 text-theme-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
                <p className="text-3xl font-bold text-theme-secondary">{totalQuestions}</p>
              </div>
              <div className="p-3 bg-theme-secondary/20 rounded-full">
                <TrendingUp className="w-8 h-8 text-theme-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.focusArea}</p>
                <p className="text-xl font-bold text-theme-accent">
                  {latestProgress ? latestProgress.focusArea : 'Start Quiz!'}
                </p>
              </div>
              <div className="p-3 bg-theme-accent/20 rounded-full">
                <Award className="w-8 h-8 text-theme-accent" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subject Progress */}
      {!privateMode && userProgress.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            📊 Subject {t.progress}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quizTypes.map((type) => (
              <div key={type.key} className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{
                        background: `conic-gradient(${type.color} ${subjectAverages[type.key as keyof typeof subjectAverages] * 3.6}deg, #e5e7eb ${subjectAverages[type.key as keyof typeof subjectAverages] * 3.6}deg)`
                      }}
                    >
                      {Math.round(subjectAverages[type.key as keyof typeof subjectAverages])}%
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{type.emoji} {type.label}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Launcher */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          🎯 {t.startQuiz}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => onStartQuiz(type.key as any)}
              className="group p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-theme-primary/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full ${type.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                  <type.icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-theme-primary transition-colors">
                    {type.emoji} {type.label}
                  </h4>
                  {!privateMode && subjectAverages[type.key as keyof typeof subjectAverages] > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Avg: {Math.round(subjectAverages[type.key as keyof typeof subjectAverages])}%
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {!privateMode && userProgress.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            📈 Recent Activity
          </h3>
          <div className="space-y-4">
            {userProgress.slice(-5).reverse().map((progress, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-theme-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-theme-primary">{progress.week}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{progress.theme}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{progress.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-theme-primary">{progress.accuracy.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {progress.correctAnswers}/{progress.totalQuestions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;