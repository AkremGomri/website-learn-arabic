import React, { useState, useEffect } from 'react';
import { ArabicLetter } from '../../data/arabicLetters';
import { Volume2 } from 'lucide-react';

interface LetterCardProps {
  letter: ArabicLetter;
  onClick?: () => void;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  form?: 'isolated' | 'beginning' | 'middle' | 'end';
  isInteractive?: boolean;
}

const LetterCard: React.FC<LetterCardProps> = ({
  letter,
  onClick,
  showDetails = false,
  size = 'md',
  form,
  isInteractive = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [randomForm, setRandomForm] = useState<'isolated' | 'beginning' | 'middle' | 'end'>('isolated');
  
  // Size classes
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl'
  };
  
  // Generate a random form on mount
  useEffect(() => {
    const forms: ('isolated' | 'beginning' | 'middle' | 'end')[] = ['isolated', 'beginning', 'middle', 'end'];
    const randomIndex = Math.floor(Math.random() * forms.length);
    setRandomForm(forms[randomIndex]);
  }, [letter]);
  
  // Play pronunciation audio
  const playPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would play the actual sound file
    console.log(`Playing pronunciation for ${letter.pronunciation}`);
    
    // For now, use the browser's speech synthesis as a placeholder
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter.pronunciation);
      utterance.lang = 'ar';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Get the appropriate letter form
  const getLetterDisplay = () => {
    const displayForm = form || randomForm;
    return letter[displayForm];
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${isInteractive ? 'cursor-pointer' : ''}
        bg-white rounded-lg shadow-md flex flex-col items-center justify-center
        border-2 border-teal-200 hover:border-teal-400
        transition-all duration-300 transform
        ${isHovered && isInteractive ? 'scale-110' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
    >
      <div className="text-center font-arabic">
        {getLetterDisplay()}
      </div>
      
      {(showDetails || isHovered) && (
        <div className="mt-2 text-xs text-gray-600 font-medium">
          {letter.pronunciation}
          {isInteractive && (
            <button
              className="ml-1 text-teal-500 hover:text-teal-700 transition-colors"
              onClick={playPronunciation}
            >
              <Volume2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LetterCard;