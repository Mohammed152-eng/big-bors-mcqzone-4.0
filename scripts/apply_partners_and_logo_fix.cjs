const fs = require('fs');
const path = require('path');

// 1. Read the newly downloaded TIW banner and TIW logo
const bannerBuf = fs.readFileSync(path.join(__dirname, '../public/tiw-banner-new.png'));
const logoBuf = fs.readFileSync(path.join(__dirname, '../public/tiw-logo.png'));

// Write to all file variants in public/
const bannerNames = [
  'tiw-banner.png',
  'tiw-banner-new.png',
  'the-igcse-workaholics-banner.png',
  'olevels-banner.png'
];

for (const bName of bannerNames) {
  fs.writeFileSync(path.join(__dirname, '../public', bName), bannerBuf);
}

const logoNames = [
  'tiw-logo.png',
  'the-igcse-workaholics-logo.png',
  'olevels-logo.png'
];

for (const lName of logoNames) {
  fs.writeFileSync(path.join(__dirname, '../public', lName), logoBuf);
}

// 2. Update assets_data.json
if (fs.existsSync(path.join(__dirname, '../assets_data.json'))) {
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets_data.json'), 'utf8'));
  for (const bName of bannerNames) {
    assets[bName] = bannerBuf.toString('base64');
  }
  for (const lName of logoNames) {
    assets[lName] = logoBuf.toString('base64');
  }
  fs.writeFileSync(path.join(__dirname, '../assets_data.json'), JSON.stringify(assets), 'utf8');
  console.log('Updated assets_data.json');
}

// 3. Build complete partners.html
const partnersHtmlPath = path.join(__dirname, '../public/partners.html');
let partnersHtml = fs.readFileSync(partnersHtmlPath, 'utf8');

