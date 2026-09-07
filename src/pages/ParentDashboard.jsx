import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Clock, BookOpen, Flame, TrendingUp, ChevronRight, Activity, Settings, 
  User, ShieldCheck, ShieldAlert, Star, PlayCircle, Gamepad2, CheckCircle2, 
  Bell, Volume2, Moon, Sparkles, ArrowLeft, Sliders, RefreshCw, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { sounds } from '../utils/soundEffects';

const ParentDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Interactive state
  const [selectedChild, setSelectedChild] = useState('Alex');
  const [dailyTimeLimit, setDailyTimeLimit] = useState(45);
  const [bedtimeLock, setBedtimeLock] = useState(true);
  const [soundLimiter, setSoundLimiter] = useState(false);
  const [adShield, setAdShield] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Today (Sun)');
  const [activityFilter, setActivityFilter] = useState('all');

  const childrenProfiles = [
    { name: 'Alex', age: 'Age 6', level: 'Level 3 Explorer', avatar: '🦁', color: 'bg-purple-100 text-purple-700' },
    { name: 'Mia', age: 'Age 4', level: 'Pre-K Star', avatar: '🐼', color: 'bg-pink-100 text-pink-700' },
  ];

  const weeklyData = [
    { day: 'Mon', minutes: 35, lessons: 2 },
    { day: 'Tue', minutes: 45, lessons: 3 },
    { day: 'Wed', minutes: 25, lessons: 1 },
    { day: 'Thu', minutes: 50, lessons: 4 },
    { day: 'Fri', minutes: 40, lessons: 3 },
    { day: 'Sat', minutes: 60, lessons: 5 },
    { day: 'Sun', minutes: 45, lessons: 3, isToday: true },
  ];

  const subjectsPerformance = [
    { name: 'English & Phonics', completed: 18, total: 20, progress: 90, accuracy: '96%', status: 'Excelling', badge: '🔤', color: 'bg-brand-purple' },
    { name: 'Math Match & Numbers', completed: 12, total: 20, progress: 60, accuracy: '88%', status: 'On Track', badge: '🔢', color: 'bg-brand-orange' },
    { name: 'Science & Nature', completed: 6, total: 15, progress: 40, accuracy: '84%', status: 'Growing', badge: '🌱', color: 'bg-brand-green' },
    { name: 'World & Vocabulary', completed: 14, total: 18, progress: 78, accuracy: '92%', status: 'Excelling', badge: '🌍', color: 'bg-brand-blue' }
  ];

  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Fun with ABCs - Phonics Song', time: '15 mins ago', duration: '12m', score: '+30 XP', icon: BookOpen, color: 'text-purple-600 bg-purple-100' },
    { id: 2, type: 'game', title: 'Word Builder Quest - Level 1', time: '1 hour ago', duration: '8m', score: '+40 XP', icon: Gamepad2, color: 'text-orange-600 bg-orange-100' },
    { id: 3, type: 'video', title: 'The Rainbow Colors Sing-Along', time: 'Yesterday', duration: '5m', score: '+20 XP', icon: PlayCircle, color: 'text-blue-600 bg-blue-100' },
    { id: 4, type: 'game', title: 'Math Match Arcade - Equations', time: 'Yesterday', duration: '10m', score: '+50 XP', icon: Gamepad2, color: 'text-emerald-600 bg-emerald-100' },
  ];

  const filteredActivity = activityFilter === 'all' 
    ? recentActivity 
    : recentActivity.filter(a => a.type === activityFilter);

  const handleSaveSettings = () => {
    sounds.playCorrect();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleChildSwitch = (name) => {
    sounds.playPop();
    setSelectedChild(name);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-800 pb-20 select-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-brand-green text-white font-display font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2 border-2 border-white"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Parent settings saved for {selectedChild}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <h1 className="font-display font-black text-xl text-slate-900 leading-tight">
                Parent & Family Portal
              </h1>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                COPPA Verified • 100% Ad-Free
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              onClick={() => sounds.playPop()}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-brand-purple font-display font-bold text-sm rounded-full transition-all flex items-center gap-1.5 border border-purple-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Kid's World</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Learner Profile Selector */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Learner Profile:
            </span>
            <div className="flex items-center gap-3">
              {childrenProfiles.map((child) => (
                <button
                  key={child.name}
                  onClick={() => handleChildSwitch(child.name)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-display font-bold text-sm transition-all ${
                    selectedChild === child.name
                      ? 'bg-brand-purple text-white shadow-md scale-102'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-lg">{child.avatar}</span>
                  <span>{child.name}</span>
                  <span className="text-xs opacity-75 font-normal">({child.age})</span>
                </button>
              ))}
              <button 
                onClick={() => { sounds.playPop(); alert('New Learner profile wizard will open here.'); }}
                className="px-3.5 py-2.5 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-brand-purple hover:text-brand-purple font-display font-bold text-xs transition-colors"
              >
                + Add Learner
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Screen-time timer is active</span>
          </div>
        </div>

        {/* 4 Core Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Weekly Screen Time</span>
            </div>
            <span className="font-display font-black text-3xl text-slate-900">12h 45m</span>
            <span className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2.5 hrs vs last week
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Quests Completed</span>
            </div>
            <span className="font-display font-black text-3xl text-slate-900">34 Quests</span>
            <span className="text-xs font-bold text-slate-500 mt-2 block">
              Across English, Math & Science
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Streak</span>
            </div>
            <span className="font-display font-black text-3xl text-slate-900">5 Days 🔥</span>
            <span className="text-xs font-bold text-amber-600 mt-2 block">
              2 days until 7-Day Champion badge!
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Quiz Accuracy</span>
            </div>
            <span className="font-display font-black text-3xl text-slate-900">92%</span>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </section>

        {/* Middle Grid: Weekly Activity Chart + Interactive Screen Time Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 cols: Weekly Learning Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">
                  Weekly Activity Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Minutes spent learning per day
                </p>
              </div>
              <span className="font-display font-bold text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {selectedDay}
              </span>
            </div>

            {/* 7-Day Bar Chart */}
            <div className="pt-4 pb-2">
              <div className="flex items-end justify-between gap-3 h-48 px-2 border-b border-slate-100 pb-2">
                {weeklyData.map((d) => {
                  const heightPercent = (d.minutes / 60) * 100;
                  return (
                    <div 
                      key={d.day}
                      onClick={() => { sounds.playPop(); setSelectedDay(`${d.day} (${d.minutes} mins, ${d.lessons} quests)`); }}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <span className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.minutes}m
                      </span>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.6 }}
                        className={`w-full max-w-[36px] rounded-2xl transition-all ${
                          d.isToday
                            ? 'bg-brand-purple shadow-md'
                            : 'bg-purple-200 group-hover:bg-purple-400'
                        }`}
                      />
                      <span className={`font-display font-bold text-xs ${d.isToday ? 'text-brand-purple font-black' : 'text-slate-500'}`}>
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Goal: 40 mins/day</span>
              <span className="text-brand-green font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Goal achieved 5 of 7 days!
              </span>
            </div>
          </div>

          {/* Right 5 cols: Interactive Screen Time Manager */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">
                  Screen Time Controls
                </h3>
                <p className="text-xs text-slate-500">
                  Set daily limits & schedule locks
                </p>
              </div>
            </div>

            {/* Daily Limit Slider */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Daily Time Limit:</span>
                <span className="font-display font-black text-base text-brand-purple bg-white px-3 py-1 rounded-xl shadow-xs border border-purple-100">
                  {dailyTimeLimit} Minutes
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={dailyTimeLimit}
                onChange={(e) => { sounds.playPop(); setDailyTimeLimit(Number(e.target.value)); }}
                className="w-full accent-brand-purple cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>15 min</span>
                <span>45 min (Recommended)</span>
                <span>90 min</span>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-slate-700 text-xs">Bedtime Lock (8:00 PM)</span>
                </div>
                <button
                  onClick={() => { sounds.playPop(); setBedtimeLock(!bedtimeLock); }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${bedtimeLock ? 'bg-brand-purple' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${bedtimeLock ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-slate-700 text-xs">Ad & External Link Shield</span>
                </div>
                <button
                  onClick={() => { sounds.playPop(); setAdShield(!adShield); }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${adShield ? 'bg-brand-green' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${adShield ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Save Changes</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Subject Mastery Performance Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Subject Mastery & Progress
              </h3>
              <p className="text-xs text-slate-500">
                Curriculum milestones achieved by {selectedChild}
              </p>
            </div>
            <span className="font-display font-bold text-xs text-brand-purple bg-brand-purple-light px-3.5 py-1.5 rounded-full inline-block">
              🎯 Overall Mastery: 76%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectsPerformance.map((sub, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200 transition-all shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{sub.badge}</span>
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">{sub.name}</h4>
                      <span className="text-xs text-slate-500 font-medium">{sub.completed} of {sub.total} Lessons Finished</span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    sub.status === 'Excelling' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Progress: {sub.progress}%</span>
                    <span>Accuracy: {sub.accuracy}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${sub.color}`} style={{ width: `${sub.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Log with Real Filtering */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Recent Learning Log
              </h3>
              <p className="text-xs text-slate-500">
                Real-time record of {selectedChild}'s lessons and mini-games
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-full self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Activities' },
                { id: 'lesson', label: 'Lessons' },
                { id: 'game', label: 'Games' },
                { id: 'video', label: 'Videos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { sounds.playPop(); setActivityFilter(tab.id); }}
                  className={`px-3 py-1 rounded-full font-display font-bold text-xs transition-all ${
                    activityFilter === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredActivity.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${act.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">{act.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{act.time}</span>
                        <span>•</span>
                        <span>Duration: {act.duration}</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-display font-black text-xs text-brand-purple bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                    {act.score}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ParentDashboard;
