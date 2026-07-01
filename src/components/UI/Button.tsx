import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          variant === 'primary' && 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300',
          variant === 'secondary' && 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-700 text-slate-900 dark:text-white focus:ring-slate-300',
          variant === 'danger' && 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
          variant === 'ghost' && 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white',
          // Sizes
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : props.children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
