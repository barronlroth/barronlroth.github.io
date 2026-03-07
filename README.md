# barronroth.com

Personal portfolio site for Barron Roth — Product Manager, Designer, Engineer.

## Stack

- Static HTML/CSS (Webflow export)
- Custom JS: matrix text scramble, 3D card tilt, video-on-hover, holographic headshot
- Google Analytics (`G-P23R5QYZG2`)
- Hosted on GitHub Pages (`gh-pages` branch)

## Career Cards

| Company | Role | Years |
|---------|------|-------|
| Google | Product (AI Agents) | 2025–Present |
| Shopify | Product (POS) | 2022–2025 |
| Wonder | Product | 2020–2022 |
| The Rotation | Co-Founder | 2018–2020 |
| Screenshop → Snapchat | Product | 2018–2019 |
| Blade | Product | 2016–2018 |
| AMD (Xbox) | Engineering | 2014 |

Each card has a static image (AVIF) with a hover video (WebM + MP4 fallback).

## Development

```bash
# Local preview
python3 -m http.server 8765
```

## Deployment

Push to `gh-pages` → auto-deploys to [barronroth.com](https://barronroth.com).
