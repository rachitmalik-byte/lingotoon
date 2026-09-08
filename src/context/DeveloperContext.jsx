import React, { createContext, useContext, useState, useEffect } from 'react';

const DeveloperContext = createContext(null);
const STORAGE_KEY = 'lingotoon_developer_settings_v2';

const defaultSettings = {
  announcementBanner: {
    enabled: false,
    text: '🚀 Welcome to Lingo Toon! Explore new phonics videos and interactive games.',
    bg: 'bg-gradient-to-r from-brand-purple to-indigo-600',
    link: '/videos',
    linkLabel: 'Watch Now →'
  },
  soilFooterDefault: false,
  soundEffectsGlobal: true,
  maintenanceMode: false,
  strictKidSafety: true,
  easterEggSensitivity: 'normal',
  stopScrollTrackHeight: '200vh',
  heroMediaType: 'video' // 'video' by default, toggleable to 'image'
};

export const DeveloperProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultSettings,
          ...parsed,
          heroMediaType: parsed.heroMediaType || 'video'
        };
      }
      return defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [telemetryLogs, setTelemetryLogs] = useState(() => {
    return [
      { id: 1, type: 'SYSTEM', message: 'LingoToon Dev Engine Initialized', timestamp: new Date().toLocaleTimeString() }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save developer settings', e);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
    logEvent('CONFIG', `Setting updated: ${key} = ${JSON.stringify(value)}`);
  };

  const updateAnnouncement = (field, value) => {
    setSettings(prev => ({
      ...prev,
      announcementBanner: {
        ...prev.announcementBanner,
        [field]: value
      }
    }));
    logEvent('CONFIG', `Announcement updated: ${field}`);
  };

  const logEvent = (type, message) => {
    const entry = {
      id: Date.now() + Math.random(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setTelemetryLogs(prev => [entry, ...prev.slice(0, 49)]); // Keep last 50 events
  };

  const clearTelemetry = () => {
    setTelemetryLogs([]);
  };

  const resetAllSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
    logEvent('SYSTEM', 'Developer settings reset to factory defaults');
  };

  return (
    <DeveloperContext.Provider value={{
      settings,
      heroMediaType: settings.heroMediaType || 'video',
      setHeroMediaType: (mode) => updateSetting('heroMediaType', mode),
      updateSetting,
      updateAnnouncement,
      telemetryLogs,
      logEvent,
      clearTelemetry,
      resetAllSettings
    }}>
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloper = () => {
  const context = useContext(DeveloperContext);
  if (!context) {
    throw new Error('useDeveloper must be used within a DeveloperProvider');
  }
  return context;
};
