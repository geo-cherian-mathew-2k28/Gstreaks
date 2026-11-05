# GeoStreak ⚡🔥
### An Open-Source, Animated GitHub Contribution Visualization Platform

<p align="center">
  <a href="https://github.com/geo-cherian-mathew-2k28/Gstreaks/actions"><img src="https://github.com/geo-cherian-mathew-2k28/Gstreaks/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript" alt="TypeScript" /></a>
  <a href="Dockerfile"><img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker Ready" /></a>
</p>

<p align="center">
  <strong>Transform your daily GitHub contributions into beautiful, animated SVG cards with dynamic mascot companions for your profile README.</strong>
</p>

---

## 🎨 Visual Showcase & Card Layouts

GeoStreak includes **7 distinct card layouts** designed to fit any GitHub profile aesthetic—from retro terminals to sleek glassmorphism.

---

### 1. 🏆 Classic Streak Card (`layout=classic`)
*The iconic 3-column streak card featuring a burning animated flame, personal best trophy, total commits counter, streak tier rank badge, and animated mascot.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=tokyo-night&layout=classic" alt="Classic Layout Preview" />
</p>

```markdown
![Classic Streak Card](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=tokyo-night&layout=classic)
```
- **Key Features:** Burning flame pulse animation, personal record badge, active date range labels, and right-side mascot.
- **Best For:** Centered hero banner in your main profile README.

---

### 2. 💻 Terminal CLI Layout (`layout=terminal`)
*Inspired by developer zsh/bash command lines, complete with window controls, interactive prompt, ASCII borders, and a blinking cursor.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=cyberpunk&layout=terminal" alt="Terminal Layout Preview" />
</p>

```markdown
![Terminal Layout](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=cyberpunk&layout=terminal)
```
- **Key Features:** Red/yellow/green macOS window dots, `$ geostreak stats --user` command prompt, formatted ASCII metrics box, blinking cursor, and retro CLI mascot.
- **Best For:** Developers who love dark mode, Linux, Neovim, and terminal aesthetics.

---

### 3. 🔮 Glassmorphism Layout (`layout=glass`)
*Ultra-modern translucent frosted glass card with glowing radial ambient light orbs and luminous gradient reflections.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=midnight-galaxy&layout=glass" alt="Glass Layout Preview" />
</p>

```markdown
![Glass Layout](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=midnight-galaxy&layout=glass)
```
- **Key Features:** Multi-stop radial glow orbs, frosted glass effect (`backdrop-filter`), subtle borders, floating mascot.
- **Best For:** Modern portfolio READMEs and designers/engineers who want sleek aesthetics.

---

### 4. 📊 Heatmap Contribution Graph Layout (`layout=graph`)
*Embeds your actual 28-week GitHub contribution heatmap mini-grid directly alongside your streak numbers and mascot.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=github-dark&layout=graph" alt="Graph Layout Preview" />
</p>

```markdown
![Graph Layout](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=github-dark&layout=graph)
```
- **Key Features:** Real daily contribution cells color-graded by theme intensity levels, top summary stats, bottom legend bar.
- **Best For:** Showing your daily coding consistency visually on a single card.

---

### 5. 🦄 Mascot Hero Layout (`layout=mascot`)
*Puts your chosen mascot front and center with a dynamic speech bubble that reacts to your streak status with motivational lines.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=sakura&layout=mascot&mascot=mochi" alt="Mascot Layout Preview" />
</p>

```markdown
![Mascot Hero](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=sakura&layout=mascot&mascot=mochi)
```
- **Key Features:** Large 120px mascot illustration, animated speech bubble pointer, responsive stats cards.
- **Best For:** Friendly, playful READMEs that stand out from ordinary profile templates.

---

### 6. ⚡ Minimalist Bar (`layout=minimal`)
*A compact, low-profile card focusing solely on the core streak numbers with zero visual clutter.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=nord&layout=minimal" alt="Minimal Layout Preview" />
</p>

```markdown
![Minimal Layout](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=nord&layout=minimal)
```
- **Key Features:** 460x125 compact dimensions, inline metrics, sleek background gradient.
- **Best For:** Minimalists who prefer high density and subtle profile headers.

