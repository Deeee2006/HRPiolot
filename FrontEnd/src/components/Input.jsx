const Input = ({ label, error, className = '', icon, floating = false, rightElement, ...props }) => {
  const hasValue = props.value != null && String(props.value).length > 0;

  if (floating) {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative group">
          {icon && (
            <div
              className={`absolute left-3.5 z-10 pointer-events-none transition-all duration-200 ${
                hasValue
                  ? 'top-3 text-purple-500'
                  : 'top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:top-3 group-focus-within:-translate-y-0 group-focus-within:text-purple-500'
              }`}
            >
              {icon}
            </div>
          )}
          <input
            className={`w-full px-4 pt-5 pb-2 rounded-xl bg-white/60 backdrop-blur-sm border-2 transition-all duration-300 text-purple-900 placeholder-transparent focus:outline-none ${
              icon ? 'pl-10' : ''
            } ${
              rightElement ? 'pr-10' : ''
            } ${
              error
                ? 'border-red-300 focus:border-red-400 focus:shadow-[0_4px_16px_rgba(239,68,68,0.1)]'
                : 'border-purple-200/60 focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.12)] focus:bg-white/80'
            } ${className}`}
            placeholder=" "
            {...props}
          />
          {label && (
            <label
              className={`absolute left-0 transition-all duration-200 pointer-events-none select-none ${
                icon ? 'left-10' : 'left-4'
              } ${
                hasValue
                  ? 'top-1 text-xs text-purple-500 font-medium'
                  : 'top-1/2 -translate-y-1/2 text-sm text-purple-400 group-focus-within:top-1 group-focus-within:-translate-y-0 group-focus-within:text-xs group-focus-within:text-purple-500 group-focus-within:font-medium'
              }`}
            >
              {label}
            </label>
          )}
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-500 font-medium flex items-center gap-1 animate-fadeIn">
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
  }

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
          className={`w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.1)] focus:bg-white/80 transition-all duration-300 ${
            icon ? 'pl-10' : ''
          } ${
            rightElement ? 'pr-10' : ''
          } ${
            error ? 'border-red-300 focus:border-red-400 focus:shadow-[0_4px_16px_rgba(239,68,68,0.1)]' : ''
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
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
