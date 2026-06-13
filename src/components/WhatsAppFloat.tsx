import { useState } from "react";

const WHATSAPP_NUMBER = "918291764287";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your services.";

const WhatsAppFloat = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Tooltip label */}
      <div
        className={`
          bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-xl shadow-lg
          transition-all duration-300 pointer-events-none select-none whitespace-nowrap
          ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
        `}
      >
        Chat with us!
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        {/* Main button */}
        <div
          className={`
            relative flex items-center justify-center w-14 h-14 rounded-full
            bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)]
            transition-all duration-300
            ${hovered ? "scale-110 shadow-[0_6px_32px_rgba(37,211,102,0.65)]" : "scale-100"}
          `}
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7"
            fill="white"
          >
            <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.82 1.784 6.855L2 30l7.363-1.763A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.455a11.41 11.41 0 0 1-5.82-1.594l-.417-.247-4.368 1.046 1.072-4.258-.272-.436A11.388 11.388 0 0 1 4.546 16c0-6.317 5.14-11.455 11.457-11.455S27.455 9.683 27.455 16c0 6.317-5.14 11.455-11.452 11.455zm6.29-8.578c-.345-.173-2.04-1.006-2.356-1.12-.316-.115-.546-.173-.776.173-.23.346-.89 1.12-1.09 1.35-.2.23-.4.26-.745.086-.345-.173-1.456-.537-2.773-1.712-1.024-.914-1.715-2.043-1.916-2.388-.2-.345-.021-.532.15-.704.155-.155.345-.404.518-.605.173-.202.23-.346.345-.577.115-.23.058-.432-.029-.605-.086-.173-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.591l-.66-.012c-.23 0-.604.086-.92.432-.316.346-1.207 1.179-1.207 2.876 0 1.697 1.236 3.337 1.408 3.567.173.23 2.432 3.712 5.893 5.205.823.355 1.465.568 1.967.727.826.263 1.578.226 2.172.137.662-.099 2.04-.834 2.327-1.638.287-.805.287-1.495.2-1.638-.086-.144-.316-.23-.66-.403z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;
