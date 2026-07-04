const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, loading = false, icon, ...props }) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 cursor-pointer overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_4px_14px_rgba(147,51,234,0.3)] hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700',
    secondary: 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-[0_4px_14px_rgba(236,72,153,0.3)] hover:shadow-[0_8px_24px_rgba(236,72,153,0.4)] hover:-translate-y-0.5 active:translate-y-0',
    success: 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0',
    danger: 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:shadow-[0_8px_24px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 active:translate-y-0',
    outline: 'bg-white/70 backdrop-blur-sm border-2 border-purple-300 text-purple-700 shadow-[0_2px_8px_rgba(147,51,234,0.1)] hover:shadow-[0_6px_16px_rgba(147,51,234,0.2)] hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/90',
    ghost: 'bg-transparent text-purple-700 hover:bg-purple-100/60 shadow-none',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const stateStyles = disabled ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${stateStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;
