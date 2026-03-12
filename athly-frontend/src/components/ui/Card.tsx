import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'glow' | 'flat'
}

export function Card({ 
  children, 
  padding = 'md', 
  variant = 'default',
  className = '', 
  ...props 
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variants = {
    default: 'glass shadow-lg',
    gradient: 'glass-primary shadow-xl',
    glow: 'glass-glow',
    flat: 'glass-flat border-none',
  }

  return (
    <div
      className={`rounded-3xl transition-all duration-300 hover:scale-[1.01] ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
