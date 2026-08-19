# BF Labs UI Repository Rules

## Product contract

BF Labs UI is the shared design system and React component library for BF Labs products. It owns reusable tokens, components, motion rules, the exact BF brand mark, documentation, and the source-distribution registry.

## Design invariants

- Brand truth outranks reference-project defaults.
- Warm white and charcoal carry the interface; BF Orange marks action and progress.
- Establish hierarchy with whitespace before boxes or dividers.
- Motion must communicate entry, feedback, direction, or continuity, then settle.
- Components must support keyboard use and reduced-motion preferences.
- English and Chinese content retain the same component relationships.
- Preserve the exact geometry of the published BF mark; do not redraw or approximate it.

## Architecture and public API

- `packages/ui/`: tokens, styles, React components, tests, and brand assets.
- `apps/docs/`: interactive documentation and previews.
- `registry/`: source-distribution manifest.
- `docs/design-principles.md` and `docs/architecture.md`: design and distribution decisions.
- Use semantic props, stable `bf-` classes, ARIA, stable `data-*` state, and CSS variables as the final styling layer.
- Package installation and source copying are both supported; do not blur their ownership models.

## Verification

```bash
pnpm check
```

Package publishing and public documentation deployment are separate release actions and require explicit authorization.

