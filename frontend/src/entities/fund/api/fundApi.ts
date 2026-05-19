import { apiClient } from '@/shared/api/client'
import { FundStatsSchema } from '../model/schema'
import type { FundStats } from '../model/types'

export async function fetchFundStats(): Promise<FundStats> {
  const response = await apiClient.get('/fund/stats')
  return FundStatsSchema.parse(response.data)
}
