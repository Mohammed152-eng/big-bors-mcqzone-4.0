const fs = require('fs');
const path = require('path');

const tiwLogoPath = path.join(__dirname, '../public/tiw-logo.png');
const tiwBannerPath = path.join(__dirname, '../public/tiw-banner-new.png');

if (!fs.existsSync(tiwLogoPath) || !fs.existsSync(tiwBannerPath)) {
  console.error('Missing tiw-logo or tiw-banner-new in public/');
  process.exit(1);
}

const logoBuf = fs.readFileSync(tiwLogoPath);
const bannerBuf = fs.readFileSync(tiwBannerPath);

// Copy to all known filenames
const logoFiles = [
  'tiw-logo.png',
  'olevels-logo.png',
  'the-igcse-workaholics-logo.png',
  'tiw-pixel-cap-logo.png'
];

const bannerFiles = [
  'tiw-banner.png',
  'tiw-banner-new.png',
  'olevels-banner.png',
  'the-igcse-workaholics-banner.png',
  'tiw-community-banner.png'
];

for (const f of logoFiles) {
  fs.writeFileSync(path.join(__dirname, '../public', f), logoBuf);
}

for (const f of bannerFiles) {
  fs.writeFileSync(path.join(__dirname, '../public', f), bannerBuf);
}

console.log('All image binaries synchronized on disk.');

// Update assets_data.json
if (fs.existsSync(path.join(__dirname, '../assets_data.json'))) {
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets_data.json'), 'utf8'));
  for (const f of logoFiles) {
    assets[f] = logoBuf.toString('base64');
  }
  for (const f of bannerFiles) {
    assets[f] = bannerBuf.toString('base64');
  }
  fs.writeFileSync(path.join(__dirname, '../assets_data.json'), JSON.stringify(assets), 'utf8');
  console.log('Updated assets_data.json with all logo and banner keys.');
}

// Function to recursively replace all references across public/
function replaceInDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules') replaceInDir(p);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.rsc.html') || f.endsWith('.json')) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = false;

      // Replace olevels-logo.png references
      if (content.includes('olevels-logo.png')) {
        content = content.replace(/%2Folevels-logo\.png/g, '%2Ftiw-logo.png%3Fv%3D2026');
        content = content.replace(/\/olevels-logo\.png/g, '/tiw-logo.png?v=2026');
        modified = true;
      }

      // Replace olevels-banner.png references
      if (content.includes('olevels-banner.png')) {
        content = content.replace(/%2Folevels-banner\.png/g, '%2Ftiw-banner.png%3Fv%3D2026');
        content = content.replace(/\/olevels-banner\.png/g, '/tiw-banner.png?v=2026');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated references in:', p);
      }
    }
  }
}

replaceInDir(path.join(__dirname, '../public'));

console.log('Successfully completed full replacement.');
