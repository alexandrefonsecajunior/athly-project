import type { LucideIcon } from 'lucide-react'
import { Activity, Bike, Waves, Dumbbell, Flame, Leaf, Footprints, Trophy } from 'lucide-react'
import type { SportType } from '@/types'

const sportConfig: Record<SportType, { label: string; color: string; icon: LucideIcon; gradient?: string }> = {
  running: {
    label: 'Corrida',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    icon: Activity,
  },
  cycling: {
    label: 'Bike',
    color: 'bg-[var(--color-primary-500)]/20 text-[var(--color-primary-300)] border-[var(--color-primary-500)]/50',
    icon: Bike,
  },
  swimming: {
    label: 'Natação',
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    icon: Waves,
  },
  triathlon: {
    label: 'Triathlon',
    color: 'bg-violet-500/20 text-violet-300 border-violet-500/50',
    icon: Waves,
  },
  duathlon: {
    label: 'Duathlon',
    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
    icon: Activity,
  },
  strength: {
    label: 'Força',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    icon: Dumbbell,
  },
  crossfit: {
    label: 'CrossFit',
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    icon: Flame,
  },
  yoga: {
    label: 'Yoga',
    color: 'bg-[var(--color-secondary-500)]/20 text-[var(--color-secondary-300)] border-[var(--color-secondary-500)]/50',
    icon: Leaf,
  },
  walking: {
    label: 'Caminhada',
    color: 'bg-green-500/20 text-green-300 border-green-500/50',
    icon: Footprints,
  },
  other: {
    label: 'Outro',
    color: 'bg-[var(--color-surface-dark)] text-[var(--color-text-secondary)] border-[var(--color-border-dark)]',
    icon: Trophy,
  },
}

interface SportBadgeProps {
  type: SportType
  showEmoji?: boolean
  glow?: boolean
}

export function SportBadge({ type, showEmoji = true, glow = false }: SportBadgeProps) {
  const config = sportConfig[type] ?? sportConfig.other
  const glowClass = glow ? 'shadow-lg' : ''
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${config.color} ${glowClass}`}
    >
      {showEmoji && <Icon className="h-3.5 w-3.5" />}
      {config.label}
    </span>
  )
}
