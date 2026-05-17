// Libreria illustrazioni esercizi calisthenics
// Ogni SVG mostra un omino stilizzato che esegue il movimento
// con il gruppo muscolare evidenziato

export const EXERCISE_LIBRARY = [
  // ── GAMBE ──────────────────────────────────────────────
  {
    id: 'squat',
    name: 'Squat',
    group: 'Gambe',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="30" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="48" x2="100" y2="130" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="70" x2="65" y2="100" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="70" x2="135" y2="100" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="65" y1="100" x2="55" y2="130" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="135" y1="100" x2="145" y2="130" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="65" y2="180" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="135" y2="180" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="65" y1="180" x2="55" y2="240" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="135" y1="180" x2="145" y2="240" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="55" y1="240" x2="40" y2="255" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="145" y1="240" x2="160" y2="255" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Quadricipiti · Glutei</text>
    </svg>`
  },
  {
    id: 'affondi',
    name: 'Affondi',
    group: 'Gambe',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="28" r="18" fill="#e0e0e0"/>
      <line x1="90" y1="46" x2="90" y2="120" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="75" x2="55" y2="105" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="75" x2="125" y2="105" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="120" x2="60" y2="185" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="120" x2="145" y2="155" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="60" y1="185" x2="50" y2="248" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="145" y1="155" x2="155" y2="248" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="50" y1="248" x2="35" y2="258" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="155" y1="248" x2="170" y2="258" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Quadricipiti · Glutei</text>
    </svg>`
  },
  {
    id: 'pistol_squat',
    name: 'Pistol Squat',
    group: 'Gambe',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="28" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="46" x2="100" y2="120" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="75" x2="60" y2="100" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="75" y2="185" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="75" y1="185" x2="70" y2="248" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="150" y2="140" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="150" y1="140" x2="175" y2="145" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="70" y1="248" x2="55" y2="258" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Quadricipiti · Equilibrio</text>
    </svg>`
  },
  {
    id: 'calf_raise',
    name: 'Calf Raise',
    group: 'Gambe',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="25" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="43" x2="100" y2="125" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="75" x2="65" y2="105" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="75" x2="135" y2="105" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="125" x2="75" y2="190" stroke="#e0e0e0" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="125" x2="125" y2="190" stroke="#e0e0e0" stroke-width="9" stroke-linecap="round"/>
      <line x1="75" y1="190" x2="70" y2="235" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="125" y1="190" x2="130" y2="235" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="70" y1="235" x2="60" y2="245" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="130" y1="235" x2="140" y2="245" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="60" y1="245" x2="55" y2="248" stroke="#e0e0e0" stroke-width="5" stroke-linecap="round"/>
      <line x1="140" y1="245" x2="145" y2="248" stroke="#e0e0e0" stroke-width="5" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Polpacci · Soleo</text>
    </svg>`
  },
  {
    id: 'jump_squat',
    name: 'Jump Squat',
    group: 'Cardio',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="22" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="40" x2="100" y2="115" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="70" x2="60" y2="95" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="70" x2="140" y2="95" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="115" x2="70" y2="165" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="115" x2="130" y2="165" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="70" y1="165" x2="55" y2="215" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="130" y1="165" x2="145" y2="215" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="55" y1="215" x2="45" y2="230" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="145" y1="215" x2="155" y2="230" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="70" y="15" fill="#1D9E75" font-size="20" font-family="sans-serif">↑</text>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Gambe · Cardio</text>
    </svg>`
  },

  // ── PETTO ──────────────────────────────────────────────
  {
    id: 'push_up',
    name: 'Push Up',
    group: 'Petto',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="95" r="18" fill="#e0e0e0"/>
      <line x1="55" y1="113" x2="100" y2="140" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="128" x2="70" y2="160" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="80" y1="128" x2="110" y2="148" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="140" x2="160" y2="148" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="70" y1="160" x2="65" y2="190" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="110" y1="148" x2="118" y2="178" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="160" y1="148" x2="162" y2="185" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="65" y1="190" x2="60" y2="205" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="162" y1="185" x2="165" y2="200" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Petto · Tricipiti · Spalle</text>
    </svg>`
  },
  {
    id: 'wide_push_up',
    name: 'Wide Push Up',
    group: 'Petto',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="90" r="18" fill="#e0e0e0"/>
      <line x1="50" y1="108" x2="100" y2="135" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="75" y1="122" x2="40" y2="155" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="75" y1="122" x2="125" y2="145" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="135" x2="165" y2="140" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="40" y1="155" x2="30" y2="185" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="125" y1="145" x2="128" y2="178" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="165" y1="140" x2="170" y2="175" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Petto esterno · Spalle</text>
    </svg>`
  },
  {
    id: 'dips',
    name: 'Dips',
    group: 'Petto',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="60" width="10" height="130" rx="4" fill="#555"/>
      <rect x="160" y="60" width="10" height="130" rx="4" fill="#555"/>
      <circle cx="100" cy="70" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="88" x2="100" y2="160" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="110" x2="40" y2="100" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="110" x2="160" y2="100" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="160" x2="75" y2="215" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="160" x2="125" y2="215" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="75" y1="215" x2="65" y2="245" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="125" y1="215" x2="135" y2="245" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Petto · Tricipiti</text>
    </svg>`
  },

  // ── SCHIENA ────────────────────────────────────────────
  {
    id: 'pull_up',
    name: 'Pull Up',
    group: 'Schiena',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="15" width="140" height="10" rx="5" fill="#555"/>
      <circle cx="100" cy="75" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="55" x2="65" y2="25" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="55" x2="135" y2="25" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="93" x2="100" y2="170" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="65" y2="145" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="135" y2="145" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="170" x2="80" y2="225" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="170" x2="120" y2="225" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Dorsali · Bicipiti</text>
    </svg>`
  },
  {
    id: 'chin_up',
    name: 'Chin Up',
    group: 'Schiena',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="15" width="140" height="10" rx="5" fill="#555"/>
      <circle cx="100" cy="72" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="52" x2="72" y2="25" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="52" x2="128" y2="25" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="90" x2="100" y2="165" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="118" x2="68" y2="140" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="118" x2="132" y2="140" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="80" y2="222" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="120" y2="222" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Dorsali · Bicipiti</text>
    </svg>`
  },
  {
    id: 'inverted_row',
    name: 'Inverted Row',
    group: 'Schiena',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="100" width="160" height="8" rx="4" fill="#555"/>
      <circle cx="60" cy="145" r="18" fill="#e0e0e0"/>
      <line x1="60" y1="130" x2="75" y2="108" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="60" y1="130" x2="100" y2="108" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="60" y1="163" x2="100" y2="170" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="167" x2="78" y2="200" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="170" x2="140" y2="172" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="120" y1="171" x2="122" y2="205" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="140" y1="172" x2="155" y2="175" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Schiena · Bicipiti</text>
    </svg>`
  },
  {
    id: 'superman',
    name: 'Superman',
    group: 'Schiena',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="140" r="18" fill="#e0e0e0"/>
      <line x1="73" y1="140" x2="145" y2="138" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="55" y1="125" x2="25" y2="108" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="73" y1="125" x2="110" y2="108" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="145" y1="138" x2="175" y2="130" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="145" y1="138" x2="170" y2="155" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Lombari · Glutei</text>
    </svg>`
  },

  // ── SPALLE ─────────────────────────────────────────────
  {
    id: 'pike_push_up',
    name: 'Pike Push Up',
    group: 'Spalle',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="60" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="78" x2="100" y2="130" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="55" y2="115" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="145" y2="115" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="70" y2="185" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="130" y2="185" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="70" y1="185" x2="55" y2="215" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="130" y1="185" x2="145" y2="215" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="55" y1="115" x2="45" y2="145" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="145" y1="115" x2="155" y2="145" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Spalle · Tricipiti</text>
    </svg>`
  },
  {
    id: 'handstand_push_up',
    name: 'Handstand Push Up',
    group: 'Spalle',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="248" width="160" height="8" rx="4" fill="#555"/>
      <circle cx="100" cy="218" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="200" x2="100" y2="130" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="175" x2="60" y2="165" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="175" x2="140" y2="165" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="70" y2="80" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="130" y2="80" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="70" y1="80" x2="60" y2="50" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="130" y1="80" x2="140" y2="50" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="60" y1="50" x2="50" y2="248" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="140" y1="50" x2="150" y2="248" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="15" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Spalle · Tricipiti</text>
    </svg>`
  },

  // ── BRACCIA ────────────────────────────────────────────
  {
    id: 'tricep_dips',
    name: 'Tricep Dips',
    group: 'Braccia',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="130" width="50" height="10" rx="4" fill="#555"/>
      <rect x="130" y="130" width="50" height="10" rx="4" fill="#555"/>
      <circle cx="100" cy="90" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="108" x2="100" y2="175" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="45" y2="135" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="155" y2="135" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="45" y1="135" x2="30" y2="130" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="155" y1="135" x2="170" y2="130" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="100" y1="175" x2="75" y2="230" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="175" x2="125" y2="230" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="75" y1="230" x2="65" y2="255" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="125" y1="230" x2="135" y2="255" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Tricipiti · Petto</text>
    </svg>`
  },
  {
    id: 'diamond_push_up',
    name: 'Diamond Push Up',
    group: 'Braccia',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="92" r="18" fill="#e0e0e0"/>
      <line x1="50" y1="110" x2="100" y2="138" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="75" y1="124" x2="88" y2="155" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="75" y1="124" x2="112" y2="142" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="138" x2="155" y2="145" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="88" y1="155" x2="82" y2="185" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="112" y1="142" x2="115" y2="175" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="155" y1="145" x2="158" y2="180" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Tricipiti · Petto interno</text>
    </svg>`
  },
  {
    id: 'curl_elastico',
    name: 'Curl con elastico',
    group: 'Braccia',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="38" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="56" x2="100" y2="145" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="90" x2="55" y2="110" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="55" y1="110" x2="45" y2="75" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="90" x2="145" y2="110" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="145" y1="110" x2="150" y2="145" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="145" x2="75" y2="205" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="145" x2="125" y2="205" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="75" y1="205" x2="65" y2="248" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="125" y1="205" x2="135" y2="248" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <path d="M45 75 Q30 140 45 200" stroke="#1D9E75" stroke-width="3" fill="none" stroke-dasharray="6,4"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Bicipiti</text>
    </svg>`
  },

  // ── CORE ───────────────────────────────────────────────
  {
    id: 'plank',
    name: 'Plank',
    group: 'Core',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="118" r="18" fill="#e0e0e0"/>
      <line x1="58" y1="118" x2="160" y2="125" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="40" y1="105" x2="35" y2="75" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="105" y1="122" x2="95" y2="155" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="130" y1="123" x2="128" y2="158" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="160" y1="125" x2="158" y2="162" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="35" y1="75" x2="30" y2="58" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="90" y2="175" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <line x1="128" y1="158" x2="125" y2="178" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Core · Addome · Lombari</text>
    </svg>`
  },
  {
    id: 'crunch',
    name: 'Crunch',
    group: 'Core',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="210" x2="180" y2="210" stroke="#555" stroke-width="5" stroke-linecap="round"/>
      <circle cx="65" cy="140" r="18" fill="#e0e0e0"/>
      <line x1="65" y1="158" x2="80" y2="185" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="185" x2="120" y2="190" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="120" y1="190" x2="135" y2="210" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="135" y1="210" x2="145" y2="210" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="72" y1="170" x2="45" y2="160" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="72" y1="170" x2="95" y2="155" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Addominali</text>
    </svg>`
  },
  {
    id: 'leg_raise',
    name: 'Leg Raise',
    group: 'Core',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="220" x2="180" y2="220" stroke="#555" stroke-width="5" stroke-linecap="round"/>
      <circle cx="100" cy="70" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="88" x2="100" y2="165" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="65" y2="140" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="120" x2="135" y2="140" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="75" y2="130" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="125" y2="130" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="75" y1="130" x2="60" y2="115" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="125" y1="130" x2="140" y2="115" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Addominali bassi · Hip flexor</text>
    </svg>`
  },
  {
    id: 'l_sit',
    name: 'L-Sit',
    group: 'Core',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="160" width="15" height="60" rx="4" fill="#555"/>
      <rect x="160" y="160" width="15" height="60" rx="4" fill="#555"/>
      <circle cx="100" cy="80" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="98" x2="100" y2="165" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="33" y2="138" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="130" x2="167" y2="138" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="60" y2="158" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="165" x2="140" y2="158" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="60" y1="158" x2="40" y2="160" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="140" y1="158" x2="160" y2="160" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Core · Hip flexor · Tricipiti</text>
    </svg>`
  },

  // ── CARDIO ─────────────────────────────────────────────
  {
    id: 'burpees',
    name: 'Burpees',
    group: 'Cardio',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="22" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="40" x2="100" y2="110" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="68" x2="58" y2="88" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="68" x2="142" y2="88" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="110" x2="72" y2="158" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="110" x2="128" y2="158" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="72" y1="158" x2="60" y2="210" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="128" y1="158" x2="140" y2="210" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="60" y1="210" x2="48" y2="228" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="140" y1="210" x2="152" y2="228" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="30" y="18" fill="#1D9E75" font-size="16">↑↓</text>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Full body · Cardio</text>
    </svg>`
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    group: 'Cardio',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="30" r="18" fill="#e0e0e0"/>
      <line x1="100" y1="48" x2="100" y2="140" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="85" x2="30" y2="55" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="85" x2="170" y2="55" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="140" x2="40" y2="210" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="100" y1="140" x2="160" y2="210" stroke="#1D9E75" stroke-width="9" stroke-linecap="round"/>
      <line x1="40" y1="210" x2="30" y2="230" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="160" y1="210" x2="170" y2="230" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Full body · Cardio</text>
    </svg>`
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    group: 'Cardio',
    svg: `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="105" r="18" fill="#e0e0e0"/>
      <line x1="45" y1="123" x2="100" y2="140" stroke="#1D9E75" stroke-width="8" stroke-linecap="round"/>
      <line x1="72" y1="132" x2="60" y2="162" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="72" y1="132" x2="108" y2="148" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="140" x2="162" y2="145" stroke="#e0e0e0" stroke-width="8" stroke-linecap="round"/>
      <line x1="60" y1="162" x2="75" y2="195" stroke="#1D9E75" stroke-width="7" stroke-linecap="round"/>
      <line x1="108" y1="148" x2="118" y2="178" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="162" y1="145" x2="165" y2="180" stroke="#e0e0e0" stroke-width="7" stroke-linecap="round"/>
      <line x1="165" y1="180" x2="168" y2="200" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/>
      <text x="100" y="275" text-anchor="middle" fill="#1D9E75" font-size="13" font-family="sans-serif">Core · Cardio · Full body</text>
    </svg>`
  },
]

// Lookup per id
export const getExerciseSvg = (id) => {
  const ex = EXERCISE_LIBRARY.find(e => e.id === id)
  return ex ? ex.svg : null
}

// Raggruppati per categoria
export const EXERCISE_GROUPS = EXERCISE_LIBRARY.reduce((acc, ex) => {
  if (!acc[ex.group]) acc[ex.group] = []
  acc[ex.group].push(ex)
  return acc
}, {})
