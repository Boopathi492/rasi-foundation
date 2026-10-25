import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt } from 'react-icons/fa';
import EnquiryForm, { ENQUIRY_SESSION_KEY, markEnquiryPopupDismissed } from './EnquiryForm';
import { usePrefersReducedMotion } from './Marquee';
import { CONTACT } from '@/data/siteConfig';

const OPEN_DELAY_MS = 1500;

export default function EnquiryPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const autoCloseTimerRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const handleClose = useCallback(() => {
    markEnquiryPopupDismissed();
    setOpen(false);
  }, []);

  // Automatically open once per browsing session after a 1.5s delay on homepage entry
  useEffect(() => {
    setMounted(true);

    let alreadyDismissed = false;
    try {
      alreadyDismissed = window.sessionStorage.getItem(ENQUIRY_SESSION_KEY) === '1';
    } catch {
      alreadyDismissed = false;
    }

    if (alreadyDismissed) {
      if (process.env.NODE_ENV !== 'production') {
        // Helpful diagnostic for local testing
        console.info('[EnquiryPopup] Popup suppressed because session key "%s" is "1". Clear sessionStorage to test again.', ENQUIRY_SESSION_KEY);
      }
      return undefined;
    }

    const timer = window.setTimeout(() => {
      // Re-verify in case user submitted bottom enquiry before timer completed
      try {
        if (window.sessionStorage.getItem(ENQUIRY_SESSION_KEY) === '1') return;
      } catch {
        // ignore
      }
      previousFocusRef.current = document.activeElement;
      setOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  // Clean up auto-close timer on unmount
  useEffect(() => () => window.clearTimeout(autoCloseTimerRef.current), []);

  // Focus management, focus trap, Escape key and body scroll lock while modal is open
  useEffect(() => {
    if (!open) return undefined;

    const focusTimer = window.setTimeout(() => {
      if (firstFieldRef.current) {
        firstFieldRef.current.focus();
      } else {
        closeBtnRef.current?.focus();
      }
    }, 60);

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

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [open, handleClose]);

  const handleSuccess = () => {
    markEnquiryPopupDismissed();
    window.clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 2200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
          aria-live="polite"
        >
          {/* Backdrop */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.22 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px]"
          />

          {/* Compact Centred Modal Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-popup-title"
            aria-describedby="enquiry-popup-desc"
            initial={reduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            transition={reduced ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            {/* Brand Header Strip */}
            <div className="relative bg-forest px-5 py-4 pr-14 text-white sm:px-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/rasi-logo.png"
                  alt=""
                  width={40}
                  height={40}
                  sizes="40px"
                  className="h-10 w-10 shrink-0 rounded-full bg-white p-0.5 object-contain shadow-sm"
                />
                <div className="min-w-0">
                  <h2 id="enquiry-popup-title" className="font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                    Plan Your Admission Journey
                  </h2>
                  <p id="enquiry-popup-desc" className="mt-0.5 text-xs text-white/85">
                    Share your details for personalised course and college guidance.
                  </p>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={handleClose}
                aria-label="Close admission enquiry popup"
                className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-sm text-white transition-colors hover:bg-white hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            {/* Form Body */}
            <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <EnquiryForm
                idPrefix="popup-enq"
                compact
                firstFieldRef={firstFieldRef}
                onSuccess={handleSuccess}
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-[11px] text-gray-500">
                <span>Direct Helpline:</span>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center gap-1.5 font-bold text-forest hover:text-crimson"
                >
                  <FaPhoneAlt className="text-[10px]" aria-hidden="true" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
