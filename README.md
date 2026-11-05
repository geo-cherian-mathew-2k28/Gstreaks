# GeoStreak ⚡🔥
### An Open-Source, Animated GitHub Contribution Visualization Platform

[![CI](https://github.com/geo-cherian-mathew-2k28/Gstreaks/actions/workflows/ci.yml/badge.svg)](https://github.com/geo-cherian-mathew-2k28/Gstreaks/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](Dockerfile)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **GeoStreak** turns your daily GitHub contributions into beautiful, customizable, animated SVG streak cards and cute mascots that you can embed directly into your GitHub profile README.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [How It Works](#-how-it-works)
- [How to Power It (Production Setup & Deployment)](#-how-to-power-it-production-setup--deployment)
- [Quick Start](#-quick-start)
- [Card Layouts](#-card-layouts)
- [Mascot System](#-mascot-system)
- [Themes Collection](#-themes-collection)
- [API Query Parameters](#-api-query-parameters)
- [Architecture & Security](#-architecture--security)
- [Self-Hosting (Docker)](#-self-hosting-docker)
- [Development & Testing](#-development--testing)
- [Contributing & License](#-contributing--license)

---

## 🌟 Overview

GeoStreak is a production-grade, zero-configuration alternative to legacy GitHub streak counters. Unlike older tools that frequently go down or render static text, GeoStreak offers:

- **100% Free & Open-Source**: Public API accessible by anyone worldwide. No account, API key, or payment required.
- **Accurate Streak Math**: Independently counts current consecutive active days, longest streaks, and totals, accounting for multi-timezone midnight buffers.
- **Cute Mascots Squad**: 6 original vector mascots (**Streaky**, **Gitty**, **Mochi**, **Byte**, **Spark**, **Blob**) that react dynamically to your streak tier with sleeping, smiling, celebrating, and legendary expressions.
- **15+ Developer & Creative Themes**: Tokyo Night, Dracula, Nord, GitHub Dark, GitHub Light, Monokai, Catppuccin Mocha, One Dark, Lavender Dreams, Sakura, Ocean Breeze, Sunset, Cyberpunk, Pastel Candy, and Midnight Galaxy.
- **7 Card Layouts**: Classic, Minimal, Contribution Graph Heatmap, Mascot Hero, Terminal CLI, Glassmorphism, and Compact.
- **GitHub Camo Proxy Safe**: Returns pure SVG XML with embedded CSS animations and a static fallback switch (`&animation=false`).
- **High Reliability**: Multi-tier caching (in-memory LRU + optional Upstash Redis), in-flight request deduplication, and token rotation.

---

## ⚙️ How It Works

```
                                [ GitHub Profile README ]
                                            │
                                            │ 1. <img src="https://geostreak.vercel.app/api?user=..." />
                                            ▼
                           ┌─────────────────────────────────┐
                           │   GeoStreak Next.js SVG API     │
                           └────────────────┬────────────────┘
                                            │
                                            ▼
                              [ Cache Layer (LRU / Redis) ]
                                ├── HIT ──> Return Cached SVG (< 15ms)
                                └── MISS ──> Continue below
                                            │
                                            ▼
                            [ Request Deduplication Pool ]
                            (Merges concurrent hits for same user)
                                            │
                                            ▼
                         [ GitHub GraphQL API / Token Rotation ]
                             query ($login: String!) { ... }
                               (Fallback to scraper if no token)
                                            │
                                            ▼
                              [ Streak Calculation Engine ]
                            - Current consecutive streak
                            - Longest historical streak
                            - Total contributions & days
                                            │
                                            ▼
                            [ Mascot & Theme Resolution ]
                            - Streak Tier (Dormant -> Legendary)
                            - Dynamic Expression Calculation
                            - Color Palette & Graph Levels
                                            │
                                            ▼
                               [ Standalone SVG Generator ]
                            - XML Entity Sanitization
                            - Embedded CSS Keyframe Animations
                            - Content-Type: image/svg+xml
```

1. **Request Received**: When a GitHub profile is viewed, GitHub's Camo image proxy issues a `GET /api?user=username` request to GeoStreak.
2. **Caching & Deduplication**: GeoStreak checks the in-memory LRU cache (or Upstash Redis if enabled). If multiple users view the same profile simultaneously, an in-flight Promise pool ensures only **one** request reaches GitHub's API.
3. **Data Retrieval**: GeoStreak fetches the user's exact contribution calendar via GitHub GraphQL using a server-side Personal Access Token (PAT). If no token is configured, it seamlessly falls back to a public parser.
4. **Streak Calculation**: The engine evaluates consecutive days. If a user hasn't committed yet today, the streak remains active through yesterday, allowing until midnight in their local timezone to commit.
5. **SVG Synthesis**: The engine resolves the theme, mascot, and expression, and returns a fully compliant, self-contained SVG with `Cache-Control: public, max-age=1200`.

---

## ⚡ How to Power It (Production Setup & Deployment)

To run your own hosted instance of GeoStreak with high traffic throughput (100,000+ card views/day), follow these steps:

### 1. Acquire a GitHub Personal Access Token (PAT)
GitHub's public API allows only 60 requests/hour unauthenticated. A GitHub PAT raises this limit to **5,000 requests/hour**!

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Give it a name (e.g. `GeoStreak API`).
4. **No scopes are needed** for public user contributions! Leave all checkmarks empty.
5. Copy the generated token (`ghp_...`).

> **Pro Tip (Token Pool)**: GeoStreak supports round-robin load balancing across multiple tokens! You can configure `GITHUB_TOKENS=token1,token2,token3` to scale to 15,000+ requests/hour.

### 2. Deploy to Vercel (Recommended - 1 Click)
1. Fork or push this repository to your GitHub account (`https://github.com/geo-cherian-mathew-2k28/Gstreaks`).
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `Gstreaks` repository.
4. Under **Environment Variables**, add:
   - `GITHUB_TOKEN`: Your GitHub token from Step 1.
   - `NEXT_PUBLIC_APP_URL`: `https://your-domain.vercel.app`
5. Click **Deploy**. Your custom instance is live in under 60 seconds!

### 3. Optional: Distributed Redis Caching (Upstash)
By default, GeoStreak uses high-performance in-memory LRU caching. To share cache across global edge serverless functions:
1. Create a free database at [Upstash Redis](https://upstash.com).
2. Add these environment variables in Vercel:
   - `UPSTASH_REDIS_REST_URL`: Your Upstash REST URL.
   - `UPSTASH_REDIS_REST_TOKEN`: Your Upstash REST token.
3. GeoStreak will automatically detect Redis and activate distributed caching.

---

## 🚀 Quick Start

Paste this into your GitHub profile `README.md` (replace `YOUR_USERNAME` with your GitHub handle):

### Markdown
```markdown
[![GeoStreak](https://geostreak.vercel.app/api?user=YOUR_USERNAME)](https://github.com/geo-cherian-mathew-2k28/Gstreaks)
```

### HTML
```html
<a href="https://github.com/geo-cherian-mathew-2k28/Gstreaks">
  <img src="https://geostreak.vercel.app/api?user=YOUR_USERNAME" alt="GeoStreak" />
</a>
```

---

## 📐 Card Layouts

| Layout | ID | Description | Example URL Parameter |
| :--- | :--- | :--- | :--- |
| **Classic** | `classic` | 3-column stats card with flame, trophy, total, and animated mascot | `&layout=classic` |
| **Minimal** | `minimal` | Sleek, compact horizontal stats bar | `&layout=minimal` |
| **Heatmap Graph** | `graph` | Real GitHub contribution heatmap mini-grid (28 weeks × 7 days) | `&layout=graph` |
| **Mascot Hero** | `mascot` | Prominent character hero with dynamic speech bubble | `&layout=mascot` |
| **Terminal CLI** | `terminal` | Developer CLI terminal with zsh prompt, command output, and cursor | `&layout=terminal` |
| **Glassmorphism**| `glass` | Frosted glass surfaces with ambient radial light orbs | `&layout=glass` |
| **Compact** | `compact` | Ultra-slim horizontal banner designed for narrow header slots | `&layout=compact` |

---

## 🐾 Mascot System

| Mascot | ID | Tagline | Character Concept |
| :---: | :--- | :--- | :--- |
| 🟣 | `streaky` | The Cosmic Flame | Playful purple flame spirit born from unbroken git commit streaks. |
| 🔵 | `gitty` | The Branch Guardian | Adorable creature made of git commit nodes and branching paths. |
| 🥟 | `mochi` | The Cozy Dumpling | Squishy marshmallow dumpling cheering for daily coding habits. |
| 🤖 | `byte` | The Pixel Bot | Pocket-sized retro terminal droid that displays stats on its CRT screen. |
| ⭐ | `spark` | The Cosmic Star | Celestial star sprite that ignites with each consecutive day. |
| 🫧 | `blob` | The Jellicode | Bouncy shapeshifting jelly creature that absorbs bugs and radiates energy. |

### Dynamic Streak Milestones
- **0 Days (Dormant)**: Curled up asleep with floating `Zzz` particles.
- **1–3 Days (Bronze)**: Warm smile and blushing cheeks.
- **4–7 Days (Silver)**: Starry excited eyes celebrating a full week.
- **8–30 Days (Gold)**: Party celebration with confetti sparks.
- **31–99 Days (Diamond)**: Luminous cyan celestial halo.
- **100+ Days (Legendary)**: Golden royal crown with jewel insets.

---

## 🎨 Themes Collection

| Category | Theme Name | ID | Background | Primary Accent |
| :--- | :--- | :--- | :--- | :--- |
| **Developer** | Tokyo Night | `tokyo-night` | `#1a1b26` | `#7aa2f7` |
| **Developer** | Dracula | `dracula` | `#282a36` | `#bd93f9` |
| **Developer** | Nord | `nord` | `#2e3440` | `#88c0d0` |
| **Developer** | GitHub Dark | `github-dark` | `#0d1117` | `#58a6ff` |
| **Developer** | GitHub Light | `github-light` | `#ffffff` | `#0969da` |
| **Developer** | Monokai | `monokai` | `#272822` | `#a6e22e` |
| **Developer** | Catppuccin Mocha | `catppuccin-mocha` | `#1e1e2e` | `#cba6f7` |
| **Developer** | One Dark | `one-dark` | `#282c34` | `#61afef` |
| **Creative** | Lavender Dreams | `lavender-dreams` | `#171427` | `#b794f4` |
| **Creative** | Sakura | `sakura` | `#fff5f7` | `#ec4899` |
| **Creative** | Ocean Breeze | `ocean-breeze` | `#0a192f` | `#64ffda` |
| **Creative** | Sunset | `sunset` | `#18122B` | `#F97316` |
| **Creative** | Cyberpunk | `cyberpunk` | `#05050d` | `#ff007f` |
| **Creative** | Pastel Candy | `pastel-candy` | `#fdf4f5` | `#ff92a5` |
| **Creative** | Midnight Galaxy | `midnight-galaxy` | `#090a0f` | `#a855f7` |

---

## 🛠️ API Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `user` | `string` | **Required** | GitHub username (e.g. `torvalds`) |
| `theme` | `string` | `tokyo-night` | Predefined visual theme |
| `layout` | `string` | `classic` | `classic`, `minimal`, `graph`, `mascot`, `terminal`, `glass`, `compact` |
| `mascot` | `string` | `streaky` | `streaky`, `gitty`, `mochi`, `byte`, `spark`, `blob` |
| `expression`| `string`| `auto` | `idle`, `happy`, `excited`, `sleeping`, `surprised`, `celebrating`, `determined` |
| `animation` | `boolean`| `true` | Set `false` for static SVG without CSS animations |
| `hide_border`| `boolean`| `false`| Hides card border |
| `hide_title` | `boolean`| `false`| Hides username title bar |
| `hide_current_streak` | `boolean` | `false` | Hides current streak column |
| `hide_longest_streak` | `boolean` | `false` | Hides longest streak column |
| `hide_total_contributions` | `boolean` | `false` | Hides total contributions |
| `background` | `hex` | `theme.bg` | Custom background color (e.g. `0D1117`) |
| `border` | `hex` | `theme.border` | Custom border color |
| `text` | `hex` | `theme.text` | Custom text color |
| `radius` | `number` | `14` | Card corner radius in pixels (0–32) |

---

## 🐳 Self-Hosting (Docker)

You can self-host GeoStreak with a single Docker command:

```bash
# 1. Clone repository
git clone https://github.com/geo-cherian-mathew-2k28/Gstreaks.git
cd Gstreaks

# 2. Configure your GitHub token
cp .env.example .env
# Edit .env and paste your GITHUB_TOKEN

# 3. Launch Docker Compose
docker compose up -d
```

Verify service health:
```bash
curl http://localhost:3000/api/health
```

---

## 🧪 Development & Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run Vitest test suite (26 tests)
npm test

# Run TypeScript type check
npm run typecheck

# Build production bundle
npm run build
```

---

## 📄 Contributing & License

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

GeoStreak is licensed under the [MIT License](LICENSE).  
Maintained with ❤️ by [Geo Cherian Mathew](https://github.com/geo-cherian-mathew-2k28).
