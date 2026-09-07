import React from 'react';

const Logo = ({ size = 'md', variant = 'default', className = '' }) => {
  // Height sizing
  const heights = {
    sm: 34,
    md: 46,
    lg: 60,
    xl: 84,
  };

  const h = heights[size] || 46;

  if (variant === 'badge') {
    return (
      <div 
        className={`inline-flex items-center justify-center transition-transform hover:scale-105 ${className}`}
        style={{ height: h }}
      >
        <img 
          src="/images/lingo_logo_3d_transparent.png" 
          alt="Lingo Toon" 
          className="h-full w-auto object-contain filter drop-shadow-sm"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none transition-transform hover:scale-105 group ${className}`}>
      <img 
        src="/images/lingo_logo_3d_transparent.png" 
        alt="Lingo Toon Logo" 
        style={{ height: `${h}px` }}
        className="w-auto object-contain filter drop-shadow-md transition-all duration-500 ease-out"
      />
    </div>
  );
};

export default Logo;
