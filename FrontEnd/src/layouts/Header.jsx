import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Header = ({ title }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  const pageSubtitle = useMemo(() => {
    if (location.pathname.includes('admin')) return 'Admin Panel';
    if (location.pathname.includes('employee')) return 'Employee Portal';
    return null;
  }, [location.pathname]);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-30 bg-pink border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
            {pageSubtitle && (
              <span className="hidden sm:inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {pageSubtitle}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{currentDate}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <div
              role="img"
              aria-label={user?.name ? `${user.name}'s avatar` : 'User avatar'}
              title={user?.name || 'User'}
              className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0"
            >
              {initial}
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-tight truncate max-w-[10rem]">
                {user?.name || 'Guest'}
              </p>
              <p className="text-xs text-gray-500 capitalize leading-tight truncate">
                {user?.role || 'No role'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;