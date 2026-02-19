import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 hover:bg-stone-100 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 rounded-b-xl flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
