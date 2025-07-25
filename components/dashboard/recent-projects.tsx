"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, Clock, ImageIcon, Play, Trash2, Loader2, AlertTriangle, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Project } from "@/types/project"
import { useVideoControls } from "@/hooks/useVideoControls"
import { VideoPreviewModal } from "./video-preview-modal"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"
import { toast } from "sonner"

export function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()

  // Usa il hook per i controlli video
  const {
    isPreviewOpen,
    selectedProject,
    handlePreview,
    handleClosePreview,
    toggleVideoAudio,
    getVideoProps,
    hasActiveAudio,
    canPlayVideo
  } = useVideoControls()



  useEffect(() => {
    async function fetchRecentProjects() {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch recent projects')
        }
        const result = await response.json()
        if (result.success) {
          // Assicurati di prendere solo i primi 3 progetti per "recent"
          setProjects(result.projects.slice(0, 3))
        } else {
          // Use the error message from backend if available
          throw new Error(result.error || 'Could not fetch projects from backend.')
        }
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchRecentProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rendering':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  }

  const handleDelete = (project: Project) => {
    setProjectToDelete(project)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${projectToDelete.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      // Remove project from state
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id))
      setIsDeleteDialogOpen(false)
      setProjectToDelete(null)
    } catch (error) {
      console.error('Delete error:', error)
      // Handle error (show toast, etc.)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)
    setProjectToDelete(null)
  }

  const handleViewAll = () => {
    router.push('/dashboard/projects')
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Projects</h2>
          <Button
            variant="ghost"
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
            onClick={handleViewAll}
          >
            View All
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-48 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Connection Error</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">Could not connect to the backend.</p>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Please make sure the server is running.</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 bg-slate-50 dark:bg-zinc-900/50 rounded-xl">
            <ImageIcon className="w-12 h-12 text-slate-400 dark:text-zinc-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">No Projects Yet</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Create your first project to see it here.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:scale-105 rounded-xl cursor-pointer`}
                onClick={() => handlePreview(project)}
              >
                {/* Project Thumbnail / Video Player */}
                <div className="relative aspect-video bg-slate-100 dark:bg-zinc-800 flex items-center justify-center border-b border-slate-200 dark:border-zinc-800">
                  {canPlayVideo(project) ? (
                    <video
                      {...getVideoProps(project)}
                    />
                  ) : project.status === 'processing' ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      <span className="text-sm text-slate-600 dark:text-zinc-400 font-medium">Processing...</span>
                    </div>
                  ) : project.status === 'rendering' ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                      <span className="text-sm text-slate-600 dark:text-zinc-400 font-medium">Rendering...</span>
                    </div>
                  ) : (
                    <>
                      {project.video?.thumbnail ? (
                        <img src={project.video.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-slate-400 dark:text-zinc-500" />
                      )}
                    </>
                  )}

                  {/* Status Badge */}
                  <Badge className={`absolute top-3 left-3 text-xs px-2 py-1 border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>

                  {/* Audio Control Icon */}
                  {canPlayVideo(project) && (
                    <div
                      className="absolute bottom-3 right-3 bg-black/50 p-1.5 rounded-full text-white backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform"
                      onClick={async (e) => {
                        e.stopPropagation()
                        const videoElement = e.currentTarget.closest('.relative')?.querySelector('video') as HTMLVideoElement
                        await toggleVideoAudio(project.id, videoElement)
                      }}
                    >
                      {hasActiveAudio(project.id) ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </div>
                  )}

                  {/* Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xl" align="end">
                      <DropdownMenuItem
                        className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePreview(project)
                        }}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(project)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Play Button Overlay */}
                  {project.status === "completed" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-12 h-12 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-slate-700 dark:text-zinc-300 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">{project.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 mb-3">{project.product_type}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <VideoPreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        project={selectedProject}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={projectToDelete?.name}
        itemType="progetto"
        isLoading={isDeleting}
      />
    </>
  )
}
