'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'full'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer select-none',
          'active:scale-95 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          {
            // variants
            'bg-blue text-white rounded-[16px]': variant === 'primary',
            'bg-card text-white rounded-[16px] border border-white/10': variant === 'secondary',
            'bg-transparent text-white/70 hover:text-white rounded-[16px]': variant === 'ghost',
            'bg-input text-white rounded-[16px]': variant === 'pill',
          },
          {
            // sizes
            'h-8 px-3 text-sm': size === 'sm',
            'h-11 px-5 text-base': size === 'md',
            'h-14 px-6 text-lg': size === 'lg',
            'h-14 w-full text-lg': size === 'full',
          },
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-[16px] animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
