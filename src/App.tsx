import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Games from './pages/Games';
import LetterSelection from './pages/LetterSelection';
import LetterFormsGame from './components/games/LetterForms/LetterFormsGame';
import WordGeneratorGame from './components/games/WordGenerator/WordGeneratorGame';
import MemoryGame from './components/games/MemoryGame/MemoryGame';
import { LetterProvider } from './context/LetterContext';

function App() {
  return (
    <Router>
      <LetterProvider>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50" dir="rtl">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/select-letters" element={<LetterSelection />} />
              <Route path="/games" element={<Games />} />
              <Route path="/letter-forms" element={<LetterFormsGame />} />
              <Route path="/word-generator" element={<WordGeneratorGame />} />
              <Route path="/memory-game" element={<MemoryGame />} />
            </Routes>
          </main>
          <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
            <p>تعلم العربية - تطبيق تعليمي للأطفال</p>
          </footer>
        </div>
      </LetterProvider>
    </Router>
  );
}

export default App;