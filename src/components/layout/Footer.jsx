import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Star } from 'lucide-react';
import Logo from '../ui/Logo';
import { sounds } from '../../utils/soundEffects';

const Footer = () => {
  const [sparkleCount, setSparkleCount] = useState(0);

  const handleSparkleClick = () => {
    sounds.playPop();
    setSparkleCount(c => c + 1);
  };

  return (
    <footer className="relative bg-[#4A149E] text-white pt-6 pb-28 md:pb-14 select-none overflow-hidden">
      
      {/* Organic Wave Divider from previous section */}
      <div className="absolute top-0 left-0 w-full leading-none pointer-events-none -mt-1">
        <svg 
          viewBox="0 0 1440 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-8 sm:h-12 block"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
            fill="#FAF9F6" 
          />
        </svg>
      </div>

      {/* Decorative Fluid Blobs in Footer Corners */}
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#FFD233] rounded-full opacity-40 pointer-events-none blur-sm" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#32B4FA] rounded-full opacity-40 pointer-events-none blur-sm" />

      <div className="container-app relative z-10 pt-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <Logo size="lg" />
            </Link>
            <p className="text-white/80 font-body text-base max-w-sm leading-relaxed">
              Where language learning meets animated wonder. Empowering young explorers to discover words, phonics, and stories every day!
            </p>

            {/* Interactive Easter Egg Widget */}
            <div className="pt-2">
              <button
                onClick={handleSparkleClick}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-display font-bold text-[#FFD53D] flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <span>✨ Tap for Magic:</span>
                <span className="bg-[#FFD53D] text-neutral-900 px-2 py-0.5 rounded-full font-black">
                  {sparkleCount} Stars
                </span>
              </button>
            </div>
          </div>

          {/* Links Column 1: Explore */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-lg text-[#FFD53D]">Kids Playground</h4>
            <ul className="space-y-2.5 font-body text-base">
              <li><Link to="/videos" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">🎬 Watch & Sing</Link></li>
              <li><Link to="/games" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">🎮 Arcade Games</Link></li>
              <li><Link to="/game/play/word-builder" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">🔤 Word Builder</Link></li>
              <li><Link to="/game/play/math-match" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">🔢 Math Match</Link></li>
              <li><Link to="/progress" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">🏆 My Badges & Streaks</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Subjects */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-lg text-[#38B6FF]">Subjects</h4>
            <ul className="space-y-2.5 font-body text-base">
              <li><Link to="/learn?subject=english" className="text-white/80 hover:text-white transition-colors">Phonics & ABCs</Link></li>
              <li><Link to="/learn?subject=vocabulary" className="text-white/80 hover:text-white transition-colors">Grammar Safari</Link></li>
              <li><Link to="/learn?subject=math" className="text-white/80 hover:text-white transition-colors">Numbers & Math</Link></li>
              <li><Link to="/learn?subject=science" className="text-white/80 hover:text-white transition-colors">World & Nature</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Parents & Safety */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-lg text-white">Parents Zone</h4>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3">
              <p className="text-xs text-white/80 font-body leading-relaxed">
                Track your child’s vocabulary growth and customize screen time limits in the Parent Hub.
              </p>
              <Link to="/parent" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-bold text-xs rounded-full shadow-md transition-all transform hover:scale-105">
                <span>Parent Dashboard &rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-white/70">
          <p>© 2024 Lingo Toon. All rights reserved. Crafted with love for curious kids worldwide.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Child Safety</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
