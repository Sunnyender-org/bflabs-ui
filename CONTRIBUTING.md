# Contributing

## Before changing a component

1. Confirm the component role and the user need it serves.
2. Reuse an existing token before adding a new value.
3. Compare the change with peer components in light, dark, and orange contexts.
4. Check keyboard focus, narrow layouts, and reduced-motion behavior.
5. Update the documentation preview when the public API changes.

## Commands

```bash
pnpm install
pnpm dev
pnpm check
```

## Component requirements

- Prefix public classes with `bf-`.
- Keep component APIs small and semantic.
- Support `className` and native element attributes where appropriate.
- Do not use color as the only state signal.
- Keep idle animation calm and optional.
- Add a focused test for new behavior.

