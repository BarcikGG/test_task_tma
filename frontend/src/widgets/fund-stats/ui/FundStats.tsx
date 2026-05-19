'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/Card'
import { ProgressBar } from '@/shared/ui/ProgressBar'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { formatTON, formatCompact } from '@/shared/lib/format'
import { useFundStats } from '@/entities/fund'

interface FundStatsProps {
  className?: string
}

export function FundStats({ className }: FundStatsProps) {
  const router = useRouter()
  const { data: stats } = useFundStats()

  const totalRaised = stats?.totalRaised ?? 0
  const goal = stats?.goal ?? 1000
  const progress = stats?.progress ?? 0
  const currency = 'TON'
  const dropPointsPrice = stats ? Number((1 / stats.wallet.tonToPointsRate).toFixed(5)) : 0
  const membersCount = stats?.membersCount ?? 0
  const purchased = stats?.purchasedCount ?? 0
  const roundName = 'First round'

  return (
    <Card className={cn('animate-fade-up border-[#59595C]', className)} padding="md">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💎</span>
          <span className="text-text-secondary text-sm font-medium">Total funds raised {formatTON(totalRaised, currency)}</span>
        </div>

        <ProgressBar value={progress} showLabel={true} />

        <p className="text-text-secondary text-xs font-mono">
          {roundName} goal {formatTON(goal, currency)}
        </p>

        <div className="flex flex-col gap-0 bg-[#1C2935] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-12 h-12 rounded-full bg-[#0D1117] flex items-center justify-center flex-shrink-0 border border-white/10">
              <span className="text-[13px] font-black bg-gradient-to-br from-violet-400 to-pink-500 bg-clip-text text-transparent">dp</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-text-secondary text-xs">Drop Points price:</span>
              <span className="text-white text-xl font-semibold">{dropPointsPrice} {currency}</span>
            </div>
            <button
              onClick={() => router.push('/buy')}
              className={cn(
                'bg-[#3A3A3C] text-white text-base font-semibold rounded-2xl px-5 py-2',
                'hover:bg-white/20 active:scale-95 transition-all cursor-pointer min-h-[44px]',
              )}
            >
              Buy
            </button>
          </div>

          <div className="h-px bg-white/[0.08] mx-3" />

          <div className="flex items-center gap-2 px-3 py-3">
            <span className="text-base">🔥</span>
            <span className="text-text-secondary text-sm font-mono">
              {formatCompact(membersCount)} members &amp; {formatCompact(purchased)} purchased
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="full"
          onClick={() => router.push('/buy')}
          className="mt-1 font-mono"
        >
          Get drop points!
        </Button>
      </div>
    </Card>
  )
}
