import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'

export type PendingIndicatorVariant = 'thinking' | 'typing'

export type PendingIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  variant?: PendingIndicatorVariant
  label?: ReactNode
}

const defaultLabels: Record<PendingIndicatorVariant, string> = {
  thinking: 'Thinking',
  typing: 'Responding',
}

export function PendingIndicator({
  variant = 'thinking',
  label,
  className,
  role = 'status',
  ...props
}: PendingIndicatorProps) {
  return (
    <div
      className={cx(
        'bf-pending-indicator',
        `bf-pending-indicator--${variant}`,
        className,
      )}
      data-slot="pending-indicator"
      data-variant={variant}
      role={role}
      aria-live="polite"
      {...props}
    >
      <span className="bf-pending-indicator__signal" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span key={index} />
        ))}
      </span>
      <span className="bf-pending-indicator__label">
        {label ?? defaultLabels[variant]}
      </span>
    </div>
  )
}

export type ThinkingDotsProps = Omit<PendingIndicatorProps, 'variant'>

export function ThinkingDots(props: ThinkingDotsProps) {
  return <PendingIndicator variant="thinking" {...props} />
}

export type TypingIndicatorProps = Omit<PendingIndicatorProps, 'variant'>

export function TypingIndicator(props: TypingIndicatorProps) {
  return <PendingIndicator variant="typing" {...props} />
}
