import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaLock,
  FaUser,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
  FaGraduationCap,
  FaCompass,
  FaAward,
  FaUniversity,
} from 'react-icons/fa';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return; // duplicate submission guard

    const usernameTrimmed = credentials.username.trim();
    if (!usernameTrimmed || !credentials.password) {
      setError('Please provide both username and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameTrimmed,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user || { username: usernameTrimmed }));
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      console.error('Authentication request error:', err);
      setError('Unable to reach authentication server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Management Workspace Sign-In — Rasi Foundation</title>
        <meta
          name="description"
          content="Authorized administration portal for Rasi Foundation educational guidance, counselling and scholarship management."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#080D1A] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans selection:bg-emerald-600 selection:text-white relative overflow-hidden">
        {/* Subtle background ambient brand glow orbs */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[180px] pointer-events-none"
        />

        {/* Main Split-Screen Container */}
        <div className="w-full max-w-[1120px] bg-slate-900/90 border border-slate-800 rounded-3xl lg:rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden grid lg:grid-cols-12 relative z-10 transition-all duration-300 animate-fade-in-up">

          {/* ================= LEFT BRANDING & VISUAL PANEL (5 Cols) ================= */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#075544]/25 via-[#0B1329] to-[#0A101F] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Top Navigation & Brand Header */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg py-1 px-1.5 -ml-1.5"
              >
                <FaArrowLeft className="text-[10px] group-hover:-translate-x-1 transition-transform" />
                <span>Return to Public Website</span>
              </Link>

              {/* Authentic Foundation Logo Badge & Wordmark with Integrated Cap */}
              <div className="flex items-center gap-3.5 mb-5">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg shadow-red-950/40 ring-2 ring-red-500/30">
                  <Image
                    src="/rasi-logo.png"
                    alt="Rasi Foundation official logo"
                    width={56}
                    height={56}
                    priority
                    className="h-full w-full rounded-full object-contain"
                  />
                </span>

                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-lg sm:text-xl tracking-wide font-heading">
                      <span className="text-red-500 relative inline-block">
                        {/* Graduation cap positioned directly above the 'R' in the Rasi wordmark */}
                        <Image
                          src="/graduation-cap.png"
                          alt=""
                          aria-hidden="true"
                          width={32}
                          height={24}
                          priority
                          unoptimized
                          className="pointer-events-none absolute -top-[0.38em] -left-[0.22em] w-[1.08em] h-auto max-w-none select-none transition-transform duration-200"
                        />
                        R
                      </span>
                      <span className="text-red-500">ASI </span>
                      <span className="text-emerald-400">FOUNDATION</span>
                    </span>
                  </div>
                  <p className="text-[9.5px] uppercase font-bold text-amber-400/90 tracking-wider mt-1 flex items-center gap-1.5">
                    <span className="h-px w-2 bg-amber-400/60" />
                    Educational Guidance &amp; Counselling Trust
                    <span className="h-px w-2 bg-amber-400/60" />
                  </p>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2.5">
                Admissions &amp; Operations Suite
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Centralized platform for verifying student applications, counselling schedules, college directories, and scholarship examination records.
              </p>
            </div>

            {/* Center 3D Celestial Orbital Illustration */}
            <div className="my-6 lg:my-8 py-2 sm:py-4 relative flex items-center justify-center">
              {/* Outer decorative orbit ring */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-emerald-500/20 flex items-center justify-center relative animate-spin-slow">
                <span className="absolute -top-1.5 left-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-md shadow-emerald-400/60" />
                <span className="absolute -bottom-1.5 left-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full shadow-md shadow-amber-400/60" />
                <span className="absolute top-1/2 -left-1.5 w-2 h-2 bg-red-400 rounded-full shadow-md shadow-red-400/60" />

                {/* Inner decorative orbit ring */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-teal-500/30 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-600/20 to-teal-800/30 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center shadow-inner">
                    <FaGraduationCap className="text-3xl sm:text-4xl text-emerald-400 drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)]" />
                  </div>
                </div>
              </div>

              {/* Floating feature pills with 3D depth */}
              <div className="absolute top-1 left-0 sm:left-2 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-[11px] text-slate-200 animate-float-slow">
                <FaCompass className="text-teal-400 text-xs shrink-0" />
                <span className="font-semibold">Career Guidance</span>
              </div>
              <div className="absolute bottom-1 right-0 sm:right-2 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-[11px] text-slate-200 animate-float-delayed">
                <FaAward className="text-amber-400 text-xs shrink-0" />
                <span className="font-semibold">Scholarship Grants</span>
              </div>
              <div className="hidden sm:flex absolute -bottom-3 left-4 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-xl shadow-md items-center gap-1.5 text-[10px] text-slate-300">
                <FaUniversity className="text-red-400 text-[10px] shrink-0" />
                <span>Affiliated Institutions</span>
              </div>
            </div>

            {/* Bottom Security Assurance Badges */}
            <div className="pt-5 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <FaShieldAlt className="text-emerald-400 shrink-0 text-xs" />
                <span>256-Bit TLS Encryption &amp; Append-Only Audit Logging</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <FaCheckCircle className="text-teal-400 shrink-0 text-xs" />
                <span>Role-Based Access Control (Super Admin, Counsellor, Exam)</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT AUTHENTICATION PANEL (7 Cols) ================= */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-14 flex flex-col justify-center relative">
            <div className="max-w-md w-full mx-auto">

              {/* Header */}
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Authorized Personnel Portal
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Sign in with your management credentials to access foundation records.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5" noValidate>
                {/* Username or Email Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="admin-username"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Username or Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-700 transition-colors">
                      <FaUser className="text-xs" />
                    </div>
                    <input
                      id="admin-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={credentials.username}
                      onChange={handleChange}
                      disabled={isLoading}
                      aria-invalid={error ? 'true' : 'false'}
                      aria-describedby={error ? 'login-error-msg' : undefined}
                      placeholder="admin or counsellor username"
                      className="w-full bg-slate-50/80 border border-slate-200 text-slate-900 text-xs pl-10 pr-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium placeholder:text-slate-400 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password Input with Show/Hide Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Case sensitive
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-700 transition-colors">
                      <FaLock className="text-xs" />
                    </div>
                    <input
                      id="admin-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      aria-invalid={error ? 'true' : 'false'}
                      aria-describedby={error ? 'login-error-msg' : undefined}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50/80 border border-slate-200 text-slate-900 text-xs pl-10 pr-11 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium placeholder:text-slate-400 disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus-visible:text-emerald-700"
                    >
                      {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    id="login-error-msg"
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 font-semibold animate-shake"
                  >
                    <FaShieldAlt className="text-rose-500 mt-0.5 shrink-0 text-xs" />
                    <span className="leading-snug">{error}</span>
                  </div>
                )}

                {/* Submit Button with Rasi Foundation Brand Gradient */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-[#075544] via-[#0D735C] to-[#075544] hover:from-[#054235] hover:to-[#0A5C4A] text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/25 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed group active:scale-[0.99] border-t border-emerald-400/30"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Security & Confidentiality Footer */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-1">
                <p className="text-[11px] text-slate-500 font-semibold">
                  Protected by Rasi Foundation Security &amp; Audit Framework
                </p>
                <p className="text-[10px] text-slate-400">
                  Unauthorized attempts are recorded with timestamp and network telemetry.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 30s linear infinite;
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatSlow 4s ease-in-out infinite 2s;
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-4px);
          }
          40%, 80% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .animate-spin-slow {
            animation: none;
          }
          .animate-float-slow {
            animation: none;
          }
          .animate-float-delayed {
            animation: none;
          }
          .animate-shake {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
