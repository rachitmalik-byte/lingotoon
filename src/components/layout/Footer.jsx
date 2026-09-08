import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Shield, Star, Youtube, ExternalLink, Music, BookOpen, Sprout, ToggleLeft, ToggleRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { sounds } from '../../utils/soundEffects';

// Vector plant definitions for the minimal soil strip (Google Anti-gravity style)
const vectorPlants = [
  { id: 'p1', left: '4%', height: 42, type: 'twoLeaf', color: '#4ADE80', swayDuration: 3.6, delay: 0 },
  { id: 'p2', left: '10%', height: 50, type: 'flower', color: '#F472B6', swayDuration: 4.2, delay: 0.4 },
  { id: 'p3', left: '17%', height: 38, type: 'clover', color: '#22C55E', swayDuration: 3.2, delay: 0.8 },
  { id: 'p4', left: '24%', height: 48, type: 'twoLeaf', color: '#86EFAC', swayDuration: 4.0, delay: 0.2 },
  { id: 'p5', left: '31%', height: 54, type: 'fern', color: '#16A34A', swayDuration: 4.5, delay: 0.6 },
  { id: 'p6', left: '39%', height: 44, type: 'flower', color: '#FBBF24', swayDuration: 3.8, delay: 1.0 },
  { id: 'p7', left: '46%', height: 36, type: 'twoLeaf', color: '#4ADE80', swayDuration: 3.4, delay: 0.3 },
  { id: 'p8', left: '53%', height: 52, type: 'clover', color: '#22C55E', swayDuration: 4.3, delay: 0.7 },
  { id: 'p9', left: '60%', height: 46, type: 'flower', color: '#A78BFA', swayDuration: 3.9, delay: 0.1 },
  { id: 'p10', left: '67%', height: 50, type: 'fern', color: '#15803D', swayDuration: 4.6, delay: 0.9 },
  { id: 'p11', left: '74%', height: 40, type: 'twoLeaf', color: '#86EFAC', swayDuration: 3.5, delay: 0.5 },
  { id: 'p12', left: '81%', height: 54, type: 'flower', color: '#FB923C', swayDuration: 4.1, delay: 0.2 },
  { id: 'p13', left: '88%', height: 42, type: 'clover', color: '#22C55E', swayDuration: 3.7, delay: 0.8 },
  { id: 'p14', left: '95%', height: 48, type: 'twoLeaf', color: '#4ADE80', swayDuration: 4.4, delay: 0.4 },
];

