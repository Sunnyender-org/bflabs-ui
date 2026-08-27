import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ThinkingDots, TypingIndicator } from './PendingIndicator'
import { ShimmerLine, Skeleton } from './Skeleton'

describe('pending recipes', () => {
  it('announces a useful pending label', () => {
    const html = renderToStaticMarkup(<ThinkingDots label="Checking sources" />)

    expect(html).toContain('role="status"')
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('Checking sources')
    expect(html).toContain('data-variant="thinking"')
  })

  it('keeps visual loading placeholders out of the accessibility tree', () => {
    const html = renderToStaticMarkup(
      <div>
        <TypingIndicator />
        <Skeleton />
        <ShimmerLine />
      </div>,
    )

    expect(html).toContain('data-variant="typing"')
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(3)
  })
})
