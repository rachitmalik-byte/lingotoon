import React from 'react';

const Avatar = ({ name = 'User', level, size = 'md', className = '' }) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl"
  };

  const levelBadgeSizes = {
    sm: "w-4 h-4 text-[10px] -bottom-1 -right-1",
    md: "w-5 h-5 text-xs -bottom-1 -right-1",
    lg: "w-6 h-6 text-sm -bottom-1 -right-1"
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className={`rounded-full flex items-center justify-center text-white font-bold font-display
                    bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] border-2 border-white shadow-sm
                    ${sizes[size]}`}
      >
        {initial}
      </div>
      {level !== undefined && (
        <div 
          className={`absolute flex items-center justify-center rounded-full bg-[#FACC15] text-[#7C3AED] font-bold border-2 border-white
                      ${levelBadgeSizes[size]}`}
        >
          {level}
        </div>
      )}
    </div>
  );
};

export default Avatar;
