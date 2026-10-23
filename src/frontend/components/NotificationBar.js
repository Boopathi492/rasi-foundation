import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBullhorn, FaArrowRight, FaTimes, FaExclamationTriangle, FaGraduationCap, FaInfoCircle, FaDoorOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig = {
    general: { label: 'Update', gradient: 'from-blue-600 to-blue-700', dot: 'bg-blue-400' },
    scholarship: { label: 'Scholarship', gradient: 'from-green-600 to-green-700', dot: 'bg-green-400' },
    admission: { label: 'Admission', gradient: 'from-purple-600 to-purple-700', dot: 'bg-purple-400' },
    urgent: { label: 'Urgent', gradient: 'from-red-600 to-red-700', dot: 'bg-red-400' },
    // Legacy type support
    info: { label: 'Update', gradient: 'from-blue-600 to-blue-700', dot: 'bg-blue-400' },
    alert: { label: 'Alert', gradient: 'from-red-600 to-red-700', dot: 'bg-red-400' },
    warning: { label: 'Important', gradient: 'from-amber-600 to-amber-700', dot: 'bg-amber-400' },
};

const NotificationBar = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch('/api/announcements');
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    // Filter to only show announcements marked for homepage
                    const homeAnnouncements = data.data.filter(a => a.showOnHome !== false);
                    setAnnouncements(homeAnnouncements.length > 0 ? homeAnnouncements : data.data);
                }
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (announcements.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % announcements.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [announcements]);

    if (!isVisible || announcements.length === 0) return null;

    const current = announcements[currentIndex];
    const config = typeConfig[current.type] || typeConfig.general;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-full z-[40] relative py-4 bg-transparent overflow-hidden"
            >
                <div className="max-w-6xl mx-auto px-2">
                    <div className="bg-[#0f172a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-full border border-white/5 flex items-center p-1.5 overflow-hidden relative group">
                        {/* Badge */}
                        <div className={`flex-shrink-0 bg-gradient-to-r ${config.gradient} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg ml-1`}>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-tighter whitespace-nowrap">
                                {config.label}
                            </span>
                        </div>

                        {/* Separator */}
                        <div className="w-px h-6 bg-white/10 mx-4 hidden md:block"></div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="flex items-center gap-2"
                                >
                                    {current.link ? (
                                        <Link href={current.link} className="flex items-center gap-2 group/msg">
                                            <span className="text-white font-black text-sm md:text-base tracking-tight whitespace-nowrap group-hover/msg:underline underline-offset-4 decoration-white/30">
                                                {current.title}
                                            </span>
                                            <span className="text-slate-400 text-xs md:text-sm font-medium truncate hidden sm:inline">
                                                {current.content}
                                            </span>
                                            <FaArrowRight className="text-white/30 text-[10px] group-hover/msg:translate-x-1 transition-transform" />
                                        </Link>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-black text-sm md:text-base tracking-tight whitespace-nowrap">
                                                {current.title}
                                            </span>
                                            <span className="text-slate-400 text-xs md:text-sm font-medium truncate hidden sm:inline">
                                                {current.content}
                                            </span>
                                        </div>
                                    )}
                                    <div className={`w-4 h-4 ${config.dot.replace('bg-', 'bg-')}/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2`}>
                                        <div className={`w-1.5 h-1.5 ${config.dot} rounded-full`}></div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* View All Link */}
                        <div className="hidden lg:flex items-center gap-4 px-6 border-l border-white/10">
                            <Link
                                href="/announcements"
                                className="flex items-center gap-2 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
                            >
                                View All <FaArrowRight className="text-[8px]" />
                            </Link>
                        </div>

                        {/* Counter */}
                        {announcements.length > 1 && (
                            <div className="hidden md:flex items-center gap-1.5 pr-2">
                                {announcements.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="mr-3 w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
                        >
                            <FaTimes className="text-sm" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationBar;
