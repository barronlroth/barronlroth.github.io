# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the semantic, single-page static entry point (no Webflow or JS framework runtime).
- `css/styles.css` holds all font declarations, tokens, layout styles, interactive flourishes, and responsive breakpoints; add new styles near related blocks.
- `js/main.js` is the single deferred vanilla JS module (IIFE) powering deferred analytics, hover/tap-to-play videos, 3D tilt, matrix pill scramble, and the Google color cascade.
- Assets live in `images/hero/`, `images/cards/` (responsive AVIF sets), `videos/` (lowercase fast-start H.264 MP4 clips), `fonts/` (subsetted WOFF2 files), and `favicon.ico`; keep all filenames lowercase to avoid case-sensitivity issues on GitHub Pages.
- `CNAME` defines the custom domain—never delete or rename it.

## Build, Test, and Development Commands
- Preview the site locally with `python3 -m http.server 8080` (run from the repo root and open `http://localhost:8080`).
- For iterative edits, update assets, refresh the browser, and verify layout in responsive mode (`CMD+SHIFT+M` in Chrome DevTools).
- Deployments are triggered by pushing to the `gh-pages` branch; confirm the Pages workflow completes before announcing changes.

## Coding Style & Naming Conventions
- Maintain two-space indentation across HTML, CSS, and JavaScript to match existing files.
- Keep CSS class names hyphenated and descriptive (BEM-style modifiers like `project-card--media-left`, `hero-line--name`).
- Keep JavaScript lightweight, dependency-free, wrapped in an IIFE, and respectful of `prefers-reduced-motion` and pointer capabilities (`hover: hover`).

## Testing Guidelines
- There is no automated test suite; rely on manual QA across Chrome, Safari, and mobile viewports after each visual change.
- Validate interactive elements (hover videos, hero animations) and run a quick Lighthouse accessibility check before merging major UI updates.
- Document any regressions found during manual testing in the pull request to aid reviewers.

## Commit & Pull Request Guidelines
- Follow the existing concise, imperative commit style (e.g., `Update hero images with new headshot`) and group related edits together.
- Open pull requests from feature branches, explain the change intent, link any related issues, and attach before/after screenshots for UI adjustments.
- Confirm that the branch is up to date with `gh-pages` and that the local preview matches the expected production state before request review.

## Deployment & Branching Notes
- `gh-pages` is the production branch; keep it deployment-ready at all times.
- Use short-lived branches named `feature/<topic>` or `fix/<issue>` and open PRs targeting `gh-pages` for every change.
- After merging into `gh-pages`, monitor the GitHub Pages build logs; if a deploy fails, rerun the workflow or revert promptly to maintain site uptime.
