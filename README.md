# GeoStreak ⚡🔥
### An Open-Source, Animated GitHub Contribution Visualization Platform

[![CI](https://github.com/geo-cherian-mathew-2k28/geostreak/actions/workflows/ci.yml/badge.svg)](https://github.com/geo-cherian-mathew-2k28/geostreak/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Turn your daily contributions into beautiful, customizable, animated GitHub streak cards and cute mascots that you can embed directly into your GitHub profile README.

---

## 🌟 Features

- 🎯 **Zero-Configuration Operation**: Works out-of-the-box for any GitHub user worldwide through a simple image URL. No sign-up, user tokens, or payment required.
- 🔥 **Accurate Streak Algorithms**: Independently calculates current streak (with local timezone midnight buffer), longest historical streak, and total contributions.
- 🦄 **Cute Mascot System**: 6 original animated companions (**Streaky**, **Gitty**, **Mochi**, **Byte**, **Spark**, **Blob**) that evolve their expressions and unlock golden crowns as your streak progresses.
- 🎨 **15+ Built-In Themes**: Developer favorites (*Tokyo Night*, *Dracula*, *Nord*, *Catppuccin Mocha*, *One Dark*, *Monokai*) and creative styles (*Cyberpunk*, *Sakura*, *Lavender Dreams*, *Sunset*, *Midnight Galaxy*).
- 📐 **7 Distinct Layouts**:
  1. `classic`: The iconic 3-metric streak card with burning flame and rank badge.
  2. `minimal`: Ultra-clean and compact horizontal stats bar.
  3. `graph`: Real GitHub contribution heatmap mini-grid (weeks × days).
  4. `mascot`: Large character hero design with dynamic speech bubble.
  5. `terminal`: Developer CLI terminal with command prompt output.
  6. `glass`: Translucent glassmorphism with ambient glow orbs.
  7. `compact`: Slim horizontal banner optimized for narrow README slots.
- ⚡ **High Performance & Caching**: Server-side LRU in-memory caching, in-flight request deduplication, rate limiting, and optional Upstash Redis integration.
- 🛡️ **GitHub Camo Safe**: Standalone SVG markup with encapsulated CSS keyframe animations, XML sanitization, and a static fallback toggle (`&animation=false`).

---

## 🚀 Quick Start (Embed in 10 Seconds)

Add the following snippet to your GitHub profile `README.md`, replacing `YOUR_USERNAME` with your handle:

### Markdown
```markdown
[![GeoStreak](https://geostreak.vercel.app/api?user=YOUR_USERNAME)](https://github.com/geo-cherian-mathew-2k28/geostreak)
```

### HTML
```html
<a href="https://github.com/geo-cherian-mathew-2k28/geostreak">
  <img src="https://geostreak.vercel.app/api?user=YOUR_USERNAME" alt="GitHub Streak" />
</a>
```

---

## 🎨 Card Layout Examples

### 1. Classic Streak Card (`layout=classic`)
```markdown
![Classic Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=tokyo-night&layout=classic)
```

### 2. Terminal Layout (`layout=terminal`)
```markdown
![Terminal Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=cyberpunk&layout=terminal)
```

### 3. Glassmorphic Layout (`layout=glass`)
```markdown
![Glass Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=midnight-galaxy&layout=glass)
```

### 4. Contribution Heatmap Graph (`layout=graph`)
```markdown
![Graph Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=github-dark&layout=graph)
```

### 5. Mascot Hero Card (`layout=mascot`)
```markdown
![Mascot Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=sakura&layout=mascot&mascot=mochi)
```

### 6. Compact Horizontal Card (`layout=compact`)
```markdown
![Compact Card](https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=nord&layout=compact)
```

---

## 🐾 Meet the Mascots

| Mascot | Name | Tagline | Character Concept |
| :---: | :--- | :--- | :--- |
| 🟣 | **Streaky** | The Cosmic Flame | A cheerful purple flame spirit born from uninterrupted git commit streaks. |
| 🔵 | **Gitty** | The Branch Guardian | An adorable creature made of git commit nodes and branching paths. |
| 🥟 | **Mochi** | The Cozy Dumpling | An impossibly squishy dumpling cheering for your daily coding habits. |
| 🤖 | **Byte** | The Pixel Bot | A retro terminal droid that displays your stats on its mini CRT screen. |
| ⭐ | **Spark** | The Cosmic Star | A brilliant celestial star sprite that ignites with each consecutive day. |
| 🫧 | **Blob** | The Jellicode | A bouncy shapeshifting jelly creature that absorbs bugs and radiates energy. |

### Dynamic Streak Behaviors
- **0 Days**: Sleepy expression with floating `Zzz` particles.
- **1–3 Days**: Happy smile and warm blushing cheeks.
- **4–7 Days**: Starry excited eyes celebrating a full week.
- **8–30 Days**: Celebration mode with confetti and particle pops.
- **31–99 Days**: Glowing celestial halo.
- **100+ Days**: Royal golden crown with gemstones.

---

## 🛠️ API Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `user` | `string` | **Required** | GitHub username (e.g. `torvalds`) |
| `theme` | `string` | `tokyo-night` | Theme ID (e.g. `dracula`, `cyberpunk`, `nord`) |
| `layout` | `string` | `classic` | `classic`, `minimal`, `graph`, `mascot`, `terminal`, `glass`, `compact` |
| `mascot` | `string` | `streaky` | `streaky`, `gitty`, `mochi`, `byte`, `spark`, `blob` |
| `expression`| `string`| `auto` | `idle`, `happy`, `excited`, `sleeping`, `surprised`, `celebrating`, `determined` |
| `animation` | `boolean`| `true` | Set `false` for static SVG without CSS keyframes |
| `hide_border`| `boolean`| `false`| Hides card outer boundary border |
| `hide_title` | `boolean`| `false`| Hides username title bar |
| `hide_current_streak` | `boolean` | `false` | Hides current streak metric |
| `hide_longest_streak` | `boolean` | `false` | Hides longest streak metric |
| `hide_total_contributions` | `boolean` | `false` | Hides total contributions |
| `background` | `hex` | `theme.bg` | Custom background color (e.g. `0D1117`) |
| `border` | `hex` | `theme.border` | Custom border color |
| `text` | `hex` | `theme.text` | Custom text color |
| `radius` | `number` | `14` | Card corner radius in pixels (0–32) |

---

## 💻 Local Development

### Prerequisites
- Node.js 20+ (recommended v22+)
- npm 10+

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/geo-cherian-mathew-2k28/geostreak.git
cd geostreak

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open the interactive studio.

---

## 🧪 Testing

GeoStreak includes comprehensive unit and integration tests using [Vitest](https://vitest.dev/):

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Verify TypeScript typecheck
npm run typecheck
```

---

## 🐳 Self-Hosting & Deployment

### 1. Docker & Docker Compose
```bash
# Build and run container
docker compose up -d

# Check health status
curl http://localhost:3000/api/health
```

### 2. Vercel One-Click Deploy
GeoStreak is 100% Vercel-ready. Push to GitHub and import the project into Vercel.
Add your optional `GITHUB_TOKEN` in the Vercel Environment Variables dashboard.

---

## 🔒 Security

For security vulnerability disclosures, please review [SECURITY.md](SECURITY.md).
- XML entity escaping prevents SVG injection.
- Hexadecimal regex validation protects color inputs.
- GitHub Personal Access Tokens are handled strictly server-side.

---

## 📄 License

GeoStreak is licensed under the [MIT License](LICENSE).  
Maintained with ❤️ by [Geo Cherian Mathew](https://github.com/geo-cherian-mathew-2k28).
