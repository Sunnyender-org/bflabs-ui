# BF Labs UI design principles

## Brand source of truth

The component system derives from the approved BF Labs logo system, color and
typography board, brand definition, and the current BF Labs website. Reference
projects influence architecture and interaction patterns, but do not replace
the BF Labs visual language.

## Locked

- BF Mark uses the approved `1200 × 700` geometry and keeps its original ratio.
- Charcoal Black `#111417` and Warm White `#FAF8F5` are the foundation.
- BF Orange `#FF6A33` indicates action, focus, current state, and direction.
- The palette follows a practical `60 / 30 / 10` relationship.
- Space Grotesk carries display type and labels; Inter carries body text.
- Chinese interfaces use Noto Sans SC, Source Han Sans CN, or a compatible
  modern sans-serif fallback.
- Geometry is modular and mostly square, with low corner radii.
- Whitespace separates ideas before dividers or additional surfaces.
- Motion should communicate entry, feedback, direction, or continuity, then
  return to a calm state.
- Interfaces respect the user's reduced-motion preference.

## Product language

The system should feel:

- Useful
- Real
- Applied
- Reliable
- Forward-moving

## Open

- The final public package scope and package namespace.
- Whether tokens and motion become separate packages after the first product
  integrations.
- The public documentation domain.
- The first set of framework examples beyond Vite + React.

## Intentionally excluded from version 0.1

- Large numbers of decorative dividers.
- Oversized background letters without a functional role.
- Excessive pills, soft bubbles, gradients, or entertainment-led decoration.
- Continuous motion that competes with reading.
- A full conversation runtime or product data layer.
- Framework-specific assumptions that make the core package difficult to reuse.

## Logo usage

- Minimum digital mark size: `24px`.
- Keep clear space around the mark equal to the internal reference unit shown in
  the approved logo board.
- Do not redraw, stretch, rotate, or reconstruct the mark.
- The open-source component code is licensed separately from the BF Labs name
  and brand mark.

