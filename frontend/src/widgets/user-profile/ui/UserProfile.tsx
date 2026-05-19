'use client'

import { useUnit } from 'effector-react'
import { Avatar } from '@/shared/ui/Avatar'
import { cn } from '@/shared/lib/cn'
import { formatNumber } from '@/shared/lib/format'
import { $userState } from '@/entities/user'

interface UserProfileProps {
  className?: string
}

export function UserProfile({ className }: UserProfileProps) {
  const { user, points } = useUnit($userState)

  const displayName = user?.username ?? user?.firstName ?? '—'

  return (
    <div className={cn('flex items-center justify-between py-3 px-1 animate-fade-up', className)}>
      <div className="flex items-center gap-3">
        <Avatar username={displayName} src={user?.photoUrl} size={52} />
        <div className="flex flex-col font-mono">
          <span className="text-white text-base">
            {displayName}
          </span>
          <span className="text-[var(--text-secondary)] text-sm">
            Your rank #17
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center font-mono">
        <div className="border border-[var(--border)] rounded-2xl px-5 py-3 min-w-[100px] text-center">
          <span className="text-white font-bold text-lg whitespace-nowrap">
            {points !== null ? formatNumber(points) : '—'}
          </span>
        </div>
        <span className="-mt-2.5 bg-bg px-2 text-text-secondary text-xs whitespace-nowrap">
          Points
        </span>
      </div>
    </div>
  )
}
