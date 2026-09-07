import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Gamepad2, Flame, Trophy, CheckCircle, Star } from 'lucide-react';
import { userProgress } from '../data/userProgress';
import { achievements } from '../data/achievements';
import StreakCounter from '../components/interactive/StreakCounter';
import AchievementBadge from '../components/content/AchievementBadge';
import ProgressBar from '../components/ui/ProgressBar';
import LingoCharacter from '../components/decorative/LingoCharacter';
import { staggerContainer, staggerItem, fadeIn } from '../hooks/useAnimation';

const ProgressPage = () => {
  const levels = userProgress?.levelProgression || [
    { id: 1, level: 1, title: 'Beginner Explorer', status: 'completed', xp: 500 },
    { id: 2, level: 2, title: 'Curious Learner', status: 'current', xp: 1200 },
    { id: 3, level: 3, title: 'Knowledge Seeker', status: 'locked', xp: 2500 },
    { id: 4, level: 4, title: 'Brainiac Buddy', status: 'locked', xp: 4000 },
  ];

  const weeklyData = [
    { day: 'Mon', mins: 25 },
    { day: 'Tue', mins: 40 },
    { day: 'Wed', mins: 15 },
    { day: 'Thu', mins: 45 },
    { day: 'Fri', mins: 30 },
    { day: 'Sat', mins: 60, current: true },
    { day: 'Sun', mins: 0 },
  ];
  const maxMins = Math.max(...weeklyData.map(d => d.mins), 60);

  return (
    <div className="container-app py-8 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-brand-lavender p-8 rounded-[2.5rem]">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-brand-purple-dark mb-2">My Learning Journey</h1>
          <p className="font-body text-xl text-brand-purple">You're doing amazing, keep it up!</p>
        </div>
        <LingoCharacter pose="celebrate" size="md" className="hidden md:block w-32 -mt-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Stats & Activity */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Quick Stats Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <motion.div variants={staggerItem} className="bg-white p-5 rounded-2xl shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-blue-light rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-brand-blue" />
              </div>
              <span className="font-display text-3xl text-neutral-800">42</span>
              <span className="font-body text-sm font-bold text-neutral-500 uppercase tracking-wider">Lessons</span>
            </motion.div>
            
            <motion.div variants={staggerItem} className="bg-white p-5 rounded-2xl shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-orange-light rounded-full flex items-center justify-center mb-3">
                <PlayCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <span className="font-display text-3xl text-neutral-800">128</span>
              <span className="font-body text-sm font-bold text-neutral-500 uppercase tracking-wider">Videos</span>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-white p-5 rounded-2xl shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-3">
                <Gamepad2 className="w-6 h-6 text-brand-green" />
              </div>
              <span className="font-display text-3xl text-neutral-800">56</span>
              <span className="font-body text-sm font-bold text-neutral-500 uppercase tracking-wider">Games</span>
            </motion.div>
            
            <motion.div variants={staggerItem} className="flex justify-center">
              <StreakCounter 
                currentStreak={userProgress?.currentStreak || 5} 
                longestStreak={userProgress?.longestStreak || 7} 
              />
            </motion.div>
          </motion.div>

          {/* Weekly Activity Chart */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-card">
            <h3 className="font-display text-2xl text-brand-purple-dark mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-brand-orange" />
              Weekly Activity
            </h3>
            <div className="flex items-end justify-between h-48 gap-2 md:gap-4 mt-8">
              {weeklyData.map((day, i) => {
                const heightPercent = (day.mins / maxMins) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 group">
                    <span className="font-display font-bold text-sm text-neutral-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.mins}m
                    </span>
                    <div className="w-full bg-neutral-100 rounded-t-xl relative overflow-hidden h-full flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full rounded-t-xl ${day.current ? 'bg-brand-orange' : 'bg-brand-purple-light group-hover:bg-brand-purple'}`}
                      />
                    </div>
                    <span className={`mt-3 font-body text-sm font-bold ${day.current ? 'text-brand-orange' : 'text-neutral-500'}`}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-card">
            <h3 className="font-display text-2xl text-brand-purple-dark mb-6">Subject Skills</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-body font-bold mb-2">
                  <span className="text-brand-blue">Math</span>
                  <span className="text-neutral-600">85%</span>
                </div>
                <ProgressBar progress={85} color="#3B82F6" height="h-3" />
              </div>
              <div>
                <div className="flex justify-between font-body font-bold mb-2">
                  <span className="text-brand-green">Science</span>
                  <span className="text-neutral-600">60%</span>
                </div>
                <ProgressBar progress={60} color="#22C55E" height="h-3" />
              </div>
              <div>
                <div className="flex justify-between font-body font-bold mb-2">
                  <span className="text-brand-purple">English</span>
                  <span className="text-neutral-600">40%</span>
                </div>
                <ProgressBar progress={40} color="#7C3AED" height="h-3" />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-display text-2xl text-brand-purple-dark mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-brand-yellow" />
              Recent Badges
            </h3>
            <div className="flex flex-wrap gap-4">
              {(achievements || []).slice(0, 4).map(ach => (
                <AchievementBadge key={ach.id} achievement={ach} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Journey Path */}
        <div className="lg:col-span-4">
          <div className="bg-brand-purple rounded-3xl p-6 md:p-8 text-white h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="font-display text-3xl mb-8 relative z-10">Adventure Map</h3>
            
            <div className="relative z-10 space-y-0 py-4">
              {levels.map((lvl, index) => {
                const isLast = index === levels.length - 1;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={lvl.id} className="relative flex flex-col">
                    {/* Level Node */}
                    <div className={`flex items-center gap-4 relative z-10 ${isEven ? 'flex-row' : 'flex-row-reverse text-right'}`}>
                      {/* Node Icon */}
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-brand-purple shadow-lg
                        ${lvl.status === 'completed' ? 'bg-brand-green text-white' : 
                          lvl.status === 'current' ? 'bg-brand-yellow text-brand-purple-dark animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 
                          'bg-brand-purple-dark text-brand-purple-light border-brand-purple-light/20'}
                      `}>
                        {lvl.status === 'completed' ? <CheckCircle className="w-8 h-8" /> : 
                         lvl.status === 'current' ? <Star className="w-8 h-8 fill-current" /> : 
                         <span className="font-display text-2xl font-bold">{lvl.level}</span>}
                      </div>
                      
                      {/* Node Content */}
                      <div className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                        <span className="font-body font-bold text-white/70 text-sm uppercase tracking-wider">Level {lvl.level}</span>
                        <span className="font-display text-xl text-white">{lvl.title}</span>
                        {lvl.status === 'locked' && <span className="font-body text-sm text-white/50">{lvl.xp} XP</span>}
                      </div>
                    </div>

                    {/* Connecting Line (except for last item) */}
                    {!isLast && (
                      <div className="h-20 flex relative -z-0">
                        {/* Wavy line SVG could go here, for now a simple vertical/diagonal div representation */}
                        <div className={`absolute top-0 w-1 h-full bg-white/20 
                          ${isEven ? 'left-8' : 'right-8'}
                        `}>
                           {lvl.status === 'completed' && <div className="w-full h-full bg-brand-green"></div>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Parent Portal Link */}
      <div className="mt-16 text-center">
        <Link to="/parent" className="inline-flex items-center gap-2 font-body font-bold text-neutral-400 hover:text-brand-purple transition-colors">
          Switch to Parent Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ProgressPage;
