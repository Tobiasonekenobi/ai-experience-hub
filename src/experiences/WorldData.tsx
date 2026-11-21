import { useMemo, useRef, useState } from 'react';
import { LineChart } from '../components/Charts';

// Alle tal her er KONSTRUEREDE demo-indeks (0–100), ikke rigtige statistikker. Det står tydeligt i brugerfladen.

type Layer = 'befolkning' | 'energi' | 'teknologi';
interface Country { id: string; name: string; lat: number; lon: number; base: Record<Layer, number>; growth: Record<Layer, number> }

const LAYERS: { id: Layer; label: string; color: string; grid: string; def: string }[] = [
  { id: 'befolkning', label: 'Befolkning', color: '#4DD9E8', grid: 'rgba(77,217,232,.12)', def: 'Demo-indeks for befolkningsstørrelse (0–100). Højere tal = større befolkning i demoen.' },
  { id: 'energi', label: 'Grøn energi', color: '#F0C36A', grid: 'rgba(240,195,106,.12)', def: 'Demo-indeks for andelen af vedvarende energi (0–100). Konstrueret til at vise udvikling over tid.' },
  { id: 'teknologi', label: 'Teknologi', color: '#9B7CFF', grid: 'rgba(155,124,255,.14)', def: 'Demo-indeks for digital adgang – internet og mobil (0–100). Konstrueret eksempel.' },
];

const c = (id: string, name: string, lat: number, lon: number, b: [number, number, number], g: [number, number, number]): Country =>
  ({ id, name, lat, lon, base: { befolkning: b[0], energi: b[1], teknologi: b[2] }, growth: { befolkning: g[0], energi: g[1], teknologi: g[2] } });

const COUNTRIES: Country[] = [
  c('dk', 'Danmark', 56, 10, [8, 30, 70], [0.05, 1.6, 0.9]),
  c('de', 'Tyskland', 51, 10, [30, 15, 62], [0.02, 1.3, 1.0]),
  c('us', 'USA', 39, -98, [62, 12, 64], [0.3, 0.7, 1.0]),
  c('ca', 'Canada', 57, -101, [20, 55, 66], [0.2, 0.3, 0.9]),
  c('br', 'Brasilien', -10, -52, [48, 60, 35], [0.3, 0.3, 1.5]),
  c('ng', 'Nigeria', 9, 8, [45, 18, 12], [0.9, 0.4, 1.9]),
  c('eg', 'Egypten', 26, 30, [38, 8, 30], [0.5, 0.5, 1.6]),
  c('za', 'Sydafrika', -29, 24, [28, 8, 40], [0.3, 0.6, 1.4]),
  c('in', 'Indien', 21, 78, [92, 20, 18], [0.3, 0.8, 2.2]),
  c('cn', 'Kina', 35, 103, [94, 18, 40], [0.05, 1.0, 1.8]),
  c('jp', 'Japan', 36, 138, [40, 12, 70], [-0.15, 0.7, 0.8]),
  c('au', 'Australien', -25, 134, [16, 10, 68], [0.2, 1.1, 0.9]),
];

const Y0 = 2000, Y1 = 2030;
const val = (k: Country, l: Layer, year: number) => Math.max(1, Math.min(100, Math.round(k.base[l] + k.growth[l] * (year - Y0))));
const px = (lon: number) => ((lon + 180) / 360) * 360;
const py = (lat: number) => ((90 - lat) / 180) * 180;

