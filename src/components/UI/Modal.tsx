import React from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, footer }, ref) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'auto'
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
        {/* Modal */}
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-50"
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
          {/* Content */}
          <div className="p-6">{children}</div>
          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </>
    )
  }
)

Modal.displayName = 'Modal'

export default Modal
