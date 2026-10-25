import '@/frontend/styles/globals.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

function PageTransitionLoader({ visible, showBadge }) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Preparing Your Journey"
      className="pointer-events-none fixed inset-x-0 top-0 z-[120]"
    >
      {/* Top Branded Progress Bar */}
      <div className="h-1 w-full overflow-hidden bg-forest/10">
        <div className="rf-progress-line h-full w-full bg-gradient-to-r from-forest via-gold-400 to-crimson" />
      </div>

      {/* Floating Centred Branded Circular Disc (Appears only on slow navigation > 150ms to prevent flashing) */}
      {showBadge && (
        <div className="fixed inset-0 z-[121] flex items-center justify-center bg-black/15 backdrop-blur-[2px] transition-opacity duration-200">
          <div className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/95 px-6 py-5 shadow-[0_16px_40px_rgba(7,85,68,0.22)] backdrop-blur-md">
            {/* Circular Ring with Official Rasi Foundation Seal */}
            <div className="relative flex h-16 w-16 items-center justify-center">
              {/* Outer Animated Circular Progress Ring (Maroon, Green, Gold) */}
              <svg className="rf-circular-spinner absolute inset-0 h-full w-full" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#f1f8f3"
                  strokeWidth="3"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="url(#rf-loader-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="90 85"
                />
                <defs>
                  <linearGradient id="rf-loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b0102e" />
                    <stop offset="50%" stopColor="#dfaa32" />
                    <stop offset="100%" stopColor="#075544" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Seal */}
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm ring-1 ring-black/5">
                <Image
                  src="/rasi-logo.png"
                  alt="Rasi Foundation"
                  width={44}
                  height={44}
                  priority
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
            </div>

            {/* Typography */}
            <div className="mt-3 text-center">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-gray-800">
                <span className="text-crimson">Rasi</span> <span className="text-forest">Foundation</span>
              </p>
              <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-forest">
                <span>Preparing Your Journey</span>
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes rfProgressMove {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-20%); }
          100% { transform: translateX(0%); }
        }
        .rf-progress-line {
          animation: rfProgressMove 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: left;
        }
        @keyframes rfSpin {
          100% { transform: rotate(360deg); }
        }
        .rf-circular-spinner {
          animation: rfSpin 1.4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-progress-line,
          .rf-circular-spinner {
            animation: none;
          }
          .rf-progress-line {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [navigating, setNavigating] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const router = useRouter();
  const badgeTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  useEffect(() => {
    const handleStart = (url) => {
      // Don't trigger for hash anchors on the same page
      if (url.startsWith('#') || url === router.asPath) return;

      setNavigating(true);
      setShowBadge(false);

      // Only show badge if navigation takes more than 150ms
      window.clearTimeout(badgeTimerRef.current);
      badgeTimerRef.current = window.setTimeout(() => {
        setShowBadge(true);
      }, 150);

      // Safety timeout after 8s so screen is never locked
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = window.setTimeout(() => {
        setNavigating(false);
        setShowBadge(false);
      }, 8000);
    };

    const handleComplete = () => {
      window.clearTimeout(badgeTimerRef.current);
      window.clearTimeout(safetyTimerRef.current);
      setNavigating(false);
      setShowBadge(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      window.clearTimeout(badgeTimerRef.current);
      window.clearTimeout(safetyTimerRef.current);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <PageTransitionLoader visible={navigating} showBadge={showBadge} />
      <Component {...pageProps} />
    </>
  );
}
