'use client'

import { type ReactNode, useLayoutEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { userLoaded, userPointsUpdated } from '@/entities/user'
import type { TMAUser } from '@/entities/user'
import { fetchUser } from '@/entities/user/api/userApi'

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient({
      defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false } },
    })
  }
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false } },
    })
  }
  return browserQueryClient
}

function TMAProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const tg = (window as any).Telegram?.WebApp

    const applyTheme = (scheme: string) => {
      const root = document.documentElement
      root.classList.remove('dark', 'light')
      root.classList.add(scheme === 'light' ? 'light' : 'dark')
    }

    if (tg) {
      applyTheme(tg.colorScheme ?? 'dark')
      tg.onEvent('themeChanged', () => applyTheme(tg.colorScheme))
    } else {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mql.matches ? 'dark' : 'light')
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light')
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [])

  useLayoutEffect(() => {
    async function initUser() {
      try {
        const { retrieveLaunchParams } = await import('@tma.js/sdk')
        const launchParams = retrieveLaunchParams()
        const initData = launchParams.tgWebAppData

        if (initData && typeof initData === 'object' && 'user' in initData) {
          const raw = (initData as Record<string, unknown>).user as Record<string, unknown> | undefined
          if (raw) {
            const user: TMAUser = {
              id: raw.id as number,
              username: (raw.username as string | undefined) ?? (raw.first_name as string) ?? 'User',
              firstName: (raw.first_name as string) ?? '',
              lastName: raw.last_name as string | undefined,
              photoUrl: raw.photo_url as string | undefined,
              languageCode: raw.language_code as string | undefined,
            }
            userLoaded(user)

            try {
              const backendUser = await fetchUser(String(raw.id))
              userPointsUpdated(backendUser.points)
              if (backendUser.photoUrl) {
                userLoaded({ ...user, photoUrl: backendUser.photoUrl })
              }
            } catch {
            }
          }
        }
      } catch {
      }
    }

    initUser()
  }, [])

  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <TMAProvider>{children}</TMAProvider>
    </QueryClientProvider>
  )
}
