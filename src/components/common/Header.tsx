import React from 'react';
import { Globe, Book, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "تعلم العربية" }) => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Globe className="h-8 w-8" />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-6 rtl:space-x-reverse">
            <li>
              <Link 
                to="/" 
                className="flex items-center hover:text-teal-100 transition-colors"
              >
                <Home className="h-5 w-5 mr-1" />
                <span>الرئيسية</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/games" 
                className="flex items-center hover:text-teal-100 transition-colors"
              >
                <Book className="h-5 w-5 mr-1" />
                <span>الألعاب</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;