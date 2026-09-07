import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturePillars = () => {
  const pillars = [
    {
      id: 'lessons',
      title: 'Interactive Lessons',
      subtitle: 'Watch & Sing Along',
      description: 'Fun animated video songs and structured phonics lessons that make concepts stick naturally.',
      image: '/images/video_alphabet_song.jpg',
      badge: '100+ Video Songs',
      badgeColor: 'bg-brand-purple text-white',
      link: '/videos',
      ctaText: 'Start Watching',
      accentColor: '#7C3AED',
      bgGradient: 'from-purple-50 via-white to-indigo-50/40',
      borderColor: 'border-purple-100 hover:border-brand-purple/40',
      btnBg: 'bg-brand-purple hover:bg-brand-purple-dark text-white'
    },
    {
      id: 'games',
      title: 'Language Games',
      subtitle: 'Play & Spell Words',
      description: 'Exciting mini-games like Word Builder and Math Match that turn learning into playtime.',
      image: '/images/game_word_builder.jpg',
      badge: 'Playable Arcade',
      badgeColor: 'bg-brand-orange text-white',
      link: '/games',
      ctaText: 'Play Word Builder',
      accentColor: '#F97316',
      bgGradient: 'from-amber-50 via-white to-orange-50/40',
      borderColor: 'border-orange-100 hover:border-brand-orange/40',
      btnBg: 'bg-brand-orange hover:bg-orange-600 text-white'
    },
    {
      id: 'progress',
      title: 'Visual Progress',
      subtitle: 'Earn Stars & Streaks',
      description: 'Adventure journey maps, streaks, and colorful badges to keep young learners rewarded and proud.',
      image: '/images/game_math_match.jpg',
      badge: 'Journey Map',
      badgeColor: 'bg-brand-green text-white',
      link: '/progress',
      ctaText: 'View Journey',
      accentColor: '#10B981',
      bgGradient: 'from-emerald-50 via-white to-teal-50/40',
      borderColor: 'border-emerald-100 hover:border-brand-green/40',
      btnBg: 'bg-brand-green hover:bg-emerald-600 text-white'
    }
  ];

  return (
    <section className="py-14 md:py-20 relative z-10">
      <div className="container-app">
        
        {/* Section Heading with Big Friendly Readable Typography */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow-light border border-brand-yellow/30 shadow-xs">
            <span className="text-base">🚀</span>
            <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-800">
              Explore The Platform
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-tight">
            Three Ways to <span className="text-brand-purple">Learn & Grow</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-600 font-medium">
            Designed for curious young minds. Safe, ad-free, and delightfully rewarding.
          </p>
        </div>

        {/* 3 Floating Adventure Pods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`rounded-[2.5rem] p-6 sm:p-7 bg-gradient-to-b ${pillar.bgGradient} border-2 ${pillar.borderColor} shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* 3D Image Frame with Fluid Rounded Corners */}
                <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden mb-6 shadow-md bg-neutral-900 group-hover:shadow-xl transition-all">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className={`text-xs font-display font-bold px-3 py-1 rounded-full shadow-md ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Center Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-13 h-13 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current text-brand-purple" />
                    </div>
                  </div>
                </div>

                {/* Subtitle Pill */}
                <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  {pillar.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 mb-2.5">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-neutral-600 font-medium leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Action Button */}
              <Link to={pillar.link} className="w-full block pt-2">
                <button className={`w-full py-3.5 px-6 rounded-full font-display font-bold text-base shadow-md hover:shadow-lg transition-all transform group-hover:scale-102 active:scale-98 flex items-center justify-center gap-2 ${pillar.btnBg}`}>
                  <span>{pillar.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturePillars;
