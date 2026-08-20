const fs = require('fs');
const path = require('path');

const chunkPath = path.join(__dirname, '../public/_next/static/chunks/2wxi_r2v4ztim.js');
let code = fs.readFileSync(chunkPath, 'utf8');

console.log('Original chunk length:', code.length);

// 1. Map each blog module to its theme class
const moduleThemes = [
  { name: 'BlogCarelessMistakes', theme: 'blog-theme-violet' },
  { name: 'BlogMarkSchemes', theme: 'blog-theme-emerald' },
  { name: 'BlogErrorLog', theme: 'blog-theme-indigo' },
  { name: 'BlogFinal30Days', theme: 'blog-theme-orange' },
  { name: 'BlogComebackPlan', theme: 'blog-theme-amber' },
  { name: 'BlogFinal2Weeks', theme: 'blog-theme-amber' },
  { name: 'BlogTopicalsVsFullPapers', theme: 'blog-theme-teal' },
  { name: 'BlogHowWeBuiltMCQZONE  ', theme: 'blog-theme-emerald' },
  { name: 'BlogUseReportsPage', theme: 'blog-theme-cyan' },
  { name: 'BlogNightBeforeExam', theme: 'blog-theme-coral' }
];

for (const { name, theme } of moduleThemes) {
  const exportPattern = `"${name}",0,function({`;
  const exportIdx = code.indexOf(exportPattern);
  if (exportIdx !== -1) {
    // Find the return statement and the top level div className
    const returnIdx = code.indexOf('return(0,t.jsxs)("div",{className:"min-h-screen bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream transition-colors duration-500 overflow-x-hidden"', exportIdx);
    if (returnIdx !== -1 && returnIdx < exportIdx + 150) {
      const oldStr = 'return(0,t.jsxs)("div",{className:"min-h-screen bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream transition-colors duration-500 overflow-x-hidden"';
      const newStr = `return(0,t.jsxs)("div",{className:"min-h-screen bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream transition-colors duration-500 overflow-x-hidden ${theme} blog-article-body"`;
      code = code.slice(0, returnIdx) + newStr + code.slice(returnIdx + oldStr.length);
      console.log(`Injected theme ${theme} for ${name}`);
    } else {
      console.warn(`Could not find return div for ${name}`);
    }
  } else {
    console.warn(`Could not find export for ${name}`);
  }
}

// 2. Upgrade category pills in the article heroes to blog-category-pill
code = code.replaceAll(
  'className:"px-2 py-0.5 rounded-full border border-boutique-ink/10 dark:border-white/10 text-boutique-ink dark:text-boutique-cream"',
  'className:"px-3 py-1 rounded-full blog-category-pill font-black text-xs tracking-wider shadow-sm"'
);

// 3. Upgrade title accent highlight spans in headers
code = code.replaceAll(
  'className:"text-boutique-ink dark:text-boutique-sage"',
  'className:"text-[var(--b-accent,#0284c7)] dark:text-[var(--b-accent,#38bdf8)] font-black"'
);

// 4. Upgrade takeaway/summary banners
code = code.replaceAll(
  'className:"p-8 rounded-[var(--radius-modal)] bg-boutique-ink/5 dark:bg-white/5 border border-boutique-ink/10 dark:border-white/10 text-center"',
  'className:"blog-takeaway-banner text-center"'
);
code = code.replaceAll(
  'className:"p-8 rounded-[var(--radius-modal)] bg-boutique-ink/5 dark:bg-white/5 border border-boutique-ink/10 dark:border-white/10',
  'className:"blog-takeaway-banner'
);

// 5. Upgrade callout / checklist cards
code = code.replaceAll(
  'className:"flex items-center gap-3 px-4 py-3 bg-white dark:bg-dark-elevated rounded-xl border border-boutique-ink/[0.06] dark:border-white/[0.06]"',
  'className:"blog-checklist-item"'
);
code = code.replaceAll(
  'className:"flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-dark-elevated border border-boutique-ink/10 dark:border-white/10"',
  'className:"blog-callout-card flex items-start gap-4"'
);

// 6. Improve text contrast across all articles
code = code.replaceAll(
  'text-boutique-ink/80 dark:text-boutique-cream/80',
  'text-[#08111e] dark:text-[#f1f6fc] font-medium'
);
code = code.replaceAll(
  'text-boutique-ink/70 dark:text-boutique-cream/70',
  'text-[#0d1b2a] dark:text-[#e2e8f0] font-medium'
);
code = code.replaceAll(
  'text-boutique-ink/60 dark:text-boutique-cream/60',
  'text-[#152336] dark:text-[#cbd5e1] font-medium'
);

// 7. Enhance card backgrounds
code = code.replaceAll(
  'bg-boutique-ink/5 dark:bg-white/5 border border-boutique-ink/10 dark:border-white/10',
  'blog-callout-card'
);

// Verify syntax
try {
  new Function(code);
  console.log('Syntax check passed successfully! Saving chunk...');
  fs.writeFileSync(chunkPath, code, 'utf8');
  console.log('Saved chunk. New length:', code.length);
} catch (e) {
  console.error('Syntax error after transformation:', e.message);
  process.exit(1);
}
