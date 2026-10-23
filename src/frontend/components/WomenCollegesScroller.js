import { useState, useEffect, useRef } from 'react';
import { FaUniversity, FaMapMarkerAlt, FaFemale } from 'react-icons/fa';

const WomenCollegesScroller = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollerRef = useRef(null);

    const colors = [
        "from-pink-400 to-rose-500",
        "from-purple-400 to-violet-500",
        "from-fuchsia-400 to-pink-500",
        "from-rose-400 to-red-400",
        "from-violet-400 to-purple-500",
        "from-pink-400 to-fuchsia-500",
        "from-purple-400 to-rose-500"
    ];

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch('/api/colleges');
                const data = await response.json();
                const womenData = data.find(item => item.district === 'Women Centric Colleges');
                if (womenData) {
                    const formattedColleges = womenData.colleges.map((college, idx) => ({
                        ...college,
                        color: colors[idx % colors.length]
                    }));
                    setColleges(formattedColleges);
                }
            } catch (error) {
                console.error('Error fetching women colleges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    // Duplicate colleges for seamless infinite scroll
    const duplicatedColleges = [...colleges, ...colleges, ...colleges];

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let animationId;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Slow and smooth

        const animate = () => {
            if (!isPaused) {
                scrollPosition += scrollSpeed;

                // Reset position for infinite loop
                const firstSetWidth = scroller.scrollWidth / 3;
                if (scrollPosition >= firstSetWidth) {
                    scrollPosition = 0;
                }

                scroller.style.transform = `translateX(-${scrollPosition}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isPaused]);

    return (
        <section id="women-colleges" className="py-16 md:py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-fuchsia-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg shadow-pink-200">
                        <FaFemale className="text-lg" />
                        <span>Women Empowerment in Education</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Women-Centric <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Engineering Colleges</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover premier engineering institutions exclusively for women in Tamil Nadu,
                        dedicated to empowering the next generation of female engineers.
                    </p>
                </div>

                {/* Scrolling Container */}
                <div
                    className="relative overflow-hidden py-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Gradient Fade Effects */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-rose-50 via-rose-50/80 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none"></div>

                    {/* Scrolling Cards */}
                    <div
                        ref={scrollerRef}
                        className="flex gap-6 md:gap-8 will-change-transform"
                        style={{ width: 'max-content' }}
                    >
                        {duplicatedColleges.map((college, index) => (
                            <div
                                key={index}
                                className="group flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-pink-100/50 backdrop-blur-sm"
                            >
                                {/* Card Header with Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${college.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <FaUniversity className="text-2xl text-white" />
                                </div>

                                {/* College Name */}
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-pink-700 transition-colors duration-300">
                                    {college.name}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${college.color} bg-opacity-10 flex items-center justify-center`}>
                                        <FaMapMarkerAlt className="text-sm text-pink-600" />
                                    </div>
                                    <span className="text-gray-500 text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-full">
                                        {college.location}
                                    </span>
                                </div>

                                {/* Decorative Bottom Line */}
                                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${college.color} rounded-full mt-4 transition-all duration-500`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center items-center gap-2 mt-8 text-gray-500 text-sm">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-pink-300 animate-pulse"></span>
                        <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                    <span className="italic">Hover to pause</span>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                        <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 rounded-full bg-pink-300 animate-pulse"></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WomenCollegesScroller;
