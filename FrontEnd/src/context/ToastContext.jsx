import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-slideIn px-5 py-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl border flex items-center gap-3 min-w-[300px] max-w-[420px] ${
              toast.type === 'success'
                ? 'bg-green-100/90 border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-100/90 border-red-200 text-red-800'
                : toast.type === 'warning'
                ? 'bg-yellow-100/90 border-yellow-200 text-yellow-800'
                : 'bg-purple-100/90 border-purple-200 text-purple-800'
            }`}
          >
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