const VectorPlantElement = ({ plant }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute bottom-0 cursor-pointer select-none origin-bottom pointer-events-auto"
      style={{ left: plant.left }}
      animate={
        isHovered
          ? { y: -26, rotate: 12, scale: 1.18, transition: { type: 'spring', stiffness: 300, damping: 15 } }
          : {
              y: [-3, 3, -3],
              rotate: [-5, 5, -5],
              transition: {
                y: { duration: plant.swayDuration * 0.8, repeat: Infinity, ease: 'easeInOut', delay: plant.delay },
                rotate: { duration: plant.swayDuration, repeat: Infinity, ease: 'easeInOut', delay: plant.delay }
              }
            }
      }
      onMouseEnter={() => { sounds.playPop(); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.9, y: -15 }}
      title="Google Anti-gravity Sprout (Hover or tap me!)"
    >
      <svg
        width={plant.height * 0.8}
        height={plant.height}
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
      >
        {/* Plant Stem */}
        <path
          d="M20 50 Q20 30 18 15"
          stroke="#15803D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {plant.type === 'twoLeaf' && (
          <>
            {/* Left Leaf */}
            <path
              d="M18 28 C10 26 6 18 10 14 C15 16 18 22 18 28 Z"
              fill={plant.color}
              stroke="#15803D"
              strokeWidth="1.5"
            />
            {/* Right Leaf */}
            <path
              d="M18 22 C26 20 32 12 28 8 C23 10 19 16 18 22 Z"
              fill={plant.color}
              stroke="#15803D"
              strokeWidth="1.5"
            />
          </>
        )}

        {plant.type === 'clover' && (
          <>
            {/* 3 Clover Leaves */}
            <circle cx="12" cy="18" r="6.5" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
            <circle cx="24" cy="16" r="6.5" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
            <circle cx="18" cy="10" r="7" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
          </>
        )}

        {plant.type === 'fern' && (
          <>
            <path d="M19 35 C13 32 11 25 14 23 C17 25 19 30 19 35 Z" fill={plant.color} />
            <path d="M19 28 C25 25 27 18 24 16 C21 18 19 23 19 28 Z" fill={plant.color} />
            <path d="M18 20 C13 18 11 12 14 10 C17 12 18 16 18 20 Z" fill={plant.color} />
            <circle cx="18" cy="8" r="4.5" fill="#4ADE80" />
          </>
        )}

        {plant.type === 'flower' && (
          <>
            {/* Leaves on stem */}
            <path d="M19 32 C12 30 10 24 13 22 C16 24 19 28 19 32 Z" fill="#22C55E" />
            {/* Flower Petals */}
            <circle cx="18" cy="12" r="8" fill={plant.color} stroke="#FFF" strokeWidth="1" />
            <circle cx="18" cy="12" r="3.5" fill="#FFD233" />
          </>
        )}

        {/* Floating Dew/Sparkle dot (Anti-gravity aesthetic) */}
        <motion.circle
          cx="24"
          cy="6"
          r="1.8"
          fill="#FFF"
          opacity={0.8}
          animate={{ y: [-2, 2, -2], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
};

const Footer = () => {
  // A/B Test Toggle: Default state MUST be OFF (false), keeping the standard footer until switched on.
  const [isSoilStyle, setIsSoilStyle] = useState(false);
  const [sparkleCount, setSparkleCount] = useState(0);

  const toggleSoilStyle = () => {
    sounds.playPop();
    setIsSoilStyle(prev => !prev);
  };

  const playChime = (freq) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      sounds.playPop();
    }
  };

  const chimes = [
    { note: 'Do', freq: 261.63, color: 'bg-[#FF5E5B]' },
    { note: 'Re', freq: 293.66, color: 'bg-[#FFA500]' },
    { note: 'Mi', freq: 329.63, color: 'bg-[#FFD233]' },
    { note: 'Fa', freq: 349.23, color: 'bg-[#22C55E]' },
    { note: 'Sol', freq: 392.00, color: 'bg-[#38B6FF]' },
  ];

  return (
    <div className="relative">
      
      {/* =========================================================================
          A/B TEST TOGGLE SWITCH (Positioned cleanly in the bottom corner)
          Default State: OFF (Standard Footer)
          When toggled ON: Activates clean minimal vector brown soil + sprouting plants
         ========================================================================= */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
        <button
          onClick={toggleSoilStyle}
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-900 text-white backdrop-blur-md border-2 border-white/20 shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer select-none text-xs font-display font-bold"
          title={`Click to toggle A/B test footer: ${isSoilStyle ? 'Switch to Standard Footer' : 'Switch to Minimal Soil Style'}`}
          aria-label="Toggle Footer Style"
        >
          <Sprout className={`w-4 h-4 transition-colors ${isSoilStyle ? 'text-green-400' : 'text-amber-200'}`} />
          <span className="hidden sm:inline">A/B Footer:</span>
          <span className={isSoilStyle ? 'text-green-400 font-extrabold' : 'text-neutral-300'}>
            {isSoilStyle ? 'Nature Soil (ON)' : 'Standard (OFF)'}
          </span>
          <div className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center ${isSoilStyle ? 'bg-green-500 justify-end' : 'bg-neutral-600 justify-start'}`}>
            <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
          </div>
        </button>
      </div>

      {/* =========================================================================
          VARIANT B: CLEAN MINIMAL VECTOR BROWN SOIL STRIP (When toggle is ON)
          - Flat minimal brown soil strip spanning the bottom
          - Vector plants sprouting along top edge animated with airy Google Anti-gravity sway & float
         ========================================================================= */}
      {isSoilStyle ? (
        <footer className="relative bg-[#3D2314] text-white pt-16 pb-24 md:pb-12 select-none overflow-hidden border-t-4 border-[#5A351D] shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
          
          {/* SPROUTING VECTOR PLANTS STRIP ALONG TOP EDGE (Google Anti-Gravity Sway & Float) */}
          <div className="absolute -top-12 left-0 right-0 h-16 pointer-events-none overflow-visible">
            {vectorPlants.map((plant) => (
              <VectorPlantElement key={plant.id} plant={plant} />
            ))}
          </div>

          {/* Minimal Soil Horizon Texture & Subtle Earth Vector Grain */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#5A351D] opacity-90" />
          <div className="absolute top-2 left-0 right-0 h-1 bg-[#4A2B18] opacity-60" />
          
          {/* Subtle Organic Soil Particle Specks */}
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{
            backgroundImage: 'radial-gradient(#8D5B32 1.5px, transparent 1.5px), radial-gradient(#2A160A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }} />

          <div className="container-app relative z-10">
            
            {/* Clean, Minimal Vector Content Layout */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#5A351D]/60">
              
              {/* Left: Minimal Wordmark & Earth Tagline */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <Link to="/" onClick={() => sounds.playPop()} className="transition-transform hover:scale-105 shrink-0">
                  <Logo size="md" />
                </Link>
                <div className="sm:border-l sm:border-[#6B4226] sm:pl-3">
                  <p className="text-xs font-display font-bold text-amber-200/90">
                    Nurturing young minds through playful discovery
                  </p>
                  <p className="text-[11px] font-body text-amber-100/60">
                    Sprouting literacy, phonics, and curiosity every day
                  </p>
                </div>
              </div>

              {/* Center: Clean Minimal Navigation Links */}
              <nav className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 text-xs font-display font-bold text-amber-100/80">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/learn" className="hover:text-white transition-colors">Lessons</Link>
                <Link to="/videos" className="hover:text-white transition-colors">Videos</Link>
                <Link to="/games" className="hover:text-white transition-colors">Games</Link>
                <Link to="/blog" className="text-[#FFD53D] hover:text-yellow-300 transition-colors flex items-center gap-1">
                  <span>Learning Blog</span>
                  <span className="text-[9px] bg-yellow-400/20 text-yellow-300 px-1 py-0.2 rounded-full">NEW</span>
                </Link>
                <Link to="/parent" className="hover:text-white transition-colors">Parent Portal</Link>
              </nav>

              {/* Right: Shrunk Minimal YouTube Logo Capsule */}
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com/@lingotoon-x2m"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playPop()}
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Official LiNGO TOON YouTube Channel (@lingotoon-x2m)"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-5 h-5 fill-current" />
                </a>
                <div className="text-left hidden sm:block">
                  <span className="text-[11px] font-display font-bold text-white block">Official Channel</span>
                  <span className="text-[10px] text-amber-200/60 block">@lingotoon-x2m</span>
                </div>
              </div>

            </div>

            {/* Bottom Minimal Copyright Bar */}
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-body text-amber-100/60">
              <p>© 2024 Lingo Toon. Minimal Vector Soil Edition. Crafted for curious young minds.</p>
              <div className="flex items-center gap-5">
                <span className="hover:text-white transition-colors cursor-pointer">Child Safety</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
              </div>
            </div>

          </div>
        </footer>
      ) : (

        /* =========================================================================
            VARIANT A: STANDARD PURPLE WAVE FOOTER (Default State - Toggle is OFF)
            - With YouTube element SHRUNK to minimal capsule as requested
           ========================================================================= */
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

                {/* SHRUNK MINIMAL YOUTUBE LOGO CAPSULE (With link hidden under it as requested) */}
                <div className="pt-1 flex items-center gap-3">
                  <a
                    href="https://youtube.com/@lingotoon-x2m"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playPop()}
                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                    title="Watch LiNGO TOON on YouTube (@lingotoon-x2m)"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="w-5 h-5 fill-current" />
                  </a>
                  <span className="text-xs font-display font-bold text-white/80">
                    Watch on YouTube
                  </span>
                </div>

                {/* Interactive Musical Easter Egg Chimes */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-display font-bold text-white/70 uppercase tracking-wider block">
                    Mini Chime Keyboard:
                  </span>
                  <div className="flex gap-1.5">
                    {chimes.map((c) => (
                      <button
                        key={c.note}
                        onClick={() => playChime(c.freq)}
                        className={`w-9 h-9 rounded-full ${c.color} text-neutral-900 font-display font-black text-xs shadow-md transform hover:scale-120 active:scale-90 transition-all flex items-center justify-center cursor-pointer`}
                        title={`Play ${c.note}`}
                      >
                        {c.note}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links Column 1: Explore */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="font-display font-bold text-lg text-[#FFD53D]">Kids Playground</h4>
                <ul className="space-y-2.5 font-body text-base">
                  <li><Link to="/videos" className="text-white/80 hover:text-white transition-colors">Watch & Sing Songs</Link></li>
                  <li><Link to="/games" className="text-white/80 hover:text-white transition-colors">Playable Mini-Games</Link></li>
                  <li><Link to="/game/play/word-builder" className="text-white/80 hover:text-white transition-colors">Word Builder Quest</Link></li>
                  <li><Link to="/game/play/math-match" className="text-white/80 hover:text-white transition-colors">Math Match Arcade</Link></li>
                  <li><Link to="/progress" className="text-white/80 hover:text-white transition-colors">Badges & Streaks Vault</Link></li>
                </ul>
              </div>

              {/* Links Column 2: Subjects & SEO Blog */}
              <div className="md:col-span-2 space-y-3">
                <h4 className="font-display font-bold text-lg text-[#38B6FF]">Explore Topics</h4>
                <ul className="space-y-2.5 font-body text-base">
                  <li><Link to="/learn?subject=english" className="text-white/80 hover:text-white transition-colors">Phonics & ABCs</Link></li>
                  <li><Link to="/learn?subject=vocabulary" className="text-white/80 hover:text-white transition-colors">Grammar Safari</Link></li>
                  <li><Link to="/learn?subject=math" className="text-white/80 hover:text-white transition-colors">Numbers & Math</Link></li>
                  <li><Link to="/learn?subject=science" className="text-white/80 hover:text-white transition-colors">World & Nature</Link></li>
                  <li>
                    <Link to="/blog" className="text-[#FFD53D] hover:text-yellow-300 font-bold transition-colors inline-flex items-center gap-1">
                      <span>Learning Blog</span>
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full uppercase">New</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Links Column 3: Parents & Safety */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="font-display font-bold text-lg text-white">Parents Hub</h4>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3">
                  <p className="text-xs text-white/80 font-body leading-relaxed">
                    Track your child’s vocabulary growth and customize screen time limits in the Parent Portal.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link to="/parent" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-bold text-xs rounded-full shadow-md transition-all transform hover:scale-105">
                      <span>Parent Dashboard &rarr;</span>
                    </Link>
                    <Link to="/blog" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-display font-bold text-xs rounded-full transition-all">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Parenting & Literacy Blog</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-white/70">
              <p>© 2024 Lingo Toon. All rights reserved. Crafted with love for curious kids worldwide.</p>
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <Link 
                  to="/blog" 
                  onClick={() => sounds.playPop()}
                  className="text-[#FFD53D] hover:underline flex items-center gap-1.5 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learning Blog</span>
                </Link>
                <a 
                  href="https://youtube.com/@lingotoon-x2m" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-400" />
                  <span>YouTube Channel</span>
                </a>
                <span className="hover:text-white transition-colors cursor-pointer">Child Safety</span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
              </div>
            </div>

          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;
