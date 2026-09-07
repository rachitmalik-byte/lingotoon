import { useUser } from '../context/UserContext'

export function useProgress() {
  const { progress, updateVideoProgress, updateGameScore, completeLesson } = useUser()

  const getLessonProgress = (lessonId) => {
    return progress.lessonsCompleted.includes(lessonId) ? 100 : 0
  }

  const isVideoWatched = (videoId) => {
    return progress.videosWatched.includes(videoId)
  }

  const getOverallProgress = () => {
    const totalPossible = 100
    const lessonWeight = 40
    const videoWeight = 30
    const gameWeight = 30

    const lessonProgress = (progress.lessonsCompleted.length / 6) * lessonWeight
    const videoProgress = (progress.videosWatched.length / 8) * videoWeight
    const gameProgress = Math.min(progress.gamesPlayed / 20, 1) * gameWeight

    return Math.round(lessonProgress + videoProgress + gameProgress)
  }

  return {
    progress,
    getLessonProgress,
    isVideoWatched,
    getOverallProgress,
    updateVideoProgress,
    updateGameScore,
    completeLesson,
  }
}
