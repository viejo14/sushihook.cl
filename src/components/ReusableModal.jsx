import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export const ReusableModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
  zIndex = 'z-[80]'
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const currentCount = Number(body.dataset.modalOpenCount || '0');
    const nextCount = currentCount + 1;

    body.dataset.modalOpenCount = String(nextCount);
    body.classList.add('modal-open');

    return () => {
      const openCount = Number(body.dataset.modalOpenCount || '1');
      const updatedCount = Math.max(0, openCount - 1);

      if (updatedCount === 0) {
        body.classList.remove('modal-open');
        delete body.dataset.modalOpenCount;
      } else {
        body.dataset.modalOpenCount = String(updatedCount);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 ${zIndex} flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className={`relative my-2 sm:my-0 w-full ${maxWidth} max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] bg-[#0A0A0A] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
          >
            <div className="p-5 border-b border-zinc-800 shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {title && <h3 className="text-2xl font-semibold text-zinc-100 pr-10">{title}</h3>}
              {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
