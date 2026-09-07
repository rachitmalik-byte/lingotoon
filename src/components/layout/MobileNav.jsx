import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PlayCircle, Gamepad2, Trophy } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const MobileNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Videos', path: '/videos', icon: PlayCircle },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'Progress', path: '/progress', icon: Trophy },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-xl border-t border-white/60 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] z-50 pb-[env(safe-area-inset-bottom)] select-none">
      <div className="flex items-center justify-around h-16 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => sounds.playPop()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 ${
                isActive ? 'text-brand-purple scale-105' : 'text-neutral-400 hover:text-neutral-600'
              }`
            }
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <>
                  <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-purple-100/70 shadow-xs' : ''}`}>
                    <Icon
                      className={`transition-all duration-200 ${
                        isActive ? 'w-5 h-5 stroke-[2.5px] text-brand-purple' : 'w-5 h-5 stroke-2'
                      }`}
                    />
                  </div>
                  <span
                    className={`font-display text-[11px] font-bold transition-all ${
                      isActive ? 'text-brand-purple' : 'text-neutral-500'
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
