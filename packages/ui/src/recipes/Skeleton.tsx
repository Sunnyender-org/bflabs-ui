import type { CSSProperties, HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export type SkeletonShape = 'line' | 'block' | 'circle'

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: SkeletonShape
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

export function Skeleton({
  shape = 'block',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cx('bf-skeleton', `bf-skeleton--${shape}`, className)}
      data-slot="skeleton"
      aria-hidden="true"
      style={{ width, height, ...style }}
      {...props}
    />
  )
}

export type ShimmerLineProps = Omit<SkeletonProps, 'shape'>

export function ShimmerLine(props: ShimmerLineProps) {
  return <Skeleton shape="line" {...props} />
}
