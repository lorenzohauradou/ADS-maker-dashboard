"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { ImageUploadModal } from "./image-upload-modal"

export function CreateVideoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImagesUploaded = async (images: File[], projectName: string) => {
    console.log("Images uploaded:", images.length, "Project:", projectName)

    // TODO: Qui implementeremo la chiamata al backend FastAPI
    // 1. Creare nuovo progetto
    // 2. Upload immagini
    // 3. Avviare workflow di creazione video

    // Per ora solo log e chiudi modal
    setIsModalOpen(false)

    // Placeholder per il workflow
    alert(`Progetto "${projectName}" creato con ${images.length} immagini! 
    
    Prossimi step:
    1. Upload al backend
    2. AI analisi immagini  
    3. Generazione landing page
    4. Creazione video con Creatify`)
  }

  return (
    <>
      <div className="text-center py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-responsive-4xl md:text-responsive-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
            Create Professional Video Ads in Minutes
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform your product images into stunning video advertisements
            <br className="hidden sm:block" />
            with AI-powered automation
          </p>

          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Video Ad
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleImagesUploaded}
      />
    </>
  )
}
