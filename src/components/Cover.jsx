// A generated city-skyline illustration used as each story's image.
// Drawing it in SVG means no image files to host, no broken links,
// and no copyrighted photos. Each story gets the same picture every time
// because the "random" building heights are seeded by the story id.

const PALETTES = {
  Sightings: ['#c8102e', '#3b0a14'],
  Crime: ['#1f2937', '#0b0f17'],
  City: ['#1e5aa8', '#0c1f3d'],
  Science: ['#0f766e', '#062a27'],
  Opinion: ['#b45309', '#3a1a03'],
};

// Tiny deterministic pseudo-random generator (mulberry32).
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Cover({ id, category, className = '' }) {
  const [top, bottom] = PALETTES[category] ?? ['#444', '#111'];
  const rand = seededRandom(id * 97);
  const gradId = `sky-${id}`;

  // Build the skyline: buildings of random width and height laid side by side.
  const buildings = [];
  let x = 0;
  while (x < 400) {
    const w = 18 + rand() * 34;
    const h = 60 + rand() * 120;
    buildings.push({ x, w, h });
    x += w + 2;
  }

  return (
    <svg
      className={`cover ${className}`}
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${category} illustration`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${gradId})`} />

      {/* Corner web lines, a nod to the paper's favourite subject */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`r${i}`} x1="400" y1="0" x2={400 - 160 * Math.cos((i * Math.PI) / 8)} y2={160 * Math.sin((i * Math.PI) / 8)} />
        ))}
        {[40, 80, 120].map((r) => (
          <path key={r} d={`M ${400 - r} 0 A ${r} ${r} 0 0 0 400 ${r}`} />
        ))}
      </g>

      {/* Skyline */}
      <g fill="rgba(0,0,0,0.55)">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={225 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      {/* Lit windows */}
      <g fill="rgba(255,220,140,0.75)">
        {buildings.flatMap((b, i) =>
          Array.from({ length: Math.floor(b.h / 22) }, (_, j) =>
            rand() > 0.55 ? <rect key={`${i}-${j}`} x={b.x + 5} y={225 - b.h + 10 + j * 22} width="4" height="6" /> : null
          )
        )}
      </g>
    </svg>
  );
}
