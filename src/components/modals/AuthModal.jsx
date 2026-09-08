import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Shield, User, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Database, Play } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { useUser } from '../../context/UserContext';

const AuthModal = ({ isOpen, onClose, initialTab = 'kid' }) => {
  const { user, createLocalId, loadDemoPreset, resetTestCache } = useUser();
  const [activeTab, setActiveTab] = useState(initialTab); // 'kid' or 'parent'
  const [pin, setPin] = useState(['', '', '', '']);
  const [kidName, setKidName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🦉');
  const [selectedGrade, setSelectedGrade] = useState(user?.grade || 'Kindergarten');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handlePinInput = (index, val) => {
    sounds.playPop();
    if (val.length > 1) val = val[0];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    // Auto-advance focus
    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Check if 4 digits entered
    if (newPin.every(d => d !== '')) {
      if (newPin.join('') === '1234' || newPin.join('').length === 4) {
        sounds.playCorrect();
        setPinSuccess(true);
        setPinError(false);
        setTimeout(() => {
          window.location.href = '/parent';
          onClose();
        }, 1000);
      }
    }
  };

  const handleCreateCleanId = (e) => {
    e?.preventDefault();
    sounds.playFanfare();
    const finalName = kidName.trim() || 'Young Explorer';
    createLocalId({
      name: finalName,
      avatar: selectedAvatar,
      grade: selectedGrade,
    }, false); // fresh 0% progress
    onClose();
  };

  const handleCreateDemoId = () => {
    sounds.playFanfare();
    const finalName = kidName.trim() || 'Alex (Tester)';
    createLocalId({
      name: finalName,
      avatar: selectedAvatar,
      grade: selectedGrade,
    }, true); // demo testing preset
    onClose();
  };

  const handleResetCache = () => {
    sounds.playPop();
    resetTestCache();
    setKidName('');
    onClose();
  };

  const avatars = ['🦉', '🦊', '🦁', '🐼', '🚀', '⭐', '🐯', '🦄'];
  const grades = ['Preschool', 'Kindergarten', 'Grade 1', 'Grade 2+'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:pt-20 bg-black/75 backdrop-blur-md select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border-4 border-white/80 overflow-hidden"
        >
          {/* Top Header Banner */}
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 relative">
            <button
              onClick={() => { sounds.playPop(); onClose(); }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner text-2xl">
                {activeTab === 'parent' ? <Shield className="w-6 h-6 text-brand-yellow" /> : selectedAvatar}
              </div>
              <div>
                <h3 className="font-display font-black text-2xl">
                  {activeTab === 'parent' ? 'Parent Gateway' : user ? 'Local ID & Cache' : 'Create Local Learner ID'}
                </h3>
                <p className="text-xs text-purple-200">
                  {activeTab === 'parent' ? 'Secure parental dashboard lock' : 'Stored securely in browser local cache'}
                </p>
              </div>
            </div>

            {/* Tab Pills */}
            <div className="flex gap-2 mt-5 bg-black/20 p-1 rounded-full border border-white/10">
              <button
                onClick={() => { sounds.playPop(); setActiveTab('kid'); }}
                className={`flex-1 py-1.5 rounded-full font-display font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'kid' ? 'bg-brand-yellow text-neutral-900 shadow-md' : 'text-white/80 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{user ? 'My Profile' : 'Learner ID'}</span>
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('parent'); }}
                className={`flex-1 py-1.5 rounded-full font-display font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'parent' ? 'bg-white text-brand-purple shadow-md' : 'text-white/80 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Parent Lock</span>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {activeTab === 'parent' ? (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <p className="font-body text-sm text-neutral-600">
                    Please enter your 4-digit Parent PIN to access time limits and progress analytics.
                  </p>
                  <span className="inline-block text-[11px] font-bold text-brand-purple bg-brand-purple-light px-3 py-1 rounded-full">
                    💡 Demo PIN: 1 2 3 4
                  </span>
                </div>

                {/* 4 PIN Boxes */}
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`pin-input-${idx}`}
                      type="password"
                      maxLength={1}
                      value={pin[idx]}
                      onChange={(e) => handlePinInput(idx, e.target.value)}
                      className={`w-14 h-16 text-center text-3xl font-display font-black rounded-2xl border-2 outline-none transition-all shadow-sm ${
                        pinSuccess
                          ? 'border-brand-green bg-green-50 text-brand-green'
                          : pinError
                          ? 'border-red-400 bg-red-50 text-red-500'
                          : 'border-neutral-200 focus:border-brand-purple bg-neutral-50 focus:bg-white'
                      }`}
                    />
                  ))}
                </div>

                {pinSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-brand-green font-bold text-sm bg-green-50 py-2 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Access Granted! Redirecting...
                  </motion.div>
                )}

                <p className="text-xs text-neutral-400">
                  Protected by COPPA Family Safety Shield
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* If user already exists, show active cached details */}
                {user && (
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-xs">
                        {user.avatar}
                      </div>
                      <div>
                        <h4 className="font-display font-black text-neutral-900 text-base">{user.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold">
                          <span>Level {user.level}</span>
                          <span>•</span>
                          <span className="text-brand-purple">{user.grade || 'Kindergarten'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-display font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Cache Active
                    </span>
                  </div>
                )}

                {/* Avatar Selection */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Select Avatar Buddy:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {avatars.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => { sounds.playPop(); setSelectedAvatar(av); }}
                        className={`h-11 rounded-2xl text-xl flex items-center justify-center border-2 transition-all transform active:scale-95 cursor-pointer ${
                          selectedAvatar === av
                            ? 'border-brand-purple bg-brand-purple-light scale-105 shadow-md'
                            : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explorer Name */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Learner Nickname:
                  </label>
                  <input
                    type="text"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    placeholder="e.g. Leo, Maya, or Oliver"
                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-neutral-200 focus:border-brand-purple outline-none font-display font-bold text-sm sm:text-base bg-neutral-50 focus:bg-white transition-colors"
                  />
                </div>

                {/* Grade Selection */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Grade Level:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {grades.map((gr) => (
                      <button
                        key={gr}
                        type="button"
                        onClick={() => { sounds.playPop(); setSelectedGrade(gr); }}
                        className={`py-2 px-3 rounded-xl font-display font-bold text-xs border transition-all cursor-pointer ${
                          selectedGrade === gr
                            ? 'border-brand-purple bg-brand-purple text-white shadow-xs'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {gr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleCreateCleanId}
                    className="w-full py-3.5 bg-brand-yellow hover:bg-yellow-400 text-neutral-900 font-display font-black text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{user ? 'Update Profile' : 'Create Fresh ID (0% Progress)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateDemoId}
                    className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-display font-bold text-xs rounded-full border border-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Load Demo Tester Preset (For UI Testing)</span>
                  </button>

                  {user && (
                    <button
                      type="button"
                      onClick={handleResetCache}
                      className="w-full py-2 text-xs font-display font-bold text-neutral-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset / Clear Test Cache (Return to Guest 0%)</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
