const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseStyles = 'glass-card';
  const hoverStyles = hover || onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-300' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
