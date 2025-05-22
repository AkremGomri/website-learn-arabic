// Utility functions for working with Arabic text and letters
import { arabicLetters } from '../data/arabicLetters';

// Check if a letter is connectable from right side (can be connected to the next letter)
export const isRightConnectable = (letterId: string): boolean => {
  // All Arabic letters can connect to the next letter
  return true;
};

// Check if a letter is connectable from left side (can be connected to the previous letter)
export const isLeftConnectable = (letterId: string): boolean => {
  // These letters cannot be connected from the left side
  const nonConnectableLetters = ['alif', 'dal', 'thal', 'ra', 'zai', 'waw'];
  return !nonConnectableLetters.includes(letterId);
};

// Check if two letter forms are visually equivalent
// export const areLetterFormsEquivalent = (
//   letterId: string,
//   form1: string,
//   form2?: string
// ): boolean => {
//   if (!form2) return false;
  
//   // If the forms are exactly the same, they're equivalent
//   if (form1 === form2) return true;
  
//   // Special cases for letters with identical forms
//   const letter = arabicLetters.find(l => l.id === letterId);
//   if (!letter) return false;
  
//   // Non-connectable letters have identical beginning and isolated forms
//   if (!isLeftConnectable(letterId)) {
//     if (
//       (form1 === 'beginning' && form2 === 'isolated') ||
//       (form1 === 'isolated' && form2 === 'beginning')
//     ) {
//       return true;
//     }
//   }
  
//   // Letters like alif have identical middle and end forms
//   const lettersWithIdenticalMiddleEnd = ['alif', 'dal', 'thal', 'ra', 'zai', 'waw', 'hamza'];
//   if (lettersWithIdenticalMiddleEnd.includes(letterId)) {
//     if (
//       (form1 === 'middle' && form2 === 'end') ||
//       (form1 === 'end' && form2 === 'middle')
//     ) {
//       return true;
//     }
//   }
  
//   return false;
// };

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
    return isLeftConnectable(letterId) ? 'end' : 'isolated';
  }

  // If it's a middle letter
  return isLeftConnectable(letterId) && isRightConnectable(letterId) ? 'middle' : 'isolated';
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

// Check if two letter forms would look identical
const areFormsIdentical = (
  letterId: string,
  form1: string,
  form2: string
): boolean => {
  const letter = arabicLetters.find(l => l.id === letterId);
  if (!letter) return false;
  console.log("letter: ",letter)
  console.log("letter[form1 as keyof ArabicLetter]: ",letter[form1 as keyof ArabicLetter])
  console.log("letter[form2 as keyof ArabicLetter]: ",letter[form2 as keyof ArabicLetter])
  return letter[form1 as keyof ArabicLetter] === letter[form2 as keyof ArabicLetter];
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
  const usedForms = new Set(correctLetters.map(l => `${l.letterId}-${l.position}`));
  
  // First, add different forms of the correct letters that don't look identical
  for (const correctLetter of correctLetters) {
    const letter = arabicLetters.find(l => l.id === correctLetter.letterId);
    if (!letter) continue;
    
    const positions = ['beginning', 'middle', 'end', 'isolated'] as const;
    for (const pos of positions) {
      const formKey = `${correctLetter.letterId}-${pos}`;
      if (!usedForms.has(formKey) && !areFormsIdentical(correctLetter.letterId, correctLetter.position, pos)) {
        distractors.push({
          char: letter[pos],
          position: pos,
          letterId: correctLetter.letterId,
          isCorrect: false
        });
        usedForms.add(formKey);
        if (distractors.length >= distractorsNeeded) break;
      }
    }
    if (distractors.length >= distractorsNeeded) break;
  }
  
  // If we still need more distractors, add different letters
  while (distractors.length < distractorsNeeded) {
    // Get a random letter that's not in the correct letters
    const availableLetters = arabicLetters.filter(l => 
      !correctLetters.some(cl => cl.letterId === l.id)
    );
    
    if (availableLetters.length === 0) break;
    
    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    const positions = ['beginning', 'middle', 'end', 'isolated'] as const;
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    
    const formKey = `${randomLetter.id}-${randomPosition}`;
    if (!usedForms.has(formKey)) {
      distractors.push({
        char: randomLetter[randomPosition],
        position: randomPosition,
        letterId: randomLetter.id,
        isCorrect: false
      });
      usedForms.add(formKey);
    }
  }
  
  // Combine correct letters and distractors, then shuffle
  return shuffleArray([...markedCorrectLetters, ...distractors]);
};