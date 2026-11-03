# Shinobi Siege

Ninja action game in a single HTML file (`src/index.html`).

## Build

```
node tools/build.mjs
```

- `dist/web/` — own website, deployed by Vercel (installable PWA, works offline; no CrazyGames SDK, purchases or ads).
- `dist/crazygames/index.html` — upload this file itself to the CrazyGames Developer Portal (the portal does not accept zip files, and the name must be exactly `index.html`).

## Deploy

Vercel is connected to this repository: every push to `main` deploys automatically (settings come from `vercel.json`).

`store/` holds the cover images and preview videos used for portal submissions.
