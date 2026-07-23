# BF Labs UI

BF Labs UI is the shared design system and React component library for BF Labs
websites and AI products. It turns the approved BF Labs brand system into
reusable tokens, product components, motion rules, and implementation guidance.

The repository supports two ways of working:

- Install `@bflabs/ui` when products should receive shared improvements.
- Copy a component from `packages/ui/src/components` when a product needs full
  source ownership.

## Principles

- Brand truth comes before reference-project conventions.
- Warm white and charcoal carry the interface; BF Orange marks action and
  progress.
- Whitespace establishes hierarchy before boxes or dividers.
- Motion communicates entry, feedback, direction, or continuity, then settles.
- Every component supports keyboard use and reduced-motion preferences.
- English and Chinese content share the same component relationships.

## Repository

```text
bflabs-ui/
├── apps/docs/       Interactive documentation and component previews
├── packages/ui/     Tokens, styles, React components, and tests
├── registry/        Source-distribution manifest
└── docs/            Design principles and architecture decisions
```

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5174](http://localhost:5174).

## Verify

```bash
pnpm check
```

## Package usage

```tsx
import { BFTheme, Button, PromptComposer } from '@bflabs/ui'
import '@bflabs/ui/styles.css'

export function ProductSurface() {
  return (
    <BFTheme>
      <Button>Run agent</Button>
      <PromptComposer onSubmit={(value) => console.log(value)} />
    </BFTheme>
  )
}
```

## Status

Version `0.1.0` establishes the foundations, core controls, branded content
patterns, and first AI product components. Package publishing and the public
documentation domain are intentionally separate release steps.

## License

MIT. The BF Labs name and brand mark remain BF Labs brand assets; their use
should follow the guidance in `docs/design-principles.md`.

