'use client'

import { cn } from '@/shared/lib/cn'

export interface TabItem<T extends string = string> {
  id: T
  label: string
}

interface TabBarProps<T extends string = string> {
  tabs: TabItem<T>[]
  activeTab: T
  onTabChange: (tab: T) => void
  className?: string
}

export function TabBar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabBarProps<T>) {
  return (
    <div className={cn('overflow-x-auto scrollbar-none', className)}>
      <div className="flex gap-2 w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'whitespace-nowrap py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer min-h-[36px]',
              activeTab === tab.id
                ? 'bg-white text-bg shadow-sm'
                : 'bg-input text-text-secondary hover:text-white',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
