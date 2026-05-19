'use client'

import { useUnit } from 'effector-react'
import { BottomNav } from '@/widgets/bottom-nav'
import { Card } from '@/shared/ui/Card'
import { $userState } from '@/entities/user'

const STEPS = [
  { icon: '🔗', title: 'Share your link', desc: 'Send your personal invite link to friends via Telegram.' },
  { icon: '👥', title: 'Friends join', desc: 'They open the app and register through your link.' },
  { icon: '💎', title: 'Earn drop points', desc: 'You get bonus drop points for every active referral.' },
]

export function ReferralPage() {
  const { user } = useUnit($userState)

  const referralCode = user?.id ? `OF-${user.id}` : 'OF-0000000'
  const referralLink = `https://t.me/openfundbot?start=${referralCode}`

  return (
    <div className="flex flex-col h-svh bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-2">
          <h1 className="text-white font-bold text-xl">Invite Friends</h1>
          <p className="text-text-secondary text-sm font-mono mt-1">
            Share the mission. Earn drop points together.
          </p>
        </div>

        <div className="px-4 mt-4 flex flex-col gap-3 stagger-children">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card padding="md" className="flex flex-col items-center py-4">
              <span className="text-white font-bold text-2xl">0</span>
              <span className="text-text-secondary text-xs font-mono mt-1">Friends invited</span>
            </Card>
            <Card padding="md" className="flex flex-col items-center py-4">
              <span className="text-white font-bold text-2xl">0</span>
              <span className="text-text-secondary text-xs font-mono mt-1">Points earned</span>
            </Card>
          </div>

          {/* Referral link */}
          <Card padding="md" className="flex flex-col gap-2">
            <span className="text-text-secondary text-xs font-mono">Your invite link</span>
            <div className="bg-input rounded-xl px-3 py-2.5">
              <span className="text-white text-xs font-mono break-all">{referralLink}</span>
            </div>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 h-10 rounded-xl bg-blue text-white text-sm font-semibold active:scale-95 transition-all">
                Share
              </button>
              <button className="h-10 px-4 rounded-xl bg-input text-text-secondary text-sm active:scale-95 transition-all">
                Copy
              </button>
            </div>
          </Card>

          {/* How it works */}
          <Card padding="md" className="flex flex-col gap-4">
            <span className="text-white font-semibold text-sm">How it works</span>
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-input flex items-center justify-center flex-shrink-0 text-lg">
                  {step.icon}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-white text-sm font-medium">{step.title}</span>
                  <span className="text-text-secondary text-xs font-mono leading-relaxed">{step.desc}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
