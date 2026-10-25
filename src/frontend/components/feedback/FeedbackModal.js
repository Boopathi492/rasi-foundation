import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRegCommentDots } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';

export default function FeedbackModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the first input inside the modal
    const focusTimer = setTimeout(() => {
      if (dialogRef.current) {
        const firstInput = dialogRef.current.querySelector('input:not([type="hidden"]), textarea, select, button');
        firstInput?.focus();
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6"
          aria-live="polite"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
          />

          {/* Modal Container: ~70% viewport width on desktop, capped at max-w-3xl */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            aria-describedby="feedback-modal-desc"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 flex max-h-[90vh] w-[94vw] sm:w-[85vw] lg:w-[70vw] max-w-3xl flex-col overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-[0_24px_60px_rgba(7,85,68,0.22)] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-forest via-[#075544] to-crimson px-5 py-4 text-white sm:px-7">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                  <FaRegCommentDots className="text-base" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="feedback-modal-title" className="font-heading text-lg font-bold text-white sm:text-xl">
                    Share Your Feedback
                  </h2>
                  <p id="feedback-modal-desc" className="text-xs text-white/85">
                    Help other students and families with your authentic admission experience.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close feedback dialog"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-colors hover:bg-white hover:text-crimson focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FaTimes className="text-xs" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <FeedbackForm isModal={true} onCloseModal={handleClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
