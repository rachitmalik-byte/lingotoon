import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Smartphone, CheckCircle2, ShieldCheck, Clock, Download, ArrowRight, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorksheetPreviewModal from '../modals/WorksheetPreviewModal';
import { sounds } from '../../utils/soundEffects';

const PhysicalAndMobileShowcase = () => {
  const [worksheetModalOpen, setWorksheetModalOpen] = useState(false);

  return (
    <div className="space-y-16 md:space-y-24 py-16 md:py-24 relative z-10 overflow-hidden">
      <WorksheetPreviewModal 
        isOpen={worksheetModalOpen} 
        onClose={() => setWorksheetModalOpen(false)} 
      />

      {/* ================= SECTION 1: PRACTICE ANYTIME, ANYWHERE ================= */}
      <section className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-light px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" /> Hands-On Activity Packs
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-tight">
            Practice Anytime, <span className="text-brand-orange">Anywhere</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium">
            Balance screen time with colorful physical activity sheets, reward stickers, and phonics flashcards!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Product Mockup Image Frame */}
          <div className="lg:col-span-7 relative">
            {/* Fluid decorative blob behind the image */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-amber-200/50 to-orange-200/40 rounded-[3rem] blur-2xl -z-10" />

            <div 
              onClick={() => { sounds.playPop(); setWorksheetModalOpen(true); }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group aspect-[16/10] bg-amber-50 cursor-pointer"
            >
              <img 
                src="/images/practice_notebook_merch.jpg" 
                alt="LingoToon Activity Sheets, Stickers and Flashcards" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="px-5 py-2.5 bg-white/95 rounded-full text-neutral-900 font-display font-bold text-sm shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                  <Eye className="w-4 h-4 text-brand-orange" />
                  <span>Click to Preview Activity Sheets</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-white">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-brand-orange shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-display font-bold text-sm text-neutral-900">Official Activity Kit</span>
                  <span className="text-xs text-neutral-500 font-medium">Activity Sheets, Stickers & Flashcards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & Bullet Points */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 leading-tight">
              Screen-Free Reinforcement for Confident Learning
            </h3>

            <p className="font-body text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              Every lesson comes alive in tangible form. Kids love tracing letters, solving mazes, and collecting golden reward stickers in their physical LingoToon workbook.
            </p>

            {/* Feature Checkpoints */}
            <div className="space-y-3.5 pt-1">
              {[
                { title: "Wipe-Clean Reusable Pages", desc: "Practice tracing letters again and again without waste." },
                { title: "100+ Reward Stickers Included", desc: "Kids earn stickers after each completed activity chapter." },
                { title: "Pocket Phonics Flashcards", desc: "Fun travel flashcards to play vocabulary games on road trips." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#FAF9F6] p-3.5 rounded-2xl border border-neutral-200/60">
                  <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-neutral-900">{item.title}</h4>
                    <p className="font-body text-xs sm:text-sm text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button 
                onClick={() => { sounds.playPop(); setWorksheetModalOpen(true); }}
                className="px-7 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-display font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Preview Workbook Sheets</span>
                <Eye className="w-4 h-4" />
              </button>
              <Link to="/learn" onClick={() => sounds.playPop()}>
                <button className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-700 font-display font-bold text-base rounded-full border border-neutral-300 transition-all">
                  All Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: LEARN ON THE GO ================= */}
      <section className="container-app pt-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <Smartphone className="w-3.5 h-3.5" /> Cross-Device Freedom
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-tight">
            Learn on the <span className="text-brand-blue">Go</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium">
            Learn on tablets, smartphones, or computers. One subscription syncs seamlessly across all family devices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Text Description */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 leading-tight">
              Seamless Learning, at Your Child’s Pace
            </h3>

            <p className="font-body text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              Whether on the morning school run, relaxing at home, or on long family trips, LingoToon keeps learning joyful and uninterrupted.
            </p>

            {/* Key Perks */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-display font-semibold text-neutral-800 text-sm sm:text-base">
                  Offline Mode — Download lessons for planes and road trips
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-brand-green shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-display font-semibold text-neutral-800 text-sm sm:text-base">
                  100% Kid-Safe & Zero External Ads
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-brand-purple shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display font-semibold text-neutral-800 text-sm sm:text-base">
                  Real-Time Cloud Sync across iPhone, iPad & Android
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/parent" onClick={() => sounds.playPop()}>
                <button className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-display font-bold text-base rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                  <span>Parent Controls & Progress</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Phone Mockup Image */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            {/* Fluid decorative blob behind the image */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-sky-200/50 to-blue-200/40 rounded-[3rem] blur-2xl -z-10" />

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group aspect-[16/10] bg-blue-50">
              <img 
                src="/images/learn_on_the_go_mockup.jpg" 
                alt="LingoToon on Smartphone" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Floating Notification Badge */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                <span className="font-display font-bold text-xs text-neutral-800">
                  Synced Across Mobile & Tablet
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PhysicalAndMobileShowcase;
