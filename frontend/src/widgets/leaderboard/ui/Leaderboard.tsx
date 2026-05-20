'use client'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { Avatar } from '@/shared/ui/Avatar'
import { TabBar } from '@/shared/ui/TabBar'
import { cn } from '@/shared/lib/cn'
import { formatTON } from '@/shared/lib/format'
import { useInView } from '@/shared/lib/useInView'
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
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({ rootMargin: '0px 0px -5% 0px' })

  const transactions = data?.pages.flatMap((p) => p.items) ?? []

  const uniqueByUser = (items: typeof transactions) => {
    const seen = new Set<string>()
    return items.filter((t) => {
      if (seen.has(t.userId)) return false
      seen.add(t.userId)
      return true
    })
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '100px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div ref={revealRef} className={cn('flex flex-col', className)}>
      <div className="pb-3 flex-shrink-0">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tab) => tabChanged(tab)}
        />
      </div>

      <div className="border border-[rgba(116,116,128,0.15)] rounded-[14px] overflow-hidden">
        <div key={activeTab} className={cn('lazy-fade-in', inView && 'in-view')}>
          {activeTab === 'holders' && <HoldersList items={uniqueByUser(transactions)} inView={inView} />}
          {activeTab === 'transfers' && <TransactionList items={transactions} inView={inView} />}
          {activeTab === 'top' && <TopUsers items={uniqueByUser(transactions)} />}
        </div>
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {isFetchingNextPage && <SkeletonRows />}
    </div>
  )
}

interface HoldersListProps {
  items: Transaction[]
  inView: boolean
}

function SkeletonRows() {
  return (
    <div className="flex flex-col gap-1 px-1 py-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3 px-3">
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
            <div className="h-2.5 w-16 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="h-3 w-10 rounded bg-white/10 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function HoldersList({ items, inView }: HoldersListProps) {
  return (
    <ul className={cn('flex flex-col gap-1 lazy-stagger', inView && 'in-view')}>
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
