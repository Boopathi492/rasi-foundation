import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// One step of a multi-step form: heading + helper text + fields. Re-mounted (via `key`) on every step change.
// When `focusHeading` is true the heading receives focus so keyboard / screen-reader users land on the new step.
export default function StepPanel({ title, description, icon: Icon, focusHeading = false, children }) {
  const headingRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (focusHeading) headingRef.current?.focus({ preventScroll: false });
  }, [focusHeading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
    >
      <div className="mb-6 flex items-start gap-3">
        {Icon && (
          <span aria-hidden="true" className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon />
          </span>
        )}
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="font-heading text-xl font-bold text-gray-900 focus:outline-none md:text-2xl">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
