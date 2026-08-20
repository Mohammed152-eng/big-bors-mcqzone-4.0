const fs = require('fs');
const path = require('path');

const chunkDir = path.join(__dirname, '../public/_next/static/chunks');
const files = [
  '04egqlolbfs2g.js', '04zzy8-1336-8.js', '0_5rqzqkzazfl.js', '1fwsrixvsol8d.js',
  '1w1sqtys51p87.js', '2ul3_73_rc7ql.js', '2z6dy-m--itrn.js', '3nkeco0z1yrfm.js',
  '3xci5t8znf755.js', '41dvkr2o9_lsq.js', '44qoko-mz0h5s.js'
];

for (const f of files) {
  const code = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  console.log(`\n=== ${f} ===`);
  const regex = /(?:https?:\/\/[^\s"'\)]*(?:instagram|discord|reddit)[^\s"'\)]*|r\/[oO][lL]evels?|loved on r\/[^\s"'\)]+)/gi;
  let match;
  while ((match = regex.exec(code)) !== null) {
    const start = Math.max(0, match.index - 60);
    const end = Math.min(code.length, match.index + match[0].length + 60);
    console.log(`[${match[0]}] -> ...${code.slice(start, end)}...`);
  }
}
