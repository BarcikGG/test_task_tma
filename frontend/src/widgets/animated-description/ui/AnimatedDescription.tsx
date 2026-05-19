'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface AnimatedDescriptionProps {
  expanded: boolean
  short: string
  full: string
  className?: string
}

const textClassName = 'font-mono text-text-secondary text-sm leading-relaxed'

export function AnimatedDescription({
  expanded,
  short,
  full,
  className,
}: AnimatedDescriptionProps) {
  const shortRef = useRef<HTMLParagraphElement>(null)
  const fullRef = useRef<HTMLParagraphElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [canAnimate, setCanAnimate] = useState(false)

  useLayoutEffect(() => {
    const active = expanded ? fullRef.current : shortRef.current
    if (!active) return

    const syncHeight = () => setHeight(active.scrollHeight)

    syncHeight()
    setCanAnimate(true)

    const observer = new ResizeObserver(syncHeight)
    observer.observe(active)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        canAnimate && 'transition-[height] duration-300 ease-in-out',
        className,
      )}
      style={height !== undefined ? { height } : undefined}
    >
      <p
        ref={shortRef}
        className={cn(
          textClassName,
          'transition-opacity duration-300 ease-in-out',
          expanded
            ? 'absolute inset-x-0 top-0 opacity-0 pointer-events-none'
            : 'relative opacity-100',
        )}
      >
        {short}
      </p>
      <p
        ref={fullRef}
        className={cn(
          textClassName,
          'transition-opacity duration-300 ease-in-out',
          expanded
            ? 'relative opacity-100'
            : 'absolute inset-x-0 top-0 opacity-0 pointer-events-none',
        )}
      >
        {full}
      </p>
    </div>
  )
}
