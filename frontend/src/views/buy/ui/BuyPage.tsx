'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { BuyPanel } from '@/widgets/buy-panel'

export function BuyPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-svh bg-bg overflow-hidden">
      <header className="flex-shrink-0 px-6 pt-4 pb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="gap-1 justify-start px-0 min-h-[44px] text-blue hover:text-blue font-medium"
          aria-label="Back to home"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path
              d="M7 1L1 7L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto flex items-center">
        <div className="px-6 pb-6 w-full">
          <BuyPanel />
        </div>
      </div>
    </div>
  )
}
