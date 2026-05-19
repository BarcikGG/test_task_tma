'use client'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { Avatar } from '@/shared/ui/Avatar'
import { TabBar } from '@/shared/ui/TabBar'
import { cn } from '@/shared/lib/cn'
import { formatTON } from '@/shared/lib/format'
import { $activeTab, tabChanged } from '@/features/tab-switch'
import { useTransactions } from '@/entities/transaction'
import { TransactionList } from './TransactionList'
import { TopUsers } from './TopUsers'
import type { TabItem } from '@/shared/ui/TabBar'
import type { TabId } from '@/features/tab-switch'
import type { Transaction } from '@/entities/transaction'

const TABS: TabItem<TabId>[] = [
  { id: 'holders', label: 'Holders leaderboard' },
  { id: 'transfers', label: 'Latest transfers' },
  { id: 'top', label: 'TOP users' },
]

interface LeaderboardProps {
  className?: string
}

export function Leaderboard({ className }: LeaderboardProps) {
  const activeTab = useUnit($activeTab)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTransactions()
  const sentinelRef = useRef<HTMLDivElement>(null)

  const transactions = data?.pages.flatMap((p) => p.items) ?? []

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="pb-3 flex-shrink-0">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tab) => tabChanged(tab)}
        />
      </div>

      <div className="border border-[rgba(116,116,128,0.15)] rounded-[14px] overflow-hidden">
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'holders' && <HoldersList items={transactions} />}
          {activeTab === 'transfers' && <TransactionList items={transactions} />}
          {activeTab === 'top' && <TopUsers items={transactions} />}
        </div>
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-3">
          <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

interface HoldersListProps {
  items: Transaction[]
}

function HoldersList({ items }: HoldersListProps) {
  return (
    <ul className="flex flex-col gap-1 stagger-children">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center gap-3 py-3 px-3 hover:bg-white/5 active:bg-white/10 transition-all cursor-pointer"
        >
          <Avatar username={item.username} src={item.avatar} size={40} />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white font-semibold text-sm truncate">{item.username}</span>
            <span className="text-text-secondary text-xs">{formatTON(item.amount, item.currency)}</span>
          </div>
          <span className="text-text-secondary text-sm font-medium flex-shrink-0">
            #{index + 1}
          </span>
        </li>
      ))}
    </ul>
  )
}
