# DENSHALED

A static website inspired by the layout style of the FreedomTrain article page ([reference](https://freedomtrain.jp/mamouna_owo/5425/)), rebuilt as an interactive Japanese train LED screen simulator.

## What this site includes

- Mint-toned, rounded-card layout inspired by the reference article design
- Interactive train LED display simulation with:
  - line presets (小田急線 / 山手線 / 京王線 / 東急東横線)
  - service type (各駅停車 / 快速 / 急行 / 特急)
  - destination + next station switching
  - door-side announcements (left/right/both)
  - live clock and train number
  - scrolling LED information text
- Responsive behavior for desktop and mobile

## Files

- `index.html`: page structure and content
- `styles.css`: visual system and responsive layout
- `script.js`: LED simulator logic and interactions
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Run locally

```bash
# from repository root
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Deploy to GitHub Pages

This repository is configured to deploy automatically via GitHub Actions on every push to `main`.

1. Push changes to `main`.
2. In GitHub repo settings, ensure **Pages** uses **GitHub Actions** as source.
3. Confirm the workflow `Deploy DENSHALED to GitHub Pages` succeeds.

The workflow is defined in:

- `.github/workflows/deploy-pages.yml`

## Notes

- The implementation follows the **style direction** of the reference page, not a literal copy of article content.
- Deployment artifact excludes `.git`, `.github`, Playwright outputs, and local debug folders.
