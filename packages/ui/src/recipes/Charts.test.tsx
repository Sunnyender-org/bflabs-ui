import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BarChart, DonutChart, Heatmap, LineChart } from './Charts'

const data = [
  { label: 'Build', value: 17 },
  { label: 'Review', value: 9 },
]

describe('chart recipes', () => {
  it('pairs a visual chart with an accessible data table', () => {
    const html = renderToStaticMarkup(
      <LineChart data={data} ariaLabel="Runs by task" />,
    )

    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="Runs by task"')
    expect(html).toContain('<caption>Runs by task</caption>')
    expect(html).toContain('<th scope="row">Build</th>')
  })

  it('renders every pilot chart without a runtime chart dependency', () => {
    const bar = renderToStaticMarkup(
      <BarChart data={data} ariaLabel="Bar data" />,
    )
    const donut = renderToStaticMarkup(
      <DonutChart data={data} ariaLabel="Donut data" />,
    )
    const heatmap = renderToStaticMarkup(
      <Heatmap
        data={[{ row: 'Build', column: 'Mon', value: 17 }]}
        ariaLabel="Heatmap data"
      />,
    )

    expect(bar).toContain('data-slot="bar-chart"')
    expect(donut).toContain('data-slot="donut-chart"')
    expect(heatmap).toContain('data-slot="heatmap"')
  })

  it('shows an honest empty state', () => {
    const html = renderToStaticMarkup(
      <LineChart data={[]} ariaLabel="No runs" emptyLabel="No completed runs" />,
    )

    expect(html).toContain('No completed runs')
    expect(html).not.toContain('role="img"')
  })
})
