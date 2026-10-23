import { useState, useEffect, useRef } from 'react';
import { FaUniversity, FaMapMarkerAlt, FaCheckCircle, FaPhone, FaStar, FaHandshake, FaGlobe } from 'react-icons/fa';

const BengaluruColleges = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollerRef = useRef(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch('/api/colleges');
                const data = await response.json();
                // Filter for Bengaluru Colleges from the grouped data
                const bengaluruData = data.find(item => item.district === 'Bengaluru Zone');
                if (bengaluruData) {
                    setColleges(bengaluruData.colleges);
                }
            } catch (error) {
                console.error('Error fetching Bengaluru colleges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    const benefits = [
        { text: "Direct admission guidance", icon: FaHandshake },
        { text: "Course & college selection support", icon: FaCheckCircle },
        { text: "Scholarship & fee-structure counseling", icon: FaStar },
        { text: "Career-oriented academic mapping", icon: FaGlobe }
    ];

    // Duplicate colleges for seamless infinite scroll
    const duplicatedColleges = [...colleges, ...colleges];

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let animationId;
        let scrollPosition = 0;
        const scrollSpeed = 0.5;

        const animate = () => {
            if (!isPaused) {
                scrollPosition += scrollSpeed;
                const firstSetWidth = scroller.scrollWidth / 2;
                if (scrollPosition >= firstSetWidth) {
                    scrollPosition = 0;
                }
                scroller.style.transform = `translateX(-${scrollPosition}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 via-indigo-50 to-white overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
                        NEW UPDATE
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        RASI FOUNDATION <span className="text-blue-600">–</span> Bengaluru College <span className="text-blue-600">Tie-Up</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Rasi Foundation has officially tied up with reputed institutions in Bengaluru for academic guidance, admissions support & collaboration.
                    </p>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-50 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                    <benefit.icon size={20} />
                                </div>
                                <span className="font-semibold text-gray-800">{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* College Scroller */}
                <div className="relative mb-16">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-50 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        <div
                            ref={scrollerRef}
                            className="flex gap-6 py-4"
                            style={{ width: 'max-content' }}
                        >
                            {duplicatedColleges.map((college, idx) => (
                                <div key={idx} className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-600">
                                        <FaUniversity size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">{college.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <FaMapMarkerAlt /> {college.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-2xl">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Benefit from these tie-ups today!</h3>
                        <p className="text-blue-100">Get expert guidance for admissions in Bengaluru.</p>
                    </div>
                    <a href="tel:+919789446100" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg">
                        <FaPhone /> Call Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BengaluruColleges;
