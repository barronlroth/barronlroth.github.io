# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the Webflow-exported entry point; keep structural edits minimal and prefer CSS tweaks for layout changes.
- `css/` contains normalization, Webflow defaults, and the project-specific `barron-roth.webflow.css`; add new styles near related blocks and document overrides.
- `js/webflow.js` holds interaction scripts; place custom logic in a new file inside `js/` and include it after the existing bundle to avoid merge conflicts.
- Images, fonts, and favicons live in `images/`, `fonts/`, and `favicon.ico`; keep filenames descriptive and optimized (e.g., `hero-m.webp` for mobile hero art).
- `CNAME` defines the custom domain—never delete or rename it when syncing with upstream Webflow exports.

## Build, Test, and Development Commands
- Preview the site locally with `python3 -m http.server 8080` (run from the repo root and open `http://localhost:8080`).
- For iterative edits, update assets, refresh the browser, and verify layout in responsive mode (`CMD+SHIFT+M` in Chrome DevTools).
- Deployments are triggered by pushing to the `gh-pages` branch; confirm the Pages workflow completes before announcing changes.

## Coding Style & Naming Conventions
- Maintain two-space indentation across HTML, CSS, and JavaScript to match existing files.
- Keep CSS class names hyphenated and descriptive (`hero-section`, `cta-button--primary`), and reuse Webflow utility classes where possible.
- When adding JavaScript, prefer small modules with self-invoking wrappers and avoid editing the generated `webflow.js` directly unless regenerating from Webflow.

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
