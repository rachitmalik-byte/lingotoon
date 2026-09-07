import { Routes, Route, useLocation } from 'react-router-dom'
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
import ScrollToTop from './components/layout/ScrollToTop'

export default function App() {
  const location = useLocation()

  // Hide chrome on immersive and dedicated pages
  const immersiveRoutes = ['/game/play', '/parent']
  const isImmersive = immersiveRoutes.some(r => location.pathname.startsWith(r))
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
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
          </Routes>
        </AnimatePresence>
      </main>

      {!isImmersive && <Footer />}
      {!isImmersive && <MobileNav />}
    </div>
  )
}
