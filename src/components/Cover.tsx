import type { ReactNode } from 'react';

/** Deterministisk pseudo-tilfældighed, så hvert cover altid ser ens ud. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function stars(seed: number, n: number, color = '#F8FAFC') {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => (
    <circle key={i} cx={r() * 320} cy={r() * 200} r={r() * 1.3 + 0.2} fill={color} opacity={r() * 0.7 + 0.2} />
  ));
}

const C = { o: '#F28A3C', v: '#9B7CFF', c: '#4DD9E8', g: '#F0C36A', t: '#F8FAFC', m: '#AAB8D1', bg: '#0B1020', bg2: '#151E31', k: '#1A2740', gr: '#7BE0A6' };

const art: Record<string, (id: string) => ReactNode> = {
  'mission-control': () => (
    <>
      {[30, 55, 80].map((r) => <circle key={r} cx="90" cy="100" r={r} fill="none" stroke={C.c} strokeOpacity={0.35} />)}
      <path d="M90 100 L160 60 A80 80 0 0 1 170 100 Z" fill={C.c} opacity={0.25} />
      <circle cx="132" cy="78" r="4" fill={C.o} /><circle cx="70" cy="140" r="3" fill={C.c} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={200 + i * 20} y={150 - [40, 70, 55, 90, 65][i]} width="12" height={[40, 70, 55, 90, 65][i]} rx="2" fill={i === 3 ? C.o : C.c} opacity={0.85} />)}
      <rect x="196" y="30" width="104" height="22" rx="6" fill={C.k} stroke={C.o} strokeOpacity={0.6} />
      <rect x="204" y="38" width="60" height="6" rx="3" fill={C.o} />
    </>
  ),
  'future-simulator': () => (
    <>
      {[50, 80, 110].map((y, i) => (
        <g key={y}><line x1="30" x2="150" y1={y} y2={y} stroke={C.m} strokeOpacity={0.3} strokeWidth="4" strokeLinecap="round" />
          <line x1="30" x2={60 + i * 35} y1={y} y2={y} stroke={[C.v, C.c, C.o][i]} strokeWidth="4" strokeLinecap="round" />
          <circle cx={60 + i * 35} cy={y} r="7" fill={C.bg} stroke={[C.v, C.c, C.o][i]} strokeWidth="3" /></g>
      ))}
      <path d="M170 160 C210 150 230 120 250 95 S290 40 305 30" fill="none" stroke={C.v} strokeWidth="3" />
      <path d="M170 160 C210 155 240 140 260 125 S290 100 305 90" fill="none" stroke={C.c} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M170 160 C210 150 230 120 250 95 S290 40 305 30 L305 170 L170 170 Z" fill={C.v} opacity={0.12} />
    </>
  ),
  'world-data': () => (
    <>
      <circle cx="160" cy="100" r="78" fill={C.bg2} stroke={C.c} strokeOpacity={0.5} />
      {[-50, -25, 0, 25, 50].map((d) => <ellipse key={d} cx="160" cy="100" rx={Math.abs(78 * Math.cos(d / 60))} ry="78" fill="none" stroke={C.c} strokeOpacity={0.2} />)}
      {[-45, -15, 15, 45].map((y) => <line key={y} x1={160 - Math.sqrt(78 * 78 - y * y)} x2={160 + Math.sqrt(78 * 78 - y * y)} y1={100 + y} y2={100 + y} stroke={C.c} strokeOpacity={0.2} />)}
      <path d="M115 80 Q160 20 205 70" fill="none" stroke={C.o} strokeWidth="2" /><path d="M120 130 Q170 90 210 120" fill="none" stroke={C.g} strokeWidth="2" />
      {[[115, 80], [205, 70], [120, 130], [210, 120], [160, 105]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={i % 2 ? C.o : C.g} />)}
    </>
  ),
  'comic-world': () => (
    <>
      <rect x="20" y="20" width="130" height="90" rx="4" fill={C.k} stroke={C.t} strokeWidth="3" />
      <rect x="160" y="20" width="140" height="160" rx="4" fill="#2A1B45" stroke={C.t} strokeWidth="3" />
      <rect x="20" y="120" width="130" height="60" rx="4" fill="#3A2016" stroke={C.t} strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={175 + i * 30} y={90 - i * 15} width="20" height={90 + i * 15} fill={C.v} opacity={0.5 + i * 0.1} />)}
      <circle cx="230" cy="45" r="12" fill={C.c} opacity={0.8} />
      <path d="M40 40 h80 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-50 l-15 14 v-14 h-15 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10z" fill={C.t} />
      <text x="80" y="66" textAnchor="middle" fontSize="16" fontWeight="800" fill={C.bg}>BZZT!</text>
      <path d="M85 135 l10 18 l-8 0 l10 20" fill="none" stroke={C.o} strokeWidth="4" />
    </>
  ),
  'visual-notes': () => {
    const nodes: [number, number, string][] = [[70, 50, C.o], [250, 45, C.c], [60, 150, C.v], [255, 150, C.g], [160, 30, C.gr]];
    return (
      <>
        <rect x="0" y="0" width="320" height="200" fill="#1A2238" />
        {nodes.map(([x, y, c], i) => <path key={i} d={`M160 100 Q${(160 + x) / 2 + 15} ${(100 + y) / 2 - 10} ${x} ${y}`} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />)}
        <ellipse cx="160" cy="100" rx="42" ry="24" fill={C.t} /><text x="160" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.bg}>IDÉ</text>
        {nodes.map(([x, y, c], i) => <rect key={i} x={x - 22} y={y - 11} width="44" height="22" rx="11" fill="none" stroke={c} strokeWidth="2.5" />)}
      </>
    );
  },
  'exploded-lab': () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${80 + i * 22} ${140 - i * 32})`}>
          <path d="M0 20 L60 0 L120 20 L60 40 Z" fill={[C.k, C.bg2, '#22304D', '#2B3B5E'][i]} stroke={[C.c, C.v, C.o, C.g][i]} strokeWidth="1.5" />
          <path d="M0 20 L0 28 L60 48 L60 40 Z" fill={C.bg} opacity={0.8} /><path d="M120 20 L120 28 L60 48 L60 40 Z" fill={C.bg2} />
        </g>
      ))}
      {[0, 1, 2].map((i) => <line key={i} x1={140 + i * 22} x2={162 + i * 22} y1={150 - i * 32} y2={118 - i * 32} stroke={C.m} strokeDasharray="3 4" strokeOpacity={0.6} />)}
    </>
  ),
  'knowledge-galaxy': () => (
    <>
      {stars(7, 70)}
      <ellipse cx="160" cy="105" rx="130" ry="45" fill="none" stroke={C.v} strokeOpacity={0.35} />
      <ellipse cx="160" cy="105" rx="80" ry="27" fill="none" stroke={C.c} strokeOpacity={0.35} />
      <circle cx="160" cy="105" r="16" fill={C.g} /><circle cx="160" cy="105" r="28" fill={C.g} opacity={0.15} />
      <circle cx="80" cy="96" r="9" fill={C.c} /><circle cx="270" cy="120" r="13" fill={C.v} /><circle cx="215" cy="78" r="7" fill={C.o} />
      <circle cx="55" cy="125" r="6" fill={C.gr} />
    </>
  ),
  'time-machine': () => (
    <>
      <line x1="20" x2="300" y1="140" y2="140" stroke={C.g} strokeWidth="3" />
      {[40, 100, 160, 220, 280].map((x, i) => (
        <g key={x}><circle cx={x} cy="140" r={i === 2 ? 9 : 6} fill={i === 2 ? C.g : C.bg} stroke={C.g} strokeWidth="2" />
          <text x={x} y="165" textAnchor="middle" fontSize="10" fill={C.m}>{['-3000', '800', '1800', '1950', '2000'][i]}</text></g>
      ))}
      <path d="M140 30 h40 l-14 30 l14 30 h-40 l14 -30 z" fill="none" stroke={C.o} strokeWidth="3" />
      <path d="M148 36 h24 l-12 22 z" fill={C.o} opacity={0.7} /><path d="M154 84 h12 l-6 -10 z" fill={C.o} />
    </>
  ),
  skilltree: () => {
    const pts: [number, number][] = [[160, 170], [100, 125], [220, 125], [60, 75], [140, 75], [200, 75], [260, 75], [160, 28]];
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 7], [5, 7]];
    return (
      <>
        {edges.map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={i < 4 ? C.g : C.m} strokeOpacity={i < 4 ? 1 : 0.3} strokeWidth="2.5" />)}
        {pts.map(([x, y], i) => <polygon key={i} points={`${x},${y - 12} ${x + 11},${y - 6} ${x + 11},${y + 6} ${x},${y + 12} ${x - 11},${y + 6} ${x - 11},${y - 6}`} fill={i < 5 ? C.k : C.bg} stroke={i < 5 ? C.g : C.m} strokeOpacity={i < 5 ? 1 : 0.4} strokeWidth="2" />)}
      </>
    );
  },
  detective: () => (
    <>
      <rect x="0" y="0" width="320" height="200" fill="#2A1E16" />
      {[[30, 25, -4], [190, 20, 5], [110, 110, 3], [230, 115, -6]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 40} ${y + 30})`}><rect x={x} y={y} width="80" height="60" fill={i % 2 ? '#E9E2D0' : '#CFC6B0'} /><rect x={x + 6} y={y + 6} width="68" height="34" fill={i % 2 ? '#56607A' : '#3E4A63'} /></g>
      ))}
      <path d="M70 55 L230 50 L150 140 L270 145 L70 55" fill="none" stroke="#E5484D" strokeWidth="2" />
      {[[70, 55], [230, 50], [150, 140], [270, 145]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#E5484D" />)}
    </>
  ),
  'escape-ai': () => (
    <>
      <rect x="40" y="25" width="110" height="160" rx="6" fill={C.k} stroke={C.c} strokeWidth="2" />
      <line x1="95" x2="95" y1="25" y2="185" stroke={C.c} strokeOpacity={0.4} />
      <circle cx="95" cy="105" r="16" fill="none" stroke={C.o} strokeWidth="3" /><rect x="91" y="92" width="8" height="12" rx="2" fill={C.o} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={190 + (i % 3) * 30} y={45 + Math.floor(i / 3) * 30} width="22" height="22" rx="4" fill={i === 4 ? C.c : C.bg2} stroke={C.c} strokeOpacity={0.6} />)}
      <text x="235" y="160" textAnchor="middle" fontSize="16" fontFamily="monospace" fill={C.c}>07-?-?</text>
    </>
  ),
  'decision-lab': () => (
    <>
      <path d="M30 100 C80 100 90 50 140 50 M30 100 C80 100 90 150 140 150 M140 50 C180 50 190 25 230 25 M140 50 C180 50 190 75 230 75 M140 150 C180 150 190 125 230 125 M140 150 C180 150 190 175 230 175" fill="none" stroke={C.m} strokeOpacity={0.4} strokeWidth="3" />
      <path d="M30 100 C80 100 90 50 140 50 C180 50 190 75 230 75" fill="none" stroke={C.o} strokeWidth="3.5" />
      {[[30, 100], [140, 50], [140, 150], [230, 25], [230, 75], [230, 125], [230, 175]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill={[0, 1, 4].includes(i) ? C.o : C.bg2} stroke={C.o} strokeWidth="2" />)}
      <rect x="250" y="60" width="55" height="30" rx="6" fill={C.k} stroke={C.gr} /><text x="277" y="80" textAnchor="middle" fontSize="12" fill={C.gr}>+12%</text>
    </>
  ),
  'design-playground': () => (
    <>
      {[C.o, C.v, C.c, C.g, C.gr].map((c, i) => <rect key={i} x={24 + i * 34} y="30" width="28" height="80" rx="6" fill={c} />)}
      <text x="250" y="110" textAnchor="middle" fontSize="72" fontWeight="800" fill={C.t} fontFamily="Georgia, serif">Aa</text>
      <rect x="24" y="130" width="164" height="12" rx="6" fill={C.m} opacity={0.5} /><rect x="24" y="150" width="110" height="12" rx="6" fill={C.m} opacity={0.3} />
      <rect x="205" y="135" width="90" height="34" rx="17" fill={C.o} /><text x="250" y="157" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.bg}>KNAP</text>
    </>
  ),
  'ai-brain': () => {
    const layers = [[50, 100, 150], [40, 80, 120, 160], [75, 125], [100]];
    const xs = [40, 120, 200, 280];
    return (
      <>
        {layers.slice(0, -1).flatMap((l, li) => l.flatMap((y) => layers[li + 1].map((y2, j) => <line key={`${li}-${y}-${j}`} x1={xs[li]} y1={y} x2={xs[li + 1]} y2={y2} stroke={(y + y2) % 3 ? C.v : C.c} strokeOpacity={0.45} strokeWidth="1.5" />)))}
        {layers.map((l, li) => l.map((y) => <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r="9" fill={C.bg} stroke={li === 3 ? C.o : C.c} strokeWidth="2.5" />))}
      </>
    );
  },
  storyboard: () => (
    <>
      <rect x="0" y="40" width="320" height="120" fill="#111" />
      {Array.from({ length: 16 }, (_, i) => <g key={i}><rect x={8 + i * 20} y="46" width="10" height="8" rx="2" fill={C.bg2} /><rect x={8 + i * 20} y="146" width="10" height="8" rx="2" fill={C.bg2} /></g>)}
      {[0, 1, 2].map((i) => (
        <g key={i}><rect x={14 + i * 102} y="62" width="90" height="76" rx="3" fill={['#1E2A4A', '#2A1F3D', '#16323A'][i]} />
          <circle cx={45 + i * 102} cy={95} r={[16, 8, 24][i]} fill={[C.o, C.v, C.c][i]} opacity={0.8} />
          <line x1={14 + i * 102} x2={104 + i * 102} y1="120" y2="120" stroke={C.m} strokeOpacity={0.5} /></g>
      ))}
    </>
  ),
};

const bgs: Record<string, [string, string]> = {
  data: ['#0E1A33', '#0B1020'], visuel: ['#1C1433', '#0B1020'], viden: ['#1F1A10', '#0B1020'],
  spil: ['#2A1610', '#0B1020'], kreativ: ['#0F2622', '#0B1020'],
};

export function Cover({ id, universe, className = '' }: { id: string; universe: string; className?: string }) {
  const [a, b] = bgs[universe] ?? bgs.data;
  const gid = `g-${id}`;
  return (
    <svg className={`cover ${className}`} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="70%" cy="20%" r="90%"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${gid})`} />
      {art[id]?.(id)}
    </svg>
  );
}
