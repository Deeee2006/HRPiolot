const Badge = ({ children, variant = 'default', className = '', size = 'sm' }) => {
  const variants = {
    default: 'bg-purple-100/80 text-purple-700 border-purple-200/60',
    success: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/60',
    warning: 'bg-amber-100/80 text-amber-700 border-amber-200/60',
    danger: 'bg-red-100/80 text-red-700 border-red-200/60',
    info: 'bg-blue-100/80 text-blue-700 border-blue-200/60',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
