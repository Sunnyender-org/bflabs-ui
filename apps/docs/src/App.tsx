import { useState } from 'react'
import {
  AgentMessage,
  AgentThread,
  BFTheme,
  BrandLockup,
  BrandMark,
  Button,
  Card,
  ConfirmationCard,
  KineticHeading,
  Notice,
  ProcessSteps,
  Progress,
  PromptComposer,
  PromptSuggestions,
  Reveal,
  SectionHeading,
  StatusTag,
  Tabs,
  type BFThemeTone,
  type PromptSuggestion,
} from '@bflabs/ui'
import {
  BarChart,
  ChartFrame,
  DonutChart,
  Heatmap,
  LineChart,
  ShimmerLine,
  Skeleton,
  ThinkingDots,
  TypingIndicator,
} from '@bflabs/ui/recipes'

const swatches = [
  ['Charcoal Black', '#111417'],
  ['Warm White', '#FAF8F5'],
  ['BF Orange', '#FF6A33'],
  ['Steel Gray', '#6B7177'],
  ['Soft Tone', '#E7E2D7'],
  ['Signal Blue', '#4C7FAF'],
] as const

const suggestions = [
  {
    id: 'operations',
    label: 'Map an operating workflow',
    description: 'Turn a real process into clear stages and ownership.',
  },
  {
    id: 'decision',
    label: 'Prepare a decision brief',
    description: 'Organize context, options, and a recommended next step.',
  },
] as const

const weeklyUsage = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 58 },
  { label: 'Wed', value: 49 },
  { label: 'Thu', value: 73 },
  { label: 'Fri', value: 68 },
  { label: 'Sat', value: 81 },
] as const

const modelRuns = [
  { label: 'Sol', value: 84 },
  { label: 'Terra', value: 61 },
  { label: 'Luna', value: 37 },
  { label: 'Image', value: 29 },
] as const

const workloadMix = [
  { label: 'Build', value: 46, tone: 'accent' },
  { label: 'Research', value: 31, tone: 'charcoal' },
  { label: 'Review', value: 17, tone: 'steel' },
] as const

const activityHeatmap = [
  ['Build', 'M', 62],
  ['Build', 'T', 76],
  ['Build', 'W', 48],
  ['Build', 'T2', 91],
  ['Build', 'F', 72],
  ['Review', 'M', 28],
  ['Review', 'T', 54],
  ['Review', 'W', 67],
  ['Review', 'T2', 43],
  ['Review', 'F', 82],
  ['Research', 'M', 75],
  ['Research', 'T', 39],
  ['Research', 'W', 58],
  ['Research', 'T2', 64],
  ['Research', 'F', 47],
].map(([row, column, value]) => ({
  row: String(row),
  column: String(column),
  value: Number(value),
}))

type DemoMessage = {
  id: number
  role: 'assistant' | 'user'
  content: string
}

