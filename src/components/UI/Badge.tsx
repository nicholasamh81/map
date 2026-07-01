import React from 'react'
import clsx from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full font-medium',
          // Variants
          variant === 'default' && 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white',
          variant === 'primary' && 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
          variant === 'success' && 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100',
          variant === 'warning' && 'bg-yellow-200 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100',
          variant === 'danger' && 'bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100',
          // Sizes
          size === 'sm' && 'px-2 py-1 text-xs',
          size === 'md' && 'px-3 py-1 text-sm',
          size === 'lg' && 'px-4 py-2 text-base',
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
