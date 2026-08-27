import type { CSSProperties, HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export type ChartDatum = {
  label: string
  value: number
}

type BaseChartProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: ChartDatum[]
  ariaLabel: string
  valueFormatter?: (value: number) => string
  emptyLabel?: string
}

const defaultValueFormatter = (value: number) => String(value)

function AccessibleDataTable({
  caption,
  data,
  valueFormatter,
}: {
  caption: string
  data: ChartDatum[]
  valueFormatter: (value: number) => string
}) {
  return (
    <table className="bf-visually-hidden">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Label</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((datum) => (
          <tr key={datum.label}>
            <th scope="row">{datum.label}</th>
            <td>{valueFormatter(datum.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function EmptyChart({ label }: { label: string }) {
  return <div className="bf-chart-empty">{label}</div>
}

function getScale(data: ChartDatum[]) {
  const values = data.map(({ value }) => value)
  const min = Math.min(0, ...values)
  const max = Math.max(0, ...values)
  return { min, max, span: max - min || 1 }
}

function getY(value: number, min: number, span: number) {
  return 4 + ((min + span - value) / span) * 40
}

function ChartLabels({ data }: { data: ChartDatum[] }) {
  return (
    <ol
      className="bf-chart-labels"
      style={{ '--bf-chart-label-count': data.length } as CSSProperties}
      aria-hidden="true"
    >
      {data.map(({ label }) => (
        <li key={label}>{label}</li>
      ))}
    </ol>
  )
}

export type LineChartProps = BaseChartProps

export function LineChart({
  data,
  ariaLabel,
  valueFormatter = defaultValueFormatter,
  emptyLabel = 'No data available',
  className,
  ...props
}: LineChartProps) {
  if (data.length === 0) {
    return <EmptyChart label={emptyLabel} />
  }

  const { min, span } = getScale(data)
  const points = data
    .map(({ value }, index) => {
      const x = data.length === 1 ? 50 : 4 + (index / (data.length - 1)) * 92
      return `${x},${getY(value, min, span)}`
    })
    .join(' ')

  return (
    <div
      className={cx('bf-chart bf-line-chart', className)}
      data-slot="line-chart"
      {...props}
    >
      <svg viewBox="0 0 100 48" role="img" aria-label={ariaLabel}>
        {[4, 14, 24, 34, 44].map((y) => (
          <line className="bf-chart__grid" x1="4" x2="96" y1={y} y2={y} key={y} />
        ))}
        <polyline className="bf-line-chart__line" points={points} />
        {data.map(({ label, value }, index) => {
          const x = data.length === 1 ? 50 : 4 + (index / (data.length - 1)) * 92
          return (
            <circle
              className="bf-line-chart__point"
              cx={x}
              cy={getY(value, min, span)}
              r="1.25"
              key={label}
            />
          )
        })}
      </svg>
      <ChartLabels data={data} />
      <AccessibleDataTable
        caption={ariaLabel}
        data={data}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}

export type BarChartProps = BaseChartProps

export function BarChart({
  data,
  ariaLabel,
  valueFormatter = defaultValueFormatter,
  emptyLabel = 'No data available',
  className,
  ...props
}: BarChartProps) {
  if (data.length === 0) {
    return <EmptyChart label={emptyLabel} />
  }

  const { min, span } = getScale(data)
  const baseline = getY(0, min, span)
  const slot = 88 / data.length
  const width = Math.min(slot * 0.56, 12)

  return (
    <div
      className={cx('bf-chart bf-bar-chart', className)}
      data-slot="bar-chart"
      {...props}
    >
      <svg viewBox="0 0 100 48" role="img" aria-label={ariaLabel}>
        {[4, 14, 24, 34, 44].map((y) => (
          <line className="bf-chart__grid" x1="4" x2="96" y1={y} y2={y} key={y} />
        ))}
        <line className="bf-bar-chart__baseline" x1="4" x2="96" y1={baseline} y2={baseline} />
        {data.map(({ label, value }, index) => {
          const valueY = getY(value, min, span)
          const x = 6 + index * slot + (slot - width) / 2
          return (
            <rect
              className="bf-bar-chart__bar"
              x={x}
              y={Math.min(valueY, baseline)}
              width={width}
              height={Math.max(Math.abs(baseline - valueY), value === 0 ? 0 : 0.7)}
              key={label}
            />
          )
        })}
      </svg>
      <ChartLabels data={data} />
      <AccessibleDataTable
        caption={ariaLabel}
        data={data}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}

export type DonutChartTone = 'accent' | 'charcoal' | 'steel' | 'blue'

export type DonutChartDatum = ChartDatum & {
  tone?: DonutChartTone
}

export type DonutChartProps = Omit<BaseChartProps, 'data'> & {
  data: DonutChartDatum[]
  centerLabel?: string
}

const donutTones: DonutChartTone[] = ['accent', 'charcoal', 'steel', 'blue']

export function DonutChart({
  data,
  ariaLabel,
  centerLabel = 'Total',
  valueFormatter = defaultValueFormatter,
  emptyLabel = 'No data available',
  className,
  ...props
}: DonutChartProps) {
  const positiveData = data.filter(({ value }) => value > 0)
  const total = positiveData.reduce((sum, { value }) => sum + value, 0)

  if (positiveData.length === 0 || total === 0) {
    return <EmptyChart label={emptyLabel} />
  }

  const radius = 17
  const circumference = 2 * Math.PI * radius
  let consumed = 0

  return (
    <div
      className={cx('bf-chart bf-donut-chart', className)}
      data-slot="donut-chart"
      {...props}
    >
      <div className="bf-donut-chart__visual">
        <svg viewBox="0 0 48 48" role="img" aria-label={ariaLabel}>
          <circle className="bf-donut-chart__track" cx="24" cy="24" r={radius} />
          {positiveData.map((datum, index) => {
            const length = (datum.value / total) * circumference
            const offset = -consumed
            consumed += length
            return (
              <circle
                className={cx(
                  'bf-donut-chart__segment',
                  `bf-donut-chart__segment--${datum.tone ?? donutTones[index % donutTones.length]}`,
                )}
                cx="24"
                cy="24"
                r={radius}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={offset}
                key={datum.label}
              />
            )
          })}
        </svg>
        <div className="bf-donut-chart__total" aria-hidden="true">
          <strong>{valueFormatter(total)}</strong>
          <span>{centerLabel}</span>
        </div>
      </div>
      <ul className="bf-donut-chart__legend" aria-hidden="true">
        {positiveData.map((datum, index) => (
          <li key={datum.label}>
            <span
              data-tone={datum.tone ?? donutTones[index % donutTones.length]}
            />
            <span>{datum.label}</span>
            <strong>{valueFormatter(datum.value)}</strong>
          </li>
        ))}
      </ul>
      <AccessibleDataTable
        caption={ariaLabel}
        data={positiveData}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}

export type HeatmapDatum = {
  row: string
  column: string
  value: number
}

export type HeatmapProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: HeatmapDatum[]
  ariaLabel: string
  valueFormatter?: (value: number) => string
  emptyLabel?: string
}

type HeatmapStyle = CSSProperties & {
  '--bf-heat-columns': number
}

export function Heatmap({
  data,
  ariaLabel,
  valueFormatter = defaultValueFormatter,
  emptyLabel = 'No data available',
  className,
  ...props
}: HeatmapProps) {
  if (data.length === 0) {
    return <EmptyChart label={emptyLabel} />
  }

  const rows = Array.from(new Set(data.map(({ row }) => row)))
  const columns = Array.from(new Set(data.map(({ column }) => column)))
  const max = Math.max(...data.map(({ value }) => value), 1)
  const cells = new Map(data.map((datum) => [`${datum.row}:${datum.column}`, datum]))

  return (
    <div
      className={cx('bf-chart bf-heatmap', className)}
      data-slot="heatmap"
      {...props}
    >
      <div
        className="bf-heatmap__grid"
        style={{ '--bf-heat-columns': columns.length } as HeatmapStyle}
        role="img"
        aria-label={ariaLabel}
      >
        <span aria-hidden="true" />
        {columns.map((column) => (
          <span className="bf-heatmap__column" key={column} aria-hidden="true">
            {column}
          </span>
        ))}
        {rows.map((row) => (
          <div className="bf-heatmap__row" key={row}>
            <span className="bf-heatmap__row-label" aria-hidden="true">
              {row}
            </span>
            {columns.map((column) => {
              const datum = cells.get(`${row}:${column}`)
              const value = datum?.value ?? 0
              return (
                <span
                  className="bf-heatmap__cell"
                  title={`${row}, ${column}: ${valueFormatter(value)}`}
                  key={column}
                  aria-hidden="true"
                >
                  <span style={{ opacity: 0.12 + (value / max) * 0.88 }} />
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <AccessibleDataTable
        caption={ariaLabel}
        data={data.map(({ row, column, value }) => ({
          label: `${row}, ${column}`,
          value,
        }))}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}
