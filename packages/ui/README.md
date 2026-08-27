# @bflabs/ui

Shared BF Labs design tokens and React components.

```bash
pnpm add @bflabs/ui
```

```tsx
import { BFProvider, Button } from '@bflabs/ui'
import '@bflabs/ui/styles.css'

export function Example() {
  return (
    <BFProvider>
      <Button trailingIcon>Continue</Button>
    </BFProvider>
  )
}
```

The package contains core controls, BF Labs brand components, motion patterns,
and AI workflow components. See the repository documentation for design rules
and source-distribution guidance.

Pilot recipes are available from a separate entry point:

```tsx
import { ChartFrame, LineChart, ThinkingDots } from '@bflabs/ui/recipes'
```

Recipes are usable product components that remain outside the core API while
their long-term abstraction is validated through real product adoption.
