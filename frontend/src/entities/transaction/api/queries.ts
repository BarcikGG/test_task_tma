import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchTransactions } from './transactionApi'

export const transactionKeys = {
  all: ['transactions'] as const,
  list: () => [...transactionKeys.all, 'list'] as const,
}

export function useTransactions() {
  return useInfiniteQuery({
    queryKey: transactionKeys.list(),
    queryFn: fetchTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 5 * 60_000,
  })
}
