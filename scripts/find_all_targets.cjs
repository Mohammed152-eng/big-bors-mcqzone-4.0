const fs = require('fs');
const path = require('path');

const allFiles = [];
function findFiles(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') findFiles(p);
    } else {
      allFiles.push(p);
    }
  }
}
findFiles('public');

const results = [];
for (const file of allFiles) {
  if (fs.existsSync(file) && !fs.statSync(file).isDirectory()) {
    const text = fs.readFileSync(file, 'utf8');
    const instas = text.match(/https?:\/\/(www\.)?instagram\.com\/[^\s"'\)<>]+/gi) || [];
    const discords = text.match(/https?:\/\/(www\.)?discord\.(gg|com)\/[^\s"'\)<>]+/gi) || [];
    const reddits = text.match(/https?:\/\/(www\.)?reddit\.com\/r\/[^\s"'\)<>]+/gi) || [];
    const olevelMentions = text.match(/r\/[oO][lL]evels?/g) || [];
    if (instas.length || discords.length || reddits.length || olevelMentions.length) {
      results.push({
        file,
        instas: [...new Set(instas)],
        discords: [...new Set(discords)],
        reddits: [...new Set(reddits)],
        olevelMentions: [...new Set(olevelMentions)]
      });
    }
  }
}

console.log(JSON.stringify(results, null, 2));