export default function App() {
  const [tone, setTone] = useState<BFThemeTone>('light')
  const [prompt, setPrompt] = useState('')
  const [activeStep, setActiveStep] = useState('build')
  const [confirmation, setConfirmation] = useState<'ready' | 'approved' | 'paused'>(
    'ready',
  )
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        'I can help turn a real operating goal into a clear workflow, interface, and next action.',
    },
  ])

  const sendPrompt = (value: string) => {
    setMessages((current) => [
      ...current,
      { id: current.length + 1, role: 'user', content: value },
      {
        id: current.length + 2,
        role: 'assistant',
        content:
          'Preview response: connect PromptComposer to the product runtime, then render the result with the same message and process components.',
      },
    ])
  }

  const chooseSuggestion = (item: PromptSuggestion) => {
    setPrompt(item.label)
  }

  return (
    <BFTheme tone={tone} className="docs-shell">
      <header className="docs-header">
        <a href="#top" aria-label="BF Labs UI home">
          <BrandLockup tagline={false} />
        </a>
        <nav aria-label="Documentation navigation">
          <a href="#foundations">Foundations</a>
          <a href="#components">Components</a>
          <a href="#recipes">Recipes</a>
          <a href="#ai-patterns">AI patterns</a>
        </nav>
        <div className="tone-switch" aria-label="Preview background">
          {(['light', 'dark', 'orange'] as const).map((item) => (
            <button
              type="button"
              key={item}
              aria-label={`Use ${item} preview`}
              aria-pressed={tone === item}
              data-tone-choice={item}
              onClick={() => setTone(item)}
            />
          ))}
        </div>
      </header>

      <main id="top">
        <section className="docs-hero">
          <div className="docs-hero__copy">
            <Reveal>
              <span className="docs-kicker">BF Labs / Shared product system</span>
            </Reveal>
            <KineticHeading
              as="h1"
              className="docs-hero__title"
              lines={[
                { text: 'Build every interface' },
                { text: 'from one system.', tone: 'muted' },
              ]}
            />
            <Reveal delay={160}>
              <p className="docs-hero__intro">
                A source-first React component library for BF Labs websites and
                useful AI products. Brand tokens stay consistent while product
                teams keep ownership of implementation.
              </p>
            </Reveal>
            <Reveal delay={240} className="docs-hero__actions">
              <Button trailingIcon onClick={() => location.assign('#components')}>
                Explore components
              </Button>
              <Button
                variant="secondary"
                onClick={() => location.assign('#ai-patterns')}
              >
                View AI patterns
              </Button>
            </Reveal>
          </div>
          <Reveal delay={120} className="docs-hero__visual">
            <span className="hero-mark-echo hero-mark-echo--far" aria-hidden="true">
              <BrandMark />
            </span>
            <span className="hero-mark-echo hero-mark-echo--near" aria-hidden="true">
              <BrandMark />
            </span>
            <BrandMark className="docs-hero__mark" />
            <span className="docs-hero__version">UI / VERSION 0.1</span>
          </Reveal>
        </section>

        <section className="docs-section" id="foundations">
          <Reveal>
            <SectionHeading
              index="01"
              label="Foundations"
              eyebrow="One brand language"
              title="Tokens before exceptions."
              summary="The approved palette, typography, spacing, geometry, and motion are encoded as semantic CSS variables. Products can change context without changing the BF Labs identity."
            />
          </Reveal>

          <div className="foundation-grid">
            <Reveal className="swatch-panel">
              <span className="panel-label">Color / 60 · 30 · 10</span>
              <div className="swatch-grid">
                {swatches.map(([name, value]) => (
                  <div className="swatch" key={name}>
                    <span style={{ background: value }} />
                    <strong>{name}</strong>
                    <small>{value}</small>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="type-panel">
              <span className="panel-label">Typography</span>
              <div className="type-sample type-sample--display">
                <span>Aa</span>
                <div>
                  <strong>Space Grotesk</strong>
                  <small>Display · labels · key statements</small>
                </div>
              </div>
              <div className="type-sample type-sample--body">
                <span>Aa</span>
                <div>
                  <strong>Inter</strong>
                  <small>Body · product content · long-form reading</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="docs-section" id="components">
          <Reveal>
            <SectionHeading
              index="02"
              label="Components"
              eyebrow="Source-first and reusable"
              title="A small set of strong relationships."
              summary="Components share dimensions, typography, feedback, and motion. The library avoids decorative frames when whitespace already explains the hierarchy."
            />
          </Reveal>

          <Reveal className="component-stage component-stage--light">
            <div className="component-stage__head">
              <span className="panel-label">Actions and state</span>
              <StatusTag tone="progress">In progress</StatusTag>
            </div>
            <div className="button-row">
              <Button trailingIcon>Run agent</Button>
              <Button variant="secondary">View details</Button>
              <Button variant="accent">Build forward</Button>
              <Button variant="quiet">Quiet action</Button>
            </div>
            <div className="feedback-grid">
              <Notice
                title="Workflow ready"
                description="The next operating step is available for review."
              />
              <Progress value={67} label="Workspace setup" />
            </div>
          </Reveal>

          <div className="card-grid">
            <Reveal>
              <Card
                index="01"
                title="Useful by default."
                description="Clear hierarchy, native semantics, and restrained feedback are built into the component instead of added later."
                interactive
              />
            </Reveal>
            <Reveal delay={70}>
              <Card
                tone="dark"
                index="02"
                title="Built for real work."
                description="Dense operational states remain readable without becoming visually heavy."
              />
            </Reveal>
            <Reveal delay={140}>
              <Card
                tone="accent"
                index="03"
                title="Forward is a direction."
                description="Orange marks action, current state, and intentional movement—not decoration."
              />
            </Reveal>
          </div>

          <Reveal className="component-stage">
            <Tabs
              items={[
                {
                  value: 'principle',
                  label: 'Principle',
                  content: (
                    <p className="tab-copy">
                      Whitespace carries structure first. Surfaces appear only when
                      they group a meaningful state or interaction.
                    </p>
                  ),
                },
                {
                  value: 'motion',
                  label: 'Motion',
                  content: (
                    <p className="tab-copy">
                      Entry rises gently, directional feedback moves right, and the
                      interface returns to a calm idle state.
                    </p>
                  ),
                },
                {
                  value: 'language',
                  label: 'Language',
                  content: (
                    <p className="tab-copy">
                      Useful, real, applied, and reliable. English and Chinese keep
                      the same content hierarchy.
                    </p>
                  ),
                },
              ]}
            />
          </Reveal>
        </section>

        <section className="docs-section docs-recipes" id="recipes">
          <Reveal>
            <SectionHeading
              index="03"
              label="Recipes"
              eyebrow="Curated and translated"
              title="Signals for work in motion."
              summary="Selected patterns are rebuilt around BF Labs tokens, accessible data, and real product states. Recipes prove their value in products before they become core primitives."
            />
          </Reveal>

          <Reveal className="recipe-signal-stage">
            <div className="recipe-signal-stage__copy">
              <span className="panel-label">Pending states</span>
              <h3>Loading is a real state.</h3>
              <p>
                Products can distinguish thinking, responding, and content loading
                without showing decorative motion or flashing a final empty state.
              </p>
            </div>
            <div className="recipe-signal-stage__states">
              <ThinkingDots />
              <TypingIndicator />
              <div className="recipe-skeleton" aria-label="Content loading preview">
                <Skeleton shape="circle" width="2.5rem" />
                <div>
                  <ShimmerLine width="42%" />
                  <ShimmerLine width="86%" />
                  <ShimmerLine width="68%" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="recipe-chart-grid">
            <Reveal className="recipe-chart recipe-chart--wide">
              <ChartFrame
                eyebrow="Usage / 6 days"
                title="Workspace activity"
                value="81 runs"
                change="+18.6%"
                changeTone="positive"
                description="A lightweight trend surface for usage, delivery, and operational throughput."
              >
                <LineChart
                  data={[...weeklyUsage]}
                  ariaLabel="Workspace activity rose from 42 runs on Monday to 81 runs on Saturday"
                  valueFormatter={(value) => `${value} runs`}
                />
              </ChartFrame>
            </Reveal>

            <Reveal delay={60} className="recipe-chart">
              <ChartFrame
                eyebrow="Routing"
                title="Runs by model"
                value="211"
                description="Compare a small set of named categories with clear labels and aligned values."
              >
                <BarChart
                  data={[...modelRuns]}
                  ariaLabel="Model runs: Sol 84, Terra 61, Luna 37, Image 29"
                  valueFormatter={(value) => `${value} runs`}
                />
              </ChartFrame>
            </Reveal>

            <Reveal delay={90} className="recipe-chart">
              <ChartFrame
                eyebrow="Workload"
                title="Task mix"
                description="Part-to-whole views stay limited to a few meaningful segments."
              >
                <DonutChart
                  data={[...workloadMix]}
                  ariaLabel="Task mix: Build 46, Research 31, Review 17"
                  valueFormatter={(value) => `${value}`}
                  centerLabel="tasks"
                />
              </ChartFrame>
            </Reveal>

            <Reveal delay={120} className="recipe-chart recipe-chart--wide">
              <ChartFrame
                eyebrow="Coverage"
                title="Weekly workflow density"
                value="91%"
                change="Peak"
                description="A compact matrix for coverage, activity, or service health across two dimensions."
              >
                <Heatmap
                  data={activityHeatmap}
                  ariaLabel="Weekly workflow density by activity and weekday"
                  valueFormatter={(value) => `${value}%`}
                />
              </ChartFrame>
            </Reveal>
          </div>
        </section>

        <section className="docs-section docs-section--dark" id="ai-patterns">
          <Reveal>
            <SectionHeading
              index="04"
              label="AI patterns"
              eyebrow="Expression · process · confirmation · feedback"
              title="AI components for work, not only chat."
              summary="BF Labs products combine conversation with structured workflow components. Users can understand what is happening, review important details, and continue with confidence."
            />
          </Reveal>

          <Reveal className="agent-demo">
            <div className="agent-demo__conversation">
              <div className="agent-demo__head">
                <div>
                  <span className="panel-label">Assistant workspace</span>
                  <h3>Operations agent</h3>
                </div>
                <StatusTag tone="accent">Ready</StatusTag>
              </div>
              <AgentThread>
                {messages.map((message) => (
                  <AgentMessage
                    key={message.id}
                    role={message.role}
                    meta={message.role === 'assistant' ? 'Now' : undefined}
                  >
                    <p>{message.content}</p>
                  </AgentMessage>
                ))}
              </AgentThread>
              <PromptSuggestions items={suggestions} onSelect={chooseSuggestion} />
              <PromptComposer
                value={prompt}
                onValueChange={setPrompt}
                onSubmit={sendPrompt}
              />
            </div>

            <aside className="agent-demo__process">
              <span className="panel-label">Connected workflow</span>
              <ProcessSteps
                value={activeStep}
                onValueChange={setActiveStep}
                items={[
                  {
                    id: 'understand',
                    label: 'Understand',
                    description: 'Clarify the real operating constraint.',
                    state: 'complete',
                  },
                  {
                    id: 'build',
                    label: 'Build',
                    description: 'Create the workflow and working interface.',
                  },
                  {
                    id: 'improve',
                    label: 'Improve',
                    description: 'Learn from daily use and measurable outcomes.',
                  },
                ]}
              />
            </aside>
          </Reveal>

          <Reveal className="confirmation-demo">
            <ConfirmationCard
              eyebrow="Confirmation / Real workflow"
              title="Publish the updated operating workflow?"
              description="The component makes the scope and next action explicit before an important product change continues."
              details={[
                { label: 'Teams', value: '3 groups' },
                { label: 'Modules', value: '6 connected' },
                { label: 'Release', value: 'Version 01' },
              ]}
              confirmLabel="Publish update"
              cancelLabel="Keep reviewing"
              onConfirm={() => setConfirmation('approved')}
              onCancel={() => setConfirmation('paused')}
            />
            {confirmation !== 'ready' ? (
              <Notice
                className="confirmation-result"
                title={confirmation === 'approved' ? 'Update approved' : 'Review continues'}
                description="This is a local component preview; no external data was changed."
              />
            ) : null}
          </Reveal>
        </section>

        <section className="docs-closing">
          <Reveal>
            <BrandLockup orientation="vertical" />
            <h2>One system. Many useful products.</h2>
            <p>
              Package components for shared improvements. Copy source when a
              product needs deeper ownership.
            </p>
          </Reveal>
        </section>
      </main>
    </BFTheme>
  )
}
