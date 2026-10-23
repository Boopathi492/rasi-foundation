import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle, FaUserGraduate } from 'react-icons/fa';

export default function PlacementTicker() {
    const [placements, setPlacements] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchPlacements();
    }, []);

    const fetchPlacements = async () => {
        try {
            const response = await fetch('/api/achievements');
            const data = await response.json();
            const allPlacements = [
                ...(data.success_stories || []),
                ...(data.spotlights || [])
            ].filter(a => a.type === 'placement' || a.isVerified);

            if (allPlacements.length > 0) {
                setPlacements(allPlacements);
            } else {
                // Fallback static data if DB is empty
                setPlacements([
                    { name: 'Aditya S.', course: 'MBBS', title: 'Madras Medical College' },
                    { name: 'Meera K.', course: 'Engineering', title: 'PSG Tech, Coimbatore' },
                    { name: 'Rahul V.', course: 'Law', title: 'NLSIU, Bangalore' }
                ]);
            }
        } catch (error) {
            console.error('Failed to fetch placements for ticker:', error);
        }
    };

    useEffect(() => {
        if (placements.length > 1) {
            const timer = setInterval(() => {
                setIndex((prev) => (prev + 1) % placements.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [placements]);

    if (placements.length === 0) return null;

    const current = placements[index];

    return (
        <div className="bg-gray-900 border-y border-white/5 py-3 overflow-hidden relative group">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
                        <FaUserGraduate className="animate-bounce" /> Live Placements
                    </span>
                    <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                </div>

                <div className="flex-1 px-8 overflow-hidden relative h-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="flex items-center justify-center md:justify-start gap-4"
                        >
                            <p className="text-slate-300 font-bold text-sm tracking-tight flex items-center gap-2">
                                <span className="text-white font-black">{current.name || 'Student'}</span>
                                <span className="text-slate-500 font-medium">secured admission in</span>
                                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-black tracking-tight">{current.title || current.course}</span>
                                <FaCheckCircle className="text-green-500 text-xs" />
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rasi Success Legacy</p>
                    <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                                {String.fromCharCode(65 + i)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
