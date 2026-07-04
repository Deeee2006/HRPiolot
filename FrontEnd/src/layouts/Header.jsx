import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Header = ({ title }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getPageSubtitle = () => {
    if (location.pathname.includes('admin')) return 'Admin Panel';
    if (location.pathname.includes('employee')) return 'Employee Portal';
    return '';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {getPageSubtitle()}
            </span>
          </div>
          <p className="text-xs text-gray-500">{currentDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:flex flex-col">
              <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize leading-tight">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
