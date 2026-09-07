import React from 'react';

const Logo = ({ size = 'md', variant = 'default', className = '' }) => {
  const heightClasses = {
    xs: 'h-6',
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-10 md:h-11',
    lg: 'h-10 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-18 md:h-20',
  };

  const hClass = heightClasses[size] || 'h-8 sm:h-10 md:h-11';

  if (variant === 'badge') {
    return (
      <div 
        className={`inline-flex items-center justify-center transition-transform hover:scale-105 ${hClass} ${className}`}
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
        className={`w-auto ${hClass} object-contain filter drop-shadow-md transition-all duration-300 ease-out`}
      />
    </div>
  );
};

export default Logo;
