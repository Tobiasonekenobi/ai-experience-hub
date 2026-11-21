import { useState } from 'react';
import { useStored } from '../lib/store';

type Area = 'rum' | 'brand' | 'mobil';
type Style = 'minimal' | 'neon' | 'retro';
interface Cfg { area: Area; palette: number; font: number; style: Style; layout: 0 | 1 }

const AREAS: { id: Area; label: string }[] = [{ id: 'rum', label: 'Gamingværelse' }, { id: 'brand', label: 'Brandidentitet' }, { id: 'mobil', label: 'Mobilforside' }];
const PALETTES = [
  { name: 'Solnedgang', bg: '#1d1430', main: '#F28A3C', accent: '#FF5FA2', text: '#FFF4EA' },
  { name: 'Ocean', bg: '#0c1e2e', main: '#4DD9E8', accent: '#3B82F6', text: '#EAF8FF' },
  { name: 'Skov', bg: '#13221a', main: '#7BE0A6', accent: '#F0C36A', text: '#EFFBF2' },
  { name: 'Galakse', bg: '#120f2a', main: '#9B7CFF', accent: '#4DD9E8', text: '#F1EEFF' },
];
const FONTS = [
  { name: 'Moderne', css: 'system-ui, "Segoe UI", sans-serif' },
  { name: 'Elegant', css: 'Georgia, "Times New Roman", serif' },
  { name: 'Teknisk', css: 'ui-monospace, Consolas, monospace' },
];
const STYLES: { id: Style; label: string }[] = [{ id: 'minimal', label: 'Minimal' }, { id: 'neon', label: 'Neon' }, { id: 'retro', label: 'Retro' }];
const LAYOUTS: Record<Area, [string, string]> = { rum: ['Skrivebord til venstre', 'Skrivebord i midten'], brand: ['Logo over navn', 'Logo ved siden af'], mobil: ['Liste', 'Gitter'] };

function Preview({ c }: { c: Cfg }) {
  const p = PALETTES[c.palette];
  const vars = { ['--bg' as string]: p.bg, ['--mn' as string]: p.main, ['--ac' as string]: p.accent, ['--tx' as string]: p.text, fontFamily: FONTS[c.font].css };
  const cls = `dp-prev dp-${c.style}`;
  if (c.area === 'rum') return (
    <div className={`${cls} dp-room ${c.layout ? 'center' : ''}`} style={vars} role="img" aria-label="Forhåndsvisning af gamingværelse">
      <div className="dp-wall"><span className="dp-poster">GG</span><span className="dp-led" /></div>
      <div className="dp-floor" />
      <div className="dp-desk"><span className="dp-screen" /><span className="dp-screen s2" /><span className="dp-chair" /></div>
      <span className="dp-tag">{p.name} · {STYLES.find((s) => s.id === c.style)!.label}</span>
    </div>
  );
  if (c.area === 'brand') return (
    <div className={`${cls} dp-brand ${c.layout ? 'row' : ''}`} style={vars} role="img" aria-label="Forhåndsvisning af brandidentitet">
      <div className="dp-logo"><span className="dp-mark" /><b>Nordlys</b></div>
      <p className="dp-claim">Lys i mørke dage</p>
      <div className="dp-swatches">{[p.bg, p.main, p.accent, p.text].map((x) => <i key={x} style={{ background: x }} title={x} />)}</div>
      <div className="dp-card"><span className="dp-mark sm" /><div><b>Alex Nordlys</b><small>Kreativ leder</small></div></div>
    </div>
  );
  return (
    <div className={`${cls} dp-phone`} style={vars} role="img" aria-label="Forhåndsvisning af mobilforside">
      <div className="dp-notch" />
      <div className="dp-head"><b>Hej Alex</b><span className="dp-avatar" /></div>
      <div className="dp-hero"><small>Dagens udfordring</small><b>Lær noget nyt på 5 min</b><span className="dp-btn">Start</span></div>
      <div className={`dp-items ${c.layout ? 'grid' : ''}`}>{['Musik', 'Træning', 'Noter', 'Rejser'].map((x) => <div key={x}><i />{x}</div>)}</div>
    </div>
  );
}

const DEFAULT: Cfg = { area: 'rum', palette: 3, font: 0, style: 'neon', layout: 0 };

export default function DesignPlayground() {
  const [cfg, setCfg] = useState<Cfg>(DEFAULT);
  const [favs, setFavs] = useStored<Cfg[]>('dp_favs', []);
  const [cmp, setCmp] = useState(false);
  const set = <K extends keyof Cfg>(k: K, v: Cfg[K]) => setCfg((c) => ({ ...c, [k]: v }));
  const fav = favs.find((f) => f.area === cfg.area);
  const same = fav && JSON.stringify(fav) === JSON.stringify(cfg);
  const saveFav = () => setFavs((fs) => [...fs.filter((f) => f.area !== cfg.area), cfg]);

  return (
    <div className="dp">
      <div className="seg" role="tablist" aria-label="Designområde">
        {AREAS.map((a) => <button key={a.id} role="tab" aria-selected={cfg.area === a.id} className={cfg.area === a.id ? 'on' : ''} onClick={() => { setCfg((c) => ({ ...c, area: a.id, layout: 0 })); setCmp(false); }}>{a.label}</button>)}
      </div>

      <div className={`dp-stage ${cmp && fav ? 'split' : ''}`}>
        <div><Preview c={cfg} />{cmp && fav && <p className="center muted small">Nu</p>}</div>
        {cmp && fav && <div><Preview c={fav} /><p className="center muted small">Din favorit</p></div>}
      </div>

      <section className="panel">
        <h3>Farver</h3>
        <div className="dp-pals">
          {PALETTES.map((p, i) => (
            <button key={p.name} className={cfg.palette === i ? 'on' : ''} onClick={() => set('palette', i)} aria-pressed={cfg.palette === i}>
              <span>{[p.bg, p.main, p.accent].map((x) => <i key={x} style={{ background: x }} />)}</span>{p.name}
            </button>
          ))}
        </div>
        <h3>Skrifttype</h3>
        <div className="chips">{FONTS.map((f, i) => <button key={f.name} className={`chip ${cfg.font === i ? 'on' : ''}`} style={{ fontFamily: f.css }} onClick={() => set('font', i)}>{f.name}</button>)}</div>
        <h3>Stil</h3>
        <div className="chips">{STYLES.map((s) => <button key={s.id} className={`chip ${cfg.style === s.id ? 'on' : ''}`} onClick={() => set('style', s.id)}>{s.label}</button>)}</div>
        <h3>Layout</h3>
        <div className="chips">{LAYOUTS[cfg.area].map((l, i) => <button key={l} className={`chip ${cfg.layout === i ? 'on' : ''}`} onClick={() => set('layout', i as 0 | 1)}>{l}</button>)}</div>
      </section>

      <div className="btn-row">
        <button className="btn" onClick={saveFav} disabled={!!same}>{same ? '♥ Gemt som favorit' : '♡ Gem som favorit'}</button>
        <button className="btn ghost" onClick={() => setCmp((x) => !x)} disabled={!fav}>{cmp ? 'Skjul sammenligning' : 'Side om side med favorit'}</button>
        {fav && !same && <button className="btn ghost" onClick={() => setCfg(fav)}>Hent favorit</button>}
      </div>
      {!fav && <p className="muted small">Gem en favorit for at kunne sammenligne side om side.</p>}
    </div>
  );
}
