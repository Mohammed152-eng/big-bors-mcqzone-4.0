const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// 1. Inject enhancements.css and enhancements.js in index.full.html
const indexPath = path.join(publicDir, 'index.full.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Add css in head
  if (!html.includes('enhancements.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/enhancements.css" /></head>');
  }

  // Add js in body
  if (!html.includes('enhancements.js')) {
    html = html.replace('</body>', '<script src="/enhancements.js"></script></body>');
  }

  // Replace the static right-hand hero paper card with our interactive solver container
  const heroCardRegex = /<div class="relative order-1 mx-auto w-full max-w-\[420px\][\s\S]*?<\/ul><\/div><\/div>/;
  if (heroCardRegex.test(html)) {
    html = html.replace(heroCardRegex, '<div id="interactive-hero-solver" class="order-1 w-full max-w-[500px] shrink-0 md:order-2 md:mx-0"></div>');
    console.log('Replaced hero paper card with interactive-hero-solver.');
  }

  // Inject the modern Bento Grid section right after the hero section
  const bentoSectionHtml = `
    <!-- Bento Grid Showcase -->
    <section class="relative mx-auto mt-20 max-w-6xl px-4 sm:px-6">
      <div class="mb-10 text-center sm:text-left">
        <span class="eyebrow text-sky-600 dark:text-sky-400 font-mono text-[11px] font-black uppercase tracking-wider">Next-Gen Exam Workspace</span>
        <h2 class="display-sm mt-2 text-3xl sm:text-4xl font-black tracking-tight text-boutique-ink dark:text-boutique-cream">Engineered for Cambridge Top Scorers</h2>
        <p class="mt-2 text-sm sm:text-base text-boutique-ink/60 dark:text-boutique-cream/60 max-w-xl">Master topics with high-density topical drills, real-time error diagnostics, and peer-to-peer sprint rankings.</p>
      </div>

      <div class="bento-grid">
        <!-- Bento Card 1: Topical Mastery Map (Wide) -->
        <div class="bento-card-main glass-panel p-6 sm:p-8">
          <div class="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <span class="font-mono text-[10px] uppercase font-black text-sky-600 dark:text-sky-400 tracking-wider">Syllabus Breakdown</span>
              <h3 class="text-xl sm:text-2xl font-black text-boutique-ink dark:text-boutique-cream mt-0.5">Topical Mastery Matrix</h3>
            </div>
            <a href="/app/topicals" class="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
              <span>View all 52 topics</span>
              <span>→</span>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span class="text-slate-800 dark:text-slate-200">0625 Physics · Thermal Physics</span>
                </span>
                <span class="font-mono text-sky-600 dark:text-sky-400">92%</span>
              </div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-sky-500 rounded-full" style="width: 92%"></div>
              </div>
              <p class="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">182 MCQs · 14 Grade 9 Traps masterable</p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="text-slate-800 dark:text-slate-200">0620 Chemistry · Stoichiometry</span>
                </span>
                <span class="font-mono text-emerald-600 dark:text-emerald-400">88%</span>
              </div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full" style="width: 88%"></div>
              </div>
              <p class="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">210 MCQs · Mole calculations & gas laws</p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span class="text-slate-800 dark:text-slate-200">0610 Biology · Plant Nutrition</span>
                </span>
                <span class="font-mono text-rose-600 dark:text-rose-400">95%</span>
              </div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-rose-500 rounded-full" style="width: 95%"></div>
              </div>
              <p class="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">145 MCQs · Photosynthesis & leaf anatomy</p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span class="text-slate-800 dark:text-slate-200">0455 Economics · Price Elasticity</span>
                </span>
                <span class="font-mono text-amber-600 dark:text-amber-400">84%</span>
              </div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-amber-500 rounded-full" style="width: 84%"></div>
              </div>
              <p class="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">160 MCQs · PED & PES curve calculations</p>
            </div>
          </div>
        </div>

        <!-- Bento Card 2: 1v1 Peer Sprint Arena (Side) -->
        <div class="bento-card-side glass-panel p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="font-mono text-[10px] uppercase font-black text-rose-600 dark:text-rose-400 tracking-wider">Live Matchmaking</span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                Arena Open
              </span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black text-boutique-ink dark:text-boutique-cream">Competitive Sprint</h3>
            <p class="mt-2 text-xs text-boutique-ink/65 dark:text-boutique-cream/65 leading-relaxed">Battle peers under authentic 45-second timers with instant ELO grade scaling.</p>

            <div class="mt-5 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div class="flex items-center justify-between text-xs font-bold mb-2">
                <span class="text-slate-900 dark:text-white font-mono">You (1,840 ELO)</span>
                <span class="text-rose-500 font-mono">Rival (1,825 ELO)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-sky-500 rounded-full"></div>
                <span class="font-mono text-[10px] font-bold text-slate-400">VS</span>
                <div class="flex-1 h-2 bg-rose-500 rounded-full"></div>
              </div>
              <div class="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>⏱ 00:24 remaining</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">🔥 3x Combo</span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <a href="/app/ranked" class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity">
              <span>Enter Ranked Arena</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Insert bento grid after the first section container
  if (!html.includes('Next-Gen Exam Workspace')) {
    const splitPoint = html.indexOf('</section>');
    if (splitPoint !== -1) {
      html = html.slice(0, splitPoint + 10) + bentoSectionHtml + html.slice(splitPoint + 10);
      console.log('Inserted Bento Grid section.');
    }
  }

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated index.full.html.');
}
