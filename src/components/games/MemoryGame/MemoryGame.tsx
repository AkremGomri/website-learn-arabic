import React, { useState, useEffect, useRef } from 'react';
import { getRandomWord, ArabicWord } from '../../../data/arabicWords';
import { shuffleArray, generateLetterOptions, areLetterFormsEquivalent } from '../../../utils/arabicUtils';
import Button from '../../common/Button';
import { RefreshCw, Check, X, Trophy, Clock3 } from 'lucide-react';

const MemoryGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<ArabicWord | null>(null);
  const [isWordVisible, setIsWordVisible] = useState(true);
  const [letterOptions, setLetterOptions] = useState<Array<{
    char: string;
    position: string;
    letterId: string;
    isCorrect: boolean;
  }>>([]);
  const [selectedLetters, setSelectedLetters] = useState<{
    char: string;
    position: string;
    letterId: string;
    isCorrect: boolean;
  }[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'loading' | 'showing' | 'playing' | 'success' | 'failed'>('loading');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timeLeft, setTimeLeft] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start a new round
  const startNewRound = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setIsWordVisible(true);
    setSelectedLetters([]);
    setGameState('showing');
    setTimeLeft(5);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsWordVisible(false);
          setGameState('playing');
          
          const options = generateLetterOptions(word.letters, 12);
          setLetterOptions(options);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  useEffect(() => {
    startNewRound();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [difficulty]);
  
  const handleLetterSelect = (letter: typeof letterOptions[0]) => {
    console.log("letter: ",letter)
    if (gameState !== 'playing') return;
    console.log("Game is on ! ")
    // Check if the letter is already selected
    if (selectedLetters.some(l => l.char === letter.char && l.position === letter.position)) {
      console.log("letter is 100% compatible")
      return;
    }
    
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
    
    const expectedLength = currentWord?.letters.length || 0;
    if (newSelectedLetters.length === expectedLength) {
      // Check if the selection is correct using visual equivalence
      console.log("cheking if they are visually the same")
      const isCorrect = newSelectedLetters.every((letter, index) => {
        const expected = currentWord?.letters[index];
        console.log(`${letter.letterId} === ${expected?.letterId} : ${letter.letterId === expected?.letterId}`)
        console.log(`areLetterFormsEquivalent(${letter.letterId}, ${letter.position}, ${expected?.position}) : ${areLetterFormsEquivalent(letter.letterId, letter.position, expected?.position)}`)
        return (
          letter.letterId === expected?.letterId &&
          areLetterFormsEquivalent(letter.letterId, letter.position, expected?.position)
        );
      });
      
      if (isCorrect) {
        console.log("All letters match perfectly")
        setScore(prev => prev + 1);
        setGameState('success');
      } else {
        console.log("not all letters match")
        setGameState('failed');
      }
    }
  };
  
  const resetSelection = () => {
    setSelectedLetters([]);
  };
  
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setScore(0);
    startNewRound();
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">
            لعبة الذاكرة والحروف
          </h2>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="bg-orange-100 text-orange-800 font-semibold px-3 py-1 rounded-full flex items-center">
              <Trophy size={16} className="mr-1" />
              النقاط: {score}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <button
              className={`px-4 py-2 rounded-full ${
                difficulty === 'easy'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              onClick={() => changeDifficulty('easy')}
            >
              سهل
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                difficulty === 'medium'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              onClick={() => changeDifficulty('medium')}
            >
              متوسط
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                difficulty === 'hard'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              onClick={() => changeDifficulty('hard')}
            >
              صعب
            </button>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          {gameState === 'showing' && currentWord && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                احفظ هذه الكلمة!
              </h3>
              
              <div className="my-8">
                <div className="text-6xl font-arabic mb-4">{currentWord.word}</div>
                <div className="text-gray-600">{currentWord.meaning}</div>
              </div>
              
              <div className="bg-orange-100 inline-flex items-center px-4 py-2 rounded-full text-orange-800">
                <Clock3 size={18} className="mr-2" />
                <span className="text-lg font-bold">{timeLeft}</span>
              </div>
            </div>
          )}
          
          {gameState === 'playing' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">
                حان دورك! اختر الحروف بالترتيب الصحيح
              </h3>
              
              <div className="min-h-16 bg-white p-4 rounded-lg shadow-inner mb-6 flex justify-center items-center">
                {selectedLetters.length > 0 ? (
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    {selectedLetters.map((letter, index) => (
                      <div 
                        key={index}
                        className="text-3xl font-arabic bg-orange-100 w-12 h-12 flex items-center justify-center rounded-md"
                      >
                        {letter.char}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">اختر الحروف من الأسفل</p>
                )}
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                {letterOptions.map((letter, index) => (
                  <div
                    key={index}
                    className={`
                      p-2 rounded-md cursor-pointer transition-all duration-200
                      ${selectedLetters.some(l => l.char === letter.char && l.position === letter.position)
                        ? 'bg-orange-200 opacity-50'
                        : 'bg-white border border-orange-200 hover:bg-orange-100'}
                    `}
                    onClick={() => handleLetterSelect(letter)}
                  >
                    <div className="text-2xl font-arabic">{letter.char}</div>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={resetSelection}
                disabled={selectedLetters.length === 0}
              >
                إعادة ضبط
              </Button>
            </div>
          )}
          
          {gameState === 'success' && (
            <div className="text-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                <Check size={48} className="mx-auto mb-2" />
                <h3 className="text-xl font-bold">أحسنت! إجابة صحيحة</h3>
                <p className="mt-2">
                  الكلمة كانت: <span className="font-bold font-arabic text-xl">{currentWord?.word}</span>
                </p>
              </div>
              
              <Button
                variant="accent"
                onClick={startNewRound}
                className="flex items-center mx-auto"
              >
                <RefreshCw size={18} className="mr-2" />
                كلمة جديدة
              </Button>
            </div>
          )}
          
          {gameState === 'failed' && (
            <div className="text-center">
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                <X size={48} className="mx-auto mb-2" />
                <h3 className="text-xl font-bold">عذراً! ليست الإجابة الصحيحة</h3>
                <p className="mt-2">
                  الكلمة الصحيحة كانت: <span className="font-bold font-arabic text-xl">{currentWord?.word}</span>
                </p>
                <div className="mt-4 flex justify-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">الترتيب الصحيح:</p>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {currentWord?.letters.map((letter, index) => (
                        <div 
                          key={index}
                          className="text-xl font-arabic bg-green-100 w-10 h-10 flex items-center justify-center rounded-md"
                        >
                          {letter.char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="accent"
                onClick={startNewRound}
                className="flex items-center mx-auto"
              >
                <RefreshCw size={18} className="mr-2" />
                حاول مرة أخرى
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;