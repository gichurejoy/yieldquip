
import React from "react";

interface YieldQuipLogoProps {
  className?: string;
}

const YieldQuipLogo: React.FC<YieldQuipLogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" 
        fill="#4CAF50" 
        fillOpacity="0.2"
      />
      <path 
        d="M8 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" 
        fill="#4CAF50" 
      />
      <path 
        d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" 
        fill="#4CAF50" 
      />
      <path 
        d="M12 17c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z" 
        fill="#4CAF50" 
      />
      <path 
        d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" 
        fill="#4CAF50" 
      />
      <path 
        d="M15 16l-3-3m0 0l-3 3m3-3V8" 
        stroke="#4CAF50" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default YieldQuipLogo;
