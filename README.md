# AILock Design Web

Standalone review board for the AILock design system, components, and app screens.

## Run

```bash
npm install
npm run dev
```

The default dev server binds to `0.0.0.0` so the page can be opened from another device on the same network.

For local-only development:

```bash
npm run dev:local
```

## Build

```bash
npm run build
```

## Structure

- `src/design/`: design tokens and demo data.
- `src/components/`: reusable AILock primitives, rows, graphs, navigation, chat, and composed patterns.
- `src/pages/`: design lab pages that document foundations, components, and screen flows.
- `src/site/`: web-only controls for this review site, such as the color panel and phone-flow prototype shell.
