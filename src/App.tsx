import React, { useState, useEffect } from 'react';
import { Moon, Sun, Settings, Download, Eye, EyeOff, BookOpen, Calculator, Pen, Languages } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import ThemePicker from './components/ThemePicker';
import ExportModal from './components/ExportModal';
import { weeklyThemes, type WeeklyTheme } from './data/themes';
import { generateWeeklyQuizzes } from './data/quizData';
import './styles/themes.css';

export interface UserProgress {
  week: number;
  theme: string;
  scores: {
    reading: number;
    spelling: number;
    grammar: number;
    math: number;
  };
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  focusArea: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentTheme, setCurrentTheme] = useState<WeeklyTheme>(weeklyThemes[0]);
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz'>('dashboard');
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [currentQuizType, setCurrentQuizType] = useState<'reading' | 'spelling' | 'grammar' | 'math'>('reading');

  // Initialize theme and progress
  useEffect(() => {
    const weekIndex = (currentWeek - 1) % weeklyThemes.length;
    setCurrentTheme(weeklyThemes[weekIndex]);
    
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, [currentWeek]);

  // Save progress to localStorage
  useEffect(() => {
    if (userProgress.length > 0) {
      localStorage.setItem('learningProgress', JSON.stringify(userProgress));
    }
  }, [userProgress]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = `${darkMode ? 'dark' : ''} theme-${currentTheme.id}`;
  }, [darkMode, currentTheme]);

  const addProgressEntry = (scores: any, accuracy: number, totalQuestions: number, correctAnswers: number) => {
    const focusArea = Object.entries(scores).reduce((a, b) => scores[a[0]] < scores[b[0]] ? a : b)[0];
    
    const newEntry: UserProgress = {
      week: currentWeek,
      theme: currentTheme.name,
      scores,
      accuracy,
      totalQuestions,
      correctAnswers,
      date: new Date().toISOString().split('T')[0],
      focusArea: focusArea.charAt(0).toUpperCase() + focusArea.slice(1)
    };

    setUserProgress(prev => [...prev, newEntry]);
  };

  const translations = {
    en: {
      title: "Learning Dashboard",
      dashboard: "Dashboard",
      quiz: "Quiz",
      week: "Week",
      reading: "Reading",
      spelling: "Spelling", 
      grammar: "Grammar",
      math: "Math",
      progress: "Progress",
      accuracy: "Accuracy",
      focusArea: "Focus Area",
      export: "Export",
      settings: "Settings",
      darkMode: "Dark Mode",
      privateMode: "Private Mode",
      language: "Language",
      startQuiz: "Start Quiz",
      backToDashboard: "Back to Dashboard"
    },
    de: {
      title: "Lern-Dashboard",
      dashboard: "Dashboard", 
      quiz: "Quiz",
      week: "Woche",
      reading: "Lesen",
      spelling: "Rechtschreibung",
      grammar: "Grammatik", 
      math: "Mathematik",
      progress: "Fortschritt",
      accuracy: "Genauigkeit",
      focusArea: "Schwerpunkt",
      export: "Exportieren",
      settings: "Einstellungen",
      darkMode: "Dunkler Modus",
      privateMode: "Privater Modus", 
      language: "Sprache",
      startQuiz: "Quiz starten",
      backToDashboard: "Zurück zum Dashboard"
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-theme-bg-start via-theme-bg-mid to-theme-bg-end min-h-screen">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-8 h-8 text-theme-primary" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t.title} {currentTheme.emoji}
                  </h1>
                </div>
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-theme-primary/20 rounded-full">
                  <span className="text-sm font-medium text-theme-primary">{t.week} {currentWeek}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{currentTheme.name}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
                  title={t.language}
                >
                  <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-theme-primary transition-colors" />
                  <span className="ml-1 text-sm font-medium">{language.toUpperCase()}</span>
                </button>

                {/* Private Mode Toggle */}
                <button
                  onClick={() => setPrivateMode(!privateMode)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    privateMode 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                  title={t.privateMode}
                >
                  {privateMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
                  title={t.darkMode}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 group-hover:text-indigo-500 transition-colors" />
                  )}
                </button>

                {/* Settings */}
                <button
                  onClick={() => setShowThemePicker(true)}
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
                  title={t.settings}
                >
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-theme-primary group-hover:rotate-90 transition-all" />
                </button>

                {/* Export */}
                <button
                  onClick={() => setShowExport(true)}
                  className="p-2 rounded-lg bg-theme-primary text-white hover:bg-theme-primary/90 transition-all duration-200 group"
                  title={t.export}
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 py-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'dashboard'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-theme-primary hover:bg-theme-primary/10'
                }`}
              >
                📊 {t.dashboard}
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'quiz'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-theme-primary hover:bg-theme-primary/10'
                }`}
              >
                🧠 {t.quiz}
              </button>
              
              {/* Week Selector */}
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t.week}:</span>
                <select
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(Number(e.target.value))}
                  className="px-3 py-1 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-theme-primary"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(week => (
                    <option key={week} value={week}>
                      {week} - {weeklyThemes[(week - 1) % weeklyThemes.length].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'dashboard' ? (
            <Dashboard
              userProgress={userProgress}
              currentWeek={currentWeek}
              currentTheme={currentTheme}
              language={language}
              privateMode={privateMode}
              translations={t}
              onStartQuiz={(type) => {
                setCurrentQuizType(type);
                setCurrentView('quiz');
              }}
            />
          ) : (
            <Quiz
              currentWeek={currentWeek}
              currentTheme={currentTheme}
              quizType={currentQuizType}
              language={language}
              translations={t}
              onComplete={addProgressEntry}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </main>

        {/* Modals */}
        {showThemePicker && (
          <ThemePicker
            themes={weeklyThemes}
            currentTheme={currentTheme}
            onSelectTheme={(theme) => {
              setCurrentTheme(theme);
              setShowThemePicker(false);
            }}
            onClose={() => setShowThemePicker(false)}
            language={language}
          />
        )}

        {showExport && (
          <ExportModal
            userProgress={userProgress}
            currentWeek={currentWeek}
            onClose={() => setShowExport(false)}
            language={language}
          />
        )}
      </div>
    </div>
  );
}

export default App;