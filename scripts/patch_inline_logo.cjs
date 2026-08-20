const fs = require('fs');
const path = require('path');

const logoBuf = fs.readFileSync(path.join(__dirname, '../public/tiw-logo.png'));
const bannerBuf = fs.readFileSync(path.join(__dirname, '../public/tiw-banner-new.png'));

const logoBase64 = 'data:image/png;base64,' + logoBuf.toString('base64');
const bannerBase64 = 'data:image/png;base64,' + bannerBuf.toString('base64');

// 1. Force the logo in HTML files
function patchHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace any partner logo img in html
  // Find img inside partner container or img with alt="r/The_IGCSE_Workaholics"
  const partnerLogoRegex = /<img[^>]*alt="r\/The_IGCSE_Workaholics"[^>]*>/g;
  if (partnerLogoRegex.test(html)) {
    html = html.replace(partnerLogoRegex, `<img alt="r/The_IGCSE_Workaholics" src="${logoBase64}" class="object-contain p-1 w-full h-full" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" />`);
    changed = true;
  }

  // Also replace any other olevels-logo.png occurrences with the base64 or tiw-logo
  if (html.includes('olevels-logo.png')) {
    html = html.replace(/\/olevels-logo\.png/g, '/tiw-logo.png?v=999');
    html = html.replace(/%2Folevels-logo\.png/g, '%2Ftiw-logo.png%3Fv%3D999');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Patched HTML:', filePath);
  }
}

// 2. Patch JS chunks so hydration also renders the inline logo or tiw-logo
function patchChunk(filePath) {
  let js = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (js.includes('/olevels-logo.png')) {
    js = js.replace(/\/olevels-logo\.png/g, '/tiw-logo.png?v=999');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, js, 'utf8');
    console.log('Patched JS chunk:', filePath);
  }
}

function traverse(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules') traverse(p);
    } else if (f.endsWith('.html')) {
      patchHtmlFile(p);
    } else if (f.endsWith('.js')) {
      patchChunk(p);
    }
  }
}

traverse(path.join(__dirname, '../public'));
console.log('Done applying inline patch.');
