import React from 'react';
import { X, Download, FileText, Database } from 'lucide-react';
import type { UserProgress } from '../App';

interface ExportModalProps {
  userProgress: UserProgress[];
  currentWeek: number;
  onClose: () => void;
  language: 'en' | 'de';
}

const ExportModal: React.FC<ExportModalProps> = ({
  userProgress,
  currentWeek,
  onClose,
  language
}) => {
  const generateReport = () => {
    const report = {
      exportDate: new Date().toISOString(),
      currentWeek,
      totalSessions: userProgress.length,
      overallProgress: {
        totalQuestions: userProgress.reduce((sum, p) => sum + p.totalQuestions, 0),
        totalCorrect: userProgress.reduce((sum, p) => sum + p.correctAnswers, 0),
        averageAccuracy: userProgress.length > 0 
          ? userProgress.reduce((sum, p) => sum + p.accuracy, 0) / userProgress.length 
          : 0
      },
      subjectAverages: {
        reading: userProgress.length > 0 
          ? userProgress.reduce((sum, p) => sum + p.scores.reading, 0) / userProgress.length 
          : 0,
        spelling: userProgress.length > 0 
          ? userProgress.reduce((sum, p) => sum + p.scores.spelling, 0) / userProgress.length 
          : 0,
        grammar: userProgress.length > 0 
          ? userProgress.reduce((sum, p) => sum + p.scores.grammar, 0) / userProgress.length 
          : 0,
        math: userProgress.length > 0 
          ? userProgress.reduce((sum, p) => sum + p.scores.math, 0) / userProgress.length 
          : 0
      },
      weeklyProgress: userProgress,
      recommendations: generateRecommendations()
    };

    return report;
  };

  const generateRecommendations = () => {
    if (userProgress.length === 0) return [];

    const subjectAverages = {
      reading: userProgress.reduce((sum, p) => sum + p.scores.reading, 0) / userProgress.length,
      spelling: userProgress.reduce((sum, p) => sum + p.scores.spelling, 0) / userProgress.length,
      grammar: userProgress.reduce((sum, p) => sum + p.scores.grammar, 0) / userProgress.length,
      math: userProgress.reduce((sum, p) => sum + p.scores.math, 0) / userProgress.length
    };

    const recommendations = [];
    Object.entries(subjectAverages).forEach(([subject, average]) => {
      if (average < 70) {
        recommendations.push(`Focus more practice on ${subject} (current average: ${average.toFixed(1)}%)`);
      } else if (average > 90) {
        recommendations.push(`Excellent progress in ${subject}! Consider advanced challenges.`);
      }
    });

    return recommendations;
  };

  const exportJSON = () => {
    const report = generateReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `learning-progress-week-${currentWeek}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportPDF = () => {
    const report = generateReport();
    
    // Create a simple HTML report that can be printed as PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Learning Progress Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .section { margin-bottom: 30px; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
            .progress-item { padding: 10px; border-bottom: 1px solid #eee; }
            .recommendations { background: #f8f9fa; padding: 20px; border-radius: 8px; }
            h1, h2 { color: #333; }
            .score { font-weight: bold; color: #007bff; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📚 Learning Progress Report</h1>
            <p>Week ${report.currentWeek} | Generated on ${new Date(report.exportDate).toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h2>📊 Overall Progress</h2>
            <div class="stats">
              <div class="stat-card">
                <h3>Total Sessions</h3>
                <div class="score">${report.totalSessions}</div>
              </div>
              <div class="stat-card">
                <h3>Total Questions</h3>
                <div class="score">${report.overallProgress.totalQuestions}</div>
              </div>
              <div class="stat-card">
                <h3>Overall Accuracy</h3>
                <div class="score">${report.overallProgress.averageAccuracy.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>📈 Subject Performance</h2>
            <div class="stats">
              <div class="stat-card">
                <h3>📚 Reading</h3>
                <div class="score">${report.subjectAverages.reading.toFixed(1)}%</div>
              </div>
              <div class="stat-card">
                <h3>✏️ Spelling</h3>
                <div class="score">${report.subjectAverages.spelling.toFixed(1)}%</div>
              </div>
              <div class="stat-card">
                <h3>📝 Grammar</h3>
                <div class="score">${report.subjectAverages.grammar.toFixed(1)}%</div>
              </div>
              <div class="stat-card">
                <h3>🔢 Math</h3>
                <div class="score">${report.subjectAverages.math.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>📅 Weekly Progress</h2>
            ${report.weeklyProgress.map(progress => `
              <div class="progress-item">
                <strong>Week ${progress.week} - ${progress.theme}</strong> | ${progress.date}
                <br>
                Accuracy: ${progress.accuracy.toFixed(1)}% (${progress.correctAnswers}/${progress.totalQuestions})
                <br>
                Focus Area: ${progress.focusArea}
              </div>
            `).join('')}
          </div>

          ${report.recommendations.length > 0 ? `
            <div class="section">
              <h2>💡 Recommendations</h2>
              <div class="recommendations">
                ${report.recommendations.map(rec => `<p>• ${rec}</p>`).join('')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const report = generateReport();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Download className="w-8 h-8 text-theme-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Export Progress Report
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Report Preview */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Report Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Sessions</p>
              <p className="text-2xl font-bold text-theme-primary">{report.totalSessions}</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-600 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Average Accuracy</p>
              <p className="text-2xl font-bold text-theme-primary">{report.overallProgress.averageAccuracy.toFixed(1)}%</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Subject Averages:</h4>
            {Object.entries(report.subjectAverages).map(([subject, average]) => (
              <div key={subject} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300 capitalize">{subject}:</span>
                <span className="font-medium text-theme-primary">{average.toFixed(1)}%</span>
              </div>
            ))}
          </div>

          {report.recommendations.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Recommendations:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                {report.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <button
            onClick={exportJSON}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-theme-primary text-white rounded-xl hover:bg-theme-primary/90 transition-all duration-200"
          >
            <Database className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Export as JSON</div>
              <div className="text-sm opacity-90">Machine-readable data format</div>
            </div>
          </button>

          <button
            onClick={exportPDF}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-theme-secondary text-white rounded-xl hover:bg-theme-secondary/90 transition-all duration-200"
          >
            <FileText className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Export as PDF</div>
              <div className="text-sm opacity-90">Formatted report for printing</div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>📊 Data includes all quiz sessions and performance metrics</p>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;