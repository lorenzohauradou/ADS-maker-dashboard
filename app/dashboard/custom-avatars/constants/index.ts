export const AGE_GROUPS = [
  { value: 'child', label: 'Child (5-12 years)' },
  { value: 'teen', label: 'Teen (13-19 years)' },
  { value: 'young_adult', label: 'Young Adult (20-34 years)' },
  { value: 'early_middle_age', label: 'Early Middle Age (35-44 years)' },
  { value: 'late_middle_age', label: 'Late Middle Age (45-54 years)' },
  { value: 'senior', label: 'Senior (55+ years)' }
]

export const GENDERS = [
  { value: 'f', label: 'Female' },
  { value: 'm', label: 'Male' },
  { value: 'nb', label: 'Non-Binary' }
]



export const BYOA_GENDERS = [
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' }
]

export const VIDEO_SCENES = [
  { value: 'office', label: 'Office' },
  { value: 'home', label: 'Home' },
  { value: 'studio', label: 'Studio' },
  { value: 'outdoor', label: 'Outdoor' }
]

export const RESOLUTIONS = [
  { value: '1080x1920', label: '1080x1920 (9:16)' },
  { value: '1920x1080', label: '1920x1080 (16:9)' },
  { value: '1080x1080', label: '1080x1080 (1:1)' }
]

export const SCENE_DURATIONS = [
  { value: '15', label: '15 seconds' },
  { value: '30', label: '30 seconds' },
  { value: '45', label: '45 seconds' },
  { value: '60', label: '60 seconds' }
]

export const INITIAL_AVATAR_FORM = {
  name: '',
  age_group: '',
  gender: '',
  more_details: '',
  outfit_description: '',
  background_description: ''
}

export const INITIAL_MULTI_SCENE_FORM = {
  scenes: [{ content: '', avatarId: '', duration: '30' }],
  overallTheme: '',
  resolution: '1080x1920'
}

export const INITIAL_BYOA_FORM = {
  lipsyncVideo: null as File | null,
  consentVideo: null as File | null,
  creatorName: '',
  gender: '',
  videoScene: 'office'
} 