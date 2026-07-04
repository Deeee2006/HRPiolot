import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  const baseStyles = 'bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/50';
  const hoverStyles = hover ? 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
