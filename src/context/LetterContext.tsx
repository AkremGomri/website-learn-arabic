import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface LetterContextType {
  getSelectedLetters: () => string[];
  ensureLettersSelected: () => void;
}

const LetterContext = createContext<LetterContextType | null>(null);

export const useLetters = () => {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error('useLetters must be used within a LetterProvider');
  }
  return context;
};

export const LetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const getSelectedLetters = (): string[] => {
    const saved = localStorage.getItem('selectedLetters');
    return saved ? JSON.parse(saved) : [];
  };

  const ensureLettersSelected = () => {
    const letters = getSelectedLetters();
    if (letters.length === 0) {
      navigate('/select-letters');
    }
  };

  return (
    <LetterContext.Provider value={{ getSelectedLetters, ensureLettersSelected }}>
      {children}
    </LetterContext.Provider>
  );
};