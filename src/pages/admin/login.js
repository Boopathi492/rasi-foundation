import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaLock, FaUser, FaSpinner, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const auth = localStorage.getItem('adminToken');
    if (auth) {
      router.push('/admin');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8 font-outfit">
      <Head>
        <title>Admin Login | RASI Foundation</title>
      </Head>

      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100">

        {/* Left Side: Restored Red/Green Gradient Theme */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-red-600 via-red-700 to-green-700 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px] animate-pulse"></div>
          </div>

          <Link href="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors group z-10">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" /> Back to Website
          </Link>

          <div className="relative z-10 animate-float bg-white/20 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/30 shadow-2xl flex items-center justify-center">
            <Image
              src="/admin-login.png"
              alt="Admin Access"
              width={220}
              height={220}
              className="w-full max-w-[180px] h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
              priority
            />
          </div>

          <div className="mt-12 text-center relative z-10">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
              Admin <span className="text-amber-400 italic">Portal</span>
            </h2>
            <p className="text-white/80 text-lg max-w-[300px] mx-auto font-medium">
              Secure gateway for RASI Foundation management.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Security Hub</span>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Management Login</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 pl-12 pr-4 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 pl-12 pr-12 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-3 animate-shake">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group/btn overflow-hidden rounded-2xl p-[2px] mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-[length:200%_100%] animate-gradient"></div>
                <div className="relative bg-[#020617] py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-white group-hover/btn:bg-transparent transition-colors uppercase tracking-[0.2em] text-xs">
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    'Login to Dashboard'
                  )}
                </div>
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">
                Protected by RASI FOUNDATION Security Framework
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
