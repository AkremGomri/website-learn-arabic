// Utility functions for working with Arabic text and letters
import { arabicLetters } from '../data/arabicLetters';

// Check if a letter is connectable from right side (can be connected to the next letter)
export const isRightConnectable = (letterId: string): boolean => {
  const nonConnectableLetters = ['alif', 'dal', 'thal', 'ra', 'zai', 'waw'];
  return !nonConnectableLetters.includes(letterId);
};

// Check if a letter is connectable from left side (can be connected to the previous letter)
export const isLeftConnectable = (letterId: string): boolean => {
  // All Arabic letters can be connected from the left side
  return true;
};

// Check if two letter forms are visually equivalent
export const areLetterFormsEquivalent = (
  letterId: string,
  form1: string,
  form2?: string
): boolean => {
  if (!form2) return false;
  
  // If the forms are exactly the same, they're equivalent
  if (form1 === form2) return true;
  
  // Special cases for letters with identical forms
  const letter = arabicLetters.find(l => l.id === letterId);
  if (!letter) return false;
  
  // Non-connectable letters have identical beginning and isolated forms
  if (!isRightConnectable(letterId)) {
    if (
      (form1 === 'beginning' && form2 === 'isolated') ||
      (form1 === 'isolated' && form2 === 'beginning')
    ) {
      return true;
    }
  }
  
  // Letters like alif have identical middle and end forms
  const lettersWithIdenticalMiddleEnd = ['alif', 'dal', 'thal', 'ra', 'zai', 'waw', 'hamza'];
  if (lettersWithIdenticalMiddleEnd.includes(letterId)) {
    if (
      (form1 === 'middle' && form2 === 'end') ||
      (form1 === 'end' && form2 === 'middle')
    ) {
      return true;
    }
  }
  
  return false;
};

// Get vowel strength (for hamza placement)
const getVowelStrength = (vowel?: string): number => {
  if (!vowel) return 0;
  switch (vowel) {
    case 'ِ': return 4; // Kasra (strongest)
    case 'ُ': return 3; // Damma
    case 'َ': return 2; // Fatha
    case 'ْ': return 1; // Sukun (weakest)
    default: return 0;  // No vowel
  }
};

// Determine hamza carrier based on vowels
const getHamzaCarrier = (
  previousVowel?: string,
  hamzaVowel?: string
): 'alif' | 'waw' | 'ya' | 'none' => {
  const prevStrength = getVowelStrength(previousVowel);
  const hamzaStrength = getVowelStrength(hamzaVowel);
  
  // If hamza has kasra, it goes on ya
  if (hamzaVowel === 'ِ') return 'ya';
  
  // If hamza has damma, it goes on waw
  if (hamzaVowel === 'ُ') return 'waw';
  
  // If previous vowel is kasra, it goes on ya
  if (previousVowel === 'ِ') return 'ya';
  
  // If previous vowel is damma, it goes on waw
  if (previousVowel === 'ُ') return 'waw';
  
  // Default to alif
  return 'alif';
};

// Determine the correct form of a letter based on its position in a word
export const getLetterForm = (
  letterId: string,
  position: number,
  wordLength: number
): 'isolated' | 'beginning' | 'middle' | 'end' => {
  // If it's a single letter word
  if (wordLength === 1) {
    return 'isolated';
  }

  // If it's the first letter
  if (position === 0) {
    return isRightConnectable(letterId) ? 'beginning' : 'isolated';
  }

  // If it's the last letter
  if (position === wordLength - 1) {
    return 'end';
  }

  // If it's a middle letter
  return isRightConnectable(letterId) ? 'middle' : 'isolated';
};

// Shuffle an array (for randomizing options)
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate an array of letter options including distractors
export const generateLetterOptions = (
  correctLetters: Array<{char: string, position: string, letterId: string}>,
  numberOfOptions = 12
): Array<{char: string, position: string, letterId: string, isCorrect: boolean}> => {
  // Mark correct letters
  const markedCorrectLetters = correctLetters.map(letter => ({
    ...letter,
    isCorrect: true
  }));
  
  // If we have enough correct letters, just return them shuffled
  if (markedCorrectLetters.length >= numberOfOptions) {
    return shuffleArray(markedCorrectLetters.slice(0, numberOfOptions));
  }
  
  // We need to add some distractors
  const distractorsNeeded = numberOfOptions - markedCorrectLetters.length;
  const distractors = [];
  
  // Generate distractor options (similar letters in different positions)
  for (let i = 0; i < distractorsNeeded; i++) {
    // Get a random letter ID from the correct letters to create similar distractors
    const randomLetterIndex = Math.floor(Math.random() * correctLetters.length);
    const correctLetterId = correctLetters[randomLetterIndex].letterId;
    
    // Find the letter in our database
    const letter = arabicLetters.find((l) => l.id === correctLetterId);
    
    if (!letter) continue;
    
    // Choose a different position than the correct one
    const positions = ['beginning', 'middle', 'end', 'isolated'];
    const correctPosition = correctLetters[randomLetterIndex].position;
    const filteredPositions = positions.filter(p => p !== correctPosition);
    const randomPosition = filteredPositions[Math.floor(Math.random() * filteredPositions.length)] as 'beginning' | 'middle' | 'end' | 'isolated';
    
    // Add the distractor
    distractors.push({
      char: letter[randomPosition],
      position: randomPosition,
      letterId: correctLetterId,
      isCorrect: false
    });
  }
  
  // Combine correct letters and distractors, then shuffle
  return shuffleArray([...markedCorrectLetters, ...distractors]);
};