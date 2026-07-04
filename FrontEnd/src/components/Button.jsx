import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, ...props }) => {
  const baseStyles = 'font-medium rounded-2xl transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-[0_8px_16px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_24px_rgba(147,51,234,0.4)] hover:-translate-y-1 active:translate-y-0',
    secondary: 'bg-gradient-to-br from-pink-300 to-pink-500 text-white shadow-[0_8px_16px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_24px_rgba(236,72,153,0.4)] hover:-translate-y-1 active:translate-y-0',
    success: 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-[0_8px_16px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_24px_rgba(34,197,94,0.4)] hover:-translate-y-1 active:translate-y-0',
    danger: 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-[0_8px_16px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_24px_rgba(239,68,68,0.4)] hover:-translate-y-1 active:translate-y-0',
    outline: 'bg-white/50 backdrop-blur-sm border-2 border-purple-300 text-purple-700 shadow-[0_4px_8px_rgba(147,51,234,0.15)] hover:shadow-[0_8px_16px_rgba(147,51,234,0.25)] hover:-translate-y-1 active:translate-y-0',
    ghost: 'bg-white/30 backdrop-blur-sm text-purple-700 hover:bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
