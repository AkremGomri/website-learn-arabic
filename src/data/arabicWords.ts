// Common Arabic words for memory game
import { arabicLetters, ArabicLetter } from './arabicLetters';

export interface ArabicWord {
  id: string;
  word: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
  letters: Array<{
    char: string;
    position: 'beginning' | 'middle' | 'end' | 'isolated';
    letterId: string;
    vowel?: string;
  }>;
}

// Helper function to get letter form
const getLetterForm = (letterId: string, form: 'beginning' | 'middle' | 'end' | 'isolated'): string => {
  const letter = arabicLetters.find(l => l.id === letterId);
  return letter ? letter[form] : '';
};

export const arabicWords: ArabicWord[] = [
  {
    id: "1",
    word: "كِتَابٌ",
    meaning: "book",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('kaf', 'beginning'), position: 'beginning', letterId: 'kaf', vowel: 'ِ' },
      { char: getLetterForm('ta', 'middle'), position: 'middle', letterId: 'ta', vowel: 'َ' },
      { char: getLetterForm('alif', 'middle'), position: 'middle', letterId: 'alif' }, // No vowel on alif
      { char: getLetterForm('ba', 'isolated'), position: 'isolated', letterId: 'ba', vowel: 'ٌ' }
    ]
  },
  {
    id: "2",
    word: "قَلَمٌ",
    meaning: "pen",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('qaf', 'beginning'), position: 'beginning', letterId: 'qaf', vowel: 'َ' },
      { char: getLetterForm('lam', 'middle'), position: 'middle', letterId: 'lam', vowel: 'َ' },
      { char: getLetterForm('mim', 'end'), position: 'end', letterId: 'mim', vowel: 'ٌ' }
    ]
  },
  {
    id: "3",
    word: "بَابٌ",
    meaning: "door",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('ba', 'beginning'), position: 'beginning', letterId: 'ba', vowel: 'َ' },
      { char: getLetterForm('alif', 'middle'), position: 'middle', letterId: 'alif' },
      { char: getLetterForm('ba', 'isolated'), position: 'isolated', letterId: 'ba', vowel: 'ٌ' }
    ]
  },
  {
    id: "4",
    word: "بَيْتٌ",
    meaning: "house",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('ba', 'beginning'), position: 'beginning', letterId: 'ba', vowel: 'َ' },
      { char: getLetterForm('ya', 'middle'), position: 'middle', letterId: 'ya', vowel: 'ْ' },
      { char: getLetterForm('ta', 'end'), position: 'end', letterId: 'ta', vowel: 'ٌ' }
    ]
  },
  {
    id: "5",
    word: "يَدٌ",
    meaning: "hand",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('ya', 'beginning'), position: 'beginning', letterId: 'ya', vowel: 'َ' },
      { char: getLetterForm('dal', 'end'), position: 'end', letterId: 'dal', vowel: 'ٌ' }
    ]
  },
  {
    id: "6",
    word: "مَاءٌ",
    meaning: "water",
    difficulty: "easy",
    letters: [
      { char: getLetterForm('mim', 'beginning'), position: 'beginning', letterId: 'mim', vowel: 'َ' },
      { char: getLetterForm('alif', 'middle'), position: 'middle', letterId: 'alif' },
      { char: getLetterForm('hamza', 'isolated'), position: 'isolated', letterId: 'hamza', vowel: 'ٌ' }
    ]
  },
  {
    id: "7",
    word: "شَمْسٌ",
    meaning: "sun",
    difficulty: "medium",
    letters: [
      { char: getLetterForm('shin', 'beginning'), position: 'beginning', letterId: 'shin', vowel: 'َ' },
      { char: getLetterForm('mim', 'middle'), position: 'middle', letterId: 'mim', vowel: 'ْ' },
      { char: getLetterForm('sin', 'end'), position: 'end', letterId: 'sin', vowel: 'ٌ' }
    ]
  },
  {
    id: "8",
    word: "قَمَرٌ",
    meaning: "moon",
    difficulty: "medium",
    letters: [
      { char: getLetterForm('qaf', 'beginning'), position: 'beginning', letterId: 'qaf', vowel: 'َ' },
      { char: getLetterForm('mim', 'middle'), position: 'middle', letterId: 'mim', vowel: 'َ' },
      { char: getLetterForm('ra', 'end'), position: 'end', letterId: 'ra', vowel: 'ٌ' }
    ]
  },
  {
    id: "9",
    word: "نَجْمٌ",
    meaning: "star",
    difficulty: "medium",
    letters: [
      { char: getLetterForm('nun', 'beginning'), position: 'beginning', letterId: 'nun', vowel: 'َ' },
      { char: getLetterForm('jim', 'middle'), position: 'middle', letterId: 'jim', vowel: 'ْ' },
      { char: getLetterForm('mim', 'end'), position: 'end', letterId: 'mim', vowel: 'ٌ' }
    ]
  },
  {
    id: "10",
    word: "حِصَانٌ",
    meaning: "horse",
    difficulty: "medium",
    letters: [
      { char: getLetterForm('ha', 'beginning'), position: 'beginning', letterId: 'ha', vowel: 'ِ' },
      { char: getLetterForm('sad', 'middle'), position: 'middle', letterId: 'sad', vowel: 'َ' },
      { char: getLetterForm('alif', 'middle'), position: 'middle', letterId: 'alif' },
      { char: getLetterForm('nun', 'isolated'), position: 'isolated', letterId: 'nun', vowel: 'ٌ' }
    ]
  }
];

