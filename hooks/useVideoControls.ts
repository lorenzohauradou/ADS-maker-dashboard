"use client"

import { useState, useCallback } from 'react'
import { Project } from '@/types/project'

export function useVideoControls() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Gestione preview modal
  const handlePreview = useCallback((project: Project) => {
    // Pausa tutti i video quando si apre il modale
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach(video => {
      video.pause()
      video.muted = true
    })

    // Resetta lo stato audio
    setActiveVideo(null)
    setSelectedProject(project)
    setIsPreviewOpen(true)
  }, [])

  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false)
    setSelectedProject(null)
  }, [])

  // Gestione audio video
  const toggleVideoAudio = useCallback(async (projectId: number, videoElement?: HTMLVideoElement) => {
    if (activeVideo === projectId) {
      // Disattiva audio
      setActiveVideo(null)
      if (videoElement) {
        videoElement.muted = true
      }
    } else {
      // Attiva audio
      setActiveVideo(projectId)
      if (videoElement) {
        videoElement.muted = false
        // Assicurati che il video stia riproducendo
        if (videoElement.paused) {
          try {
            await videoElement.play()
          } catch (error) {
            console.log('Play interrupted:', error)
          }
        }
      }
    }
  }, [activeVideo])

  // Gestione hover play
  const handleVideoHover = useCallback(async (e: React.MouseEvent<HTMLVideoElement>, isEntering: boolean) => {
    const video = e.currentTarget
    
    if (isEntering) {
      try {
        await video.play()
      } catch (error) {
        console.log('Autoplay prevented on hover')
      }
    } else {
      // Solo pausa se non ha audio attivo
      if (activeVideo !== parseInt(video.dataset.projectId || '0')) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [activeVideo])

  // Click handler per video
  const handleVideoClick = useCallback(async (e: React.MouseEvent<HTMLVideoElement>, projectId: number) => {
    e.stopPropagation()
    const video = e.currentTarget
    await toggleVideoAudio(projectId, video)
  }, [toggleVideoAudio])

  // Props per componente video
  const getVideoProps = useCallback((project: Project) => {
    return {
      src: project.video?.url || undefined,
      poster: project.video?.thumbnail || undefined,
      muted: activeVideo !== project.id,
      loop: true,
      playsInline: true,
      'data-project-id': project.id.toString(),
      onMouseEnter: (e: React.MouseEvent<HTMLVideoElement>) => handleVideoHover(e, true),
      onMouseLeave: (e: React.MouseEvent<HTMLVideoElement>) => handleVideoHover(e, false),
      onClick: (e: React.MouseEvent<HTMLVideoElement>) => handleVideoClick(e, project.id),
      className: "w-full h-full object-cover cursor-pointer"
    }
  }, [activeVideo, handleVideoHover, handleVideoClick])

  // Check se il video ha audio attivo
  const hasActiveAudio = useCallback((projectId: number) => {
    return activeVideo === projectId
  }, [activeVideo])

  // Check se il video può essere riprodotto
  const canPlayVideo = useCallback((project: Project) => {
    return project.video?.url && 
           project.status === 'completed' && 
           !project.video.url.startsWith('processing_')
  }, [])

  return {
    // Stati
    activeVideo,
    isPreviewOpen,
    selectedProject,
    
    // Handlers
    handlePreview,
    handleClosePreview,
    toggleVideoAudio,
    handleVideoHover,
    handleVideoClick,
    
    // Utility functions
    getVideoProps,
    hasActiveAudio,
    canPlayVideo,
    
    // Setters per controllo esterno
    setActiveVideo
  }
} 