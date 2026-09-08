import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, Youtube, Instagram, Sprout, BookOpen, Shield, Code, Edit3
} from 'lucide-react';
import Logo from '../ui/Logo';
import { sounds } from '../../utils/soundEffects';
import { useDeveloper } from '../../context/DeveloperContext';

// Rich vector plant definitions for the minimal soil strip (Google Anti-gravity style)
const vectorPlants = [
  { id: 'p1', left: '3%', height: 50, type: 'twoLeaf', color: '#4ADE80', swayDuration: 3.4, delay: 0 },
  { id: 'p2', left: '9%', height: 58, type: 'flower', color: '#F472B6', swayDuration: 4.0, delay: 0.3 },
  { id: 'p3', left: '16%', height: 46, type: 'clover', color: '#22C55E', swayDuration: 3.1, delay: 0.7 },
  { id: 'p4', left: '23%', height: 56, type: 'fern', color: '#10B981', swayDuration: 4.4, delay: 0.2 },
  { id: 'p5', left: '30%', height: 64, type: 'flower', color: '#FBBF24', swayDuration: 4.2, delay: 0.5 },
  { id: 'p6', left: '38%', height: 48, type: 'twoLeaf', color: '#86EFAC', swayDuration: 3.6, delay: 0.9 },
  { id: 'p7', left: '45%', height: 60, type: 'sunflower', color: '#F59E0B', swayDuration: 4.5, delay: 0.1 },
  { id: 'p8', left: '52%', height: 52, type: 'clover', color: '#22C55E', swayDuration: 3.3, delay: 0.6 },
  { id: 'p9', left: '59%', height: 58, type: 'flower', color: '#A78BFA', swayDuration: 3.9, delay: 0.4 },
  { id: 'p10', left: '67%', height: 62, type: 'fern', color: '#059669', swayDuration: 4.6, delay: 0.8 },
  { id: 'p11', left: '74%', height: 48, type: 'twoLeaf', color: '#4ADE80', swayDuration: 3.5, delay: 0.2 },
  { id: 'p12', left: '81%', height: 60, type: 'flower', color: '#FB923C', swayDuration: 4.1, delay: 0.5 },
  { id: 'p13', left: '88%', height: 50, type: 'clover', color: '#22C55E', swayDuration: 3.7, delay: 0.7 },
  { id: 'p14', left: '94%', height: 54, type: 'twoLeaf', color: '#86EFAC', swayDuration: 4.3, delay: 0.3 },
];