export default function WorldData() {
  const [layer, setLayer] = useState<Layer>('befolkning');
  const [year, setYear] = useState(2020);
  const [sel, setSel] = useState('dk');
  const [cmp, setCmp] = useState<string | null>(null);
  const [view, setView] = useState<'kort' | 'graf'>('kort');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const svg = useRef<SVGSVGElement>(null);

  const L = LAYERS.find((l) => l.id === layer)!;
  const country = COUNTRIES.find((k) => k.id === sel)!;
  const other = cmp ? COUNTRIES.find((k) => k.id === cmp)! : null;
  const ranked = useMemo(() => [...COUNTRIES].sort((a, b) => val(b, layer, year) - val(a, layer, year)), [layer, year]);
  const years = Array.from({ length: 7 }, (_, i) => Y0 + i * 5);

  const w = 360 / zoom, h = 180 / zoom;
  const vx = Math.max(0, Math.min(360 - w, 180 - w / 2 + pan.x)), vy = Math.max(0, Math.min(180 - h, 90 - h / 2 + pan.y));

  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }; };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || zoom === 1 || !svg.current) return;
    const k = w / svg.current.clientWidth;
    setPan({ x: drag.current.px - (e.clientX - drag.current.x) * k, y: drag.current.py - (e.clientY - drag.current.y) * k });
  };
  const zoomTo = (z: number) => { setZoom(z); if (z === 1) setPan({ x: 0, y: 0 }); };
  const choose = (id: string) => {
    if (cmp === '') { if (id !== sel) setCmp(id); return; }
    setSel(id);
    if (id === cmp) setCmp(null);
  };

  return (
    <div className="wd">
      <div className="demo-note">Konstruerede demotal (indeks 0–100) – ikke rigtige statistikker</div>

      <div className="seg" role="tablist" aria-label="Datalag">
        {LAYERS.map((l) => <button key={l.id} role="tab" aria-selected={layer === l.id} className={layer === l.id ? 'on' : ''} style={{ ['--c' as string]: l.color }} onClick={() => setLayer(l.id)}>{l.label}</button>)}
      </div>

      <div className="row-between">
        <div className="seg small" aria-label="Visning">
          <button className={view === 'kort' ? 'on' : ''} onClick={() => setView('kort')}>Kort</button>
          <button className={view === 'graf' ? 'on' : ''} onClick={() => setView('graf')}>Graf</button>
        </div>
        {view === 'kort' && (
          <div className="seg small" aria-label="Zoom">
            <button onClick={() => zoomTo(Math.max(1, zoom - 1))} aria-label="Zoom ud" disabled={zoom === 1}>−</button>
            <button className="on" disabled>{zoom}×</button>
            <button onClick={() => zoomTo(Math.min(4, zoom + 1))} aria-label="Zoom ind" disabled={zoom === 4}>+</button>
          </div>
        )}
      </div>

      {view === 'kort' ? (
        <div className="wd-map" style={{ ['--c' as string]: L.color, ['--g' as string]: L.grid }}>
          <svg ref={svg} viewBox={`${vx} ${vy} ${w} ${h}`} role="img" aria-label={`Verdenskort: ${L.label} ${year}`}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerLeave={() => (drag.current = null)}
            style={{ cursor: zoom > 1 ? 'grab' : 'default' }}>
            {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={i * 30} y1={0} x2={i * 30} y2={180} className="wd-grid" />)}
            {Array.from({ length: 7 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 30} x2={360} y2={i * 30} className="wd-grid" />)}
            <line x1={0} y1={90} x2={360} y2={90} className="wd-eq" />
            {COUNTRIES.map((k) => {
              const v = val(k, layer, year);
              const r = (3 + v / 7) / Math.sqrt(zoom);
              const on = k.id === sel || k.id === cmp;
              return (
                <g key={k.id} className={`wd-pt ${on ? 'on' : ''}`} onClick={() => choose(k.id)} tabIndex={0} role="button" aria-label={`${k.name}: ${v}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(k.id); } }}>
                  <circle cx={px(k.lon)} cy={py(k.lat)} r={r * 1.9} className="wd-halo" />
                  <circle cx={px(k.lon)} cy={py(k.lat)} r={r} className="wd-core" />
                  {(on || zoom > 1) && <text x={px(k.lon)} y={py(k.lat) - r - 3 / zoom} fontSize={8 / Math.sqrt(zoom)} textAnchor="middle" className="wd-lbl">{k.name}</text>}
                </g>
              );
            })}
          </svg>
          <span className="wd-hint">{zoom > 1 ? 'Træk for at panorere' : 'Tryk på et land'}</span>
        </div>
      ) : (
        <section className="panel">
          <h3>{L.label} {year} – rangordnet</h3>
          <ul className="wd-bars">
            {ranked.map((k) => (
              <li key={k.id} className={k.id === sel ? 'on' : ''}>
                <button onClick={() => choose(k.id)}>{k.name}</button>
                <span><i style={{ width: `${val(k, layer, year)}%`, background: L.color }} /></span>
                <b>{val(k, layer, year)}</b>
              </li>
            ))}
          </ul>
        </section>
      )}

      <label className="slider" style={{ ['--a' as string]: L.color }}>
        <span>År <b>{year}</b></span>
        <input type="range" min={Y0} max={Y1} value={year} onChange={(e) => setYear(+e.target.value)} />
      </label>

      <section className="panel" style={{ borderColor: L.color }}>
        <div className="row-between">
          <h3>{country.name}{other ? ` vs. ${other.name}` : ''}</h3>
          {cmp === null && <button className="btn ghost sm" onClick={() => setCmp('')}>Sammenlign</button>}
          {cmp === '' && <span className="muted small">Vælg et andet land …</span>}
          {cmp && <button className="btn ghost sm" onClick={() => setCmp(null)}>Stop sammenligning</button>}
        </div>
        <div className="facts">
          {LAYERS.map((l) => (
            <div key={l.id} className="fact" style={{ ['--c' as string]: l.color }}>
              <b>{val(country, l.id, year)}{other ? ` / ${val(other, l.id, year)}` : ''}</b><span>{l.label}</span>
            </div>
          ))}
        </div>
        <LineChart title={`${L.label}: udvikling (demo-indeks)`} xLabels={years.map(String)}
          series={[{ label: country.name, color: L.color, points: years.map((y) => val(country, layer, y)) },
            ...(other ? [{ label: other.name, color: '#F28A3C', points: years.map((y) => val(other, layer, y)), dashed: true }] : [])]} />
      </section>

      <details className="panel wd-defs">
        <summary><h3>Definitioner</h3></summary>
        {LAYERS.map((l) => <p key={l.id}><b style={{ color: l.color }}>{l.label}:</b> {l.def}</p>)}
        <p className="muted small">Landenes placering på kortet er omtrentlig. Tallene er opfundet til demonstration og må ikke bruges som fakta.</p>
      </details>
    </div>
  );
}
