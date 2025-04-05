"use client";

import React, { Fragment, useRef, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Menentukan lebar modal berdasarkan size
  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }[size];

  // Menutup modal saat tombol Escape ditekan
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Menutup modal saat klik di luar modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      >
        {/* Modal container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          {/* Modal */}
          <div
            ref={modalRef}
            className={`${sizeClass} w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all overflow-hidden`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal header (opsional) */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3
                  id="modal-title"
                  className="text-lg font-medium text-gray-900 dark:text-white"
                >
                  {title}
                </h3>
              </div>
            )}

            {/* Modal content */}
            <div className={!title ? 'p-0' : ''}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal; 