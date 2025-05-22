import React, { useState, useEffect, useCallback } from 'react';
import { ArabicLetter, getRandomLetter, arabicLetters } from '../../../data/arabicLetters';
import LetterCard from '../../common/LetterCard';
import Button from '../../common/Button';
import { RefreshCw as Refresh, MoveLeft, Volume2 } from 'lucide-react';
import { useLetters } from '../../../context/LetterContext';

const LetterFormsGame: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState<ArabicLetter | null>(null);
  const [showForms, setShowForms] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { getSelectedLetters, ensureLettersSelected } = useLetters();
  
  // Get a new random letter from selected letters
  const getNewLetter = useCallback(() => {
    const selectedLetterIds = getSelectedLetters();
    const selectedLetters = arabicLetters.filter(letter => selectedLetterIds.includes(letter.id));
    const randomIndex = Math.floor(Math.random() * selectedLetters.length);
    setCurrentLetter(selectedLetters[randomIndex]);
    setShowForms(false);
  }, [getSelectedLetters]);
  
  // Initialize with a random letter and ensure letters are selected
  useEffect(() => {
    ensureLettersSelected();
    getNewLetter();
  }, [getNewLetter, ensureLettersSelected]);
  
  // Handle recording pronunciation (placeholder for speech recognition)
  const handleRecordPronunciation = () => {
    setIsRecording(true);
    
    // Simulate speech recognition process
    setTimeout(() => {
      setIsRecording(false);
      
      // In a real app, this would check the pronunciation against the expected one
      // For now, let's simulate success with 80% chance
      const isCorrect = Math.random() < 0.8;
      
      if (isCorrect) {
        alert('رائع! النطق صحيح');
        setShowForms(true);
      } else {
        alert('حاول مرة أخرى. انطق الحرف بوضوح');
      }
    }, 2000);
  };
  
  // Handle manual show forms (without pronunciation)
  const handleShowForms = () => {
    setShowForms(true);
  };
  
  if (!currentLetter) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          تعلم أشكال الحروف العربية
        </h2>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            انظر إلى الحرف التالي، انطقه بصوت عالٍ، ثم انقر على "أظهر الأشكال" لرؤية أشكاله المختلفة.
          </p>
          
          {/* Main letter display */}
          <div className="flex flex-col items-center my-8 relative">
            <LetterCard letter={currentLetter} size="lg" onClick={handleShowForms} />
            <div className="mt-4 text-lg text-gray-700">
              {currentLetter.name}
              <button
                className="inline-flex items-center justify-center ml-2 text-teal-600 hover:text-teal-700"
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(currentLetter.pronunciation);
                    utterance.lang = 'ar';
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              variant="primary" 
              onClick={handleRecordPronunciation}
              disabled={isRecording}
            >
              {isRecording ? 'جاري الاستماع...' : 'انطق الحرف'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleShowForms}
            >
              أظهر الأشكال
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={getNewLetter}
              className="flex items-center"
            >
              <Refresh size={18} className="mr-1" />
              حرف آخر
            </Button>
          </div>
        </div>
        
        {/* Letter forms display */}
        {showForms && (
          <div className="mt-12 bg-teal-50 rounded-lg p-6 border border-teal-200">
            <h3 className="text-xl font-semibold text-teal-800 mb-4 text-center">
              أشكال الحرف {currentLetter.isolated}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <div className="flex flex-col items-center">
                <LetterCard 
                  letter={currentLetter} 
                  size="md" 
                  form="isolated"
                  isInteractive={false}
                  showDetails={true}
                />
                <p className="mt-2 text-sm font-medium text-gray-600">منفصل</p>
              </div>
              
              <div className="flex flex-col items-center">
                <LetterCard 
                  letter={currentLetter} 
                  size="md" 
                  form="beginning"
                  isInteractive={false}
                  showDetails={true}
                />
                <p className="mt-2 text-sm font-medium text-gray-600">في البداية</p>
              </div>
              
              <div className="flex flex-col items-center">
                <LetterCard 
                  letter={currentLetter} 
                  size="md" 
                  form="middle"
                  isInteractive={false}
                  showDetails={true}
                />
                <p className="mt-2 text-sm font-medium text-gray-600">في الوسط</p>
              </div>
              
              <div className="flex flex-col items-center">
                <LetterCard 
                  letter={currentLetter} 
                  size="md" 
                  form="end"
                  isInteractive={false}
                  showDetails={true}
                />
                <p className="mt-2 text-sm font-medium text-gray-600">في النهاية</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold text-gray-700 mb-2">أمثلة:</h4>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xl font-arabic">
                  {currentLetter.id === 'alif' && 'أحمد، أمل، أسد'}
                  {currentLetter.id === 'ba' && 'باب، كتاب، قلب'}
                  {currentLetter.id === 'ta' && 'تفاح، كتاب، بيت'}
                  {currentLetter.id === 'tha' && 'ثعلب، مثلث، حديث'}
                  {currentLetter.id === 'jim' && 'جمل، سجادة، خليج'}
                  {currentLetter.id === 'ha' && 'حصان، أحمد، تفاح'}
                  {currentLetter.id === 'kha' && 'خروف، نخلة، بطيخ'}
                  {currentLetter.id === 'dal' && 'دب، مدرسة، ولد'}
                  {currentLetter.id === 'thal' && 'ذهب، تلميذ، لذيذ'}
                  {currentLetter.id === 'ra' && 'رمان، مدرسة، نمر'}
                  {currentLetter.id === 'zai' && 'زرافة، مزرعة، أرز'}
                  {currentLetter.id === 'sin' && 'سمك، مسجد، شمس'}
                  {currentLetter.id === 'shin' && 'شمس، مشمش، ريش'}
                  {currentLetter.id === 'sad' && 'صقر، قصة، قميص'}
                  {currentLetter.id === 'dad' && 'ضفدع، خضار، بيض'}
                  {currentLetter.id === 'ta_' && 'طماطم، بطة، قط'}
                  {currentLetter.id === 'za_' && 'ظرف، نظارة، حفظ'}
                  {currentLetter.id === 'ain' && 'عنب، معلم، مربع'}
                  {currentLetter.id === 'ghain' && 'غراب، صغير، صمغ'}
                  {currentLetter.id === 'fa' && 'فيل، سفينة، خروف'}
                  {currentLetter.id === 'qaf' && 'قلم، بقرة، طبق'}
                  {currentLetter.id === 'kaf' && 'كتاب، سمك، ديك'}
                  {currentLetter.id === 'lam' && 'ليمون، قلم، فيل'}
                  {currentLetter.id === 'mim' && 'موز، جمل، قلم'}
                  {currentLetter.id === 'nun' && 'نمر، عنب، حصان'}
                  {currentLetter.id === 'ha_' && 'هرم، نهر، وجه'}
                  {currentLetter.id === 'waw' && 'وردة، لون، دلو'}
                  {currentLetter.id === 'ya' && 'يد، بيت، كرسي'}
                  {currentLetter.id === 'hamza' && 'أرنب، فأر، لؤلؤ'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="accent" size="lg" onClick={getNewLetter}>
          <Refresh size={20} className="mr-2" />
          حرف جديد
        </Button>
      </div>
    </div>
  );
};

export default LetterFormsGame;