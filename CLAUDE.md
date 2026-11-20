# Barron Roth Portfolio Website

## Overview

Personal portfolio website for Barron Roth (`www.barronroth.com`), built with clean static HTML, CSS, and vanilla JavaScript and hosted on GitHub Pages.

## Technology Stack

- **Architecture**: Zero-framework static HTML, CSS, and deferred vanilla JS (migrated off Webflow)
- **Hosting**: GitHub Pages (`gh-pages` branch)
- **Domain**: `www.barronroth.com`
- **Analytics**: Google Analytics 4 (`G-P23R5QYZG2`), deferred until `window.load` / idle
- **Fonts**: All self-hosted Latin-subsetted WOFF2 (`AwesomeSerif` family, `Circular`, `Space Mono`)

## Project Structure

```
/
├── index.html          # Semantic single-page portfolio
├── CNAME               # Custom domain configuration
├── favicon.ico         # Root favicon
├── css/
│   └── styles.css      # Consolidated reset, @font-face, layout, and responsive styles
├── js/
│   └── main.js         # Deferred vanilla JS (analytics, videos, 3D tilt, matrix scramble)
├── fonts/              # 12 subsetted .woff2 fonts
├── videos/             # 7 lowercase fast-start H.264 .mp4 hover/tap clips
└── images/
    ├── hero/           # Responsive AVIF headshot (400w, 800w)
    ├── cards/          # Responsive AVIF card posters (600w, 1000w, 1440w/1232w)
    └── favicon* / og   # Vector/PNG favicons and Open Graph social image
```

## Key Features

### Design System

- **Color Palette**:
  - Background: `#e5d8cf` (warm beige)
  - Text: `#361a07` (dark brown)
  - Overlay: `#fdf4db` (light cream)
  - Accent Red: `#ee4957`
  - Accent Purple: `#a95493`

- **Typography**: Mixed `AwesomeSerif` editorial display typography, `Circular` body copy, and `Space Mono` metadata pills
- **Layout**: Responsive 2-column alternating project grid → single column below `991px`
- **Aesthetic**: Editorial brutalism with hard offset borders/shadows and subtle film-grain card overlay

### Interactive Elements (`js/main.js`)

1. **Lazy Hover / Tap-to-Play Videos**: `preload="none"` with `data-src`; streams on demand on desktop hover (`pointerenter`/`pointerleave`) or mobile tap toggle (`click`), with seamless crossfade and `loop`.
2. **rAF-Throttled 3D Tilt**: Perspective rotation on project cards and holographic headshot with cached bounding rects (fine-pointer devices only).
3. **Matrix Pill Scramble**: Character randomization on `.pill` hover with leak-free timer cleanup.
4. **Brand Flourishes**: Unified `Google → DeepMind` 14-letter rainbow/blue cascade (auto-flashes on load + hover) and Shopify green sweep on hover.
5. **Reduced Motion**: Respects `prefers-reduced-motion: reduce`.

### Content Sections

1. **Hero Section**: AI builder & Product Manager at Google DeepMind introduction with diamond desktop typography + dedicated mobile layout
2. **Project Cards** (7 career highlights):
   - Google DeepMind (`2025–Present`): The Future of Agents (Antigravity)
   - Shopify (`2022–2025`): The Future of Retail
   - Wonder (`2020-2022`): The Future of Dining
   - The Rotation (`2018-2020`): The Future of Your Closet (acquired)
   - Screenshop (`2018-2019`): The Future of Style AI (acquired by Snap)
   - Blade (`2016-2018`): The Future of Flight
   - AMD (`2014`): The Future of Gaming
3. **Footer**: Contact links and social profiles

## Adding New Projects

1. Add responsive AVIF posters (`600w`, `1000w`, `1440w`) under `images/cards/<slug>-*.avif`.
2. Add an optimized lowercase fast-start H.264 clip (`800w`, `-movflags +faststart`, `-an`) under `videos/<slug>.mp4`.
3. Duplicate an `<article class="project-card">` block in `index.html`, alternating `.project-card--media-left`.

## Maintenance Commands

```bash
# Preview locally
python3 -m http.server 8080

# Check status and history
git status
git log --oneline -10
```
