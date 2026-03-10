# Omshri Singh | Full-Stack Developer & Photographer

A premium, single-page portfolio built with React + Vite. It showcases experience, projects, education, milestones, and contact details with smooth reveal animations and 3D hover interactions.

## Live

- Portfolio: `https://omshri-23.github.io/omshri-portfolio/` (update if different)

## Highlights

- Experience cards with 3D lighting + interactive skill tags
- Projects grid with Live + GitHub links
- Journey timeline with hoverable score pills (SSC/HSC/CGPA)
- Milestones cards with subtle floating motion
- Responsive design for mobile and desktop

## Tech Stack

- React
- Vite
- CSS (custom design + animations)

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm (bundled with Node)

## Local Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` Start local dev server
- `npm run build` Production build to `dist`
- `npm run preview` Preview the production build

## Customization

Main content lives in `src/App.jsx`:

- `experience`, `projects`, `journey`, `education`, `milestones`
- contact links in the Contact section

Design and animations live in `src/App.css`.

## Deployment

This site builds to static files.

- Build command: `npm run build`
- Output folder: `dist`

You can deploy `dist` to Vercel/Netlify/Cloudflare Pages or any static host. If you deploy to GitHub Pages under a subpath, set the Vite `base` option accordingly.

## Copyright

All rights reserved. See `LICENSE`.
