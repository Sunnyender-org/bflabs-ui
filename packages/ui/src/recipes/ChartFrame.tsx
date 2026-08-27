import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'

export type ChartFrameProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: ReactNode
  title: ReactNode
  value?: ReactNode
  change?: ReactNode
  changeTone?: 'neutral' | 'positive' | 'negative'
  description?: ReactNode
}

export function ChartFrame({
  eyebrow,
  title,
  value,
  change,
  changeTone = 'neutral',
  description,
  className,
  children,
  ...props
}: ChartFrameProps) {
  return (
    <figure
      className={cx('bf-chart-frame', className)}
      data-slot="chart-frame"
      {...props}
    >
      <figcaption className="bf-chart-frame__caption">
        <div className="bf-chart-frame__heading">
          {eyebrow ? (
            <span className="bf-chart-frame__eyebrow">{eyebrow}</span>
          ) : null}
          <h3 className="bf-chart-frame__title">{title}</h3>
        </div>
        {value !== undefined ? (
          <div className="bf-chart-frame__metric">
            <strong>{value}</strong>
            {change !== undefined ? (
              <span data-tone={changeTone}>{change}</span>
            ) : null}
          </div>
        ) : null}
      </figcaption>
      {description ? (
        <p className="bf-chart-frame__description">{description}</p>
      ) : null}
      <div className="bf-chart-frame__body">{children}</div>
    </figure>
  )
}
