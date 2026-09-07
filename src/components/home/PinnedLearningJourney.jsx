import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Gamepad2, Award, Sparkles, ArrowRight, Check } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { Link } from 'react-router-dom';

const PinnedLearningJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      id: 0,
      badge: 'Step 1: Watch & Sing',
      title: 'Captivating Animated Toon Lessons',
      description: 'Children absorb phonics, grammar, and early vocabulary effortlessly through high-energy music videos and lovable animated characters.',
      icon: PlayCircle,
      accentColor: '#7C3AED',
      badgeBg: 'bg-brand-purple text-white',
      cardBg: 'from-purple-50 via-white to-indigo-50/50',
      image: '/images/video_alphabet_song.jpg',
      stat: '100+ Musical Videos',
      link: '/videos',
      cta: 'Explore Video Songs'
    },
    {
      id: 1,
      badge: 'Step 2: Play & Spell',
      title: 'Interactive Tactile Word Arcades',
      description: 'Kids drag scrambled letters, hear instant tactile sound chimes, and build confidence while spelling real words in our Word Builder and Math games.',
      icon: Gamepad2,
      accentColor: '#F97316',
      badgeBg: 'bg-brand-orange text-white',
      cardBg: 'from-amber-50 via-white to-orange-50/50',
      image: '/images/game_word_builder.jpg',
      stat: 'Playable Mini-Games',
      link: '/games',
      cta: 'Play Word Builder'
    },
    {
      id: 2,
      badge: 'Step 3: Celebrate & Master',
      title: 'Streaks, Golden Stars & XP Gems',
      description: 'Every completed mission unlocks shiny badges, daily streak flames, and level upgrades that make young learners proud of their progress.',
      icon: Award,
      accentColor: '#F59E0B',
      badgeBg: 'bg-brand-yellow text-neutral-900',
      cardBg: 'from-yellow-50 via-white to-amber-50/50',
      image: '/images/game_math_match.jpg',
      stat: 'Rewarding Milestones',
      link: '/progress',
      cta: 'View Learning Badges'
    }
  ];

  // Monitor scroll within container to trigger stop-scroll phase
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;
      
      const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      
      if (currentProgress < 0.33) {
        setActiveStep(0);
      } else if (currentProgress < 0.66) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = steps[activeStep];

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]">
      {/* Sticky Pinned Screen (Freezes on screen while user scrolls through the 3 phases) */}
      <div className="sticky top-20 sm:top-24 h-[85vh] min-h-[580px] max-h-[820px] flex items-center overflow-hidden z-20">
        <div className="container-app w-full">
          
          {/* Outer Showcase Box */}
          <div className="rounded-[3.2rem] bg-white/90 backdrop-blur-xl border-2 border-purple-100 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden relative">
            
            {/* Top Subtitle Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow-light border border-brand-yellow/40 text-neutral-900 text-xs font-display font-black mb-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  <span>The 3-Step Learning Odyssey</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-neutral-900">
                  How Children Master Language with Lingo Toon
                </h3>
              </div>

              {/* Interactive Step Switcher Tabs */}
              <div className="flex gap-2">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                    className={`px-4 py-2 rounded-full font-display font-bold text-xs sm:text-sm transition-all ${
                      activeStep === idx
                        ? 'bg-neutral-900 text-white shadow-md scale-105'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                    }`}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Column Animated Content Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Descriptive Content */}
              <div className="lg:col-span-6 space-y-6">
                <motion.div
                  key={current.id + '-text'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className={`text-xs font-display font-black uppercase tracking-wider px-3.5 py-1 rounded-full inline-block shadow-xs ${current.badgeBg}`}>
                    {current.badge}
                  </span>

                  <h2 className="font-display font-black text-3xl sm:text-4xl text-neutral-900 leading-tight">
                    {current.title}
                  </h2>

                  <p className="font-body text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400">
                      Feature Highlight:
                    </span>
                    <span className="font-display font-bold text-xs px-3 py-1 rounded-full bg-purple-50 text-brand-purple border border-purple-200/60">
                      {current.stat}
                    </span>
                  </div>
                </motion.div>

                <div className="pt-4">
                  <Link to={current.link} onClick={() => sounds.playPop()}>
                    <button className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-display font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                      <span>{current.cta}</span>
                      <ArrowRight className="w-4 h-4 text-brand-yellow" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Artwork Stage with Claymorphic Frame */}
              <div className="lg:col-span-6">
                <motion.div
                  key={current.id + '-visual'}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className={`relative aspect-[16/11] rounded-[2.6rem] p-3 bg-gradient-to-b ${current.cardBg} border-2 border-white shadow-2xl overflow-hidden`}
                >
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative shadow-inner bg-neutral-900">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Progress Step Indicator Pill */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-md flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                      <span className="font-display font-black text-xs text-neutral-900">
                        Odyssey Milestone {current.id + 1} of 3
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedLearningJourney;
