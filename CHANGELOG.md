# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-05

### Added
- **Core SVG Rendering Engine**: High-performance server-side SVG generation with embedded CSS keyframe animations.
- **7 Card Layouts**:
  - `classic`: 3-metric streak card with streak flame and tier badges.
  - `minimal`: Sleek horizontal stats row.
  - `graph`: Real GitHub contribution heatmap mini-grid.
  - `mascot`: Large character hero with dynamic speech bubble.
  - `terminal`: Developer CLI terminal with command line output.
  - `glass`: Translucent glassmorphism with ambient glow orbs.
  - `compact`: Ultra-slim horizontal badge for narrow README headers.
- **Mascot System**:
  - 6 original mascots: Streaky, Gitty, Mochi, Byte, Spark, Blob.
  - 7 expressions: idle, happy, excited, sleeping, surprised, celebrating, determined.
  - Dynamic streak tier reactions (0 to 100+ days).
- **15+ Themes**:
  - Developer: Tokyo Night, Dracula, Nord, GitHub Dark, GitHub Light, Monokai, Catppuccin Mocha, One Dark.
  - Creative: Lavender Dreams, Sakura, Ocean Breeze, Sunset, Cyberpunk, Pastel Candy, Midnight Galaxy.
- **GitHub Integration**:
  - GraphQL API client with token pooling and fallback scraper.
  - Multi-timezone accurate streak calculator.
- **Performance & Security**:
  - In-memory LRU caching and optional Upstash Redis caching.
  - In-flight request deduplication.
  - XML sanitization and regex color validation.
- **Web Interface**:
  - Homepage (`/`) with live preview, squad showcase, and how-it-works.
  - Studio (`/studio`) with real-time card customizer and copy snippet bar.
  - Themes gallery (`/themes`) with palette inspection.
  - Mascots gallery (`/mascots`) with interactive expression preview.
  - Documentation (`/docs`) and About page (`/about`).
- **DevOps**:
  - Multi-stage Dockerfile and docker-compose.yml.
  - Vitest test suite with 23 passing tests.
  - GitHub Actions CI workflow.
