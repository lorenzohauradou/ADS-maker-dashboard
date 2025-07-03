'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { AvatarCreatorForm, ApiResponse, DyoaResponse, DyoaPhoto } from '../types'
import { INITIAL_AVATAR_FORM } from '../constants'

export function useAvatarCreator() {
  const [form, setForm] = useState<AvatarCreatorForm>(INITIAL_AVATAR_FORM)
  const [loading, setLoading] = useState(false)
  const [dyoaId, setDyoaId] = useState<string | null>(null)
  const [photos, setPhotos] = useState<DyoaPhoto[]>([])
  const [status, setStatus] = useState<string>('')
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
  const [step, setStep] = useState<'form' | 'photos' | 'review' | 'completed'>('form')

  const updateForm = (updates: Partial<AvatarCreatorForm>) => {
    setForm(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setForm(INITIAL_AVATAR_FORM)
    setDyoaId(null)
    setPhotos([])
    setStatus('')
    setSelectedPhotoId(null)
    setStep('form')
  }

  const createAvatar = async () => {
    if (!form.name || !form.more_details) {
      toast.error('Please fill in avatar name and description')
      return false
    }

    setLoading(true)
    try {
      const response = await fetch('/api/creatify/dyoa/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const result: DyoaResponse = await response.json()
      
      if (result.id) {
        setDyoaId(result.id)
        setStatus(result.status)
        toast.success(`Avatar "${form.name}" creation started!`)
        setStep('photos')
        // Start polling for photos
        pollForPhotos(result.id)
        return true
      } else {
        toast.error('Error creating avatar')
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error creating avatar')
      return false
    } finally {
      setLoading(false)
    }
  }

  const pollForPhotos = async (id: string) => {
    try {
      const response = await fetch(`/api/creatify/dyoa/${id}/status`)
      const result: DyoaResponse = await response.json()
      
      setStatus(result.status)
      
      if (result.photos && result.photos.length > 0) {
        setPhotos(result.photos)
        setStep('photos')
        toast.success('Photos are ready! Please select your favorite.')
      } else if (result.status === 'initializing' || result.status === 'draft') {
        // Continue polling
        setTimeout(() => pollForPhotos(id), 10000)
      }
    } catch (error) {
      console.error('Error polling:', error)
    }
  }

  const submitForReview = async () => {
    if (!dyoaId || !selectedPhotoId) {
      toast.error('Please select a photo first')
      return false
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/creatify/dyoa/${dyoaId}/submit-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chosen_photo_id: selectedPhotoId })
      })

      const result: DyoaResponse = await response.json()
      
      if (result.status === 'pending') {
        toast.success('Avatar submitted for review! You will be notified when approved.')
        setStep('review')
        return true
      } else {
        toast.error('Error submitting for review')
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error submitting for review')
      return false
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = form.name && form.more_details && form.outfit_description

  return {
    form,
    loading,
    dyoaId,
    photos,
    status,
    selectedPhotoId,
    step,
    updateForm,
    resetForm,
    createAvatar,
    submitForReview,
    setSelectedPhotoId,
    isFormValid
  }
} 