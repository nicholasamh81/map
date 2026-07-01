import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow',
          padding === 'sm' && 'p-2',
          padding === 'md' && 'p-4',
          padding === 'lg' && 'p-6',
          padding === 'none' && '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
