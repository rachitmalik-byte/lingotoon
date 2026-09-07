import { createContext, useContext, useState } from 'react'
import { userProgress as initialProgress } from '../data/userProgress'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user] = useState({
    name: 'Alex',
    avatar: null,
    age: 7,
    level: 3,
    levelTitle: 'Word Builder',
    xp: 1250,
    xpToNext: 2000,
  })

  const [progress, setProgress] = useState(initialProgress)

  const updateVideoProgress = (videoId, watched) => {
    setProgress(prev => ({
      ...prev,
      videosWatched: prev.videosWatched.includes(videoId)
        ? prev.videosWatched
        : [...prev.videosWatched, videoId],
    }))
  }

  const updateGameScore = (gameId, score) => {
    setProgress(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score,
    }))
  }

  const completeLesson = (lessonId) => {
    setProgress(prev => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted.includes(lessonId)
        ? prev.lessonsCompleted
        : [...prev.lessonsCompleted, lessonId],
    }))
  }

  return (
    <UserContext.Provider value={{
      user,
      progress,
      updateVideoProgress,
      updateGameScore,
      completeLesson,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}
