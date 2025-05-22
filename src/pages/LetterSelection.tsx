import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arabicLetters } from '../data/arabicLetters';
import Button from '../components/common/Button';

const LetterSelection: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const navigate = useNavigate();

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

  // Save selected letters and proceed to games
  const handleContinue = () => {
    if (selectedLetters.length === 0) {
      alert('الرجاء اختيار حرف واحد على الأقل');
      return;
    }
    localStorage.setItem('selectedLetters', JSON.stringify(selectedLetters));
    navigate('/games');
  };

  // Load previously selected letters if any
  useEffect(() => {
    const saved = localStorage.getItem('selectedLetters');
    if (saved) {
      setSelectedLetters(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          اختر الحروف التي تعرفها
        </h2>

        <div className="space-y-8">
          <div className="bg-teal-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-teal-800 mb-3">
              اختر الحروف التي تريد التدرب عليها:
            </h3>

            {/* Consonants Section */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-teal-600 mb-2">
                الحروف
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {letterGroups.consonants.map((letter) => (
                  <div 
                    key={letter.id}
                    className={`
                      p-1 rounded-md cursor-pointer transition-all duration-200
                      ${selectedLetters.includes(letter.id) 
                        ? 'bg-teal-200 border-2 border-teal-400 shadow-inner' 
                        : 'bg-white border border-gray-200 hover:border-teal-300'}
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
              <h4 className="text-md font-medium text-teal-600 mb-2">
                حروف المد
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {letterGroups.longVowels.map((letter) => (
                  <div 
                    key={letter.id}
                    className={`
                      p-1 rounded-md cursor-pointer transition-all duration-200
                      ${selectedLetters.includes(letter.id) 
                        ? 'bg-teal-200 border-2 border-teal-400 shadow-inner' 
                        : 'bg-white border border-gray-200 hover:border-teal-300'}
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

          <div className="text-center mt-8">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleContinue}
              disabled={selectedLetters.length === 0}
            >
              متابعة إلى الألعاب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterSelection;