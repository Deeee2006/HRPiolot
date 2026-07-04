import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.15)] border border-white/50 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-xl rounded-t-3xl px-6 py-4 border-b border-purple-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-purple-800">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
