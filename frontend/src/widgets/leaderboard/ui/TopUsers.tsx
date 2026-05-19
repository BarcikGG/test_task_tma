'use client'

import { Avatar } from '@/shared/ui/Avatar'
import { cn } from '@/shared/lib/cn'
import { formatNumber, formatTON } from '@/shared/lib/format'
import type { Transaction } from '@/entities/transaction'

interface TopUsersProps {
  items: Transaction[]
  className?: string
}

interface PodiumItemProps {
  item: Transaction
  rank: 1 | 2 | 3
}

const BAR_HEIGHT: Record<1 | 2 | 3, string> = { 1: 'h-20', 2: 'h-14', 3: 'h-10' }
const AVATAR_SIZE: Record<1 | 2 | 3, number> = { 1: 56, 2: 44, 3: 44 }
const RANK_SIZE: Record<1 | 2 | 3, string> = { 1: 'text-2xl', 2: 'text-lg', 3: 'text-base' }

function PodiumItem({ item, rank }: PodiumItemProps) {
  const isFirst = rank === 1
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      {isFirst ? (
        <span className="text-xl mb-1">👑</span>
      ) : (
        <div className="h-7" />
      )}
      <Avatar username={item.username} src={item.avatar} size={AVATAR_SIZE[rank]} />
      <span
        className={cn(
          'text-xs font-medium truncate max-w-[72px] text-center mt-1.5 leading-tight',
          isFirst ? 'text-white font-semibold' : 'text-text-secondary',
        )}
      >
        {item.username}
      </span>
      <span className="text-text-secondary text-[10px] mt-0.5 truncate max-w-[72px] text-center">
        {formatTON(item.amount, item.currency)}
      </span>
      <div
        className={cn(
          'w-full mt-2 rounded-t-2xl flex items-center justify-center',
          BAR_HEIGHT[rank],
          isFirst ? 'bg-[rgba(29,155,240,0.2)] border border-[rgba(29,155,240,0.3)]' : 'bg-card border border-white/[0.08]',
        )}
      >
        <span className={cn('font-bold text-white', RANK_SIZE[rank])}>
          {rank}
        </span>
      </div>
    </div>
  )
}

export function TopUsers({ items, className }: TopUsersProps) {
  const topItems = items

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {topItems.length >= 3 && (
        <div className="flex items-end justify-center gap-3 px-2 pt-2 pb-0">
          <PodiumItem item={topItems[1]} rank={2} />
          <PodiumItem item={topItems[0]} rank={1} />
          <PodiumItem item={topItems[2]} rank={3} />
        </div>
      )}

      <ul className="flex flex-col gap-1 mt-2">
        {topItems.slice(3).map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all cursor-pointer"
          >
            <span className="text-text-secondary text-sm font-medium w-5 text-center flex-shrink-0">
              #{index + 4}
            </span>
            <Avatar username={item.username} src={item.avatar} size={36} />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white font-semibold text-sm truncate">{item.username}</span>
              {item.points != null && (
                <span className="text-text-secondary text-xs">
                  {formatNumber(item.points)} pts
                </span>
              )}
            </div>
            <span className="text-white text-sm font-semibold flex-shrink-0">
              {formatTON(item.amount, item.currency)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
