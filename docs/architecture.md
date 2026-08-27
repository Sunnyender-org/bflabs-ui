# Architecture

## Distribution model

BF Labs UI combines two delivery models:

1. `@bflabs/ui` provides versioned tokens, styles, and React components for
   products that want shared improvements.
2. `registry/index.json` describes source files that teams may copy into a
   product when deeper ownership is required.

Recipes use a separate `@bflabs/ui/recipes` entry point. They are production-
usable, but remain outside the core API until product adoption proves that the
abstraction should be shared long term. `registry/incubator/index.json` records
evaluated source projects and rejected directions without copying their code.

Version 0.1 keeps tokens, motion, and components in one package so the system is
easy to adopt. They can become separate packages when multiple products prove
that independent release cycles are useful.

## Layers

```text
Foundation tokens
  → semantic tokens
    → core UI components
      → brand components
        → AI workflow components
          → recipes
            → product templates
```

## Component groups

- Foundations: colors, typography, spacing, geometry, motion, focus.
- Core UI: Button, StatusTag, Card, Notice, Progress, Tabs.
- Brand: BrandMark, BrandLockup, SectionHeading, KineticHeading, Reveal.
- AI workflow: AgentMessage, PromptComposer, PromptSuggestions, ProcessSteps,
  ConfirmationCard.
- Recipes: pending indicators, loading placeholders, chart frames, and
  dependency-free data visualizations.

## Reference roles

- shadcn/ui: source ownership, registry-shaped distribution, semantic variables.
- assistant-ui: separate reusable behavior from product-specific presentation.
- AI Elements: focused AI components with direct examples and interaction tests.
- Ant Design X: organize AI interfaces around expression, process,
  confirmation, and feedback rather than conversation alone.

The implementation does not inherit the reference projects' default colors,
corner styles, gradients, or framework assumptions.

## Public API rules

- Components use semantic props instead of exposing many visual details.
- Native element attributes remain available where appropriate.
- Public classes use the `bf-` prefix.
- State is reflected through ARIA plus stable `data-*` attributes.
- Controlled and uncontrolled APIs are used for stateful components.
- CSS variables remain the final styling layer.

## Planned next layers

- Registry generation and a short install command.
- Input, Textarea, Select, Dialog, Tooltip, and navigation primitives.
- RunStatus, Sources, file presentation, and response actions.
- Standalone assistant, side-panel assistant, and inline action templates.
- Browser interaction checks and selected visual comparisons in continuous
  integration.
