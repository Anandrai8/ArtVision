# React Internship Assignment - Art Gallery

This repository contains a **Vite + React + TypeScript** frontend and a minimal **Express** backend proxy.

## Features implemented (per assignment)
- Vite + TypeScript
- PrimeReact DataTable
- Server-side pagination (page change fetches API)
- Row selection with checkboxes
- Selection persists across pages using localStorage (only selected IDs + title saved, not all rows)
- Custom selection panel showing selected count and top selected titles

## What to update after download
- No API key required. The app uses a backend proxy at `/api/artworks?page=X` to fetch `https://api.artic.edu/api/v1/artworks?page=X`.
- If you deploy frontend-only to Netlify/Cloudflare Pages, you can remove the `server` proxy and call the API directly in `ArtTable.tsx` by replacing `/api/artworks` with `https://api.artic.edu/api/v1/artworks`.
- To deploy with backend (recommended for CORS control), deploy the `server` folder to a Node host (Render, Railway, Fly, Heroku, etc.) and update frontend axios base URL if needed.

## Run locally (frontend)
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Run backend (optional)
1. `cd server`
2. `npm install`
3. `node index.js`
4. Backend listens on port 4000 and proxies `/api/artworks?page=1` to the external API.

## Build for production
1. `cd frontend`
2. `npm run build`
3. Serve `dist/` using static host or the `server` express app which can serve static files.

