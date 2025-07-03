export interface AvatarCreatorForm {
  name: string
  age_group: string
  gender: string
  more_details: string
  outfit_description: string
  background_description: string
}

export interface MultiSceneForm {
  scenes: SceneData[]
  overallTheme: string
  resolution: string
}

export interface SceneData {
  content: string
  avatarId: string
  duration: string
}

export interface ByoaForm {
  lipsyncVideo: File | null
  consentVideo: File | null
  creatorName: string
  gender: string
  videoScene: string
}

export type ActiveTab = 'avatar-creator' | 'multi-scene' | 'upload-avatar'

export interface ApiResponse<T = any> {
  success: boolean
  error?: string
  data?: T
  avatar_data?: { id: string }
  persona_data?: { id: string }
  persona_status?: { is_active: boolean }
}

export interface DyoaPhoto {
  id: string
  image: string
  created_at: string
}

export interface DyoaResponse {
  id: string
  name: string
  status: 'initializing' | 'draft' | 'pending' | 'in_progress' | 'done' | 'rejected'
  photos: DyoaPhoto[]
  age_group: string
  gender: string
  more_details: string
  outfit_description: string
  background_description: string
  created_at: string
  updated_at: string
} 