const VectorPlantElement = ({ plant }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute bottom-0 cursor-pointer select-none origin-bottom pointer-events-auto"
      style={{ left: plant.left }}
      animate={
        isHovered
          ? { y: -26, rotate: 10, scale: 1.25, transition: { type: 'spring', stiffness: 300, damping: 14 } }
          : {
              y: [-4, 3, -4],
              rotate: [-7, 7, -7],
              transition: {
                y: { duration: plant.swayDuration * 0.85, repeat: Infinity, ease: 'easeInOut', delay: plant.delay },
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
        width={plant.height * 0.85}
        height={plant.height}
        viewBox="0 0 44 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
      >
        {/* Plant Stem anchored at soil horizon */}
        <path
          d="M22 60 Q22 36 20 18"
          stroke="#15803D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {plant.type === 'twoLeaf' && (
          <>
            {/* Left Leaf */}
            <path
              d="M20 38 C10 34 5 24 10 18 C16 20 20 28 20 38 Z"
              fill={plant.color}
              stroke="#15803D"
              strokeWidth="2"
            />
            {/* Right Leaf */}
            <path
              d="M20 30 C30 26 38 16 33 10 C27 12 21 20 20 30 Z"
              fill={plant.color}
              stroke="#15803D"
              strokeWidth="2"
            />
          </>
        )}

        {plant.type === 'clover' && (
          <>
            <circle cx="12" cy="22" r="8" fill={plant.color} stroke="#15803D" strokeWidth="2" />
            <circle cx="28" cy="20" r="8" fill={plant.color} stroke="#15803D" strokeWidth="2" />
            <circle cx="20" cy="12" r="8.5" fill={plant.color} stroke="#15803D" strokeWidth="2" />
          </>
        )}

        {plant.type === 'fern' && (
          <>
            <path d="M21 44 C13 40 10 32 14 29 C18 31 21 37 21 44 Z" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
            <path d="M21 34 C29 30 32 22 28 19 C24 21 21 27 21 34 Z" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
            <path d="M20 24 C14 22 11 14 15 12 C18 14 20 19 20 24 Z" fill={plant.color} stroke="#15803D" strokeWidth="1.5" />
            <circle cx="20" cy="9" r="5" fill="#4ADE80" />
          </>
        )}

        {plant.type === 'flower' && (
          <>
            <path d="M21 40 C12 38 10 30 14 27 C18 29 21 34 21 40 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            {/* Flower Blossom Petals */}
            <circle cx="20" cy="14" r="9.5" fill={plant.color} stroke="#FFF" strokeWidth="1.5" />
            <circle cx="20" cy="14" r="4.5" fill="#FBBF24" />
          </>
        )}

        {plant.type === 'sunflower' && (
          <>
            <path d="M21 42 C30 40 33 32 29 28 C25 30 21 36 21 42 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <circle cx="20" cy="14" r="11" fill="#FBBF24" stroke="#FFF" strokeWidth="1.5" />
            <circle cx="20" cy="14" r="5" fill="#78350F" />
          </>
        )}

        {/* Floating Dew/Sparkle dot (Anti-gravity floating aesthetic) */}
        <motion.circle
          cx="28"
          cy="7"
          r="2.2"
          fill="#FFF"
          opacity={0.85}
          animate={{ y: [-3, 3, -3], opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
};

const Footer = () => {
  const { settings } = useDeveloper() || {};
  // A/B Test Toggle: Default state is OFF (false), keeping standard footer until toggled ON
  const [isSoilStyle, setIsSoilStyle] = useState(settings?.soilFooterDefault || false);

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
        <footer className="relative bg-[#381F10] text-white pt-20 pb-24 md:pb-12 select-none overflow-visible border-t-4 border-[#5A351D] shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
          
          {/* SPROUTING VECTOR PLANTS STRIP ALONG TOP EDGE (Google Anti-Gravity Sway & Float) */}
          <div className="absolute -top-14 left-0 right-0 h-16 pointer-events-none overflow-visible z-20">
            {vectorPlants.map((plant) => (
              <VectorPlantElement key={plant.id} plant={plant} />
            ))}
          </div>

          {/* Minimal Soil Horizon Layers */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#5A351D] opacity-95" />
          <div className="absolute top-2.5 left-0 right-0 h-1.5 bg-[#4A2B18] opacity-75" />
          
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
              <nav className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 text-xs font-display font-bold text-amber-100/80">
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

              {/* Right: Social Media Connections (YouTube & Instagram) */}
              <div className="flex items-center gap-3">
                {/* YouTube Link */}
                <a
                  href="https://youtube.com/@lingotoon-x2m"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playPop()}
                  className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Official LiNGO TOON YouTube Channel (@lingotoon-x2m)"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                </a>

                {/* Instagram Link */}
                <a
                  href="https://www.instagram.com/lingotoons_eng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playPop()}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Official LiNGO TOON Instagram (@lingotoons_eng)"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4 stroke-[2.5]" />
                </a>

                <div className="text-left hidden sm:block">
                  <span className="text-[11px] font-display font-bold text-white block">Official Socials</span>
                  <span className="text-[10px] text-amber-200/60 block">@lingotoon-x2m • @lingotoons_eng</span>
                </div>
              </div>

            </div>

            {/* Bottom Minimal Copyright Bar with discreet Admin / Creator shortcuts */}
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-body text-amber-100/60">
              <p>© 2024 Lingo Toon. Minimal Vector Soil Edition. Crafted for curious young minds.</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/semi-admin" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  <Edit3 className="w-3 h-3 text-amber-300" />
                  <span>Creator Studio</span>
                </Link>
                <span>•</span>
                <Link to="/admin" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  <Code className="w-3 h-3 text-amber-300" />
                  <span>Dev Admin</span>
                </Link>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">Child Safety</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </div>
            </div>

          </div>
        </footer>
      ) : (

        /* =========================================================================
            VARIANT A: STANDARD PURPLE WAVE FOOTER (Default State - Toggle is OFF)
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

                {/* SOCIAL MEDIA CONNECTIONS (YOUTUBE & INSTAGRAM CAPSULES) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* YouTube Button */}
                  <a
                    href="https://youtube.com/@lingotoon-x2m"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playPop()}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-xs font-display font-bold"
                    title="Watch LiNGO TOON on YouTube (@lingotoon-x2m)"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                    <span>YouTube</span>
                  </a>

                  {/* Instagram Button */}
                  <a
                    href="https://www.instagram.com/lingotoons_eng/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playPop()}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-xs font-display font-bold"
                    title="Follow LiNGO TOON on Instagram (@lingotoons_eng)"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4 stroke-[2.5]" />
                    <span>@lingotoons_eng</span>
                  </a>
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

              {/* Links Column 3: Parents & Admin Hub */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="font-display font-bold text-lg text-white">Parents & Studio</h4>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3">
                  <p className="text-xs text-white/80 font-body leading-relaxed">
                    Track your child’s vocabulary growth, post content in Semi-Admin, or access Developer Controls.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link to="/parent" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FFD53D] hover:bg-yellow-400 text-neutral-900 font-display font-bold text-xs rounded-full shadow-md transition-all transform hover:scale-105">
                      <span>Parent Dashboard &rarr;</span>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link to="/semi-admin" className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white font-display font-bold text-[11px] rounded-xl transition-all">
                        <Edit3 className="w-3 h-3 text-yellow-300" />
                        <span>Creator Studio</span>
                      </Link>
                      <Link to="/admin" className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white font-display font-bold text-[11px] rounded-xl transition-all">
                        <Code className="w-3 h-3 text-cyan-300" />
                        <span>Dev Admin</span>
                      </Link>
                    </div>
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
                  <span>YouTube</span>
                </a>
                <a 
                  href="https://www.instagram.com/lingotoons_eng/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
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
