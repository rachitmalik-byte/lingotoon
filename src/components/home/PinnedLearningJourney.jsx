import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Gamepad2, Award, Sparkles, ArrowRight, Bookmark, BookOpen } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { Link } from 'react-router-dom';

const PinnedLearningJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      id: 0,
      chapter: 'CHAPTER 01',
      actionBubble: 'POW! WATCH & SING',
      title: 'Captivating Animated Toon Lessons',
      subtitle: 'Catchy Phonics, Melodies & Rhymes',
      description: 'Children absorb letter sounds, vocabulary, and rhythm naturally through animated musical episodes and singing characters.',
      icon: PlayCircle,
      accentColor: '#7C3AED',
      tagColor: 'bg-brand-purple text-white border-brand-purple',
      tabColor: 'bg-[#FFD53D] text-neutral-900 border-neutral-900',
      tabInactive: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300',
      panelBg: 'bg-gradient-to-br from-[#FFFDF8] via-white to-purple-50/40',
      image: '/images/video_alphabet_song.jpg',
      stat: '100+ Musical Songs',
      link: '/videos',
      cta: 'Explore Video Songs',
      stickerText: 'Issue #1: Phonics Beat'
    },
    {
      id: 1,
      chapter: 'CHAPTER 02',
      actionBubble: 'ZAP! PLAY & SPELL',
      title: 'Interactive Tactile Word Arcades',
      subtitle: 'Drag, Drop & Spell Living Words',
      description: 'Kids arrange letter tiles, hear instant tactile sound chimes, and build confidence while spelling real words in our Word Builder arcade.',
      icon: Gamepad2,
      accentColor: '#F97316',
      tagColor: 'bg-brand-orange text-white border-brand-orange',
      tabColor: 'bg-[#FF8A3D] text-white border-neutral-900',
      tabInactive: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300',
      panelBg: 'bg-gradient-to-br from-[#FFFDF8] via-white to-orange-50/40',
      image: '/images/game_word_builder.jpg',
      stat: 'Touch-Friendly Games',
      link: '/games',
      cta: 'Play Word Builder',
      stickerText: 'Issue #2: Letter Quest'
    },
    {
      id: 2,
      chapter: 'CHAPTER 03',
      actionBubble: 'BOOM! COLLECT & SHINE',
      title: 'Streaks, Golden Stars & Badges',
      subtitle: 'Celebrate Milestones & Earn XP Gems',
      description: 'Every completed quest unlocks shiny badges, daily streak flames, and level upgrades that make young learners genuinely proud.',
      icon: Award,
      accentColor: '#F59E0B',
      tagColor: 'bg-amber-500 text-white border-amber-500',
      tabColor: 'bg-[#7C3AED] text-white border-neutral-900',
      tabInactive: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300',
      panelBg: 'bg-gradient-to-br from-[#FFFDF8] via-white to-amber-50/40',
      image: '/images/game_math_match.jpg',
      stat: 'Trophy Hall Unlocked',
      link: '/progress',
      cta: 'View Learning Badges',
      stickerText: 'Issue #3: Star Vault'
    }
  ];

  // Stop-scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;
      
      // Calculate how far container has scrolled past top
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      
      if (scrollProgress < 0.33) {
        setActiveStep(0);
      } else if (scrollProgress < 0.67) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = steps[activeStep];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[165vh] bg-[#FAF9F6] border-b border-neutral-200/60"
    >
      {/* 
        STICKY PINNED CONTAINER:
        Locks to the screen at top-20 until the 165vh scroll track finishes,
        then smoothly unpins into the next section with ZERO extra whitespace.
      */}
      <div className="sticky top-20 sm:top-24 h-[calc(100vh-80px)] min-h-[580px] max-h-[780px] flex items-center justify-center z-20 px-3 sm:px-6">
        <div className="container-app w-full max-w-6xl">
          
          {/* COMIC NOTEBOOK SHOWCASE BOOKLET */}
          <div className="relative rounded-[2.8rem] sm:rounded-[3.2rem] bg-[#FFFDF9] border-3 sm:border-4 border-neutral-900 shadow-[8px_8px_0px_0px_#18181B] sm:shadow-[12px_12px_0px_0px_#18181B] overflow-hidden transition-all">
            
            {/* SPIRAL BINDER STRIP ON TOP (Authentic Notebook Feel) */}
            <div className="bg-[#FAF7EE] border-b-3 border-neutral-900 px-6 py-2.5 flex items-center justify-between relative select-none">
              {/* Spiral Holes Pattern */}
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-neutral-900 shadow-inner" />
                    <div className="w-1.5 h-3 sm:w-2 sm:h-3.5 bg-neutral-300 rounded-xs -mt-1 shadow-xs border border-neutral-400" />
                  </div>
                ))}
              </div>

              {/* Notebook Title Bar with Washi Tape Stamp */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-amber-200 border-2 border-neutral-900 rounded-md font-display font-black text-[11px] sm:text-xs text-neutral-900 shadow-[2px_2px_0px_0px_#18181B] transform -rotate-1 hidden sm:flex items-center gap-1.5">
                  <Bookmark className="w-3 h-3 text-brand-purple fill-current" />
                  <span>LINGO COMIC NOTEBOOK</span>
                </div>
                <span className="font-display font-black text-xs text-neutral-600 tracking-wider">
                  VOL. 1 • 3-STEP JOURNEY
                </span>
              </div>
            </div>

            {/* MAIN COMIC STAGE INTERIOR (Lined Paper Subtle Background) */}
            <div 
              className="p-6 sm:p-8 lg:p-10 relative bg-[#FFFDF9]"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(124, 58, 237, 0.05) 32px)',
                backgroundSize: '100% 32px'
              }}
            >
              
              {/* TOP HEADER: CHAPTER TABS & TITLE */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b-2 border-dashed border-neutral-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border-2 border-neutral-900 text-neutral-900 text-xs font-display font-black mb-1.5 shadow-[2px_2px_0px_0px_#18181B]">
                    <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                    <span>How Children Master Language With Lingo Toon</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                    The 3-Step Interactive Storybook Odyssey
                  </h3>
                </div>

                {/* NOTEBOOK INDEX TABS (Clickable & Active on Scroll) */}
                <div className="flex items-center gap-1.5 sm:gap-2 self-start md:self-auto">
                  {steps.map((step, idx) => {
                    const isCurrent = activeStep === idx;
                    return (
                      <button
                        key={step.id}
                        onClick={() => { sounds.playPop(); setActiveStep(idx); }}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-display font-black text-xs sm:text-sm border-2 transition-all transform duration-200 cursor-pointer ${
                          isCurrent
                            ? `${step.tabColor} shadow-[3px_3px_0px_0px_#18181B] -translate-y-1 scale-105`
                            : 'bg-white text-neutral-600 hover:bg-neutral-100 border-neutral-400 shadow-[1px_1px_0px_0px_#18181B]'
                        }`}
                      >
                        Step {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TWO-COLUMN COMIC BOOK PANELS (Left: Text & CTA, Right: Artwork) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* LEFT PANEL: COMIC SPEECH & DESCRIPTION */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Comic Bubble Pill */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-display font-black tracking-wider px-3.5 py-1 rounded-full border-2 border-neutral-900 shadow-[2px_2px_0px_0px_#18181B] ${current.tagColor}`}>
                      {current.actionBubble}
                    </span>
                    <span className="text-xs font-display font-extrabold text-neutral-400 uppercase tracking-wider">
                      {current.chapter}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-neutral-900 leading-tight">
                    {current.title}
                  </h2>

                  {/* Subtitle */}
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-brand-purple">
                    {current.subtitle}
                  </h4>

                  {/* Paragraph Description */}
                  <p className="font-body text-sm sm:text-base text-neutral-700 font-semibold leading-relaxed">
                    {current.description}
                  </p>

                  {/* Tactile Highlight Sticker */}
                  <div className="pt-1 flex items-center gap-3">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-neutral-400">
                      Notebook Milestone:
                    </span>
                    <span className="font-display font-black text-xs px-3.5 py-1 rounded-lg bg-yellow-100 border-2 border-neutral-900 text-neutral-900 shadow-[2px_2px_0px_0px_#18181B] transform -rotate-1">
                      {current.stat}
                    </span>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-3">
                    <Link to={current.link} onClick={() => sounds.playPop()}>
                      <button className="px-7 sm:px-9 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-display font-black text-sm sm:text-base border-2 border-neutral-900 shadow-[4px_4px_0px_0px_#FFD53D] hover:shadow-[6px_6px_0px_0px_#FFD53D] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-2.5">
                        <span>{current.cta}</span>
                        <ArrowRight className="w-4 h-4 text-brand-yellow stroke-[3]" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* RIGHT PANEL: COMIC FRAMED 3D ARTWORK */}
                <div className="lg:col-span-6">
                  <div className={`relative aspect-[16/11] rounded-[2.2rem] p-3 sm:p-4 border-3 sm:border-4 border-neutral-900 shadow-[6px_6px_0px_0px_#18181B] overflow-hidden ${current.panelBg} transition-all duration-300`}>
                    {/* Inner Comic Art Box */}
                    <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative border-2 border-neutral-900 shadow-inner bg-neutral-900 group">
                      <img
                        key={current.image}
                        src={current.image}
                        alt={current.title}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Washi Tape Corner Label */}
                      <div className="absolute top-3 left-3 bg-white/95 border-2 border-neutral-900 px-3 py-1 rounded-md font-display font-black text-[11px] text-neutral-900 shadow-[2px_2px_0px_0px_#18181B] transform -rotate-2">
                        {current.stickerText}
                      </div>

                      {/* Bottom Step Indicator Pill */}
                      <div className="absolute bottom-3 left-3 bg-neutral-900/95 text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-display font-black flex items-center gap-2 shadow-md">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                        <span>Chapter {current.id + 1} of 3</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM FOOTER: NOTEBOOK SCROLL PROGRESS TRACKER */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-display font-black text-neutral-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-purple" />
                  <span>Interactive Reading Progress:</span>
                  <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-900 font-black">
                    {activeStep === 0 ? '33% (Chapter 1)' : activeStep === 1 ? '66% (Chapter 2)' : '100% (Completed)'}
                  </span>
                </div>

                {/* Visual Step Dots */}
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 font-extrabold uppercase tracking-wider text-[11px]">
                    Scroll Down To Advance Chapters
                  </span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeStep === i 
                            ? 'w-8 bg-neutral-900' 
                            : activeStep > i 
                              ? 'w-2.5 bg-brand-green' 
                              : 'w-2.5 bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedLearningJourney;
