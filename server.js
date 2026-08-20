import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');

// Embed core branding SVG for guaranteed zero-dependency logo delivery
const LOGO_SVG = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" fill="#000000"/>
  <g fill="none" stroke="#FFFFFF" stroke-width="41" stroke-linecap="round" stroke-linejoin="round">
    <!-- M outer shape -->
    <path d="M 97 430 L 97 97 L 256 256 L 415 97 L 415 430" />
    <!-- C circular arc -->
    <path d="M 372.2 167.6 A 146 146 0 1 0 372.2 344.4" />
    <!-- Q stem -->
    <path d="M 256 256 L 256 430" />
  </g>
</svg>`;

// Load built-in fallback assets if available
let BUILTIN_ASSETS = {};
try {
  const assetsFile = path.join(__dirname, 'assets_data.json');
  if (fs.existsSync(assetsFile)) {
    BUILTIN_ASSETS = JSON.parse(fs.readFileSync(assetsFile, 'utf8'));
  }
} catch (e) {
  console.warn('Assets data fallback not loaded:', e.message);
}

// Remote CDN fallback map
const REMOTE_ASSET_BASE = 'https://www.quickmark.co';

function isBufferValidImage(buffer) {
  if (!buffer || buffer.length < 8) return false;
  // Corrupted UTF-8 replacement char check (EF BF BD)
  if (buffer[0] === 0xef && buffer[1] === 0xbf && buffer[2] === 0xbd) return false;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  // WebP: RIFF ... WEBP
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return true;
  // SVG
  const sample = buffer.toString('utf8', 0, 100);
  if (sample.includes('<svg') || sample.includes('<?xml')) return true;
  // WOFF2
  if (buffer.toString('ascii', 0, 4) === 'wOF2') return true;
  return false;
}

function getContentType(filename, buffer) {
  if (filename.endsWith('.svg') || (buffer && (buffer.toString('utf8', 0, 100).includes('<svg') || buffer.toString('utf8', 0, 100).includes('<?xml')))) {
    return 'image/svg+xml';
  }
  if (filename.endsWith('.png') || (buffer && buffer[0] === 0x89)) {
    return 'image/png';
  }
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || (buffer && buffer[0] === 0xff)) {
    return 'image/jpeg';
  }
  if (filename.endsWith('.webp') || (buffer && buffer.toString('ascii', 0, 4) === 'RIFF')) {
    return 'image/webp';
  }
  if (filename.endsWith('.woff2')) {
    return 'font/woff2';
  }
  return 'application/octet-stream';
}

// In-memory memory cache for fast serving
const memoryCache = new Map();

// Helper to get or recover an asset buffer
async function getAssetBuffer(relPath) {
  const cleanName = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  if (memoryCache.has(cleanName)) {
    return memoryCache.get(cleanName);
  }

  // 1. If it's SVG or PNG logo/favicon, provide instant pristine MCQ monogram
  if (cleanName === 'logo.svg' || cleanName === 'favicon.svg') {
    const buf = Buffer.from(LOGO_SVG, 'utf8');
    memoryCache.set(cleanName, buf);
    return buf;
  }

  // 2. Check local disk
  const diskPath = path.join(publicDir, cleanName);
  if (fs.existsSync(diskPath)) {
    const buf = fs.readFileSync(diskPath);
    if (isBufferValidImage(buf)) {
      memoryCache.set(cleanName, buf);
      return buf;
    }
  }

  // 3. Check built-in asset bundle
  if (BUILTIN_ASSETS[cleanName]) {
    const buf = Buffer.from(BUILTIN_ASSETS[cleanName], 'base64');
    if (isBufferValidImage(buf)) {
      memoryCache.set(cleanName, buf);
      // Auto-repair disk file
      try {
        fs.mkdirSync(path.dirname(diskPath), { recursive: true });
        fs.writeFileSync(diskPath, buf);
      } catch (e) {}
      return buf;
    }
  }

  // 4. Remote CDN fallback if needed (exclude brand logo which should always be MCQ monogram)
  if (cleanName.includes('logo') || cleanName.includes('favicon') || cleanName.includes('apple-touch')) {
    return null;
  }

  try {
    const remoteUrl = `${REMOTE_ASSET_BASE}/${cleanName}`;
    const res = await fetch(remoteUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const arrayBuf = await res.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      if (buf.length > 100) {
        memoryCache.set(cleanName, buf);
        try {
          fs.mkdirSync(path.dirname(diskPath), { recursive: true });
          fs.writeFileSync(diskPath, buf);
        } catch (e) {}
        return buf;
      }
    }
  } catch (e) {}

  return null;
}

// Auto-repair all assets on boot
(async function initAssets() {
  const assetKeys = Object.keys(BUILTIN_ASSETS);
  for (const key of assetKeys) {
    await getAssetBuffer(key);
  }
  console.log(`[MCQZONE] Verified and ready with ${assetKeys.length} image assets.`);
})();

app.use(express.json());

// API endpoints
app.get('/api/leaderboards/ranked/global', (req, res) => {
  const jsonPath = path.join(publicDir, 'api', 'leaderboards', 'ranked', 'global.json');
  const htmlPath = path.join(publicDir, 'api', 'leaderboards', 'ranked', 'global.html');
  
  res.setHeader('Content-Type', 'application/json');
  if (fs.existsSync(jsonPath)) {
    return res.sendFile(jsonPath);
  } else if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  res.json({ users: [] });
});

// Serve Next.js optimized images
app.get('/_next/image', async (req, res) => {
  let imageUrl = req.query.url;
  if (imageUrl) {
    try {
      imageUrl = decodeURIComponent(imageUrl);
    } catch (e) {}
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      try {
        const parsed = new URL(imageUrl);
        imageUrl = parsed.pathname;
      } catch (e) {
        const match = imageUrl.match(/^https?:\/\/[^\/]+(\/.*)$/);
        imageUrl = match ? match[1] : '/';
      }
    }
    const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
    const buf = await getAssetBuffer(cleanPath);
    if (buf) {
      res.setHeader('Content-Type', getContentType(cleanPath, buf));
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(buf);
    }
  }

  // Fallback to og-image
  const ogBuf = await getAssetBuffer('og-image.png');
  if (ogBuf) {
    res.setHeader('Content-Type', 'image/png');
    return res.send(ogBuf);
  }
  res.status(404).end();
});

// Intercept direct requests for media assets to guarantee valid binaries
app.get(/\.(png|jpg|jpeg|webp|svg|ico|woff2?)$/i, async (req, res, next) => {
  const cleanPath = req.path.startsWith('/') ? req.path.slice(1) : req.path;
  const buf = await getAssetBuffer(cleanPath);
  if (buf) {
    res.setHeader('Content-Type', getContentType(cleanPath, buf));
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buf);
  }
  next();
});

// Intercept RSC (React Server Component) payload requests for SPA navigation
app.use((req, res, next) => {
  if (req.headers['rsc'] === '1' || req.query._rsc) {
    let rscPath = req.path;
    if (rscPath.endsWith('/') && rscPath.length > 1) {
      rscPath = rscPath.slice(0, -1);
    }
    if (rscPath === '/' || rscPath === '') {
      rscPath = '/index';
    }
    const potentialFile = path.join(publicDir, rscPath + '.rsc.html');
    res.setHeader('Content-Type', 'text/x-component');
    return res.sendFile(potentialFile, (err) => {
      if (err) {
        res.removeHeader('Content-Type');
        next();
      }
    });
  }
  next();
});

// Serve static assets
app.use(express.static(publicDir, { redirect: false }));

// HTML page routing
app.use((req, res) => {
  let cleanPath = req.path;
  if (cleanPath.endsWith('/') && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (cleanPath === '' || cleanPath === '/') {
    cleanPath = '/index.full';
  }
  
  const candidateHtml = path.join(publicDir, cleanPath + '.html');
  if (fs.existsSync(candidateHtml)) {
    return res.sendFile(candidateHtml);
  }
  
  const candidateIndex = path.join(publicDir, cleanPath, 'index.html');
  if (fs.existsSync(candidateIndex)) {
    return res.sendFile(candidateIndex);
  }
  
  const indexPath = path.join(publicDir, 'index.full.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(404).send('Not Found');
});

app.listen(PORT, HOST, () => {
  console.log(`MCQ ZONE platform running at http://${HOST}:${PORT}`);
});
