'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { MultiSceneForm, SceneData, ApiResponse } from '../types'
import { INITIAL_MULTI_SCENE_FORM } from '../constants'

export function useMultiScene() {
  const [form, setForm] = useState<MultiSceneForm>(INITIAL_MULTI_SCENE_FORM)
  const [loading, setLoading] = useState(false)

  const updateForm = (updates: Partial<MultiSceneForm>) => {
    setForm(prev => ({ ...prev, ...updates }))
  }

  const addScene = () => {
    setForm(prev => ({
      ...prev,
      scenes: [...prev.scenes, { content: '', avatarId: '', duration: '30' }]
    }))
  }

  const removeScene = (index: number) => {
    setForm(prev => ({
      ...prev,
      scenes: prev.scenes.filter((_, i) => i !== index)
    }))
  }

  const updateScene = (index: number, field: keyof SceneData, value: string) => {
    setForm(prev => ({
      ...prev,
      scenes: prev.scenes.map((scene, i) =>
        i === index ? { ...scene, [field]: value } : scene
      )
    }))
  }

  const resetForm = () => {
    setForm(INITIAL_MULTI_SCENE_FORM)
  }

  const createMultiScene = async () => {
    if (form.scenes.some(scene => !scene.content)) {
      toast.error('Please fill in all scene content')
      return false
    }

    setLoading(true)
    try {
      const response = await fetch('/api/creatify/avatar-v2/create-multiscene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const result: ApiResponse = await response.json()
      
      if (result.success) {
        toast.success('Multi-scene video creation started!')
        resetForm()
        return true
      } else {
        toast.error(result.error || 'Error creating multi-scene video')
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error creating multi-scene video')
      return false
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = !form.scenes.some(scene => !scene.content)

  return {
    form,
    loading,
    updateForm,
    addScene,
    removeScene,
    updateScene,
    resetForm,
    createMultiScene,
    isFormValid
  }
} 