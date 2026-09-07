import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';

const FluidSideAccents = () => {
  const [ripples, setRipples] = useState([]);

  const handleBlobClick = (e, color) => {
    sounds.playPop();
    const id = Date.now() + Math.random();
    const newRipple = { id, x: e.clientX, y: e.clientY, color };
    setRipples(prev => [...prev.slice(-10), newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1200);
  };

  const morph1 = [
    '30% 70% 70% 30% / 30% 40% 60% 70%',
    '55% 45% 35% 65% / 45% 60% 40% 55%',
    '40% 60% 60% 40% / 60% 35% 65% 40%',
    '30% 70% 70% 30% / 30% 40% 60% 70%'
  ];

  const morph2 = [
    '60% 40% 30% 70% / 60% 30% 70% 40%',
    '35% 65% 65% 35% / 40% 55% 45% 60%',
    '50% 50% 40% 60% / 55% 40% 60% 45%',
    '60% 40% 30% 70% / 60% 30% 70% 40%'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Interactive Click Sparkle Ripples */}
      <AnimatePresence>
        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.5, y: -40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ left: rip.x - 20, top: rip.y - 20 }}
            className="fixed pointer-events-none z-50 text-2xl"
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* LEFT FLUID ACCENTS */}
      <div className="absolute top-[20%] -left-16 sm:-left-10 w-48 sm:w-64 h-[600px] opacity-85">
        <motion.div 
          onClick={(e) => handleBlobClick(e, '#FFD233')}
          whileHover={{ scale: 1.15, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: [1, 1.08, 1], 
            rotate: [0, 4, 0], 
            y: [0, -16, 0],
            borderRadius: morph1
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="w-48 sm:w-64 h-64 sm:h-80 bg-[#FFD233] shadow-xl pointer-events-auto cursor-pointer hover:shadow-2xl transition-shadow"
          title="Tap the magic fluid!"
        />
        <motion.div 
          onClick={(e) => handleBlobClick(e, '#32B4FA')}
          whileHover={{ scale: 1.16, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 10, 0], 
            y: [0, 14, 0],
            borderRadius: morph2
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: 1 
          }}
          className="w-40 sm:w-56 h-56 sm:h-72 bg-[#32B4FA] -mt-16 sm:-mt-20 ml-2 shadow-xl pointer-events-auto cursor-pointer hover:shadow-2xl transition-shadow"
          title="Tap the magic fluid!"
        />
      </div>

      {/* RIGHT FLUID ACCENTS */}
      <div className="absolute top-[50%] -right-16 sm:-right-10 w-48 sm:w-64 h-[650px] opacity-85">
        <motion.div 
          onClick={(e) => handleBlobClick(e, '#FFD233')}
          whileHover={{ scale: 1.15, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: [1, 1.07, 1], 
            rotate: [0, -4, 0], 
            y: [0, -14, 0],
            borderRadius: morph2
          }}
          transition={{ 
            duration: 8.5, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: 0.5 
          }}
          className="w-44 sm:w-60 h-60 sm:h-72 bg-[#FFD233] ml-auto shadow-xl pointer-events-auto cursor-pointer hover:shadow-2xl transition-shadow"
          title="Tap the magic fluid!"
        />
        <motion.div 
          onClick={(e) => handleBlobClick(e, '#32B4FA')}
          whileHover={{ scale: 1.18, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: [1, 1.09, 1], 
            x: [0, -10, 0], 
            y: [0, 16, 0],
            borderRadius: morph1
          }}
          transition={{ 
            duration: 7.5, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: 1.5 
          }}
          className="w-48 sm:w-64 h-64 sm:h-80 bg-[#32B4FA] -mt-12 sm:-mt-16 ml-auto shadow-xl pointer-events-auto cursor-pointer hover:shadow-2xl transition-shadow"
          title="Tap the magic fluid!"
        />
      </div>
    </div>
  );
};

export default FluidSideAccents;
