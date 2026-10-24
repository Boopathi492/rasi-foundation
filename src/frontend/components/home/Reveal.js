import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './Marquee';

// Fade-up on scroll into view. Transform/opacity only (no layout shift). The reduced-motion flag comes
// from state set after mount, so server and first client render match; for users who prefer reduced
// motion the transition is instant (no movement).
export default function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut', delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
