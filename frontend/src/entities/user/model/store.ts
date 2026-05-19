import { createStore, createEvent } from 'effector'
import type { TMAUser, UserState } from './types'

export const userLoaded = createEvent<TMAUser>()
export const userPointsUpdated = createEvent<number>()
export const userRankUpdated = createEvent<number>()

export const $userState = createStore<UserState>({
  user: null,
  rank: null,
  points: null,
  isLoading: true,
})
  .on(userLoaded, (state, user) => ({ ...state, user, isLoading: false }))
  .on(userPointsUpdated, (state, points) => ({ ...state, points }))
  .on(userRankUpdated, (state, rank) => ({ ...state, rank }))

export const $currentUser = $userState.map((s) => s.user)
export const $userPoints = $userState.map((s) => s.points)
export const $userRank = $userState.map((s) => s.rank)
export const $userIsLoading = $userState.map((s) => s.isLoading)
