'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/shared/lib/cn'
import MainIcon from '../assets/main.svg'
import LampIcon from '../assets/lamp.svg'
import CirclesIcon from '../assets/circles.svg'
import FriendsIcon from '../assets/friends.svg'
import MenuIcon from '../assets/menu.svg'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  exactMatch?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Fund', icon: <MainIcon />, exactMatch: true },
  { href: '/ideas', label: 'Ideas', icon: <LampIcon /> },
  { href: '/chat', label: 'Chat', icon: <CirclesIcon /> },
  { href: '/referral', label: 'Invite', icon: <FriendsIcon /> },
  { href: '/menu', label: 'Menu', icon: <MenuIcon /> },
]

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex items-center justify-around bg-nav border-t border-white/[0.08] pb-safe',
        'h-[69px] px-4 flex-shrink-0',
        className,
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.exactMatch
          ? pathname === item.href
          : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl transition-all',
              'hover:bg-white/5 active:scale-95',
              isActive ? '!text-white' : 'text-text-secondary',
            )}
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        )
      })}
    </nav>
  )
}
