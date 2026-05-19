'use client'

import { cn } from '@/shared/lib/cn'

interface ProgressBarProps {
  value: number // 0–100
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full h-8 bg-input rounded-full overflow-hidden relative flex items-center">
        <div
          className={cn(
            'h-full bg-blue animate-progress-fill absolute left-0 top-0',
            clamped >= 100 ? 'rounded-full' : 'rounded-r-none',
          )}
          style={
            {
              '--progress': `${clamped}%`,
              width: `${clamped}%`,
            } as React.CSSProperties
          }
        />
        {showLabel && (
          <span className="absolute right-4 text-white text-sm font-medium z-10">
            {clamped.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}
