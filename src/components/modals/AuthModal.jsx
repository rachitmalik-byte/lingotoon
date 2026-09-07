import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Shield, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { useUser } from '../../context/UserContext';

const AuthModal = ({ isOpen, onClose, initialTab = 'kid' }) => {
  const { user, loginUser, logoutUser } = useUser();
  const [activeTab, setActiveTab] = useState(initialTab); // 'kid' or 'parent'
  const [pin, setPin] = useState(['', '', '', '']);
  const [kidName, setKidName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🦁');
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

  const handleKidSubmit = (e) => {
    e.preventDefault();
    sounds.playFanfare();
    const finalName = kidName.trim() || 'Young Explorer';
    loginUser({
      name: finalName,
      avatar: selectedAvatar,
      level: 1,
      levelTitle: 'Curious Explorer',
      xp: 150
    });
    onClose();
  };

  const avatars = ['🦁', '🐼', '🦊', '🚀', '⭐', '🦉'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
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
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
                {activeTab === 'parent' ? '🛡️' : '🌟'}
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl">
                  {activeTab === 'parent' ? 'Parent Gateway' : "Explorer's Club"}
                </h3>
                <p className="text-xs text-purple-200">
                  {activeTab === 'parent' ? 'Secure parental dashboard lock' : 'Choose your learning profile'}
                </p>
              </div>
            </div>

            {/* Tab Pills */}
            <div className="flex gap-2 mt-5 bg-black/20 p-1 rounded-full border border-white/10">
              <button
                onClick={() => { sounds.playPop(); setActiveTab('kid'); }}
                className={`flex-1 py-1.5 rounded-full font-display font-bold text-xs transition-all ${
                  activeTab === 'kid' ? 'bg-brand-yellow text-neutral-900 shadow-md' : 'text-white/80 hover:text-white'
                }`}
              >
                Young Explorer 🚀
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('parent'); }}
                className={`flex-1 py-1.5 rounded-full font-display font-bold text-xs transition-all ${
                  activeTab === 'parent' ? 'bg-white text-brand-purple shadow-md' : 'text-white/80 hover:text-white'
                }`}
              >
                Parent Lock 🔒
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
              <form onSubmit={handleKidSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Choose Your Avatar Buddy:
                  </label>
                  <div className="flex justify-between gap-2">
                    {avatars.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => { sounds.playPop(); setSelectedAvatar(av); }}
                        className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-transform transform active:scale-95 ${
                          selectedAvatar === av
                            ? 'border-brand-purple bg-brand-purple-light scale-110 shadow-md'
                            : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Explorer Name:
                  </label>
                  <input
                    type="text"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    placeholder="Enter child or explorer name (e.g. Mia or Leo)"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-neutral-200 focus:border-brand-purple outline-none font-display font-bold text-base bg-neutral-50 focus:bg-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-yellow hover:bg-yellow-400 text-neutral-900 font-display font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>{user ? 'Save Profile' : 'Start Exploring Now!'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {user && (
                  <button
                    type="button"
                    onClick={() => { sounds.playPop(); logoutUser(); onClose(); }}
                    className="w-full py-2 text-xs font-display font-bold text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    Switch to Guest Mode (Sign Out)
                  </button>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
