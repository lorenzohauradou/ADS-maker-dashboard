'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ByoaForm, ApiResponse } from '../types'
import { INITIAL_BYOA_FORM } from '../constants'

export function useByoa() {
  const [form, setForm] = useState<ByoaForm>(INITIAL_BYOA_FORM)
  const [loading, setLoading] = useState(false)
  const [personaId, setPersonaId] = useState<string | null>(null)

  const updateForm = (updates: Partial<ByoaForm>) => {
    setForm(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setForm(INITIAL_BYOA_FORM)
    setPersonaId(null)
  }

  const uploadAvatar = async () => {
    if (!form.lipsyncVideo || !form.consentVideo || !form.creatorName || !form.gender) {
      toast.error('Please fill in all required fields and upload both videos')
      return false
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('lipsync_video', form.lipsyncVideo)
      formData.append('consent_video', form.consentVideo)  
      formData.append('creator_name', form.creatorName)
      formData.append('gender', form.gender)
      formData.append('video_scene', form.videoScene)

      const response = await fetch('/api/creatify/byoa/upload', {
        method: 'POST',
        body: formData
      })

      const result: ApiResponse = await response.json()
      
      if (result.success) {
        setPersonaId(result.persona_data?.id || null)
        toast.success('Avatar uploaded successfully! Approval pending...')
        resetForm()
        return true
      } else {
        toast.error(result.error || 'Error uploading avatar')
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error uploading avatar')
      return false
    } finally {
      setLoading(false)
    }
  }

  const checkPersonaStatus = async () => {
    if (!personaId) {
      toast.error('No persona ID available')
      return null
    }

    try {
      const response = await fetch(`/api/creatify/byoa/${personaId}/status`)
      const result: ApiResponse = await response.json()

      if (result.success) {
        const status = result.persona_status
        if (status?.is_active) {
          toast.success('Avatar approved and ready to use!')
          return 'approved'
        } else {
          toast.info('Avatar still pending approval...')
          return 'pending'
        }
      } else {
        toast.error(result.error || 'Error checking status')
        return 'error'
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error checking persona status')
      return 'error'
    }
  }

  const isFormValid = Boolean(
    form.lipsyncVideo && 
    form.consentVideo && 
    form.creatorName && 
    form.gender
  )

  return {
    form,
    loading,
    personaId,
    updateForm,
    resetForm,
    uploadAvatar,
    checkPersonaStatus,
    isFormValid
  }
} 