import React from 'react';
import { motion } from 'framer-motion';

const FluidSideAccents = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* LEFT FLUID ACCENTS */}
      <div className="absolute top-[20%] -left-16 sm:-left-10 w-48 sm:w-64 h-[600px] pointer-events-none opacity-85">
        <motion.div 
          animate={{ scale: [1, 1.06, 1], rotate: [0, 2, 0], y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-48 sm:w-64 h-64 sm:h-80 bg-[#FFD233] shadow-lg"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 40% 60% 70%' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.08, 1], x: [0, 8, 0], y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-40 sm:w-56 h-56 sm:h-72 bg-[#32B4FA] -mt-16 sm:-mt-20 ml-2 shadow-lg"
          style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        />
      </div>

      {/* RIGHT FLUID ACCENTS */}
      <div className="absolute top-[50%] -right-16 sm:-right-10 w-48 sm:w-64 h-[650px] pointer-events-none opacity-85">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 0], y: [0, -10, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-44 sm:w-60 h-60 sm:h-72 bg-[#FFD233] ml-auto shadow-lg"
          style={{ borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.07, 1], x: [0, -8, 0], y: [0, 12, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="w-48 sm:w-64 h-64 sm:h-80 bg-[#32B4FA] -mt-12 sm:-mt-16 ml-auto shadow-lg"
          style={{ borderRadius: '40% 60% 65% 35% / 40% 60% 40% 60%' }}
        />
      </div>
    </div>
  );
};

export default FluidSideAccents;
