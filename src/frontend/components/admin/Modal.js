import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'md',
  children,
  footer,
  preventClose = false,
  initialFocusRef = null,
}) {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const onCloseRef = useRef(onClose);
  const preventCloseRef = useRef(preventClose);
  const initialFocusRefRef = useRef(initialFocusRef);

  // Keep callback refs synchronized without re-triggering the open effect
  onCloseRef.current = onClose;
  preventCloseRef.current = preventClose;
  initialFocusRefRef.current = initialFocusRef;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!preventCloseRef.current) {
          e.preventDefault();
          onCloseRef.current?.();
        }
        return;
      }

      // Keyboard navigation / focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on modal open: prioritize specified ref or first editable input in modal body
    const timer = setTimeout(() => {
      if (!modalRef.current) return;

      const customRef = initialFocusRefRef.current;
      if (customRef && customRef.current && typeof customRef.current.focus === 'function') {
        customRef.current.focus();
        return;
      }

      const bodyElement = modalRef.current.querySelector('[data-modal-body]');
      const firstInput = bodyElement?.querySelector(
        'input:not([type="hidden"]):not([disabled]):not([readonly]), textarea:not([disabled]):not([readonly]), select:not([disabled])'
      );

      if (firstInput) {
        firstInput.focus();
      } else {
        const firstFocusable = modalRef.current.querySelector(
          'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
        try {
          previouslyFocusedElement.current.focus();
        } catch {
          // Ignore focus errors on unmounted elements
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only run when open state toggles, NEVER on keystroke/re-render!

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-[1100px]',
    '2xl': 'max-w-[1280px]',
    full: 'max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-48px)]',
  }[size] || 'max-w-[1100px]';

  const handleBackdropClick = (e) => {
    // Only close if clicking the actual backdrop container, never inside dialog surface
    if (e.target === e.currentTarget && !preventCloseRef.current) {
      onCloseRef.current?.();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (!preventCloseRef.current) {
      onCloseRef.current?.();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses} max-h-[90dvh] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transform transition-all animate-scale-up`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h3 id="modal-headline" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={handleCloseClick}
            disabled={preventClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-40"
            aria-label="Close dialog"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div data-modal-body className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-3.5 sm:py-4 border-t border-slate-100 bg-slate-50/90 flex items-center justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-scale-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
