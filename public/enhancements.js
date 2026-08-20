/**
 * MCQZONE Frontend Interactivity Engine
 * Powers the Interactive Hero MCQ Solver, Bento Grid, Floating Dock, and Cambridge Subject Switcher.
 */

(function () {
  const QUESTIONS = [
    {
      subject: 'Physics',
      code: '0625/22/M/J/24',
      topic: 'Kinematics & Speed-Time Graphs',
      colorClass: 'physics',
      badge: '0625 Physics',
      prompt: 'A car accelerates uniformly along a straight track. The speed-time graph shows its motion over 10 seconds. What is the total distance travelled?',
      svgGraphic: `
        <svg viewBox="0 0 320 120" class="w-full h-28 my-2 bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
          <line x1="30" y1="100" x2="300" y2="100" stroke="currentColor" stroke-width="2" opacity="0.4" />
          <line x1="30" y1="10" x2="30" y2="100" stroke="currentColor" stroke-width="2" opacity="0.4" />
          <polygon points="30,100 120,40 280,40 280,100" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" stroke-width="2.5" />
          <text x="35" y="25" font-size="9" fill="currentColor" font-family="monospace" opacity="0.7">Speed (m/s)</text>
          <text x="240" y="114" font-size="9" fill="currentColor" font-family="monospace" opacity="0.7">Time (s)</text>
          <text x="120" y="112" font-size="8" fill="currentColor" font-family="monospace">4s</text>
          <text x="275" y="112" font-size="8" fill="currentColor" font-family="monospace">10s</text>
          <text x="14" y="44" font-size="8" fill="currentColor" font-family="monospace">20</text>
        </svg>
      `,
      options: [
        { key: 'A', text: '80 m', correct: false },
        { key: 'B', text: '120 m', correct: false },
        { key: 'C', text: '160 m', correct: true },
        { key: 'D', text: '200 m', correct: false }
      ],
      explanation: 'Distance = Area under speed-time graph = Area of Triangle + Area of Rectangle = (1/2 × 4s × 20m/s) + (6s × 20m/s) = 40m + 120m = 160 m.'
    },
    {
      subject: 'Chemistry',
      code: '0620/21/M/J/24',
      topic: 'Stoichiometry & Mole Concept',
      colorClass: 'chemistry',
      badge: '0620 Chemistry',
      prompt: 'Which sample contains the same number of atoms as 16 g of oxygen molecules, O₂? (Ar: H=1, C=12, O=16, Mg=24)',
      svgGraphic: `
        <div class="my-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-900 dark:text-emerald-300">
          <span class="font-bold">Molar Mass Reference:</span><br/>
          • O₂ = 32 g/mol &nbsp;|&nbsp; 16g O₂ = 0.50 mol O₂ = 1.0 mol O atoms
        </div>
      `,
      options: [
        { key: 'A', text: '1.0 g of hydrogen gas, H₂', correct: false },
        { key: 'B', text: '12 g of carbon, C', correct: true },
        { key: 'C', text: '24 g of magnesium, Mg', correct: false },
        { key: 'D', text: '44 g of carbon dioxide, CO₂', correct: false }
      ],
      explanation: '16 g of O₂ = 0.5 mol of O₂ molecules = 1.0 mol of atoms (6.02 × 10²³ atoms). 12 g of Carbon (C) = 1.0 mol of C atoms.'
    },
    {
      subject: 'Biology',
      code: '0610/22/M/J/24',
      topic: 'Enzymes & Temperature Kinetics',
      colorClass: 'biology',
      badge: '0610 Biology',
      prompt: 'What happens to the active site of an enzyme when heated far beyond its optimum temperature?',
      svgGraphic: `
        <svg viewBox="0 0 320 85" class="w-full h-20 my-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg p-2 border border-rose-200 dark:border-rose-800">
          <path d="M20 70 Q160 5 200 15 T300 75" fill="none" stroke="#be123c" stroke-width="2.5" />
          <text x="140" y="20" font-size="9" fill="#be123c" font-weight="bold">Optimum (37°C)</text>
          <text x="230" y="48" font-size="8" fill="currentColor" opacity="0.8">Denaturation</text>
        </svg>
      `,
      options: [
        { key: 'A', text: 'It contracts to fit the substrate tighter', correct: false },
        { key: 'B', text: 'Its complementary shape denatures irreversibly', correct: true },
        { key: 'C', text: 'Its kinetic activation energy decreases to zero', correct: false },
        { key: 'D', text: 'It converts into a co-enzyme', correct: false }
      ],
      explanation: 'High thermal energy breaks the hydrogen and ionic bonds stabilizing the tertiary enzyme conformation, causing irreversible denaturation.'
    },
    {
      subject: 'Economics',
      code: '0455/21/M/J/24',
      topic: 'Supply & Demand Elasticity (PED)',
      colorClass: 'economics',
      badge: '0455 Economics',
      prompt: 'A firm increases the price of its product by 10% and observes a 15% fall in total quantity demanded. What is the Price Elasticity of Demand (PED)?',
      svgGraphic: `
        <div class="my-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-300">
          <span class="font-bold">Formula:</span> PED = % change in Q demanded / % change in Price
        </div>
      `,
      options: [
        { key: 'A', text: '0.67 (Price Inelastic)', correct: false },
        { key: 'B', text: '1.00 (Unitary Elastic)', correct: false },
        { key: 'C', text: '1.50 (Price Elastic)', correct: true },
        { key: 'D', text: '-2.50 (Perfect Elastic)', correct: false }
      ],
      explanation: 'PED = (-15%) / (+10%) = -1.50 (Magnitude 1.50 > 1, confirming price elasticity).'
    }
  ];

  let currentQuestionIndex = 0;
  let selectedOptionKey = null;

  function renderHeroQuestion() {
    const container = document.getElementById('interactive-hero-solver');
    if (!container) return;

    const q = QUESTIONS[currentQuestionIndex];

    const subjectPillsHtml = QUESTIONS.map((item, idx) => `
      <button type="button" class="subject-pill ${item.colorClass} ${idx === currentQuestionIndex ? 'active' : ''}" data-subject-idx="${idx}">
        <span class="w-2 h-2 rounded-full bg-current"></span>
        ${item.subject}
      </button>
    `).join('');

    const optionsHtml = q.options.map(opt => {
      let stateClass = '';
      if (selectedOptionKey) {
        if (opt.correct) stateClass = 'correct';
        else if (selectedOptionKey === opt.key) stateClass = 'incorrect';
      }
      return `
        <button type="button" class="mcq-option-btn ${stateClass}" data-opt-key="${opt.key}">
          <span class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono font-bold text-xs shrink-0">${opt.key}</span>
            <span>${opt.text}</span>
          </span>
          ${selectedOptionKey && opt.correct ? `<span class="text-xs font-bold font-mono uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">Correct ✓</span>` : ''}
          ${selectedOptionKey && selectedOptionKey === opt.key && !opt.correct ? `<span class="text-xs font-bold font-mono uppercase bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-md">Distractor ✗</span>` : ''}
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div class="glass-panel p-6 sm:p-7 relative overflow-hidden">
        <!-- Subject Pills Header -->
        <div class="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 flex-wrap">
          <div class="flex items-center gap-2 flex-wrap">
            ${subjectPillsHtml}
          </div>
          <div class="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
            <span class="pulse-dot"></span>
            <span>${q.code}</span>
          </div>
        </div>

        <!-- Question Body -->
        <div class="mb-4">
          <p class="font-mono text-xs uppercase font-extrabold text-sky-600 dark:text-sky-400 tracking-wider mb-1">${q.topic}</p>
          <h4 class="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug">${q.prompt}</h4>
          ${q.svgGraphic}
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          ${optionsHtml}
        </div>

        <!-- Explanation Dropdown -->
        ${selectedOptionKey ? `
          <div class="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-all duration-300">
            <div class="flex items-center gap-2 font-bold mb-1 text-slate-900 dark:text-white">
              <svg class="w-4 h-4 text-sky-600 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              <span>Examiner Mark Scheme Rationale:</span>
            </div>
            <p class="leading-relaxed opacity-90">${q.explanation}</p>
          </div>
        ` : `
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span>Click any choice to test instant marking</span>
            <span class="font-mono">Press 1, 2, 3, 4</span>
          </div>
        `}
      </div>
    `;

    // Add event listeners
    container.querySelectorAll('.subject-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        currentQuestionIndex = parseInt(btn.getAttribute('data-subject-idx'), 10);
        selectedOptionKey = null;
        renderHeroQuestion();
      });
    });

    container.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedOptionKey = btn.getAttribute('data-opt-key');
        renderHeroQuestion();
      });
    });
  }

  function injectFloatingDock() {
    if (document.querySelector('.floating-dock')) return;

    const dock = document.createElement('div');
    dock.className = 'floating-dock';
    dock.innerHTML = `
      <a href="#hero" class="floating-dock-btn active-pill">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span>Overview</span>
      </a>
      <a href="/app/topicals" class="floating-dock-btn">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"/></svg>
        <span>Topicals</span>
      </a>
      <a href="/app/ranked" class="floating-dock-btn">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>Ranked</span>
      </a>
      <a href="/partners" class="floating-dock-btn">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Partners</span>
      </a>
      <button type="button" id="dock-theme-toggle" class="floating-dock-btn" title="Toggle Dark/Light Mode">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      </button>
    `;

    document.body.appendChild(dock);

    document.getElementById('dock-theme-toggle')?.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      document.body.classList.toggle('dark');
    });
  }

  // Keyboard shortcut listener
  document.addEventListener('keydown', (e) => {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const keys = ['A', 'B', 'C', 'D'];
      selectedOptionKey = keys[parseInt(e.key, 10) - 1];
      renderHeroQuestion();
    }
  });

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderHeroQuestion();
      injectFloatingDock();
    });
  } else {
    renderHeroQuestion();
    injectFloatingDock();
  }
})();
