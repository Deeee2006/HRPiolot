const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseStyles = 'bg-white border border-gray-200 rounded-lg p-5';
  const hoverStyles = hover || onClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all duration-200' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
