/* GROOM PERÚ — landing logic
   - sede switcher (San Miguel / Jesús María) → updates prices everywhere
   - service tier tabs (Classic / Premium / Gold)
   - hero slider with auto-rotate */

// ─────────── PRICES ───────────
// Source of truth — keys: [tier].[size].[hairType] = number (S/.)
// Sizes used per sede may differ slightly per the real price sheets.
const PRICES = {
  'san-miguel': {
    classic: {
      toy:           { corto: 30, largo: 35 },
      mediano:       { corto: 40, largo: 45 },
      estandar:      { corto: 50, largo: 60 },
      gigante:       { corto: 60, largo: 70 },
      'extra-gigante': { corto: 80, largo: 90 }
    },
    premium: {
      toy:           { corto: 45, largo: 50 },
      mediano:       { corto: 50, largo: 55 },
      estandar:      { corto: 60, largo: 70 },
      gigante:       { corto: 80, largo: 90 },
      'extra-gigante': { corto: 90, largo: 110 }
    },
    gold: {
      toy:           { corto: 60, largo: 75 },
      mediano:       { corto: 75, largo: 90 },
      estandar:      { corto: 90, largo: 105 },
      gigante:       { corto: 110, largo: 125 },
      'extra-gigante': { corto: 125, largo: 145 }
    },
    cortes: {
      'toy':        35,
      'mediano':    40,
      'gigante':    55
    },
    tratamiento:    { 'peq-med': 20, 'est-gra': 30 }
  },
  'jesus-maria': {
    classic: {
      toy:           { corto: 35, largo: 40 },
      mediano:       { corto: 40, largo: 45 },
      estandar:      { corto: 50, largo: 65 },
      grande:        { corto: 70, largo: 80 },
      gigante:       { corto: 85, largo: 95 }
    },
    premium: {
      toy:           { corto: 45, largo: 50 },
      mediano:       { corto: 50, largo: 60 },
      estandar:      { corto: 60, largo: 75 },
      grande:        { corto: 80, largo: 95 },
      gigante:       { corto: 95, largo: 115 }
    },
    gold: {
      toy:           { corto: 60, largo: 75 },
      mediano:       { corto: 75, largo: 90 },
      estandar:      { corto: 90, largo: 105 },
      grande:        { corto: 110, largo: 125 },
      gigante:       { corto: 125, largo: 145 }
    },
    cortes: {
      'peq-med':    45,
      'est-gra':    60,
      'gigante':    70
    },
    tratamiento:    { 'peq-med': 20, 'est-gra': 30 }
  }
};

// Size labels per sede (the SM and JM price sheets use slightly different size names)
const SIZE_LABELS = {
  'san-miguel': [
    { key: 'toy',           label: 'Doggy Toy' },
    { key: 'mediano',       label: 'Mediano' },
    { key: 'estandar',      label: 'Estándar' },
    { key: 'gigante',       label: 'Gigante' },
    { key: 'extra-gigante', label: 'Extra Gigante' }
  ],
  'jesus-maria': [
    { key: 'toy',     label: 'Toy' },
    { key: 'mediano', label: 'Mediano' },
    { key: 'estandar',label: 'Estándar' },
    { key: 'grande',  label: 'Grande' },
    { key: 'gigante', label: 'Gigante' }
  ]
};

const TIER_INFO = {
  classic: {
    name: 'Classic',
    tag: 'Esencial',
    desc: 'El baño completo de alta calidad: nuestra base con todo lo necesario para que tu engreído salga impecable, sano y con bandana de regalo.',
    includes: [
      'Shampoo neutro',
      'Reparador de manto',
      'Limpieza de glándulas',
      'Secado y cepillado antifrizz',
      'Corte higiénico',
      'Corte y limado de uñas',
      'Limpieza ótica',
      'Loción + bandana de regalo'
    ]
  },
  premium: {
    name: 'Premium',
    tag: 'Más pedido',
    desc: 'Incluye todo el Classic, más tratamientos de hidratación profunda y productos intensificadores de color y brillo para razas de pelaje exigente.',
    includes: [
      'Todo lo del Baño Classic',
      'Mascarilla hidratante',
      'Shampoo intensificador de volumen y color',
      'Bálsamos de patas, nariz y codos',
      'Brillo de keratina'
    ]
  },
  gold: {
    name: 'Gold',
    tag: 'Spa Premium',
    desc: 'La experiencia de spa completa: línea hipoalergénica, hidratación premium, aromaterapia y masajes relajantes. Para los más engreídos.',
    includes: [
      'Todo lo del Baño Classic',
      'Hyponic Hidratante Shampoo',
      'Hyponic Pro Acondicionador',
      'Bálsamos hidratantes',
      'Brillo de keratina',
      'Desodorante hipoalergénico',
      'Masajes relajantes',
      'Aromaterapia'
    ]
  }
};

// ─────────── STATE ───────────
let currentSede = 'san-miguel';   // 'san-miguel' | 'jesus-maria'
let currentTier = 'classic';      // 'classic' | 'premium' | 'gold'

