import React from 'react';
import { X, Palette } from 'lucide-react';
import type { WeeklyTheme } from '../data/themes';

interface ThemePickerProps {
  themes: WeeklyTheme[];
  currentTheme: WeeklyTheme;
  onSelectTheme: (theme: WeeklyTheme) => void;
  onClose: () => void;
  language: 'en' | 'de';
}

const ThemePicker: React.FC<ThemePickerProps> = ({
  themes,
  currentTheme,
  onSelectTheme,
  onClose,
  language
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Palette className="w-8 h-8 text-theme-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Choose Your Theme
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => onSelectTheme(theme)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                currentTheme.id === theme.id
                  ? 'border-theme-primary bg-theme-primary/10'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{theme.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {theme.description[language]}
                </p>
                
                {/* Theme Preview Colors */}
                <div className="flex justify-center space-x-2 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>

                {currentTheme.id === theme.id && (
                  <div className="flex items-center justify-center text-theme-primary font-medium">
                    <span className="text-sm">✨ Currently Selected</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 Themes change automatically each week, but parents can override the selection here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemePicker;