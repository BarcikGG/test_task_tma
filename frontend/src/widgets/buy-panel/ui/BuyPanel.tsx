'use client'

import { useUnit } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import {
  formatEuropean,
  isPartialEuropeanInput,
  parseEuropeanInput,
  toEditableEuropean,
} from '@/shared/lib/format'
import {
  $buyAmount,
  $buyCurrency,
  $isValidAmount,
  amountIncremented,
  amountDecremented,
  amountChanged,
  currencyChanged,
} from '@/features/buy-points'
import type { Currency } from '@/features/buy-points'

interface BuyPanelProps {
  className?: string
}

export function BuyPanel({ className }: BuyPanelProps) {
  const amount = useUnit($buyAmount)
  const currency = useUnit($buyCurrency)
  const isValid = useUnit($isValidAmount)

  const [amountDraft, setAmountDraft] = useState<string | null>(null)
  const isEditingAmount = amountDraft !== null

  const parsedDraft = amountDraft !== null ? parseEuropeanInput(amountDraft) : null
  const displayAmount = parsedDraft ?? amount

  useEffect(() => {
    setAmountDraft((draft) => (draft !== null ? toEditableEuropean(amount) : null))
  }, [amount])

  const handleIncrement = useCallback(() => {
    amountIncremented()
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      try {
        // @ts-expect-error TMA global
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
      } catch {}
    }
  }, [])

  const handleDecrement = useCallback(() => {
    amountDecremented()
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      try {
        // @ts-expect-error TMA global
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
      } catch {}
    }
  }, [])

  const handleAmountFocus = useCallback(() => {
    setAmountDraft(toEditableEuropean(amount))
  }, [amount])

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (!isPartialEuropeanInput(raw)) return
    setAmountDraft(raw)
  }, [])

  const handleAmountBlur = useCallback(() => {
    const parsed = amountDraft !== null ? parseEuropeanInput(amountDraft) : null
    if (parsed !== null) {
      amountChanged(parsed)
    }
    setAmountDraft(null)
  }, [amountDraft])

  const handleCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    currencyChanged(e.target.value as Currency)
  }, [])

  const handleBuy = useCallback(() => {
    if (!isValid) return
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      try {
        // @ts-expect-error TMA global
        window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success')
      } catch {}
    }
    alert(`Buying ${formatEuropean(amount)} ${currency} worth of drop points`)
  }, [amount, currency, isValid])

  return (
    <div className={cn('flex flex-col gap-2 animate-fade-up', className)}>
      <div className="bg-[#141928] rounded-2xl flex items-center justify-between px-8 py-5">
        <button
          type="button"
          onClick={handleDecrement}
          className={cn(
            'w-8 h-8 rounded-full bg-text-secondary inline-flex items-center justify-center p-0',
            'text-[#141928] cursor-pointer',
            'hover:bg-text-secondary/80 active:scale-95 transition-all',
          )}
          aria-label="Decrease amount"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="text-center">
          <span className="text-white text-4xl font-bold tracking-tight">
            {formatEuropean(displayAmount)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          className={cn(
            'w-8 h-8 rounded-full bg-text-secondary inline-flex items-center justify-center p-0',
            'text-[#141928] cursor-pointer',
            'hover:bg-text-secondary/80 active:scale-95 transition-all',
          )}
          aria-label="Increase amount"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="text-text-secondary text-sm pb-2 text-center font-mono">
        You must buy at least{' '}
        <span className="text-white font-semibold">100 points</span>
      </p>

      <div className="flex flex-col gap-2">
        <label className="text-text text-sm font-medium font-mono">
          Set expiration date and time
        </label>
      </div>

      <div className="flex gap-3 pb-2">
        <div className="relative">
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className={cn(
              'h-14 bg-[#141928] border border-white/[0.08] rounded-2xl px-4 pr-8',
              'text-white text-sm font-medium appearance-none cursor-pointer',
              'focus:outline-none focus:border-blue transition-colors',
              'min-w-[100px] font-mono',
            )}
          >
            <option value="TON">TON</option>
            <option value="USD">USD</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          value={isEditingAmount ? amountDraft : formatEuropean(amount)}
          onFocus={handleAmountFocus}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          className={cn(
            'flex-1 h-14 bg-[#141928] border border-white/[0.08] rounded-2xl px-4',
            'text-white text-md font-medium text-left',
            'focus:outline-none focus:border-blue transition-colors font-mono',
          )}
          inputMode="decimal"
        />
      </div>

      <Button
        variant="primary"
        size="full"
        onClick={handleBuy}
        disabled={!isValid}
      >
        Buy
      </Button>
    </div>
  )
}
