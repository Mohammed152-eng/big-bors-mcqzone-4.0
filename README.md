# MCQ ZONE

An interactive past-paper practice and topical assessment web platform for Cambridge IGCSE, O Level, and A Level students.

## Features

- **Topical Drills & Past Paper Practice**: Practice Cambridge past papers with instant feedback, marking schemes, and detailed explanations.
- **Ranked Leaderboards**: Global and topical leaderboard rankings.
- **Performance Analytics & Error Logs**: In-depth reporting, mistake tracking, and review workflows.
- **Progressive Web App (PWA)**: Full offline-ready PWA support for mobile and desktop.
- **Fast Dynamic Image Optimization**: High-performance image serving pipeline.

## Project Structure

```
├── public/                # Static assets, routes, images, styles, and data
│   ├── api/               # API JSON mock and data endpoints
│   ├── _next/             # Next.js bundles and optimized assets
│   ├── blog/              # Blog pages & resources
│   ├── app/               # Practice and test modules
│   ├── favicon.png        # Brand favicon & app icons
│   ├── logo.svg           # Brand vector logo
│   └── manifest.webmanifest # PWA configuration
├── server.js              # Production-grade Node.js / Express server
├── metadata.json          # Platform metadata
└── package.json           # Project dependencies and run scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- npm / yarn / pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is fully containerized and compatible with any cloud provider (Google Cloud Run, Vercel, Netlify, Render, Railway, AWS ECS) or static hosting setup.