---

### 7. 📏 Compact Horizontal Banner (`layout=compact`)
*Designed specifically for profile headers where vertical space is limited. Fits neatly alongside other shields and badges.*

<p align="center">
  <img src="https://geostreak.vercel.app/api?user=geo-cherian-mathew-2k28&theme=dracula&layout=compact" alt="Compact Layout Preview" />
</p>

```markdown
![Compact Banner](https://geostreak.vercel.app/api?user=YOUR_USERNAME&theme=dracula&layout=compact)
```
- **Key Features:** 90px ultra-slim height, side-by-side metric badges, mini mascot on left.
- **Best For:** Placing at the very top of your README under your name and bio.

---

## 🐾 Meet the Mascots Squad

Every mascot is an original vector character created for GeoStreak that evolves visually as your streak increases:

| Mascot | Name | Tagline | Personality & Concept |
| :---: | :--- | :--- | :--- |
| 🟣 | **Streaky** | The Cosmic Flame | A cheerful purple flame spirit born from uninterrupted git commit streaks. |
| 🔵 | **Gitty** | The Branch Guardian | An adorable creature made of git commit nodes and branching antenna paths. |
| 🥟 | **Mochi** | The Cozy Dumpling | An impossibly squishy dumpling who cheers for your daily coding habits. |
| 🤖 | **Byte** | The Pixel Bot | A retro terminal droid that displays stats on its glowing CRT screen. |
| ⭐ | **Spark** | The Cosmic Star | A brilliant celestial star sprite that ignites with each consecutive day. |
| 🫧 | **Blob** | The Jellicode | A bouncy shapeshifting jelly creature that absorbs bugs and radiates energy. |

### Dynamic Streak Milestones & Expressions
- 💤 **0 Days (Sleepy)**: Mascot is curled up asleep with floating `Zzz` particles awaiting your next commit.
- 😊 **1–3 Days (Bronze Tier)**: Blushing smile cheering your streak inception.
- ✨ **4–7 Days (Silver Tier)**: Starry excited eyes celebrating a full 7-day week.
- 🎉 **8–30 Days (Gold Tier)**: Celebration party mode with confetti and particle pops.
- 🌌 **31–99 Days (Diamond Tier)**: Glowing celestial cyan halo hovering above the mascot.
- 👑 **100+ Days (Legendary Tier)**: Unlocks the royal golden crown with embedded gemstones!

---

## 🎨 Themes Collection (15+ Available)

| Category | Theme Name | ID | Primary Accent | Background Preview |
| :--- | :--- | :--- | :--- | :--- |
| **Developer** | Tokyo Night | `tokyo-night` | `#7aa2f7` | `background: #1a1b26` |
| **Developer** | Dracula | `dracula` | `#bd93f9` | `background: #282a36` |
| **Developer** | Nord | `nord` | `#88c0d0` | `background: #2e3440` |
| **Developer** | GitHub Dark | `github-dark` | `#58a6ff` | `background: #0d1117` |
| **Developer** | GitHub Light | `github-light` | `#0969da` | `background: #ffffff` |
| **Developer** | Monokai | `monokai` | `#a6e22e` | `background: #272822` |
| **Developer** | Catppuccin Mocha | `catppuccin-mocha` | `#cba6f7` | `background: #1e1e2e` |
| **Developer** | One Dark | `one-dark` | `#61afef` | `background: #282c34` |
| **Creative** | Lavender Dreams | `lavender-dreams` | `#b794f4` | `background: #171427` |
| **Creative** | Sakura | `sakura` | `#ec4899` | `background: #fff5f7` |
| **Creative** | Ocean Breeze | `ocean-breeze` | `#64ffda` | `background: #0a192f` |
| **Creative** | Sunset | `sunset` | `#F97316` | `background: #18122B` |
| **Creative** | Cyberpunk | `cyberpunk` | `#ff007f` | `background: #05050d` |
| **Creative** | Pastel Candy | `pastel-candy` | `#ff92a5` | `background: #fdf4f5` |
| **Creative** | Midnight Galaxy | `midnight-galaxy` | `#a855f7` | `background: #090a0f` |

