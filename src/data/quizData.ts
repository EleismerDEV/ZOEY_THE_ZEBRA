import type { WeeklyTheme } from './themes';

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

interface QuizSet {
  reading: Question[];
  spelling: Question[];
  grammar: Question[];
  math: Question[];
}

export const generateWeeklyQuizzes = (week: number, theme: WeeklyTheme): QuizSet => {
  const baseQuizzes: QuizSet = {
    reading: [
      {
        id: 1,
        question: "What does the word 'magnificent' mean?",
        questionDe: "Was bedeutet das Wort 'magnificent'?",
        options: ["Very large", "Very beautiful or impressive", "Very small", "Very fast"],
        correctAnswer: "Very beautiful or impressive",
        explanation: "Magnificent means extremely beautiful, elaborate, or impressive.",
        explanationDe: "Magnificent bedeutet äußerst schön, aufwendig oder beeindruckend.",
        type: "multiple-choice"
      },
      {
        id: 2,
        question: "In the sentence 'The cat sat on the mat', what is the subject?",
        questionDe: "In dem Satz 'The cat sat on the mat', was ist das Subjekt?",
        options: ["cat", "sat", "mat", "on"],
        correctAnswer: "cat",
        explanation: "The subject is who or what the sentence is about - in this case, the cat.",
        explanationDe: "Das Subjekt ist, worum es in dem Satz geht - in diesem Fall die Katze.",
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "Which word rhymes with 'bright'?",
        questionDe: "Welches Wort reimt sich auf 'bright'?",
        options: ["night", "bread", "brown", "blue"],
        correctAnswer: "night",
        explanation: "Night and bright both end with the same '-ight' sound.",
        explanationDe: "Night und bright enden beide mit dem gleichen '-ight' Klang.",
        type: "multiple-choice"
      },
      {
        id: 4,
        question: "What is a synonym for 'happy'?",
        questionDe: "Was ist ein Synonym für 'happy'?",
        options: ["sad", "joyful", "angry", "tired"],
        correctAnswer: "joyful",
        explanation: "Joyful means the same thing as happy - feeling pleasure or contentment.",
        explanationDe: "Joyful bedeutet dasselbe wie happy - Freude oder Zufriedenheit empfinden.",
        type: "multiple-choice"
      },
      {
        id: 5,
        question: "Complete the sentence: 'The _____ was very loud.' (thunder/quite)",
        questionDe: "Vervollständige den Satz: 'The _____ was very loud.' (thunder/quite)",
        correctAnswer: "thunder",
        explanation: "Thunder makes sense in this context as something that can be loud.",
        explanationDe: "Thunder ergibt in diesem Kontext Sinn, da es etwas ist, das laut sein kann.",
        type: "input"
      }
    ],
    spelling: [
      {
        id: 1,
        question: "Spell the word that means 'very beautiful': m____i____nt",
        questionDe: "Buchstabiere das Wort, das 'sehr schön' bedeutet: m____i____nt",
        correctAnswer: "magnificent",
        explanation: "The correct spelling is m-a-g-n-i-f-i-c-e-n-t.",
        explanationDe: "Die richtige Schreibweise ist m-a-g-n-i-f-i-c-e-n-t.",
        type: "input"
      },
      {
        id: 2,
        question: "Which spelling is correct?",
        questionDe: "Welche Schreibweise ist richtig?",
        options: ["recieve", "receive", "receve", "receave"],
        correctAnswer: "receive",
        explanation: "Remember the rule: 'i before e except after c' - but receive is an exception!",
        explanationDe: "Denk an die Regel: 'i vor e außer nach c' - aber receive ist eine Ausnahme!",
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "Spell the plural of 'child':",
        questionDe: "Buchstabiere die Mehrzahl von 'child':",
        correctAnswer: "children",
        explanation: "The plural of child is children, not 'childs'.",
        explanationDe: "Die Mehrzahl von child ist children, nicht 'childs'.",
        type: "input"
      },
      {
        id: 4,
        question: "Which word is spelled correctly?",
        questionDe: "Welches Wort ist richtig geschrieben?",
        options: ["seperate", "separate", "seperete", "separete"],
        correctAnswer: "separate",
        explanation: "The correct spelling is s-e-p-a-r-a-t-e.",
        explanationDe: "Die richtige Schreibweise ist s-e-p-a-r-a-t-e.",
        type: "multiple-choice"
      },
      {
        id: 5,
        question: "Spell the word meaning 'to make better': i____ove",
        questionDe: "Buchstabiere das Wort für 'verbessern': i____ove",
        correctAnswer: "improve",
        explanation: "The correct spelling is i-m-p-r-o-v-e.",
        explanationDe: "Die richtige Schreibweise ist i-m-p-r-o-v-e.",
        type: "input"
      }
    ],
    grammar: [
      {
        id: 1,
        question: "Which sentence uses the correct verb tense?",
        questionDe: "Welcher Satz verwendet die richtige Zeitform?",
        options: [
          "She will went to the store tomorrow",
          "She will go to the store tomorrow", 
          "She will going to the store tomorrow",
          "She will goes to the store tomorrow"
        ],
        correctAnswer: "She will go to the store tomorrow",
        explanation: "With 'will', we use the base form of the verb (go), not past tense or other forms.",
        explanationDe: "Mit 'will' verwenden wir die Grundform des Verbs (go), nicht die Vergangenheit oder andere Formen.",
        type: "multiple-choice"
      },
      {
        id: 2,
        question: "What type of word is 'quickly' in this sentence: 'She ran quickly'?",
        questionDe: "Was für eine Wortart ist 'quickly' in diesem Satz: 'She ran quickly'?",
        options: ["noun", "verb", "adjective", "adverb"],
        correctAnswer: "adverb",
        explanation: "Quickly describes HOW she ran, making it an adverb that modifies the verb 'ran'.",
        explanationDe: "Quickly beschreibt WIE sie rannte und ist daher ein Adverb, das das Verb 'ran' modifiziert.",
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "Which sentence is in passive voice?",
        questionDe: "Welcher Satz steht im Passiv?",
        options: [
          "The dog chased the ball",
          "The ball was chased by the dog",
          "The dog is chasing the ball",
          "The dog will chase the ball"
        ],
        correctAnswer: "The ball was chased by the dog",
        explanation: "In passive voice, the subject receives the action rather than performing it.",
        explanationDe: "Im Passiv erhält das Subjekt die Handlung, anstatt sie auszuführen.",
        type: "multiple-choice"
      },
      {
        id: 4,
        question: "Choose the correct pronoun: 'Between you and ___, I think this is great.'",
        questionDe: "Wähle das richtige Pronomen: 'Between you and ___, I think this is great.'",
        options: ["I", "me", "myself", "mine"],
        correctAnswer: "me",
        explanation: "After prepositions like 'between', we use object pronouns (me), not subject pronouns (I).",
        explanationDe: "Nach Präpositionen wie 'between' verwenden wir Objektpronomen (me), nicht Subjektpronomen (I).",
        type: "multiple-choice"
      },
      {
        id: 5,
        question: "Is this sentence correct? 'There are less people today than yesterday.'",
        questionDe: "Ist dieser Satz richtig? 'There are less people today than yesterday.'",
        options: ["Yes", "No"],
        correctAnswer: "No",
        explanation: "It should be 'fewer people' because people are countable. Use 'less' for uncountable things.",
        explanationDe: "Es sollte 'fewer people' heißen, weil Menschen zählbar sind. Verwende 'less' für unzählbare Dinge.",
        type: "true-false"
      }
    ],
    math: [
      {
        id: 1,
        question: "What is 247 + 189?",
        questionDe: "Was ist 247 + 189?",
        correctAnswer: "436",
        explanation: "247 + 189 = 436. Add the ones: 7+9=16 (carry 1), tens: 4+8+1=13 (carry 1), hundreds: 2+1+1=4.",
        explanationDe: "247 + 189 = 436. Einer: 7+9=16 (1 übertragen), Zehner: 4+8+1=13 (1 übertragen), Hunderter: 2+1+1=4.",
        type: "input"
      },
      {
        id: 2,
        question: "If a rectangle has a length of 8 cm and width of 5 cm, what is its area?",
        questionDe: "Wenn ein Rechteck eine Länge von 8 cm und eine Breite von 5 cm hat, wie groß ist seine Fläche?",
        options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
        correctAnswer: "40 cm²",
        explanation: "Area of rectangle = length × width = 8 × 5 = 40 cm²",
        explanationDe: "Fläche des Rechtecks = Länge × Breite = 8 × 5 = 40 cm²",
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "What is 3/4 + 1/4?",
        questionDe: "Was ist 3/4 + 1/4?",
        options: ["4/8", "4/4", "1", "Both 4/4 and 1"],
        correctAnswer: "Both 4/4 and 1",
        explanation: "3/4 + 1/4 = 4/4 = 1. Both answers represent the same value.",
        explanationDe: "3/4 + 1/4 = 4/4 = 1. Beide Antworten stellen den gleichen Wert dar.",
        type: "multiple-choice"
      },
      {
        id: 4,
        question: "Round 2,847 to the nearest hundred:",
        questionDe: "Runde 2.847 auf die nächste Hunderterstelle:",
        correctAnswer: "2800",
        explanation: "Look at the tens digit (4). Since 4 < 5, round down: 2,847 → 2,800",
        explanationDe: "Schaue auf die Zehnerstelle (4). Da 4 < 5 ist, runde ab: 2.847 → 2.800",
        type: "input"
      },
      {
        id: 5,
        question: "A pizza is cut into 8 equal pieces. If you eat 3 pieces, what fraction of the pizza did you eat?",
        questionDe: "Eine Pizza wird in 8 gleiche Stücke geschnitten. Wenn du 3 Stücke isst, welchen Bruchteil der Pizza hast du gegessen?",
        options: ["3/8", "5/8", "3/5", "8/3"],
        correctAnswer: "3/8",
        explanation: "You ate 3 pieces out of 8 total pieces, so 3/8 of the pizza.",
        explanationDe: "Du hast 3 Stücke von insgesamt 8 Stücken gegessen, also 3/8 der Pizza.",
        type: "multiple-choice"
      }
    ]
  };

  // Modify questions based on theme for personalization
  const themedQuizzes = JSON.parse(JSON.stringify(baseQuizzes));
  
  // Add theme-specific elements to questions
  themedQuizzes.reading.forEach((q: Question) => {
    if (theme.id === 'taylor-swift') {
      q.question = q.question.replace('magnificent', 'sparkling');
      if (q.questionDe) q.questionDe = q.questionDe.replace('magnificent', 'funkelnd');
    }
  });

  return themedQuizzes;
};