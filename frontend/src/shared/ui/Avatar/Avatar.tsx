import Image from 'next/image'
import { cn } from '@/shared/lib/cn'

const GRADIENT_COLORS = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-orange-500',
  'from-indigo-500 to-purple-500',
]

function getGradient(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  return GRADIENT_COLORS[Math.abs(hash) % GRADIENT_COLORS.length]
}

interface AvatarProps {
  src?: string
  username: string
  size?: number
  className?: string
}

export function Avatar({ src, username, size = 40, className }: AvatarProps) {
  const initials = username.slice(0, 2).toUpperCase()
  const gradient = getGradient(username)

  if (src) {
    return (
      <div
        className={cn('rounded-full overflow-hidden flex-shrink-0', className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={username}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br text-white font-bold',
        gradient,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}
