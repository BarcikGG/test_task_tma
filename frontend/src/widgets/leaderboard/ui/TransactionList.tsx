'use client'

import { Avatar } from '@/shared/ui/Avatar'
import { cn } from '@/shared/lib/cn'
import { formatTON } from '@/shared/lib/format'
import type { Transaction } from '@/entities/transaction'

interface TransactionListProps {
  items: Transaction[]
  className?: string
  inView?: boolean
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function TransactionList({ items, className, inView = true }: TransactionListProps) {
  return (
    <ul className={cn('flex flex-col gap-1 lazy-stagger', inView && 'in-view', className)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all cursor-pointer"
          style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
        >
          <Avatar username={item.username} src={item.avatar} size={40} />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white font-semibold text-sm truncate">@{item.username}</span>
            <span className="text-text-secondary text-xs">{timeAgo(item.timestamp)}</span>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              +{formatTON(item.amount, item.currency)}
            </span>
            {item.points != null && (
              <span className="text-text-secondary text-xs">{item.points} pts</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
