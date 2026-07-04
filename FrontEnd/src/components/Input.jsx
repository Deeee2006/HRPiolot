const Input = ({ label, error, className = '', icon, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-purple-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.1)] focus:bg-white/80 transition-all duration-300 ${icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:border-red-400 focus:shadow-[0_4px_16px_rgba(239,68,68,0.1)]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 3.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6 8V8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
