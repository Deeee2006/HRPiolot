const Input = ({ label, error, className = '', icon, floating = false, rightElement, ...props }) => {
  const hasValue = props.value != null && String(props.value).length > 0;

  if (floating) {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative group">
          {icon && (
            <div
              className={`absolute left-3.5 z-10 pointer-events-none transition-all duration-200 flex items-center ${
                hasValue
                  ? 'top-2.5 text-gray-500'
                  : 'top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:top-2.5 group-focus-within:-translate-y-0 group-focus-within:text-gray-500'
              }`}
            >
              {icon}
            </div>
          )}
          <input
            className={`h-10 w-full px-3 rounded-md bg-white border transition-all duration-200 text-gray-900 placeholder-transparent focus:outline-none ring-2 ring-transparent focus:ring-blue-500 ${
              icon ? 'pl-9' : ''
            } ${
              rightElement ? 'pr-9' : ''
            } ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500'
            } ${className}`}
            placeholder=" "
            {...props}
          />
          {label && (
            <label
              className={`absolute left-0 transition-all duration-200 pointer-events-none select-none ${
                icon ? 'left-9' : 'left-3'
              } ${
                hasValue
                  ? 'top-1 text-xs text-gray-500 font-medium'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 group-focus-within:top-1 group-focus-within:-translate-y-0 group-focus-within:text-xs group-focus-within:text-gray-500 group-focus-within:font-medium'
              }`}
            >
              {label}
            </label>
          )}
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-500 font-medium flex items-center gap-1 animate-fadeIn">
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`h-10 w-full rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none ring-2 ring-transparent focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 px-3 ${
            icon ? 'pl-10' : ''
          } ${
            rightElement ? 'pr-10' : ''
          } ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
