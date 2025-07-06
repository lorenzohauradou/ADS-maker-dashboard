"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Clock,
  ImageIcon,
  Play,
  Trash2,
  Grid3X3,
  List,
  Loader2,
  AlertCircle,
  Volume2,
  VolumeX,
} from "lucide-react"
import { VideoPreviewModal } from "./video-creation-workflow/video-preview-modal"
import { format } from 'date-fns';
import { Project } from "@/types/project";
import { useVideoControls } from "@/hooks/useVideoControls"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Crown, CreditCard } from "lucide-react"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"
import { UnifiedVideoWizard } from "./unified-video-wizard"
import { trackBypassAttempt } from '@/lib/posthog-pricing-enforcement'

export function ProjectsContent() {
  const { data: session } = useSession()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Stati per gestire il caricamento dei dati
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Stati per il dialog di eliminazione
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // 🎯 HOOK PER GESTIRE I LIMITI UTENTE
  const {
    plan,
    videos_per_month,
    videos_used,
    can_create_video,
    extra_video_price,
    loading: limitsLoading,
    buyExtraVideo
  } = useUserLimits()

  const { checkCanCreateVideo, showLimitExceededToast } = useSubscriptionLimits()

  // State for unified wizard
  const [isUnifiedWizardOpen, setIsUnifiedWizardOpen] = useState(false)

  // Usa il hook per i controlli video
  const {
    activeVideo,
    isPreviewOpen,
    selectedProject,
    handlePreview,
    handleClosePreview,
    toggleVideoAudio,
    getVideoProps,
    hasActiveAudio,
    canPlayVideo
  } = useVideoControls()

  // Funzione per caricare i progetti dal backend
  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) {
        // Try to get error from body
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || "Failed to fetch projects")
      }
      const data = await response.json()
      if (data.success) {
        setProjects(data.projects || [])

        // 🔄 GESTISCI DIVERSI STATI DEL BACKEND
        if (data.backend_busy) {
          console.log('⚠️ Backend occupato durante elaborazione video')
          // Mostra lista vuota con messaggio informativo invece di progetti fake
          setProjects([])
        } else if (data.is_fallback) {
          console.log('⚡ Usando dati cache/fallback')
          // Progetti da cache o fallback - nessuna azione speciale
        } else if (data.all_endpoints_failed) {
          console.log('❌ Tutti endpoint falliti')
          setProjects([])
        }

        // Controlla automaticamente i video in processing (solo se ci sono)
        const processingProjects = (data.projects || []).filter((p: any) =>
          p.video?.status === 'processing' && p.video?.url?.startsWith('processing_')
        )

        if (processingProjects.length > 0) {
          console.log(`Found ${processingProjects.length} projects with processing videos, checking status...`)
          // Controlla una sola volta, evita chiamate multiple
          if (!sessionStorage.getItem('checking-videos')) {
            sessionStorage.setItem('checking-videos', 'true')
            setTimeout(() => {
              checkAllPendingVideos().finally(() => {
                sessionStorage.removeItem('checking-videos')
              })
            }, 2000)
          }
        }
      } else {
        throw new Error(data.error || "An unknown error occurred while fetching projects.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const checkAllPendingVideos = async () => {
    try {
      const response = await fetch('/api/creatify/check-all-pending-videos', {
        method: 'POST'
      })
      if (response.ok) {
        const result = await response.json()
        console.log('Video status check result:', result)
        if (result.updated > 0) {
          // Se ci sono stati aggiornamenti, ricarica i progetti
          setTimeout(() => {
            fetchProjects()
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Error checking pending videos:', error)
    }
  }

  // Carica i progetti quando il componente viene montato
  useEffect(() => {
    fetchProjects()
  }, [])



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (project: Project) => {
    setProjectToDelete(project)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!projectToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${projectToDelete.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success('Progetto eliminato con successo', {
          description: `Il progetto "${projectToDelete.name}" è stato eliminato.`
        })
        fetchProjects() // Ricarica la lista
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      toast.error('Errore durante l\'eliminazione', {
        description: 'Non è stato possibile eliminare il progetto. Riprova più tardi.'
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  // 🚀 GESTIONE SMART UPGRADE
  const handleSmartUpgrade = async () => {
    if (!session?.user?.id) {
      window.location.href = '/#pricing'
      return
    }

    try {
      const response = await fetch(`/api/subscriptions/smart-upgrade/${session.user.id}`)
      const data = await response.json()

      if (data.success && data.stripe_plan_type) {
        toast.success(`Upgrading to ${data.upgrade_to.name}!`, {
          description: `Creating checkout session for ${data.upgrade_to.price}...`,
          duration: 3000
        })

        const stripeResponse = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planType: data.stripe_plan_type })
        })

        if (stripeResponse.ok) {
          const stripeData = await stripeResponse.json()
          window.location.href = stripeData.url
        } else {
          throw new Error('Failed to create Stripe checkout session')
        }
      } else {
        window.location.href = data.redirect_url || '/#pricing'
      }
    } catch (error) {
      console.error('Smart upgrade error:', error)
      toast.error('Upgrade Error', {
        description: 'Redirecting to pricing page...',
        duration: 3000
      })
      window.location.href = '/#pricing'
    }
  }

  // 💳 GESTIONE ACQUISTO VIDEO EXTRA
  const handleBuyExtraVideo = async () => {
    const success = await buyExtraVideo()
    if (success) {
      toast.success('Redirecting to Stripe for payment...', {
        description: 'You will be redirected to complete your extra video purchase.',
      })
    } else {
      toast.error('Failed to start purchase process', {
        description: 'Please try again later or contact support.',
      })
    }
  }

  // 🆕 GESTIONE WIZARD UNIFICATO
  const handleCreateNewProject = async () => {
    // Check limits with automatic tracking
    const { canCreate, message } = await checkCanCreateVideo()

    if (!canCreate) {
      if (session?.user?.id) {
        trackBypassAttempt({
          plan: (plan || 'free') as any,
          videos_per_month: videos_per_month || 1,
          videos_used: videos_used || 0,
          videos_remaining: (videos_per_month || 1) - (videos_used || 0),
          can_create_video: false,
          extra_video_price: extra_video_price || 9.0,
          userId: session.user.id
        }, 'projects_create_button_click')
      }
      showLimitExceededToast()
      return
    }

    // Open unified wizard
    setIsUnifiedWizardOpen(true)
  }

  const handleCloseUnifiedWizard = () => {
    setIsUnifiedWizardOpen(false)
  }

  const handleCompleteUnifiedWizard = async (wizardData: any) => {
    setIsUnifiedWizardOpen(false)
    // Refresh projects list after video creation
    fetchProjects()
  }



  return (
    <>
      <div className="space-y-6 min-h-0 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
            <p className="text-slate-600 dark:text-zinc-400 mt-1">Manage and organize your video ad campaigns</p>
          </div>

          {/* 🎯 BOTTONI DINAMICI BASATI SUI LIMITI */}
          {!limitsLoading && can_create_video ? (
            // ✅ UTENTE PUÒ CREARE VIDEO - MOSTRA BOTTONE NORMALE
            <Button
              onClick={handleCreateNewProject}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          ) : !limitsLoading ? (
            // ❌ LIMITE RAGGIUNTO - MOSTRA BOTTONI UPGRADE E BUY EXTRA
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Upgrade Plan Button */}
              <Button
                onClick={handleSmartUpgrade}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg text-white"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade Plan
              </Button>

              {/* Buy Extra Video Button */}
              <Button
                onClick={handleBuyExtraVideo}
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Buy Video ${extra_video_price}
              </Button>
            </div>
          ) : (
            // ⏳ LOADING - MOSTRA SKELETON
            <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-10 w-40 rounded-xl"></div>
          )}
        </div>

        {/* Filters and Search */}
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="created">Draft</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg ${viewMode === "grid" ? "bg-white dark:bg-zinc-700 shadow-sm" : "hover:bg-slate-100 dark:hover:bg-zinc-700"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg ${viewMode === "list" ? "bg-white dark:bg-zinc-700 shadow-sm" : "hover:bg-slate-100 dark:hover:bg-zinc-700"}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64 bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="font-medium text-red-900 dark:text-red-100">Failed to load projects</h3>
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        {!isLoading && !error && (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:scale-105 cursor-pointer"
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
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">{project.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 mb-3">{project.product_type}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(project.created_at), 'dd/MM/yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-zinc-400">{project.views_count || 0} views</span>
                    </div>

                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Project</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Category</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Status</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Date</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Duration</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                              {project.status === 'processing' ? (
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                              ) : project.video?.thumbnail ? (
                                <img src={project.video.thumbnail} alt={project.name} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                              )}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">{project.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-zinc-400">{project.product_type}</td>
                        <td className="p-4">
                          <Badge className={`text-xs px-2 py-1 border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-zinc-400">{format(new Date(project.created_at), 'dd/MM/yyyy')}</td>
                        <td className="p-4 text-slate-600 dark:text-zinc-400">{project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}</td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-zinc-800">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-12 text-center">
            <ImageIcon className="w-16 h-16 text-slate-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No projects found</h3>

            {/* 🎯 MESSAGGIO DINAMICO BASATO SUI LIMITI */}
            {!limitsLoading && can_create_video ? (
              <>
                <p className="text-slate-600 dark:text-zinc-400 mb-6">Create your first project to get started!</p>
                <Button
                  onClick={handleCreateNewProject}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Project
                </Button>
              </>
            ) : !limitsLoading ? (
              <>
                <p className="text-slate-600 dark:text-zinc-400 mb-2">
                  You've used all {videos_per_month} video{videos_per_month > 1 ? 's' : ''} for this month
                </p>
                <p className="text-slate-500 dark:text-zinc-500 text-sm mb-6">
                  Upgrade your plan or buy an extra video to continue creating
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleSmartUpgrade}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg text-white"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade Plan
                  </Button>
                  <Button
                    onClick={handleBuyExtraVideo}
                    variant="outline"
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Buy Video ${extra_video_price}
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-64 mx-auto rounded"></div>
                <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-10 w-40 mx-auto rounded-xl"></div>
              </div>
            )}
          </Card>
        )}
      </div>

      <VideoPreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        project={selectedProject}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setProjectToDelete(null)
        }}
        onConfirm={confirmDelete}
        title="Elimina Progetto"
        description={`Sei sicuro di voler eliminare il progetto "${projectToDelete?.name}"? Questa azione non può essere annullata.`}
        isLoading={isDeleting}
      />

      {/* Unified Video Wizard */}
      {isUnifiedWizardOpen && (
        <UnifiedVideoWizard
          isOpen={isUnifiedWizardOpen}
          onClose={handleCloseUnifiedWizard}
          onComplete={handleCompleteUnifiedWizard}
        />
      )}
    </>
  )
}
