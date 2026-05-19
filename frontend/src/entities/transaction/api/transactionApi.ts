import { apiClient } from '@/shared/api/client'
import { TransactionListSchema } from '../model/schema'
import type { Transaction } from '../model/types'

export const PAGE_SIZE = 50

export interface TransactionPage {
  items: Transaction[]
  nextOffset: number | null
}

export async function fetchTransactions({ pageParam = 0 }: { pageParam: number }): Promise<TransactionPage> {
  const response = await apiClient.get('/transaction-history', {
    params: { limit: PAGE_SIZE, offset: pageParam },
  })
  const items = TransactionListSchema.parse(response.data)
  return {
    items,
    nextOffset: items.length === PAGE_SIZE ? pageParam + PAGE_SIZE : null,
  }
}