// Get a random word with a specific difficulty
export const getRandomWord = (difficulty?: 'easy' | 'medium' | 'hard'): ArabicWord => {
  let filteredWords = arabicWords;
  
  if (difficulty) {
    filteredWords = arabicWords.filter(word => word.difficulty === difficulty);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
};

// Check if a letter is a long vowel (حرف مد)
const isLongVowel = (letterId: string): boolean => {
  return ['alif', 'waw', 'ya'].includes(letterId) && !letterId.endsWith('_cons');
};

// Generate a random word using only specific letters
export const generateWord = (
  selectedLetterIds: string[],
  maxLength: number
): {word: string, letters: Array<{char: string, position: string, letterId: string, vowel?: string}>} => {
  if (!selectedLetterIds.length || maxLength <= 0) {
    return {word: "", letters: []};
  }
  
  const length = Math.min(Math.max(Math.floor(Math.random() * maxLength) + 1, 1), 7);
  const wordLetters = [];
  let wordString = "";
  let previousCanConnect = true;
  let previousVowel: string | undefined;
  let previousLetterId: string | undefined;
  let hasSukun = false;
  
  // Basic vowels (excluding tanwin and shadda for simplicity)
  const shortVowels = ['َ', 'ُ', 'ِ'];
  
  for (let i = 0; i < length; i++) {
    const availableLetters = selectedLetterIds
      .map(id => arabicLetters.find(l => l.id === id))
      .filter(l => l !== undefined) as ArabicLetter[];
    
    // Filter out letters that would create invalid combinations
    let validLetters = availableLetters.filter(letter => {
      // Don't allow long vowels at the start of the word
      if (i === 0 && isLongVowel(letter.id)) return false;
      
      // If this is not the first letter and previous letter can't connect,
      // only allow letters that can be isolated
      if (i > 0 && !previousCanConnect && letter.canConnectNext) return false;
      
      return true;
    });
    
    // If no valid letters are available, use all available letters
    if (validLetters.length === 0) {
      validLetters = availableLetters;
    }
    
    const letter = validLetters[Math.floor(Math.random() * validLetters.length)];
    let position: 'beginning' | 'middle' | 'end' | 'isolated';
    let char: string;
    
    // Determine position and character form
    if (i === 0) {
      position = 'beginning';
      char = letter.beginning;
    } else if (!previousCanConnect) {
      position = 'isolated';
      char = letter.isolated;
    } else if (i === length - 1) {
      position = 'end';
      char = letter.end;
    } else {
      position = 'middle';
      char = letter.middle;
    }
    
    const letterObj = {
      char,
      position,
      letterId: letter.id
    };
    
    // Handle vowels
    if (isLongVowel(letter.id)) {
      // Long vowels never carry vowel marks
      previousVowel = undefined;
    } else {
      // For regular consonants and hamza
      // Never use sukun at the start of word
      if (i > 0 && i < length - 1 && !hasSukun && letter.id !== previousLetterId && Math.random() < 0.2) {
        letterObj.vowel = 'ْ';
        hasSukun = true;
      } else {
        letterObj.vowel = shortVowels[Math.floor(Math.random() * shortVowels.length)];
        hasSukun = false;
      }
    }
    
    // Handle shadda for repeated letters
    if (letter.id === previousLetterId && previousVowel === 'ْ') {
      // Remove the previous sukun and add shadda to current letter
      wordLetters[wordLetters.length - 1].vowel = undefined;
      letterObj.vowel = 'ّ' + (letterObj.vowel || shortVowels[Math.floor(Math.random() * shortVowels.length)]);
    }
    
    // Add tanwin if it's the last letter (and not after sukun)
    if (i === length - 1 && !hasSukun && !isLongVowel(letter.id) && Math.random() < 0.3) {
      const tanwin = ['ً', 'ٌ', 'ٍ'][Math.floor(Math.random() * 3)];
      letterObj.vowel = tanwin;
    }
    
    wordLetters.push(letterObj);
    wordString += char + (letterObj.vowel || '');
    previousCanConnect = letter.canConnectNext;
    previousVowel = letterObj.vowel;
    previousLetterId = letter.id;
  }
  
  return {
    word: wordString,
    letters: wordLetters
  };
};

// Get word by ID
export const getWordById = (id: string): ArabicWord | undefined => {
  return arabicWords.find(word => word.id === id);
};