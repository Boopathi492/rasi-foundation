import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function FloatingButtons() {
  const phoneNumber = '+919789446100';
  const whatsappNumber = '919789446100';
  const whatsappMessage = 'Hello! I would like to inquire about your services.';

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3" style={{ top: 'auto' }}>
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <FaPhone className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Call Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform duration-300" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
