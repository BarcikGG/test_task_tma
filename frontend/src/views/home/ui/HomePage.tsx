'use client'

import { useUnit } from 'effector-react'
import { UserProfile } from '@/widgets/user-profile'
import { FundStats } from '@/widgets/fund-stats'
import { Leaderboard } from '@/widgets/leaderboard'
import { BottomNav } from '@/widgets/bottom-nav'
import { Button } from '@/shared/ui/Button'
import { $isExpanded, readMoreToggled } from '@/features/read-more'
import { AnimatedDescription } from '@/widgets/animated-description/ui/AnimatedDescription'

const DESCRIPTION_SHORT =
  'Create sustained impact. Support verified projects. Get regular updates. Save tax. Use web3.'

const DESCRIPTION_FULL =
  'Create sustained impact. Support verified projects. Get regular updates. Save tax. Use web3. Open Foundation is a decentralized platform that connects donors with verified humanitarian and social projects. Every contribution is tracked on-chain, ensuring full transparency and accountability. By using drop points, you participate in our governance and earn rewards for your support.'

export function HomePage() {
  const isExpanded = useUnit($isExpanded)

  return (
    <div className="flex flex-col h-dvh bg-bg overflow-x-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-4 pb-2 flex flex-col gap-4 stagger-children">
          <UserProfile />

          <div className="flex flex-col gap-3">
            <AnimatedDescription
              expanded={isExpanded}
              short={DESCRIPTION_SHORT}
              full={DESCRIPTION_FULL}
            />
            <Button
              variant="ghost"
              size="full"
              onClick={() => readMoreToggled()}
              className="bg-[var(--input)] text-text hover:opacity-80"
            >
              {isExpanded ? 'Show less' : 'Read More'}
            </Button>
          </div>

          <FundStats />
        </div>

        <div className="px-6 mt-2 pb-4">
          <Leaderboard />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
