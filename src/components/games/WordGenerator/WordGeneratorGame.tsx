import React, { useState, useEffect } from 'react';
import { arabicLetters, ArabicLetter } from '../../../data/arabicLetters';
import { generateWord } from '../../../data/arabicWords';
import LetterCard from '../../common/LetterCard';
import Button from '../../common/Button';
import { RefreshCw, Volume2 } from 'lucide-react';

const WordGeneratorGame: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [maxLength, setMaxLength] = useState<number>(4);
  const [generatedWord, setGeneratedWord] = useState<string>('');
  const [wordLetters, setWordLetters] = useState<Array<{char: string, position: string, letterId: string}>>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Group letters by type
  const letterGroups = {
    consonants: arabicLetters.filter(letter => 
      !['alif', 'waw', 'ya'].includes(letter.id) || 
      letter.id.endsWith('_cons')
    ),
    longVowels: arabicLetters.filter(letter => 
      ['alif', 'waw', 'ya'].includes(letter.id) &&
      !letter.id.endsWith('_cons')
    )
  };
  
  // Select/deselect a letter
  const toggleLetter = (letterId: string) => {
    if (selectedLetters.includes(letterId)) {
      setSelectedLetters(prev => prev.filter(id => id !== letterId));
    } else {
      setSelectedLetters(prev => [...prev, letterId]);
    }
  };
  
  // Generate a new word
  const generateNewWord = () => {
    if (selectedLetters.length === 0) {
      alert('الرجاء اختيار حرف واحد على الأقل');
      return;
    }
    
    const { word, letters } = generateWord(selectedLetters, maxLength);
    setGeneratedWord(word);
    setWordLetters(letters);
    setIsPlaying(true);
  };
  
  // Reset the game
  const resetGame = () => {
    setGeneratedWord('');
    setWordLetters([]);
    setIsPlaying(false);
  };
  
  // Pronounce the word
  const pronounceWord = () => {
    if ('speechSynthesis' in window && generatedWord) {
      const utterance = new SpeechSynthesisUtterance(generatedWord);
      utterance.lang = 'ar';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          مولد الكلمات العربية
        </h2>
        
        {!isPlaying ? (
          <div className="space-y-8">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-3">
                اختر الحروف التي تريد التدرب عليها:
              </h3>
              
              {/* Consonants Section */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-purple-600 mb-2">
                  الحروف
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {letterGroups.consonants.map((letter) => (
                    <div 
                      key={letter.id}
                      className={`
                        p-1 rounded-md cursor-pointer transition-all duration-200
                        ${selectedLetters.includes(letter.id) 
                          ? 'bg-purple-200 border-2 border-purple-400 shadow-inner' 
                          : 'bg-white border border-gray-200 hover:border-purple-300'}
                      `}
                      onClick={() => toggleLetter(letter.id)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-arabic">{letter.isolated}</span>
                        <span className="text-xs text-gray-600">{letter.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Long Vowels Section */}
              <div>
                <h4 className="text-md font-medium text-purple-600 mb-2">
                  حروف المد
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {letterGroups.longVowels.map((letter) => (
                    <div 
                      key={letter.id}
                      className={`
                        p-1 rounded-md cursor-pointer transition-all duration-200
                        ${selectedLetters.includes(letter.id) 
                          ? 'bg-purple-200 border-2 border-purple-400 shadow-inner' 
                          : 'bg-white border border-gray-200 hover:border-purple-300'}
                      `}
                      onClick={() => toggleLetter(letter.id)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-arabic">{letter.isolated}</span>
                        <span className="text-xs text-gray-600">{letter.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                تم اختيار {selectedLetters.length} من أصل {arabicLetters.length} حرف
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-3">
                اختر الحد الأقصى لطول الكلمة:
              </h3>
              
              <div className="flex items-center">
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={maxLength}
                  onChange={(e) => setMaxLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  {maxLength}
                </span>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={generateNewWord}
                disabled={selectedLetters.length === 0}
              >
                ابدأ اللعبة
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-purple-100 p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium text-purple-800 mb-4">
                الكلمة المولدة:
              </h3>
              
              <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                  <div className="flex justify-center items-center text-4xl md:text-6xl font-arabic mb-2">
                    {generatedWord}
                    <button
                      className="ml-3 text-purple-600 hover:text-purple-800 focus:outline-none"
                      onClick={pronounceWord}
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {wordLetters.map((letter, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-2xl font-arabic">{letter.char}</div>
                      <div className="text-xs text-gray-500">
                        {letter.position === 'beginning' && 'البداية'}
                        {letter.position === 'middle' && 'الوسط'}
                        {letter.position === 'end' && 'النهاية'}
                        {letter.position === 'isolated' && 'منفصل'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="secondary"
                onClick={generateNewWord}
                className="flex items-center"
              >
                <RefreshCw size={18} className="mr-2" />
                كلمة جديدة
              </Button>
              
              <Button 
                variant="outline"
                onClick={resetGame}
              >
                العودة للإعدادات
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGeneratorGame;