import { createContext, useContext, useState, useEffect } from 'react';

export const zeroProgress = {
  lessonsCompleted: [],
  videosWatched: [],
  gamesPlayed: 0,
  totalScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalLearningMinutes: 0,
  subjectSkills: {
    math: 0,
    science: 0,
    english: 0,
  },
  unlockedAchievements: [],
  weeklyActivity: [
    { day: 'Mon', mins: 0 },
    { day: 'Tue', mins: 0 },
    { day: 'Wed', mins: 0 },
    { day: 'Thu', mins: 0 },
    { day: 'Fri', mins: 0 },
    { day: 'Sat', mins: 0, current: true },
    { day: 'Sun', mins: 0 },
  ],
  levelProgression: [
    { id: 1, level: 1, title: 'Beginner Explorer', status: 'current', xp: 100 },
    { id: 2, level: 2, title: 'Word Builder', status: 'locked', xp: 500 },
    { id: 3, level: 3, title: 'Curious Learner', status: 'locked', xp: 1200 },
    { id: 4, level: 4, title: 'Brainiac Buddy', status: 'locked', xp: 2500 },
  ],
  dailyChallenge: {
    title: 'Hidden Words Quest',
    description: 'Find letter buddies to jumpstart your daily streak!',
    type: 'word-search',
    reward: '50 XP + Star Badge',
    completed: false,
    wordsFound: 0,
    totalWords: 5,
  },
};

export const demoProgress = {
  lessonsCompleted: ['l1', 'l2', 'l3'],
  videosWatched: ['v1', 'v2'],
  gamesPlayed: 8,
  totalScore: 750,
  currentStreak: 5,
  longestStreak: 7,
  totalLearningMinutes: 340,
  subjectSkills: {
    math: 85,
    science: 60,
    english: 40,
  },
  unlockedAchievements: ['a1', 'a2', 'a3'],
  weeklyActivity: [
    { day: 'Mon', mins: 25 },
    { day: 'Tue', mins: 40 },
    { day: 'Wed', mins: 15 },
    { day: 'Thu', mins: 45 },
    { day: 'Fri', mins: 30 },
    { day: 'Sat', mins: 60, current: true },
    { day: 'Sun', mins: 0 },
  ],
  levelProgression: [
    { id: 1, level: 1, title: 'Beginner Explorer', status: 'completed', xp: 500 },
    { id: 2, level: 2, title: 'Word Builder', status: 'completed', xp: 1200 },
    { id: 3, level: 3, title: 'Curious Learner', status: 'current', xp: 2500 },
    { id: 4, level: 4, title: 'Brainiac Buddy', status: 'locked', xp: 4000 },
  ],
  dailyChallenge: {
    title: 'Hidden Words Quest',
    description: 'Can you find all 5 hidden words in the picture?',
    type: 'word-search',
    reward: '50 XP + Mystery Badge',
    completed: false,
    wordsFound: 2,
    totalWords: 5,
  },
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // 1. Local Profile (saved in browser localStorage cache)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lingotoon_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // 2. Local Progression (strictly zero if guest/unregistered)
  const [progress, setProgress] = useState(() => {
    try {
      const savedUser = localStorage.getItem('lingotoon_user');
      if (!savedUser) return zeroProgress;
      const savedProg = localStorage.getItem('lingotoon_user_progress');
      return savedProg ? JSON.parse(savedProg) : zeroProgress;
    } catch (e) {
      return zeroProgress;
    }
  });

  // Helper to persist progression changes to localStorage
  const saveProgress = (newProg) => {
    setProgress(newProg);
    try {
      localStorage.setItem('lingotoon_user_progress', JSON.stringify(newProg));
    } catch (e) {}
  };

  // Create or update a Local Learner ID in browser cache
  const createLocalId = (profileData, isDemo = false) => {
    const newProfile = {
      id: profileData.id || 'local_' + Date.now(),
      name: profileData.name?.trim() || 'Young Explorer',
      avatar: profileData.avatar || '🦉',
      grade: profileData.grade || 'Kindergarten',
      level: isDemo ? 3 : 1,
      levelTitle: isDemo ? 'Curious Learner' : 'Beginner Explorer',
      xp: isDemo ? 750 : 0,
      createdAt: new Date().toISOString(),
    };

    setUser(newProfile);
    try {
      localStorage.setItem('lingotoon_user', JSON.stringify(newProfile));
    } catch (e) {}

    const targetProgress = isDemo ? demoProgress : zeroProgress;
    saveProgress(targetProgress);
    return newProfile;
  };

  // Switch to demo tester preset for quick UI testing
  const loadDemoPreset = () => {
    if (!user) {
      createLocalId({ name: 'Alex (Tester)', avatar: '🦉', grade: 'Grade 1' }, true);
    } else {
      const updatedUser = { ...user, level: 3, levelTitle: 'Curious Learner', xp: 750 };
      setUser(updatedUser);
      try {
        localStorage.setItem('lingotoon_user', JSON.stringify(updatedUser));
      } catch (e) {}
      saveProgress(demoProgress);
    }
  };

  // Reset / Clear Test Cache back to clean slate 0%
  const resetTestCache = () => {
    setUser(null);
    setProgress(zeroProgress);
    try {
      localStorage.removeItem('lingotoon_user');
      localStorage.removeItem('lingotoon_user_progress');
    } catch (e) {}
  };

  const loginUser = (userData) => {
    createLocalId(userData, false);
  };

  const logoutUser = () => {
    resetTestCache();
  };

  const updateVideoProgress = (videoId) => {
    if (!user) return;
    const newVideos = progress.videosWatched.includes(videoId)
      ? progress.videosWatched
      : [...progress.videosWatched, videoId];
    
    // Unlock First Lesson badge if videos watched
    const unlocked = [...(progress.unlockedAchievements || [])];
    if (newVideos.length >= 1 && !unlocked.includes('a1')) {
      unlocked.push('a1');
    }

    const updated = {
      ...progress,
      videosWatched: newVideos,
      unlockedAchievements: unlocked,
    };
    saveProgress(updated);
  };

  const updateGameScore = (gameId, score) => {
    if (!user) return;
    const unlocked = [...(progress.unlockedAchievements || [])];
    if (!unlocked.includes('a3')) {
      unlocked.push('a3');
    }

    const updated = {
      ...progress,
      gamesPlayed: (progress.gamesPlayed || 0) + 1,
      totalScore: (progress.totalScore || 0) + score,
      unlockedAchievements: unlocked,
      subjectSkills: {
        ...progress.subjectSkills,
        math: Math.min(100, (progress.subjectSkills?.math || 0) + 5),
        english: Math.min(100, (progress.subjectSkills?.english || 0) + 10),
      },
    };
    saveProgress(updated);
  };

  const completeLesson = (lessonId, subject = 'english') => {
    if (!user) return;
    const newLessons = progress.lessonsCompleted.includes(lessonId)
      ? progress.lessonsCompleted
      : [...progress.lessonsCompleted, lessonId];

    const unlocked = [...(progress.unlockedAchievements || [])];
    if (newLessons.length >= 1 && !unlocked.includes('a1')) {
      unlocked.push('a1');
    }

    const currentSkill = progress.subjectSkills?.[subject] || 0;
    const updated = {
      ...progress,
      lessonsCompleted: newLessons,
      unlockedAchievements: unlocked,
      subjectSkills: {
        ...progress.subjectSkills,
        [subject]: Math.min(100, currentSkill + 20),
      },
    };
    saveProgress(updated);
  };

  return (
    <UserContext.Provider value={{
      user,
      loginUser,
      logoutUser,
      createLocalId,
      loadDemoPreset,
      resetTestCache,
      progress: user ? progress : zeroProgress,
      updateVideoProgress,
      updateGameScore,
      completeLesson,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
