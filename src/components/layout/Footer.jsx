import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Star, Youtube, ExternalLink, Music, BookOpen } from 'lucide-react';
import Logo from '../ui/Logo';
import { sounds } from '../../utils/soundEffects';

const Footer = () => {
  const [sparkleCount, setSparkleCount] = useState(0);

  const handleSparkleClick = () => {
    sounds.playPop();
    setSparkleCount(c => c + 1);
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

            {/* Official YouTube Channel Pill */}
            <div className="pt-1">
              <a
                href="https://youtube.com/@lingotoon-x2m"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playPop()}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs shadow-md transition-all transform hover:scale-105 active:scale-95"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>YouTube Channel: @lingotoon-x2m</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
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
                    className={`w-9 h-9 rounded-full ${c.color} text-neutral-900 font-display font-black text-xs shadow-md transform hover:scale-120 active:scale-90 transition-all flex items-center justify-center`}
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
  );
};

export default Footer;