// ─────────── DOM helpers ───────────
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ─────────── Renderers ───────────
function renderPriceTable() {
  const sizes = SIZE_LABELS[currentSede];
  const data = PRICES[currentSede][currentTier];
  const tier = TIER_INFO[currentTier];

  // Tier panel content
  const panel = $('#tier-panel');
  panel.innerHTML = `
    <h3>${tier.name} <span class="lvl">${tier.tag}</span></h3>
    <p class="desc">${tier.desc}</p>
    <div class="eyebrow" style="margin-bottom:14px;display:block;color:var(--yellow);">Incluye</div>
    <ul class="includes">
      ${tier.includes.map(i => `<li>${i}</li>`).join('')}
    </ul>
    <div class="eyebrow" style="margin-bottom:14px;display:block;color:var(--yellow);">Precios por talla &amp; tipo de pelo</div>
    <table class="price-table">
      <thead>
        <tr>
          <th>Talla</th>
          <th>Pelo corto</th>
          <th>Pelo largo</th>
        </tr>
      </thead>
      <tbody>
        ${sizes.map(s => `
          <tr>
            <td>${s.label}</td>
            <td>S/ ${data[s.key].corto}</td>
            <td>S/ ${data[s.key].largo}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Update sticky side prices (min price)
  const minPrice = Math.min(...sizes.flatMap(s => [data[s.key].corto, data[s.key].largo]));
  $('#side-price').textContent = 'S/ ' + minPrice;
  $('#side-tier-name').textContent = tier.name;
}

function renderExtraServices() {
  const sm = currentSede === 'san-miguel';
  const cortes = PRICES[currentSede].cortes;
  const trat = PRICES[currentSede].tratamiento;

  // Cortes: prices vary by sede schema
  let cortesHTML;
  if (sm) {
    cortesHTML = `Toy <b>S/ ${cortes.toy}</b> · Mediano <b>S/ ${cortes.mediano}</b> · Gigante <b>S/ ${cortes.gigante}</b>`;
  } else {
    cortesHTML = `Pequeño–Mediano <b>S/ ${cortes['peq-med']}</b> · Estándar–Grande <b>S/ ${cortes['est-gra']}</b> · Gigante <b>S/ ${cortes.gigante}</b>`;
  }
  $('#price-cortes').innerHTML = cortesHTML;

  // Tratamientos (same precios across sedes but rendered anyway)
  $('#price-tratamiento').innerHTML = `Pequeño–Mediano <b>S/ ${trat['peq-med']}</b> · Estándar–Grande <b>S/ ${trat['est-gra']}</b>`;
}

function renderDesmotados() {
  // Same fixed table per official price sheet
  $('#price-desmotados').innerHTML = `Desde <b>S/ 15</b> · varía por tipo y talla`;
}

function updateSedeUI() {
  // Toggle sede switch buttons (multiple instances)
  $$('.sede-switch button, .sedes-toggle button').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.sede === currentSede);
  });
  // Show/hide JM-only sections
  $$('.jm-only').forEach(el => {
    el.classList.toggle('hidden', currentSede !== 'jesus-maria');
  });
  // Update sede labels everywhere
  const label = currentSede === 'san-miguel' ? 'San Miguel' : 'Jesús María';
  $$('[data-sede-label]').forEach(el => { el.textContent = label; });
  // Update WhatsApp links with sede context (optional)
}

function setSede(sede) {
  if (currentSede === sede) return;
  currentSede = sede;
  // Reset tier-friendly default if needed
  updateSedeUI();
  renderPriceTable();
  renderExtraServices();
}

function setTier(tier) {
  if (currentTier === tier) return;
  currentTier = tier;
  $$('.tab').forEach(t => t.classList.toggle('on', t.dataset.tier === tier));
  renderPriceTable();
}

// ─────────── Hero slider ───────────
function initSlider() {
  const slides = document.querySelectorAll('.hero-bg .hero-slide');
  const dots = document.querySelectorAll('.hero-dots span');
  let cur = 0;
  let timer;

  function go(n) {
    slides[cur].classList.remove('on');
    dots[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('on');
    dots[cur].classList.add('on');
  }
  function next() { go(cur + 1); }
  function reset() { clearInterval(timer); timer = setInterval(next, 5500); }

  $('.hero-arrow.left').addEventListener('click', () => { go(cur - 1); reset(); });
  $('.hero-arrow.right').addEventListener('click', () => { go(cur + 1); reset(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));
  reset();
}

// ─────────── Init ───────────
document.addEventListener('DOMContentLoaded', () => {
  // Sede switch click handlers (in nav + sedes section)
  $$('.sede-switch button, .sedes-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setSede(btn.dataset.sede));
  });

  // Tier tabs
  $$('.tab').forEach(t => {
    t.addEventListener('click', () => setTier(t.dataset.tier));
  });

  // JM service tabs (Desmotados / Carding / Stripping)
  $$('.jm-tab').forEach(t => {
    t.addEventListener('click', () => {
      const target = t.dataset.jmTab;
      $$('.jm-tab').forEach(b => b.classList.toggle('on', b.dataset.jmTab === target));
      $$('.jm-tab-panel').forEach(p => p.classList.toggle('on', p.dataset.jmPanel === target));
    });
  });

  // Initial render
  updateSedeUI();
  renderPriceTable();
  renderExtraServices();
  renderDesmotados();
  initSlider();
});
