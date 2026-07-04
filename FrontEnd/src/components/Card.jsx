const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseStyles = 'minimal-card';
  const hoverStyles = hover || onClick ? 'cursor-pointer hover:border-gray-300 transition-all duration-200' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
