export interface TMAUser {
  id: number
  username: string
  firstName: string
  lastName?: string
  photoUrl?: string
  languageCode?: string
}

export interface UserState {
  user: TMAUser | null
  rank: number | null
  points: number | null
  isLoading: boolean
}
