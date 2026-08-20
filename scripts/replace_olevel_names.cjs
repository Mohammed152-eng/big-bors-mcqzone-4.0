const fs = require('fs');
const path = require('path');

function replaceInAllFiles(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        replaceInAllFiles(fullPath);
      }
    } else if (
      item.endsWith('.html') ||
      item.endsWith('.js') ||
      item.endsWith('.json') ||
      item.endsWith('.ts') ||
      item.endsWith('.tsx')
    ) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // Replace r/OLevels and r/olevel variants
      content = content.replace(/r\/[oO][lL]evels?/g, 'r/The_IGCSE_Workaholics');
      content = content.replace(/r\/The_The_IGCSE_Workaholics/g, 'r/The_IGCSE_Workaholics');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated r/olevel in: ${fullPath}`);
      }
    }
  }
}

replaceInAllFiles(path.join(__dirname, '../public'));
