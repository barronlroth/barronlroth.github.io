# Barron Roth Portfolio Website

## Overview

This is a personal portfolio website for Barron Roth, built with Webflow and hosted on GitHub Pages. The site showcases professional experience as a Full-Stack Product Manager with a modern, interactive design aesthetic.

## Technology Stack

- **Framework**: Webflow (exported static site)
- **Hosting**: GitHub Pages (gh-pages branch)
- **Domain**: www.barronroth.com
- **Analytics**: Google Analytics (G-P23R5QYZG2)
- **Fonts**: 
  - Google Fonts: Space Mono
  - Custom fonts: AwesomeSerif (multiple variants), Circular

## Project Structure

```
/
├── index.html              # Single-page portfolio site
├── CNAME                   # Custom domain configuration
├── README.md               # Basic project description
├── favicon.ico             # Site favicon
├── css/
│   ├── normalize.css       # CSS reset
│   ├── webflow.css         # Webflow framework styles
│   └── barron-roth.webflow.css  # Custom project styles
├── js/
│   └── webflow.js          # Webflow interactions
├── fonts/                  # 19 custom font files (.otf, .ttf)
└── images/                 # 37 media files
    ├── *.webm             # Video content
    ├── *.mp4              # Video fallbacks
    ├── *.avif             # Modern image format
    └── *.png              # Legacy images/icons
```

## Key Features

### Design System

- **Color Palette**:
  - Background: `#e5d8cf` (warm beige)
  - Text: `#361a07` (dark brown)
  - Overlay: `#fdf4db` (light cream)
  - Accent Red: `#ee4957`
  - Accent Purple: `#a95493`

- **Typography**: Mixed serif system with responsive sizing (122px → 44px mobile)
- **Layout**: Responsive grid system with 2-column cards → single column mobile
- **Aesthetic**: Brutalist design with hard shadows and geometric shapes

### Interactive Elements

1. **3D Card Tilt** (index.html:280-307)
   - Perspective-based rotation on mouse movement
   - Dynamic shadow enhancement
   - CSS variables for smooth transitions

2. **Matrix Text Animation** (index.html:213-277)
   - Character scrambling effect on hover
   - Applied to date/category labels
   - Staggered animation timing

3. **Click-to-Play Videos** (index.html:310-336)
   - Image-to-video transitions on card click
   - Auto-return to image on video end
   - Smooth opacity transitions

### Content Sections

1. **Hero Section**: Full-stack Product Manager introduction with dynamic typography
2. **Project Cards**: 6 career highlights with interactive media
   - Shopify (2022-Present): Retail software/POS
   - Wonder (2020-2022): Consumer dining innovation
   - The Rotation (2018-2020): Fashion subscription (acquired)
   - Screenshop (2018-2019): Style AI (acquired by Snap)
   - Blade (2016-2018): Urban air mobility
   - AMD (2014): Xbox hardware engineering

3. **Footer**: Contact links and social media

## Performance Optimizations

- Modern image formats (AVIF with PNG fallbacks)
- WebM video format with MP4 fallbacks
- Lazy loading for images
- Hardware-accelerated CSS transforms
- Will-change optimization for animations

## Development Notes

### Git Workflow
- Main branch: `gh-pages` (for GitHub Pages deployment)
- Current branch: `fix-wide-shadow`
- Recent work: Font rendering fixes, Google Analytics integration

### Key Files to Edit
- `index.html` - All content and structure
- `css/barron-roth.webflow.css` - Custom styles and animations
- JavaScript is inline in `index.html` (lines 213-336)

### Adding New Projects
1. Add media files to `/images/`
2. Duplicate a card section in `index.html`
3. Update content, dates, and links
4. Ensure video files have both .webm and .mp4 versions

### Responsive Breakpoints
- Desktop: > 1600px
- Large: 1440px
- Medium: 991px
- Tablet: 767px
- Mobile: 479px
- Small: 425px

## Maintenance Commands

```bash
# Check current status
git status

# View recent commits
git log --oneline -10

# Test locally (if you have a local server)
python -m http.server 8000

# Deploy changes
git add .
git commit -m "Update description"
git push origin gh-pages
```

## Known Issues

- Wide shadow rendering on certain devices (currently being fixed)
- Overlay font rendering on iOS Safari (recently fixed)

## Future Enhancements

Consider:
- Adding a blog section
- Implementing dark mode
- Adding more detailed case studies
- Performance monitoring with web vitals
- SEO optimizations (structured data, meta tags)