const renderedPartnersMain = `<main class="flex-1">
  <section class="relative py-20 sm:py-32 md:py-40 px-4 sm:px-6 overflow-hidden">
    <div class="absolute top-20 -right-32 w-64 h-64 bg-boutique-sage/20 dark:bg-boutique-sage/10 rounded-full blur-3xl animate-blob"></div>
    <div class="absolute bottom-20 -left-32 w-64 h-64 bg-boutique-coral/20 dark:bg-boutique-coral/10 rounded-full blur-3xl animate-blob" style="animation-delay:1s"></div>
    <div class="max-w-4xl mx-auto relative z-10 text-center space-y-8">
      <a href="/" class="inline-flex items-center gap-2 text-sm font-bold text-boutique-ink/60 dark:text-boutique-cream/60 hover:text-boutique-sage-deep dark:hover:text-boutique-sage transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <span>Back to home</span>
      </a>
      <div>
        <div class="inline-block mb-4">
          <div class="h-[2px] w-12 bg-boutique-sage mx-auto mb-3"></div>
          <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/60 dark:text-boutique-cream/60">Our partners</p>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-boutique-ink dark:text-boutique-cream mb-6">Built with student communities</h1>
        <p class="text-lg sm:text-xl font-medium text-boutique-ink/60 dark:text-boutique-cream/70 max-w-3xl mx-auto">We partner with communities and organizations that share our vision: making quality exam practice free and accessible to every student, everywhere.</p>
      </div>
    </div>
  </section>
  <section class="relative py-12 sm:py-16 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto">
      <div class="grid gap-8">
        <article class="paper-sheet p-8 sm:p-12">
          <div class="space-y-8">
            <div class="relative w-full rounded-[var(--radius-control)] overflow-hidden border-2 border-boutique-ink/10 dark:border-white/10 bg-white dark:bg-dark-bg shadow-md">
              <img src="/tiw-banner.png?v=3" alt="r/The_IGCSE_Workaholics" width="1200" height="360" class="w-full h-auto object-cover" />
            </div>
            <div class="space-y-6">
              <div>
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <h2 class="text-3xl sm:text-4xl font-black text-boutique-ink dark:text-boutique-cream">r/The_IGCSE_Workaholics</h2>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.16em] bg-boutique-sage/20 text-boutique-sage-deep dark:text-boutique-sage border border-boutique-sage/30">Verified partner</span>
                </div>
                <p class="text-sm font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em] mb-4">Student-led community · Reddit &amp; Discord</p>
                <div class="prose prose-lg max-w-none">
                  <p class="text-base sm:text-lg leading-relaxed text-boutique-ink/80 dark:text-boutique-cream/80 font-medium">r/The_IGCSE_Workaholics is a vibrant, student-led community dedicated to supporting Cambridge and Pearson Edexcel IGCSE candidates worldwide. Built on the principle of &quot;students helping students&quot;, the community serves as a study hub where learners exchange resources, clarify complex concepts, and share past paper strategies. Beyond just academics, it offers a crucial space for peer support, helping students navigate the high-pressure exam season with shared experiences and collective motivation.</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-6">
                <div class="space-y-1">
                  <p class="text-2xl sm:text-3xl font-black text-boutique-ink dark:text-boutique-cream">8K+</p>
                  <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em]">Weekly visitors</p>
                </div>
                <div class="space-y-1">
                  <p class="text-2xl sm:text-3xl font-black text-boutique-ink dark:text-boutique-cream">Global</p>
                  <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em]">Reach</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-4 pt-2">
                <a href="https://www.reddit.com/r/The_IGCSE_Workaholics" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-boutique-ink bg-boutique-ink text-boutique-cream rounded-full font-black text-sm shadow-[var(--shadow-sticker-soft)] transition-shadow duration-150 hover:shadow-[var(--shadow-sticker-soft-lift)] active:shadow-none dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:shadow-[var(--shadow-sticker-dark)]">
                  <span>Visit community</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </a>
                <a href="https://discord.gg/hfCbmvrpfD" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-boutique-ink/20 dark:border-white/20 text-boutique-ink dark:text-boutique-cream rounded-full font-black text-sm hover:border-boutique-sage/40 dark:hover:border-boutique-sage/40 hover:bg-boutique-sage/10 dark:hover:bg-white/10 transition-colors">
                  <span>Join Discord</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section class="relative py-20 sm:py-24 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto text-center space-y-6">
      <div class="organic-blob w-96 h-96 bg-boutique-sage/10 -z-10" style="top:-10%;left:50%;transform:translateX(-50%)"></div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-boutique-ink dark:text-boutique-cream">Interested in partnering?</h2>
      <p class="text-base sm:text-lg font-medium text-boutique-ink/60 dark:text-boutique-cream/70">We're always looking to collaborate with student communities and educational organizations that share our mission.</p>
      <a href="mailto:hello@mcqzone.co" class="inline-flex items-center gap-3 px-8 py-4 border-2 border-boutique-ink bg-boutique-ink text-boutique-cream rounded-full font-black text-base shadow-[var(--shadow-sticker-soft)] transition-shadow duration-150 hover:shadow-[var(--shadow-sticker-soft-lift)] active:shadow-none dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:shadow-[var(--shadow-sticker-dark)]">
        <span>Get in touch</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </a>
    </div>
  </section>
</main>`;

partnersHtml = partnersHtml.replace(/<main[\s\S]*?<\/main>/, renderedPartnersMain);
fs.writeFileSync(partnersHtmlPath, partnersHtml, 'utf8');
console.log('Updated public/partners.html with rendered main section');

// 4. Update index.full.html for the partner logo
const indexPath = path.join(__dirname, '../public/index.full.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace the partner card image tag in index.full.html
indexHtml = indexHtml.replace(
  /<img alt="r\/The_IGCSE_Workaholics"[\s\S]*?src="\/_next\/image\?url=%2Folevels-logo\.png[^"]*"\/>/,
  `<img alt="r/The_IGCSE_Workaholics" loading="lazy" decoding="async" class="object-contain p-1 w-full h-full" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="/tiw-logo.png?v=3" srcSet="/tiw-logo.png?v=3 1x, /tiw-logo.png?v=3 2x"/>`
);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated public/index.full.html partner logo image');

// 5. Update JS chunks if they reference olevels-logo.png
const chunkPath = path.join(__dirname, '../public/_next/static/chunks/3nkeco0z1yrfm.js');
if (fs.existsSync(chunkPath)) {
  let chunkContent = fs.readFileSync(chunkPath, 'utf8');
  chunkContent = chunkContent.replace(/\/olevels-logo\.png/g, '/tiw-logo.png?v=3');
  fs.writeFileSync(chunkPath, chunkContent, 'utf8');
  console.log('Updated 3nkeco0z1yrfm.js');
}

console.log('Done.');
