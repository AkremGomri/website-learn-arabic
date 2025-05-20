import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  // Base styles
  const baseStyles = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 shadow-md hover:shadow-lg",
    secondary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-md hover:shadow-lg",
    accent: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400 shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500"
  };
  
  // Disabled styles
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "transform hover:-translate-y-0.5";
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;