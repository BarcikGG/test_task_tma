import { useQuery } from '@tanstack/react-query'
import { fetchFundStats } from './fundApi'

export const fundKeys = {
  all: ['fund'] as const,
  stats: () => [...fundKeys.all, 'stats'] as const,
}

export function useFundStats() {
  return useQuery({
    queryKey: fundKeys.stats(),
    queryFn: fetchFundStats,
    staleTime: 5 * 60_000,
  })
}
