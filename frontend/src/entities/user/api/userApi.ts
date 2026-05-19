import { apiClient } from '@/shared/api/client'
import { z } from 'zod'

export const BackendUserSchema = z.object({
  tgId: z.string(),
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  photoUrl: z.string().nullable(),
  points: z.number(),
  isActive: z.boolean(),
  rank: z.number().optional(),
})

export type BackendUser = z.infer<typeof BackendUserSchema>

export async function fetchUser(tgId: string): Promise<BackendUser> {
  const response = await apiClient.get(`/users/${tgId}`)
  return BackendUserSchema.parse(response.data)
}
