import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-purple-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_12px_rgba(147,51,234,0.15)] transition-all duration-300 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

export default Input;
