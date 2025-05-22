import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Sparkles, Brain } from 'lucide-react';
import Button from '../components/common/Button';
import { useLetters } from '../context/LetterContext';

const Games: React.FC = () => {
  const { ensureLettersSelected } = useLetters();

  useEffect(() => {
    ensureLettersSelected();
  }, [ensureLettersSelected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-teal-700 text-center">
          ألعاب تعلم العربية
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Game 1: Letter Forms */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
              <div className="bg-teal-600 p-6 flex justify-center items-center h-48">
                <Book className="h-24 w-24 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-800 to-transparent h-24"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h2 className="text-2xl font-bold text-white">أشكال الحروف</h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6 h-24">
                تعلم أشكال الحروف العربية المختلفة عندما تكون في بداية الكلمة، وسطها، أو نهايتها. 
                انطق الحرف وشاهد كيف يتغير شكله.
              </p>
              
              <Link to="/letter-forms">
                <Button variant="primary" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Game 2: Word Generator */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
              <div className="bg-purple-600 p-6 flex justify-center items-center h-48">
                <Sparkles className="h-24 w-24 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-800 to-transparent h-24"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h2 className="text-2xl font-bold text-white">مولد الكلمات</h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6 h-24">
                تدرب على الحروف التي اخترتها من خلال كلمات مخصصة 
                تتكون فقط من الحروف التي تعرفها.
              </p>
              
              <Link to="/word-generator">
                <Button variant="secondary" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Game 3: Memory Game */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
              <div className="bg-orange-500 p-6 flex justify-center items-center h-48">
                <Brain className="h-24 w-24 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-700 to-transparent h-24"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h2 className="text-2xl font-bold text-white">لعبة الذاكرة</h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6 h-24">
                اختبر قدرتك على تذكر الكلمات المكونة من الحروف التي تعرفها. شاهد الكلمة لمدة 5 ثوانٍ، ثم 
                أعد تكوينها.
              </p>
              
              <Link to="/memory-game">
                <Button variant="accent" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/select-letters">
            <Button variant="outline" size="lg">
              تعديل الحروف المختارة
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;