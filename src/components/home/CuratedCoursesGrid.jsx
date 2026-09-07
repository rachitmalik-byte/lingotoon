import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Star, CheckCircle, Flame, Compass, Utensils, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const allCourses = [
  {
    id: 'c1',
    title: 'Fun with ABCs',
    category: 'phonics',
    age: 'Ages 4-6',
    description: 'Start the alphabet adventure with phonics songs, letter tracing, and playful word games!',
    image: '/images/video_alphabet_song.jpg',
    tag: 'Phonics & ABCs',
    accentColor: '#38B6FF',
    badgeBg: 'bg-sky-100 text-sky-700',
    xpReward: 50,
    buttonText: 'Start Quest',
    link: '/learn?subject=english'
  },
  {
    id: 'c2',
    title: "Bear's Grammar Safari",
    category: 'grammar',
    age: 'Ages 7-9',
    description: 'Explore sentence building, word pairs, and safari grammar quests with funny animal friends.',
    image: '/images/video_animal_safari.jpg',
    tag: 'Grammar Safari',
    accentColor: '#F97316',
    badgeBg: 'bg-amber-100 text-amber-800',
    xpReward: 75,
    buttonText: 'Join Safari',
    link: '/learn?subject=vocabulary'
  },
  {
    id: 'c3',
    title: "Globe Trotter's World",
    category: 'world',
    age: 'Ages 6-10',
    description: 'Travel with Lingo to discover world cultures, greetings, landmarks, and geography vocabulary.',
    image: '/images/game_alphabet_adventure.jpg',
    tag: 'World & Culture',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    xpReward: 60,
    buttonText: 'Explore Pack',
    link: '/learn?subject=general'
  },
  {
    id: 'c4',
    title: 'Taste & Learn Kitchen',
    category: 'world',
    age: 'Ages 5-8',
    description: 'Learn delicious food names, cooking words, shapes, and everyday family dinner table conversations.',
    image: '/images/video_rainbow_colors.jpg',
    tag: 'Everyday Words',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-purple-100 text-purple-800',
    xpReward: 50,
    buttonText: 'Start Lesson',
    link: '/learn?subject=reading'
  }
];

const categories = [
  { id: 'all', label: 'All Learning Packs' },
  { id: 'phonics', label: 'Ages 4-6 (Phonics)' },
  { id: 'grammar', label: 'Ages 7-9 (Grammar)' },
  { id: 'world', label: 'World & Food' },
];

const CuratedCoursesGrid = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = activeTab === 'all'
    ? allCourses
    : allCourses.filter(c => c.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-white/70 relative z-10">
      <div className="container-app">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>Tailored For Young Minds</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-tight">
              Curated Courses for <span className="text-brand-purple">Kids</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-neutral-600 font-medium max-w-xl">
              Step-by-step learning paths crafted by education experts. Engaging, intuitive, and fun.
            </p>
          </div>

          <Link 
            to="/learn" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white font-display font-bold text-sm shadow-md hover:bg-brand-purple-dark transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap self-start md:self-end"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 shadow-xs ${
                  isActive
                    ? 'bg-[#FFD53D] text-neutral-900 shadow-md ring-2 ring-yellow-400'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 4 Cards Grid with Fluid Quest Capsules */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
        >
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] p-5 sm:p-6 shadow-card hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Thumbnail Frame */}
                  <div className="relative aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-5 bg-neutral-900 shadow-sm">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Age Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 text-white text-xs font-display font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                      {course.age}
                    </div>

                    {/* XP Tag */}
                    <div className="absolute bottom-3 left-3 bg-white/95 text-neutral-900 text-xs font-display font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 text-brand-yellow fill-current" />
                      <span>+{course.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Subject Tag */}
                  <div className="mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-display font-bold px-3 py-1 rounded-full ${course.badgeBg}`}>
                      <Sparkles className="w-3 h-3" />
                      <span>{course.tag}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 mb-2 leading-tight group-hover:text-brand-purple transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm sm:text-base text-neutral-600 font-medium leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                {/* Pill Action Button */}
                <Link to={course.link} className="w-full block pt-2">
                  <button className="w-full py-3 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-display font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform group-hover:scale-102 active:scale-98 flex items-center justify-center gap-2">
                    <span>{course.buttonText}</span>
                  </button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default CuratedCoursesGrid;
