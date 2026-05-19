'use client'

import { BottomNav } from '@/widgets/bottom-nav'
import { Card } from '@/shared/ui/Card'
import { cn } from '@/shared/lib/cn'

interface IdeaCardProps {
  tag: string
  tagColor: string
  title: string
  description: string
  votes: number
  status: 'open' | 'review' | 'funded'
}

const STATUS_LABEL: Record<IdeaCardProps['status'], string> = {
  open: 'Open',
  review: 'In Review',
  funded: 'Funded',
}

const STATUS_COLOR: Record<IdeaCardProps['status'], string> = {
  open: 'text-blue bg-blue/10',
  review: 'text-yellow-400 bg-yellow-400/10',
  funded: 'text-green-400 bg-green-400/10',
}

const IDEAS: IdeaCardProps[] = [
  {
    tag: 'Education',
    tagColor: 'text-violet-400 bg-violet-400/10',
    title: 'Remote Learning Hubs',
    description: 'Build offline-capable learning stations for communities with no internet access across Central Asia.',
    votes: 312,
    status: 'review',
  },
  {
    tag: 'Environment',
    tagColor: 'text-green-400 bg-green-400/10',
    title: 'Coastal Cleanup Network',
    description: 'Coordinate volunteer cleanups along 500 km of coastline, funded by micro-donations on-chain.',
    votes: 248,
    status: 'open',
  },
  {
    tag: 'Healthcare',
    tagColor: 'text-pink-400 bg-pink-400/10',
    title: 'Mobile Medical Clinics',
    description: 'Deploy solar-powered medical units to refugee settlements providing free primary care.',
    votes: 194,
    status: 'funded',
  },
  {
    tag: 'Food Security',
    tagColor: 'text-orange-400 bg-orange-400/10',
    title: 'Urban Vertical Farms',
    description: 'Community-owned vertical farms inside abandoned buildings to combat food deserts in cities.',
    votes: 156,
    status: 'open',
  },
  {
    tag: 'Infrastructure',
    tagColor: 'text-blue bg-blue/10',
    title: 'Solar Water Pumps',
    description: 'Install solar-powered pumps and filtration in 30 villages currently lacking clean water access.',
    votes: 98,
    status: 'open',
  },
]

function IdeaCard({ tag, tagColor, title, description, votes, status }: IdeaCardProps) {
  return (
    <Card padding="md" className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full', tagColor)}>
          {tag}
        </span>
        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full', STATUS_COLOR[status])}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      <h3 className="text-white font-semibold text-sm leading-snug">{title}</h3>
      <p className="text-text-secondary text-xs leading-relaxed font-mono">{description}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-base">👍</span>
        <span className="text-text-secondary text-xs font-mono">{votes} votes</span>
      </div>
    </Card>
  )
}

export function IdeasPage() {
  return (
    <div className="flex flex-col h-svh bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-2">
          <h1 className="text-white font-bold text-xl">Ideas</h1>
          <p className="text-text-secondary text-sm font-mono mt-1">
            Community proposals for the next funded project.
          </p>
        </div>

        <div className="px-4 pb-4 flex flex-col gap-3 mt-2 stagger-children">
          {IDEAS.map((idea) => (
            <IdeaCard key={idea.title} {...idea} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
