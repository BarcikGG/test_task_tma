'use client'

import { useUnit } from 'effector-react'
import { BottomNav } from '@/widgets/bottom-nav'
import { Avatar } from '@/shared/ui/Avatar'
import { Card } from '@/shared/ui/Card'
import { formatNumber } from '@/shared/lib/format'
import { $userState } from '@/entities/user'

interface MenuRowProps {
  icon: string
  label: string
  value?: string
  chevron?: boolean
}

function MenuRow({ icon, label, value, chevron = true }: MenuRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5 transition-all cursor-pointer">
      <span className="text-lg w-6 text-center flex-shrink-0">{icon}</span>
      <span className="text-white text-sm flex-1">{label}</span>
      {value && <span className="text-text-secondary text-sm font-mono">{value}</span>}
      {chevron && (
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" className="text-text-secondary flex-shrink-0">
          <path d="M1 1L5 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

export function MenuPage() {
  const { user, points } = useUnit($userState)
  const displayName = user?.username ?? user?.firstName ?? '—'

  return (
    <div className="flex flex-col h-svh bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Profile header */}
        <div className="px-4 pt-6 pb-4 flex flex-col items-center gap-3 stagger-children">
          <Avatar username={displayName} src={user?.photoUrl} size={72} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white font-bold text-lg">{displayName}</span>
            {points !== null && (
              <span className="text-text-secondary text-sm font-mono">
                {formatNumber(points)} drop points
              </span>
            )}
          </div>
        </div>

        <div className="px-4 flex flex-col gap-3 pb-4 stagger-children">
          {/* Account */}
          <Card padding="none" className="overflow-hidden divide-y divide-white/[0.06]">
            <div className="px-4 py-2.5">
              <span className="text-text-secondary text-xs font-mono uppercase tracking-wide">Account</span>
            </div>
            <MenuRow icon="👤" label="Profile" />
            <MenuRow icon="🔔" label="Notifications" value="On" />
            <MenuRow icon="🌐" label="Language" value="English" />
          </Card>

          {/* About */}
          <Card padding="none" className="overflow-hidden divide-y divide-white/[0.06]">
            <div className="px-4 py-2.5">
              <span className="text-text-secondary text-xs font-mono uppercase tracking-wide">About</span>
            </div>
            <MenuRow icon="❓" label="FAQ" />
            <MenuRow icon="💬" label="Support" />
            <MenuRow icon="📄" label="Terms of Use" />
            <MenuRow icon="🔒" label="Privacy Policy" />
          </Card>

          {/* App info */}
          <Card padding="none" className="overflow-hidden divide-y divide-white/[0.06]">
            <div className="px-4 py-2.5">
              <span className="text-text-secondary text-xs font-mono uppercase tracking-wide">App</span>
            </div>
            <MenuRow icon="⚡" label="Version" value="1.0.0" chevron={false} />
            <MenuRow icon="🔗" label="Open Foundation" value="Website" />
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
