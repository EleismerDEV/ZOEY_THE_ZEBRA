export interface WeeklyTheme {
  id: string;
  name: string;
  emoji: string;
  description: {
    en: string;
    de: string;
  };
  greeting: {
    en: string;
    de: string;
  };
  motivational: {
    en: string;
    de: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bgStart: string;
    bgMid: string;
    bgEnd: string;
  };
}

export const weeklyThemes: WeeklyTheme[] = [
  {
    id: 'taylor-swift',
    name: 'Taylor Swift Era',
    emoji: '✨',
    description: {
      en: 'Shake off your mistakes and shine bright in your learning journey!',
      de: 'Schüttle deine Fehler ab und strahle hell auf deinem Lernweg!'
    },
    greeting: {
      en: 'Welcome to your Taylor Swift Learning Era!',
      de: 'Willkommen in deiner Taylor Swift Lernära!'
    },
    motivational: {
      en: 'You belong with the smart kids! Great job!',
      de: 'Du gehörst zu den klugen Kindern! Gut gemacht!'
    },
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4', 
      accent: '#FFE66D',
      bgStart: '#FF9A9E',
      bgMid: '#FECFEF',
      bgEnd: '#FECFEF'
    }
  },
  {
    id: 'kpop-demon',
    name: 'K-Pop Demon Hunter',
    emoji: '🎵',
    description: {
      en: 'Channel your inner K-pop star energy to conquer learning challenges!',
      de: 'Kanalisiere deine innere K-Pop-Star-Energie, um Lernherausforderungen zu meistern!'
    },
    greeting: {
      en: 'Ready to dance through your lessons?',
      de: 'Bereit, durch deine Lektionen zu tanzen?'
    },
    motivational: {
      en: 'You\'re the main character of your learning story!',
      de: 'Du bist die Hauptfigur deiner Lerngeschichte!'
    },
    colors: {
      primary: '#9B59B6',
      secondary: '#E74C3C',
      accent: '#F39C12',
      bgStart: '#667eea',
      bgMid: '#764ba2',
      bgEnd: '#f093fb'
    }
  },
  {
    id: 'labubu-forest',
    name: 'Labubu Forest',
    emoji: '🌲',
    description: {
      en: 'Explore the magical forest of knowledge with your adorable Labubu friends!',
      de: 'Erkunde den magischen Wald des Wissens mit deinen süßen Labubu-Freunden!'
    },
    greeting: {
      en: 'Welcome to the enchanted Labubu learning forest!',
      de: 'Willkommen im verzauberten Labubu-Lernwald!'
    },
    motivational: {
      en: 'Like a wise forest creature, you\'re growing smarter every day!',
      de: 'Wie ein weises Waldwesen wirst du jeden Tag klüger!'
    },
    colors: {
      primary: '#27AE60',
      secondary: '#8E44AD',
      accent: '#F39C12',
      bgStart: '#a8edea',
      bgMid: '#fed6e3',
      bgEnd: '#d299c2'
    }
  },
  {
    id: 'space-adventure',
    name: 'Space Adventure',
    emoji: '🚀',
    description: {
      en: 'Blast off into the cosmos of learning and discover new worlds of knowledge!',
      de: 'Starte ins All des Lernens und entdecke neue Welten des Wissens!'
    },
    greeting: {
      en: 'Houston, we have a brilliant student ready for launch!',
      de: 'Houston, wir haben einen brillanten Schüler startbereit!'
    },
    motivational: {
      en: 'You\'re reaching for the stars and landing among them!',
      de: 'Du greifst nach den Sternen und landest zwischen ihnen!'
    },
    colors: {
      primary: '#3498DB',
      secondary: '#9B59B6',
      accent: '#E67E22',
      bgStart: '#667eea',
      bgMid: '#764ba2',
      bgEnd: '#89f7fe'
    }
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    emoji: '🌊',
    description: {
      en: 'Dive deep into the ocean of knowledge and discover hidden treasures!',
      de: 'Tauche tief in den Ozean des Wissens und entdecke verborgene Schätze!'
    },
    greeting: {
      en: 'Ready to explore the depths of learning?',
      de: 'Bereit, die Tiefen des Lernens zu erkunden?'
    },
    motivational: {
      en: 'Like a brave deep-sea explorer, you\'re discovering amazing things!',
      de: 'Wie ein mutiger Tiefseeforscher entdeckst du erstaunliche Dinge!'
    },
    colors: {
      primary: '#1ABC9C',
      secondary: '#3498DB',
      accent: '#F39C12',
      bgStart: '#89f7fe',
      bgMid: '#66a6ff',
      bgEnd: '#667eea'
    }
  },
  {
    id: 'magical-castle',
    name: 'Magical Castle',
    emoji: '🏰',
    description: {
      en: 'Enter the enchanted castle where every lesson is a magical spell of wisdom!',
      de: 'Betritt das verzauberte Schloss, wo jede Lektion ein magischer Zauber der Weisheit ist!'
    },
    greeting: {
      en: 'Welcome, young wizard, to your castle of learning!',
      de: 'Willkommen, junger Zauberer, in deinem Schloss des Lernens!'
    },
    motivational: {
      en: 'Your magical powers of learning grow stronger with each quest!',
      de: 'Deine magischen Lernkräfte werden mit jeder Quest stärker!'
    },
    colors: {
      primary: '#9B59B6',
      secondary: '#E91E63',
      accent: '#FFD700',
      bgStart: '#ffecd2',
      bgMid: '#fcb69f',
      bgEnd: '#a8edea'
    }
  }
];