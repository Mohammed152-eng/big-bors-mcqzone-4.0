const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

function injectInHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!html.includes('enhancements.css') && html.includes('</head>')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/enhancements.css" /></head>');
    changed = true;
  }

  if (!html.includes('enhancements.js') && html.includes('</body>')) {
    html = html.replace('</body>', '<script src="/enhancements.js"></script></body>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Injected enhancements in:', filePath);
  }
}

function traverse(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules') traverse(p);
    } else if (f.endsWith('.html') && !f.endsWith('.rsc.html')) {
      injectInHtml(p);
    }
  }
}

traverse(publicDir);
console.log('All HTML pages updated with global enhancements.');
