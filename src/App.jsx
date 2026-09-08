import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import MobileNav from './components/layout/MobileNav'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import HomePage from './pages/HomePage'
import VideosPage from './pages/VideosPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import GamesPage from './pages/GamesPage'
import GamePlayPage from './pages/GamePlayPage'
import LearnPage from './pages/LearnPage'
import ProgressPage from './pages/ProgressPage'
import ParentDashboard from './pages/ParentDashboard'
import BlogPage from './pages/BlogPage'
import SemiAdminPage from './pages/SemiAdminPage'
import AdminPage from './pages/AdminPage'
import ScrollToTop from './components/layout/ScrollToTop'
import { initSmoothScroll } from './utils/smoothScroll'
import { useDeveloper } from './context/DeveloperContext'

export default function App() {
  const location = useLocation()
  const { settings } = useDeveloper()

  // Initialize lowered sensitivity buttery smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll()
    return cleanup
  }, [])

  // Hide chrome on immersive and dedicated pages
  const immersiveRoutes = ['/game/play', '/parent', '/admin', '/semi-admin']
  const isImmersive = immersiveRoutes.some(r => location.pathname.startsWith(r))
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* Global Developer Announcement Banner (when enabled in Admin) */}
      {!isImmersive && settings?.announcementBanner?.enabled && (
        <div className={`w-full py-2 px-4 ${settings.announcementBanner.bg} text-white text-xs sm:text-sm font-display font-bold text-center flex items-center justify-center gap-3 relative z-50 shadow-sm`}>
          <span>{settings.announcementBanner.text}</span>
          {settings.announcementBanner.link && (
            <Link to={settings.announcementBanner.link} className="underline text-brand-yellow font-extrabold shrink-0">
              {settings.announcementBanner.linkLabel || 'Learn More →'}
            </Link>
          )}
        </div>
      )}

      {!isImmersive && <Navbar />}

      <main className={`flex-1 ${!isHome && !isImmersive ? 'pt-24 sm:pt-28 md:pt-32' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/videos" element={<PageTransition><VideosPage /></PageTransition>} />
            <Route path="/video/:id" element={<PageTransition><VideoPlayerPage /></PageTransition>} />
            <Route path="/games" element={<PageTransition><GamesPage /></PageTransition>} />
            <Route path="/game/play/:id" element={<GamePlayPage />} />
            <Route path="/learn" element={<PageTransition><LearnPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/progress" element={<PageTransition><ProgressPage /></PageTransition>} />
            <Route path="/parent" element={<PageTransition><ParentDashboard /></PageTransition>} />
            <Route path="/semi-admin" element={<SemiAdminPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isImmersive && <Footer />}
      {!isImmersive && <MobileNav />}
    </div>
  )
}

