'use client'

import { BottomNav } from '@/widgets/bottom-nav'
import { Card } from '@/shared/ui/Card'

interface MessageProps {
  username: string
  text: string
  time: string
  isHighlighted?: boolean
}

const MESSAGES: MessageProps[] = [
  {
    username: 'crypto_dev',
    text: 'Just donated 5 TON to the coastal cleanup project 🌊 Let\'s hit the goal!',
    time: '12:04',
    isHighlighted: true,
  },
  {
    username: 'OpenFoundation',
    text: '📢 We\'ve reached 80% of our First Round goal! Thank you to all 10 members who contributed. Every drop point counts.',
    time: '11:47',
  },
  {
    username: 'blockchain_fan',
    text: 'How do I check my points balance?',
    time: '11:39',
  },
  {
    username: 'pierre_d',
    text: 'Go to the main page — it shows right next to your avatar 👆',
    time: '11:41',
  },
  {
    username: 'w3_activist',
    text: 'The referral system is great. Got 3 friends in already.',
    time: '10:58',
  },
  {
    username: 'ton_whale',
    text: 'When is Round 2 starting? I want to contribute more.',
    time: '10:22',
  },
  {
    username: 'OpenFoundation',
    text: '🗓 Round 2 opens once Round 1 hits 1,000 TON. Stay tuned!',
    time: '10:30',
  },
]

function Message({ username, text, time, isHighlighted }: MessageProps) {
  const isBot = username === 'OpenFoundation'
  return (
    <div className={`flex gap-2.5 ${isHighlighted ? 'opacity-100' : 'opacity-90'}`}>
      <div className="w-8 h-8 rounded-full bg-input flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-text-secondary uppercase">
        {username[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-xs font-semibold ${isBot ? 'text-blue' : 'text-white'}`}>
            {username}
          </span>
          <span className="text-text-secondary text-[10px]">{time}</span>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mt-0.5 font-mono">{text}</p>
      </div>
    </div>
  )
}

export function ChatPage() {
  return (
    <div className="flex flex-col h-svh bg-bg overflow-hidden">
      <div className="flex-shrink-0 px-4 pt-5 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center">
            <span className="text-lg">💬</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-base">Open Foundation</h1>
            <span className="text-text-secondary text-xs font-mono">10 members</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 stagger-children">
        {MESSAGES.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
      </div>

      <Card padding="sm" className="m-3 flex-shrink-0 flex items-center gap-3 rounded-2xl border-white/10">
        <span className="text-text-secondary text-sm flex-1 font-mono">
          Chat is available in Telegram ↗
        </span>
        <span className="text-blue text-xs font-semibold">Open</span>
      </Card>

      <BottomNav />
    </div>
  )
}
