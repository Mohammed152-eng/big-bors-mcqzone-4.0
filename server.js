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

// JSON parsing middleware
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

function getBufferContentType(buffer) {
  if (!buffer || buffer.length < 4) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image/png';
  }
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return 'image/webp';
  }
  if (buffer.toString('utf8', 0, 5).toLowerCase().includes('<svg') || buffer.toString('utf8', 0, 10).toLowerCase().includes('<?xml')) {
    return 'image/svg+xml';
  }
  return null;
}

function getImageContentType(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(32);
    fs.readSync(fd, buffer, 0, 32, 0);
    fs.closeSync(fd);
    return getBufferContentType(buffer);
  } catch (e) {}
  return null;
}

// Serve /_next/image dynamically for Next.js Image Optimization
app.get('/_next/image', (req, res) => {
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
        if (match) {
          imageUrl = match[1];
        } else {
          imageUrl = '/';
        }
      }
    }
    const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
    const targetFile = path.join(publicDir, cleanPath);
    if (fs.existsSync(targetFile)) {
      const mime = getImageContentType(targetFile);
      if (mime) res.type(mime);
      return res.sendFile(targetFile);
    }
  }
  const fallback = path.join(publicDir, 'og-image.png');
  if (fs.existsSync(fallback)) {
    const mime = getImageContentType(fallback);
    if (mime) res.type(mime);
    return res.sendFile(fallback);
  }
  res.status(404).end();
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
    
    // Set proper Next.js React Server Component content type
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

// Serve static assets directly from public directory
app.use(express.static(publicDir, { redirect: false }));

// Serve HTML pages matching the route if available, otherwise fallback to index.full.html
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
