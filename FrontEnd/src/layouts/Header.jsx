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
    <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-purple-100/60 px-6 py-3">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-purple-800">{title}</h2>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-600 border border-purple-200/60">
              {getPageSubtitle()}
            </span>
          </div>
          <p className="text-xs text-purple-400 mt-0.5">{currentDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-purple-100/50">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_12px_rgba(147,51,234,0.25)]">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-purple-800 leading-tight">{user?.name}</p>
              <p className="text-[11px] text-purple-400 capitalize leading-tight">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