---

## 🛠️ API Query Parameters

Endpoint: `GET /api?user=<username>`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `user` | `string` | **Required** | Target GitHub username (e.g. `torvalds`) |
| `theme` | `string` | `tokyo-night` | Theme ID (`dracula`, `cyberpunk`, `nord`, etc.) |
| `layout` | `string` | `classic` | `classic`, `minimal`, `graph`, `mascot`, `terminal`, `glass`, `compact` |
| `mascot` | `string` | `streaky` | `streaky`, `gitty`, `mochi`, `byte`, `spark`, `blob` |
| `expression`| `string`| `auto` | `idle`, `happy`, `excited`, `sleeping`, `surprised`, `celebrating`, `determined` |
| `animation` | `boolean`| `true` | Set `false` for static SVG without CSS keyframes |
| `hide_border`| `boolean`| `false`| Hides outer card border |
| `hide_title` | `boolean`| `false`| Hides top username / title header |
| `hide_current_streak` | `boolean` | `false` | Hides current streak metric |
| `hide_longest_streak` | `boolean` | `false` | Hides longest streak metric |
| `hide_total_contributions` | `boolean` | `false` | Hides total contributions |
| `background` | `hex` | `theme.bg` | Custom background color (e.g. `0D1117`) |
| `border` | `hex` | `theme.border` | Custom border color |
| `text` | `hex` | `theme.text` | Custom text color |
| `radius` | `number` | `14` | Corner radius in pixels (0–32) |

---

## ⚙️ How GeoStreak Works

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

1. **GitHub Camo Request**: When a profile is viewed, GitHub's Camo image proxy fetches the SVG from `GET /api?user=username`.
2. **LRU Caching & Deduplication**: If recently requested, GeoStreak returns the cached SVG in `< 15ms`. If multiple users request simultaneously, an in-flight Promise pool ensures only **one** request reaches GitHub's API.
3. **GraphQL Retrieval**: Queries GitHub GraphQL API for the exact contribution calendar. If no token is set on the server, it seamlessly falls back to a public parser.
4. **Timezone-Aware Streak Math**: If a user hasn't committed yet today, the streak remains active through yesterday (giving the user until midnight in their local timezone to commit).
5. **Sanitized Output**: Pure SVG XML is returned with `Cache-Control: public, max-age=1200, s-maxage=1800`.

---

## ⚡ How to Power It (Deployment & Production Setup)

### 1. Create a GitHub Personal Access Token (PAT)
A server token increases GitHub rate limits from 60/hr to **5,000 requests/hour**!

1. Go to [GitHub Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens).
2. Generate a new token with **no scopes checked** (public contribution graphs need no special permissions).
3. Copy the token (`ghp_...`).
4. *(Optional)* Add multiple tokens separated by commas (`GITHUB_TOKENS=tok1,tok2,tok3`) for automated round-robin load balancing!

### 2. Deploy to Vercel in 1 Click
1. Fork or import this repository on [Vercel](https://vercel.com).
2. Add your environment variables:
   - `GITHUB_TOKEN`: `ghp_your_token_here`
   - `NEXT_PUBLIC_APP_URL`: `https://your-domain.vercel.app`
3. Click **Deploy**. Your custom instance is live worldwide in seconds!

### 3. Optional: Distributed Redis Caching
For serverless scaling across independent edge regions:
1. Create a free database at [Upstash Redis](https://upstash.com).
2. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your environment.
3. GeoStreak will automatically detect Redis and activate distributed caching.

---

## 🐳 Self-Hosting with Docker

```bash
# 1. Clone the repository
git clone https://github.com/geo-cherian-mathew-2k28/Gstreaks.git
cd Gstreaks

# 2. Configure environment
cp .env.example .env

# 3. Launch Docker Compose
docker compose up -d

# 4. Check health
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

## 📄 License & Maintainer

GeoStreak is licensed under the [MIT License](LICENSE).  
Maintained with ❤️ by [Geo Cherian Mathew](https://github.com/geo-cherian-mathew-2k28).
