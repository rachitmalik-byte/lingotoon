import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Settings, Database, Users, Activity, CheckCircle2, 
  RefreshCw, Download, Upload, ArrowLeft, ExternalLink, Zap, 
  Volume2, VolumeX, Sparkles, AlertTriangle, Terminal, Play, Flame, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeveloper } from '../context/DeveloperContext';
import { useContent } from '../context/ContentContext';
import { useUser } from '../context/UserContext';
import { sounds } from '../utils/soundEffects';

const AdminPage = () => {
  const { 
    settings, updateSetting, updateAnnouncement, 
    telemetryLogs, clearTelemetry, resetAllSettings, logEvent 
  } = useDeveloper();

  const { 
    blogs, videos, wordPuzzles, resetAllContent 
  } = useContent();

  const { user, updateUserProgress, resetUserProgress } = useUser();

  const [activeTab, setActiveTab] = useState('flags'); // 'flags' | 'database' | 'users' | 'telemetry'
  const [toastMessage, setToastMessage] = useState('');
  const [jsonTab, setJsonTab] = useState('settings'); // 'settings' | 'blogs' | 'videos' | 'puzzles'
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Sync json text when tab changes
  React.useEffect(() => {
    if (jsonTab === 'settings') setJsonText(JSON.stringify(settings, null, 2));
    if (jsonTab === 'blogs') setJsonText(JSON.stringify(blogs, null, 2));
    if (jsonTab === 'videos') setJsonText(JSON.stringify(videos, null, 2));
    if (jsonTab === 'puzzles') setJsonText(JSON.stringify(wordPuzzles, null, 2));
    setJsonError('');
  }, [jsonTab, settings, blogs, videos, wordPuzzles]);

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (jsonTab === 'settings') {
        Object.entries(parsed).forEach(([k, v]) => updateSetting(k, v));
      }
      setJsonError('');
      sounds.playCorrect();
      triggerToast('💾 Live Database Synced Successfully!');
    } catch (err) {
      sounds.playWrong();
      setJsonError(err.message);
    }
  };

  const handleExportBackup = () => {
    sounds.playPop();
    const backupData = {
      version: '2.4',
      timestamp: new Date().toISOString(),
      settings,
      blogs,
      videos,
      wordPuzzles
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingotoon-backup-${Date.now()}.json`;
    a.click();
    triggerToast('📥 Full DB Backup Exported!');
  };

  // --- CHEAT CODES FOR FRONTEND TESTING ---
  const unlockAllBadges = () => {
    sounds.playFanfare();
    updateUserProgress('badges', [
      'first_step', 'word_builder', 'math_star', 'curious_mind', 
      'streak_3', 'streak_7', 'streak_30', 'bookworm', 'explorer',
      'quick_learner', 'super_speller', 'math_whiz', 'science_pioneer'
    ]);
    logEvent('USER_CHEAT', 'Unlocked all achievement badges');
    triggerToast('🌟 Unlocked All Badges!');
  };

  const boostStreak = () => {
    sounds.playFanfare();
    updateUserProgress('streak', 30);
    logEvent('USER_CHEAT', 'Boosted learning streak to 30 days');
    triggerToast('🔥 Streak Boosted to 30 Days!');
  };

  const maxOutXP = () => {
    sounds.playFanfare();
    updateUserProgress('level', 10);
    updateUserProgress('xp', 9999);
    logEvent('USER_CHEAT', 'Maxed out explorer level to 10');
    triggerToast('🎓 Level 10 Super Explorer Enabled!');
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to reset all content, settings, and database state to factory defaults?')) {
      sounds.playPop();
      resetAllContent();
      resetAllSettings();
      resetUserProgress();
      triggerToast('🔄 All Systems Reset to Clean Seed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20 font-body">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-700 text-white shadow-2xl flex items-center gap-3 font-display text-sm font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP DEVELOPER WORKSTATION BAR */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => sounds.playPop()} className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg text-brand-purple">LingoToon</span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-brand-purple-light font-display font-black text-xs uppercase tracking-wider">
                Master Developer Admin
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                v2.4 Production Simulator
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              Frontend controls, feature flags, live database state sync, user cheats & telemetry
            </p>
          </div>
        </div>

        {/* Action Switchers */}
        <div className="flex items-center gap-2.5 text-xs font-display font-bold">
          <Link 
            to="/" 
            className="px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <Link 
            to="/semi-admin" 
            className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semi-Admin Studio →</span>
          </Link>
          <button
            onClick={handleFactoryReset}
            className="px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800/60 text-red-400 hover:bg-red-900/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset Everything to Defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>
        </div>
      </header>

      {/* ADMIN WORKSPACE CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TELEMETRY QUICK GAUGES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <span className="text-[11px] font-display font-bold text-neutral-400 uppercase tracking-wider">Sound Engine</span>
            <div className="font-display font-bold text-lg mt-1 text-brand-green flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>{settings.soundEffectsGlobal ? 'Active (Web Audio)' : 'Muted'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <span className="text-[11px] font-display font-bold text-neutral-400 uppercase tracking-wider">A/B Soil Footer Default</span>
            <div className="font-display font-bold text-lg mt-1 text-amber-400">
              {settings.soilFooterDefault ? 'Nature Soil (ON)' : 'Standard (OFF)'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <span className="text-[11px] font-display font-bold text-neutral-400 uppercase tracking-wider">Broadcast Banner</span>
            <div className="font-display font-bold text-lg mt-1 text-brand-purple-light">
              {settings.announcementBanner.enabled ? 'Live Broadcasting' : 'Disabled'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <span className="text-[11px] font-display font-bold text-neutral-400 uppercase tracking-wider">Total Stored Items</span>
            <div className="font-display font-bold text-lg mt-1 text-white">
              {blogs.length + videos.length + wordPuzzles.length} Records
            </div>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-3">
          {[
            { id: 'flags', label: 'Developer Feature Flags', icon: Settings },
            { id: 'database', label: 'Live Database & JSON Editor', icon: Database },
            { id: 'users', label: 'User Progression Cheats', icon: Users },
            { id: 'telemetry', label: 'Telemetry Stream', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sounds.playPop(); setActiveTab(tab.id); }}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  active 
                    ? 'bg-brand-purple text-white shadow-md' 
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: FEATURE FLAGS ================= */}
        {activeTab === 'flags' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Announcement Broadcast Config */}
            <div className="lg:col-span-6 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="font-display font-black text-xl text-white">Global Announcement Banner</h3>
                <p className="text-xs text-neutral-400 font-medium">Broadcasts a high-visibility message across the top of all pages</p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div>
                  <span className="font-display font-bold text-sm text-white">Banner Enabled</span>
                  <p className="text-xs text-neutral-500">Show or hide the broadcast ribbon on the public site</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.announcementBanner.enabled}
                  onChange={e => updateAnnouncement('enabled', e.target.checked)}
                  className="w-5 h-5 accent-brand-purple rounded"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-xs text-neutral-400 mb-1">Broadcast Message</label>
                <input
                  type="text"
                  value={settings.announcementBanner.text}
                  onChange={e => updateAnnouncement('text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm font-medium focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-display font-bold text-xs text-neutral-400 mb-1">Target Link</label>
                  <input
                    type="text"
                    value={settings.announcementBanner.link}
                    onChange={e => updateAnnouncement('link', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-neutral-400 mb-1">Link Button Label</label>
                  <input
                    type="text"
                    value={settings.announcementBanner.linkLabel}
                    onChange={e => updateAnnouncement('linkLabel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-xs font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-display font-bold uppercase tracking-wider text-neutral-500">Live Preview:</span>
                <div className={`mt-2 p-3 rounded-2xl ${settings.announcementBanner.bg} text-white font-display font-bold text-xs flex items-center justify-between gap-3 shadow-md`}>
                  <span>{settings.announcementBanner.text}</span>
                  <span className="underline text-brand-yellow shrink-0">{settings.announcementBanner.linkLabel}</span>
                </div>
              </div>
            </div>

            {/* Right: System Feature Toggles */}
            <div className="lg:col-span-6 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="font-display font-black text-xl text-white">System Feature Switches</h3>
                <p className="text-xs text-neutral-400 font-medium">Instantly modifies frontend physics and behavior</p>
              </div>

              <div className="space-y-3">
                {/* A/B Soil Footer Default */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">A/B Soil Footer Default State</h5>
                    <p className="text-xs text-neutral-500">Default footer variant shown before user toggles switch</p>
                  </div>
                  <button
                    onClick={() => updateSetting('soilFooterDefault', !settings.soilFooterDefault)}
                    className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-colors ${
                      settings.soilFooterDefault ? 'bg-brand-green text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {settings.soilFooterDefault ? 'Nature Soil (ON)' : 'Standard (OFF)'}
                  </button>
                </div>

                {/* Sound FX Global Toggle */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Web Audio Sound Engine</h5>
                    <p className="text-xs text-neutral-500">Master sound toggle for musical chimes and game pops</p>
                  </div>
                  <button
                    onClick={() => {
                      sounds.toggle();
                      updateSetting('soundEffectsGlobal', !settings.soundEffectsGlobal);
                    }}
                    className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-colors ${
                      settings.soundEffectsGlobal ? 'bg-brand-purple text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {settings.soundEffectsGlobal ? 'Enabled' : 'Muted'}
                  </button>
                </div>

                {/* Maintenance Mode Simulation */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Maintenance Overlay Simulation</h5>
                    <p className="text-xs text-neutral-500">Simulate downtime notification ribbon on public site</p>
                  </div>
                  <button
                    onClick={() => updateSetting('maintenanceMode', !settings.maintenanceMode)}
                    className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-colors ${
                      settings.maintenanceMode ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {settings.maintenanceMode ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>

                {/* Strict Kid Safety Sandbox */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Strict Kid Safety Sandbox</h5>
                    <p className="text-xs text-neutral-500">Block external outgoing web redirects and enforce kid safety</p>
                  </div>
                  <button
                    onClick={() => updateSetting('strictKidSafety', !settings.strictKidSafety)}
                    className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-colors ${
                      settings.strictKidSafety ? 'bg-brand-green text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {settings.strictKidSafety ? 'STRICT' : 'PERMISSIVE'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: LIVE DATABASE & JSON EDITOR ================= */}
        {activeTab === 'database' && (
          <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-display font-black text-xl text-white">Live Database Inspector & Raw JSON Editor</h3>
                <p className="text-xs text-neutral-400 font-medium">Modify raw records and click Sync to automatically update the frontend</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-display font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
                <button
                  onClick={handleSaveJson}
                  className="px-5 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-display font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sync JSON to Frontend</span>
                </button>
              </div>
            </div>

            {/* Table Selector */}
            <div className="flex items-center gap-2">
              {[
                { id: 'settings', label: 'Developer Settings' },
                { id: 'blogs', label: `Blogs (${blogs.length})` },
                { id: 'videos', label: `Videos (${videos.length})` },
                { id: 'puzzles', label: `Puzzles (${wordPuzzles.length})` }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setJsonTab(t.id)}
                  className={`px-4 py-1.5 rounded-xl font-display font-bold text-xs transition-colors ${
                    jsonTab === t.id ? 'bg-neutral-800 text-white border border-neutral-700' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {jsonError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>JSON Syntax Error: {jsonError}</span>
              </div>
            )}

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3 overflow-hidden">
              <textarea
                rows={16}
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                className="w-full bg-transparent text-emerald-400 font-mono text-xs focus:outline-none resize-y leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* ================= TAB 3: USER CHEATS & TESTING ================= */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-6 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <h3 className="font-display font-black text-xl text-white">Player Progression Cheats</h3>
                <p className="text-xs text-neutral-400 font-medium">Quickly simulate rewards, levels, and badges to verify frontend pages</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Unlock All 24 Achievement Badges</h5>
                    <p className="text-xs text-neutral-500">Unlocks all golden achievement medals on /progress and dashboard</p>
                  </div>
                  <button
                    onClick={unlockAllBadges}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-display font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Unlock Badges</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Boost Learning Streak to 30 Days</h5>
                    <p className="text-xs text-neutral-500">Fires up the flame counter and unlocks streak milestone perks</p>
                  </div>
                  <button
                    onClick={boostStreak}
                    className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-display font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Set 30-Day Streak</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Max Level to 10 Super Explorer</h5>
                    <p className="text-xs text-neutral-500">Sets level 10 and 9,999 XP for testing highest rank styling</p>
                  </div>
                  <button
                    onClick={maxOutXP}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-display font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Max Level & XP</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Reset Player Progress to Fresh Guest</h5>
                    <p className="text-xs text-neutral-500">Clears streak, resets XP to 0, locks all badges for fresh test</p>
                  </div>
                  <button
                    onClick={() => { resetUserProgress(); triggerToast('Player progress reset to fresh guest'); }}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-display font-bold text-xs cursor-pointer"
                  >
                    <span>Reset Progress</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Current Active User Card */}
            <div className="lg:col-span-6 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <h3 className="font-display font-black text-xl text-white">Active Test User Profile</h3>
                <p className="text-xs text-neutral-400 font-medium">Real-time status reflected across all platform pages</p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-purple to-pink-500 text-white flex items-center justify-center font-display font-black text-xl shadow-lg">
                    {user ? user.name.charAt(0) : 'G'}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-lg text-white">{user ? user.name : 'Guest Explorer'}</h4>
                    <span className="text-xs font-display font-bold text-brand-purple-light">
                      {user ? `Level ${user.level} ${user.rankTitle || 'Explorer'}` : 'Guest Mode'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">XP Points</span>
                    <div className="font-display font-black text-lg text-brand-yellow">{user?.xp || 0}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Day Streak</span>
                    <div className="font-display font-black text-lg text-brand-orange">{user?.streak || 0}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Badges</span>
                    <div className="font-display font-black text-lg text-brand-green">{user?.unlockedBadges?.length || 0}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link 
                    to="/progress" 
                    className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View /progress Live Journey Map →</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: TELEMETRY STREAM ================= */}
        {activeTab === 'telemetry' && (
          <div className="bg-neutral-900 rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-display font-black text-xl text-white">Live Event Telemetry Stream</h3>
                <p className="text-xs text-neutral-400 font-medium">Real-time audit log of user clicks, sound triggers, and configuration changes</p>
              </div>
              <button
                onClick={clearTelemetry}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-display font-bold text-xs cursor-pointer"
              >
                Clear Log
              </button>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 max-h-[420px] overflow-y-auto font-mono text-xs space-y-2">
              {telemetryLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 py-1 border-b border-neutral-900 last:border-0">
                  <span className="text-neutral-500 text-[10px]">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.type === 'CONFIG' ? 'bg-purple-900/60 text-purple-300' :
                    log.type === 'USER_CHEAT' ? 'bg-amber-900/60 text-amber-300' :
                    'bg-neutral-800 text-neutral-300'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-neutral-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;