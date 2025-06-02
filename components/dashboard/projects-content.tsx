"use client"

import { useState } from "react"
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
  Edit,
  Trash2,
  Grid3X3,
  List,
  Download,
  Share2,
  Filter,
} from "lucide-react"
import { ImageUploadModal } from "./video-creation-workflow/image-upload-modal"

const projects = [
  {
    id: 1,
    title: "iPhone 15 Pro Campaign",
    category: "Physical Product",
    status: "completed",
    date: "15/01/2024",
    duration: "30s",
    views: "12.5K",
    downloads: "234",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: 2,
    title: "SaaS Dashboard Demo",
    category: "SaaS Application",
    status: "processing",
    date: "14/01/2024",
    duration: "45s",
    views: "8.2K",
    downloads: "156",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-blue-500 text-white",
  },
  {
    id: 3,
    title: "Fitness App Promo",
    category: "Mobile App",
    status: "draft",
    date: "13/01/2024",
    duration: "60s",
    views: "0",
    downloads: "0",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-slate-500 text-white",
  },
  {
    id: 4,
    title: "E-commerce Store Launch",
    category: "E-commerce",
    status: "completed",
    date: "12/01/2024",
    duration: "35s",
    views: "15.8K",
    downloads: "312",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: 5,
    title: "Restaurant Menu Showcase",
    category: "Food & Beverage",
    status: "completed",
    date: "11/01/2024",
    duration: "25s",
    views: "9.4K",
    downloads: "187",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: 6,
    title: "Real Estate Virtual Tour",
    category: "Real Estate",
    status: "processing",
    date: "10/01/2024",
    duration: "90s",
    views: "0",
    downloads: "0",
    thumbnail: "/placeholder.svg?height=200&width=300",
    statusColor: "bg-blue-500 text-white",
  },
]

export function ProjectsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImagesUploaded = async (images: File[], projectName: string) => {
    console.log("Images uploaded from projects page:", images.length, "Project:", projectName)

    // TODO: Implementare chiamata al backend FastAPI
    setIsModalOpen(false)

    // Placeholder
    alert(`Progetto "${projectName}" creato con ${images.length} immagini dalla pagina Projects!`)
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
            <p className="text-slate-600 dark:text-zinc-400 mt-1">Manage and organize your video ad campaigns</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Project
          </Button>
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
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40 rounded-xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Physical Product">Physical Product</SelectItem>
                  <SelectItem value="SaaS Application">SaaS Application</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
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

              <Button variant="outline" size="sm" className="border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:scale-105"
              >
                {/* Project Thumbnail */}
                <div className="relative aspect-video bg-slate-100 dark:bg-zinc-800 flex items-center justify-center border-b border-slate-200 dark:border-zinc-800">
                  <ImageIcon className="w-12 h-12 text-slate-400 dark:text-zinc-500" />

                  {/* Status Badge */}
                  <Badge className={`absolute top-3 left-3 text-xs px-2 py-1 ${project.statusColor}`}>
                    {project.status}
                  </Badge>

                  {/* Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black shadow-lg"
                      >
                        <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xl" align="end">
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        <Play className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">
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
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 mb-3">{project.category}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.duration}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-zinc-400">{project.views} views</span>
                    <span className="text-slate-600 dark:text-zinc-400">{project.downloads} downloads</span>
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
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Views</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Downloads</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">{project.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">{project.category}</td>
                      <td className="p-4">
                        <Badge className={`text-xs px-2 py-1 ${project.statusColor}`}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">{project.date}</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">{project.duration}</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">{project.views}</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">{project.downloads}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-zinc-800">
                              <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xl" align="end">
                            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                              <Play className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">
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
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-12 text-center">
            <ImageIcon className="w-16 h-16 text-slate-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-600 dark:text-zinc-400 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Project
            </Button>
          </Card>
        )}
      </div>

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleImagesUploaded}
      />
    </>
  )
}
