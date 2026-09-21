import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'ghost', size = 'md', className, children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium font-body transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]'

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
  }

  const variants = {
    brand:
      'bg-[color:var(--color-brand)] text-white hover:brightness-110 shadow-[0_0_20px_-4px_rgba(215,25,32,0.65)]',
    ghost:
      'bg-white/5 text-[color:var(--color-ink)] border border-[color:var(--color-panel-border)] hover:bg-white/10 hover:border-[color:var(--color-brand)]/60',
    danger: 'bg-[color:var(--color-fault)]/15 text-[color:var(--color-fault)] border border-[color:var(--color-fault)]/40 hover:bg-[color:var(--color-fault)]/25',
    success:
      'bg-[color:var(--color-success)]/15 text-[color:var(--color-success)] border border-[color:var(--color-success)]/40 hover:bg-[color:var(--color-success)]/25',
  }

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
