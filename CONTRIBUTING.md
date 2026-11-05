# Contributing to GeoStreak

Thank you for your interest in contributing to **GeoStreak**! We welcome contributions of all kinds: bug fixes, new mascots, creative themes, card layouts, performance improvements, and documentation.

## How Can I Contribute?

### 1. Adding a New Theme
All themes live in [`src/lib/themes/index.ts`](src/lib/themes/index.ts).
To add a theme:
1. Define a new entry in `THEMES` with background, surface, text, accents, and 5 heatmap levels.
2. Verify contrast and visual clarity across all 7 card layouts.
3. Run tests: `npm test`.

### 2. Adding or Enhancing Mascots
Mascots are defined in [`src/lib/mascots/mascots.ts`](src/lib/mascots/mascots.ts).
1. Add SVG vector artwork centered in a `viewBox="-50 -50 100 100"`.
2. Implement facial expressions for `idle`, `happy`, `excited`, `sleeping`, `surprised`, `celebrating`, and `determined`.
3. Keep animations lightweight and ensure `prefers-reduced-motion` is respected.

### 3. Submitting Pull Requests
1. Fork the repo and create your branch from `main`: `git checkout -b feature/my-new-feature`.
2. Install dependencies: `npm install`.
3. Ensure typecheck and tests pass:
   ```bash
   npm run typecheck
   npm test
   npm run build
   ```
4. Commit your changes following Conventional Commits format (`feat: ...`, `fix: ...`, `docs: ...`).
5. Open a Pull Request detailing your changes.
