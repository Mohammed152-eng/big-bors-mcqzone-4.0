const fs = require('fs');
const path = require('path');

const NEW_INSTAGRAM_URL = 'https://www.instagram.com/tiw_official1?igsh=MXNnYmZzanJxdHNhMg==';
const NEW_DISCORD_URL = 'https://discord.gg/hfCbmvrpfD';
const NEW_REDDIT_URL = 'https://www.reddit.com/r/The_IGCSE_Workaholics';
const NEW_COMMUNITY_NAME = 'r/The_IGCSE_Workaholics';

function updateFileContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Instagram links
  // Match variations like https://instagram.com/mcqzone, https://www.instagram.com/mcqzone, https://instagram.com/mcqzone  .co, etc.
  content = content.replace(/https?:\/\/(?:www\.)?instagram\.com\/[^\s"'\\<>]+/gi, NEW_INSTAGRAM_URL);

  // 2. Discord links
  // Match discord.com/users/..., discord.gg/olevels, discord.gg/...
  content = content.replace(/https?:\/\/(?:www\.)?discord\.(?:com\/users\/\d+|gg\/[^\s"'\\<>]+)/gi, NEW_DISCORD_URL);

  // 3. Reddit links
  content = content.replace(/https?:\/\/(?:www\.)?reddit\.com\/r\/[oO][lL]evels?[^\s"'\\<>]*/gi, NEW_REDDIT_URL);

  // 4. Text mentions
  content = content.replace(/loved on r\/[oO][lL]evels/gi, 'loved on r/The_IGCSE_Workaholics');
  content = content.replace(/Loved on r\/[oO][lL]evels/gi, 'Loved on r/The_IGCSE_Workaholics');
  content = content.replace(/Partnered with r\/OLevels, the student-run O Level community\./gi, 'Partnered with r/The_IGCSE_Workaholics, the student-run IGCSE community.');
  content = content.replace(/Partnered with r\/olevels?, the student-run O Level community\./gi, 'Partnered with r/The_IGCSE_Workaholics, the student-run IGCSE community.');

  // Partners specific replacements
  if (filePath.includes('partners.html') || filePath.includes('partners.rsc.html')) {
    content = content.replace(/"r\/OLevels"/g, `"${NEW_COMMUNITY_NAME}"`);
    content = content.replace(/>r\/OLevels</g, `>${NEW_COMMUNITY_NAME}<`);
    content = content.replace(/alt="r\/OLevels"/g, `alt="${NEW_COMMUNITY_NAME}"`);
    content = content.replace(
      /r\/OLevels is a vibrant, student-led community on Reddit dedicated to supporting Cambridge and Pearson Edexcel O Level candidates worldwide\./g,
      'r/The_IGCSE_Workaholics is a vibrant, student-led community on Reddit dedicated to supporting Cambridge and Pearson Edexcel IGCSE candidates worldwide.'
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Update all HTML, RSC, and JS files in public
function traverseDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        traverseDir(fullPath);
      }
    } else if (
      item.endsWith('.html') ||
      item.endsWith('.js') ||
      item.endsWith('.json') ||
      item.endsWith('.ts') ||
      item.endsWith('.tsx')
    ) {
      updateFileContent(fullPath);
    }
  }
}

console.log('Starting universal updates for Instagram, Discord, Reddit, and Partners banner...');
traverseDir(path.join(__dirname, '../public'));
if (fs.existsSync(path.join(__dirname, '../src'))) {
  traverseDir(path.join(__dirname, '../src'));
}

console.log('Finished updating files.');
