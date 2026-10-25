import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/frontend/components/home/Marquee';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal shell used by the Colleges and Courses pages.
 * - role="dialog" + aria-modal + aria-labelledby (and optional aria-describedby)
 * - moves focus into the panel on open (first element marked data-autofocus, otherwise the first focusable)
 * - traps Tab / Shift+Tab inside the panel, closes on Escape or a click on the backdrop
 * - locks page scroll while open and restores both scroll and focus on close
 */
export default function DialogShell({ onClose, labelledBy, describedBy, panelClassName = '', children }) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const previous = document.activeElement;
    const initial = panel.querySelector('[data-autofocus]') || panel.querySelector(FOCUSABLE);
    (initial || panel).focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active);
      if (e.shiftKey && (active === first || active === panel || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCloseRef.current();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl focus:outline-none sm:rounded-3xl ${panelClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
