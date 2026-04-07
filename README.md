# Fashion Parade Singapore — Website Platform

A fully operational Node.js web platform for Fashion Parade Singapore, built for the Q3/Q4 2026 digital relaunch.

## Quick Start

```bash
npm install
node server.js
```

Visit: http://localhost:3000  
Admin: http://localhost:3000/admin  
Admin password: `fashionparade2026`

## Deploy to Railway (recommended — free tier)

1. Push this folder to a GitHub repository
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set environment variable: `ADMIN_PASSWORD=your_secure_password`
4. Railway auto-detects Node.js and runs `npm start`
5. Your site goes live at a `*.railway.app` URL in ~2 minutes

## Deploy to Render (alternative free option)

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set Build Command: `npm install`, Start Command: `node server.js`
4. Set environment variable: `ADMIN_PASSWORD=your_secure_password`

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | 3000 | Server port (auto-set by Railway/Render) |
| `ADMIN_PASSWORD` | fashionparade2026 | Admin dashboard password |
| `SESSION_SECRET` | fp-secret-2026 | Session encryption key |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, gallery, events |
| `/events` | Event listings with registration |
| `/volunteer` | Volunteer landing and 3-step application |
| `/membership` | Community membership sign-up |
| `/impact` | Live public impact dashboard |
| `/resources` | Volunteer content bank |
| `/contact` | Six-pathway partnership intake |
| `/admin` | Password-protected EXCO dashboard |

## Tech Stack

- **Backend:** Node.js + Express
- **Templates:** EJS
- **Data:** JSON flat-file (no database setup needed)
- **Styling:** Custom CSS with CSS variables
- **Mobile:** Fully responsive, tested at 390px (iPhone 13)
