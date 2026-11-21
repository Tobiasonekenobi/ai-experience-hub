import { useState } from 'react';

// Laboratory 07: tre logiske gåder. Sporene findes ved at undersøge rummet.

interface Item { id: string; icon: string; name: string; text: string }
const ITEMS: Item[] = [
  { id: 'tavle', icon: '🧾', name: 'Whiteboard', text: 'Udvisket tekst: «Dørkode = alle primtal under 10, i stigende rækkefølge.»' },
  { id: 'note', icon: '📎', name: 'Gul seddel', text: '«Kabelpanel: varm før kold – og naturen står i midten.»' },
  { id: 'log', icon: '📓', name: 'Logbog', text: '«AI-kernen 07 vågner kun, hvis man taster dens nummer +6 – i binær.»' },
  { id: 'kaffe', icon: '☕', name: 'Kaffemaskine', text: 'Displayet viser «Afkalkning påkrævet». Ikke et spor – bare en træt kaffemaskine.' },
  { id: 'plakat', icon: '🖼️', name: 'Plakat', text: '«Sikkerhed først» står der under et billede af en glad robot. Den hjælper ikke meget.' },
];

const WIRES = [
  { id: 'roed', label: 'Rød', color: '#FF6B6B' },
  { id: 'blaa', label: 'Blå', color: '#4DD9E8' },
  { id: 'groen', label: 'Grøn', color: '#7BE0A6' },
];
const WIRE_ANSWER = ['roed', 'groen', 'blaa'];
const HINTS = [
  ['Tjek whiteboardet.', 'Primtal er kun delelige med 1 og sig selv.', 'Primtallene under 10 er 2, 3, 5 og 7.'],
  ['Find den gule seddel.', 'Rød er en «varm» farve, blå en «kold».', 'Grøn = naturen. Rækkefølgen er rød, grøn, blå.'],
  ['Læs logbogen.', 'Kernens nummer er 07, så tallet er 7 + 6 = 13.', '13 = 8 + 4 + 1 → 1101.'],
];
const STAGE = [
  { name: 'Alarm', tone: 'alarm', text: 'Døren er låst, og rødt alarmlys blinker. Find vejen ud af Laboratory 07.' },
  { name: 'Strøm', tone: 'amber', text: 'Døren til kontrolrummet glider op. Kabelpanelet er dødt – det skal kobles rigtigt.' },
  { name: 'Kernen', tone: 'blue', text: 'Strømmen er tilbage. AI-terminalen kræver et svar i binær.' },
  { name: 'Fri', tone: 'free', text: 'Hoveddøren åbner, og dagslyset strømmer ind. Du slap ud!' },
];

export default function EscapeAI() {
  const [stage, setStage] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [look, setLook] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [wires, setWires] = useState<string[]>([]);
  const [bits, setBits] = useState([0, 0, 0, 0]);
  const [hints, setHints] = useState([0, 0, 0]);
  const [err, setErr] = useState<string | null>(null);
  const [tries, setTries] = useState(0);

  const examine = (id: string) => { setLook(id); if (!found.includes(id)) setFound((f) => [...f, id]); };
  const fail = (t: string) => { setErr(t); setTries((n) => n + 1); };
  const win = () => { setErr(null); setStage((s) => s + 1); };

  const tryCode = () => (code === '2357' ? win() : fail('Forkert kode. Panelet bipper surt.'));
  const addWire = (id: string) => {
    if (wires.includes(id)) return;
    const next = [...wires, id];
    setWires(next);
    if (next.length === 3) {
      if (next.join() === WIRE_ANSWER.join()) win();
      else { fail('Gnister! Forkert rækkefølge – kablerne springer løs.'); setTimeout(() => setWires([]), 700); }
    }
  };
  const value = bits.reduce((s, b, i) => s + b * 2 ** (3 - i), 0);
  const tryBits = () => (value === 13 ? win() : fail(`Kernen svarer: «${value} er ikke mit tal.»`));
  const reset = () => { setStage(0); setFound([]); setLook(null); setCode(''); setWires([]); setBits([0, 0, 0, 0]); setHints([0, 0, 0]); setErr(null); setTries(0); };

  const st = STAGE[stage];
  const item = ITEMS.find((i) => i.id === look);
  const usedHints = hints.reduce((a, b) => a + b, 0);

  return (
    <div className={`esc esc-${st.tone}`}>
      <div className="esc-room" aria-live="polite">
        <div className="esc-lights" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className={i < stage ? 'on' : ''} />)}</div>
        <small>Laboratory 07 · {st.name}</small>
        <p>{st.text}</p>
      </div>

      {stage < 3 && (
        <section className="panel">
          <h3>Undersøg rummet</h3>
          <div className="esc-items">
            {ITEMS.map((i) => <button key={i.id} className={`esc-item ${look === i.id ? 'on' : ''} ${found.includes(i.id) ? 'seen' : ''}`} onClick={() => examine(i.id)}><span aria-hidden="true">{i.icon}</span>{i.name}</button>)}
          </div>
          {item && <div className="help-box arrive" key={item.id}><strong>{item.name}:</strong> {item.text}</div>}
        </section>
      )}

      {stage === 0 && (
        <section className="panel esc-panel">
          <h3>Gåde 1 · Dørpanel</h3>
          <div className="esc-display" aria-label={`Indtastet: ${code || 'intet'}`}>{code.padEnd(4, '·')}</div>
          <div className="esc-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <button key={n} onClick={() => setCode((c) => (c.length < 4 ? c + n : c))}>{n}</button>)}
            <button onClick={() => setCode('')} aria-label="Ryd">C</button>
            <button onClick={() => setCode((c) => (c.length < 4 ? c + '0' : c))}>0</button>
            <button className="go" onClick={tryCode} disabled={code.length < 4}>OK</button>
          </div>
        </section>
      )}

      {stage === 1 && (
        <section className="panel esc-panel">
          <h3>Gåde 2 · Kabelpanel</h3>
          <p className="muted small">Tilslut de tre kabler i den rigtige rækkefølge.</p>
          <div className="esc-slots">{[0, 1, 2].map((i) => { const w = WIRES.find((x) => x.id === wires[i]); return <span key={i} style={{ background: w?.color }}>{w ? w.label : i + 1}</span>; })}</div>
          <div className="btn-row">{WIRES.map((w) => <button key={w.id} className="esc-wire" style={{ ['--c' as string]: w.color }} disabled={wires.includes(w.id)} onClick={() => addWire(w.id)}>{w.label} kabel</button>)}</div>
        </section>
      )}

      {stage === 2 && (
        <section className="panel esc-panel">
          <h3>Gåde 3 · AI-terminal</h3>
          <p className="muted small">Tryk på bittene for at skifte mellem 0 og 1.</p>
          <div className="esc-bits">
            {bits.map((b, i) => (
              <button key={i} className={b ? 'on' : ''} onClick={() => setBits((bs) => bs.map((x, j) => (j === i ? 1 - x : x)))} aria-label={`Bit for ${2 ** (3 - i)}: ${b}`}>
                <b>{b}</b><small>{2 ** (3 - i)}</small>
              </button>
            ))}
          </div>
          <p className="center muted">= {value}</p>
          <button className="btn" onClick={tryBits}>Send til kernen</button>
        </section>
      )}

      {err && stage < 3 && <div className="help-box esc-err arrive" key={tries} role="alert">{err}</div>}

      {stage < 3 && (
        <div className="btn-row">
          <button className="btn ghost sm" onClick={() => setHints((h) => h.map((x, i) => (i === stage ? Math.min(3, x + 1) : x)))} disabled={hints[stage] >= 3}>💡 Hint ({hints[stage]}/3)</button>
        </div>
      )}
      {stage < 3 && hints[stage] > 0 && (
        <ul className="esc-hints">{HINTS[stage].slice(0, hints[stage]).map((h) => <li key={h}>{h}</li>)}</ul>
      )}

      {stage === 3 && (
        <section className="lesson arrive" style={{ ['--c' as string]: 'var(--good)' }}>
          <span className="mod-n">Du slap ud</span>
          <h3>Laboratory 07 er løst</h3>
          <p>Fejlforsøg: {tries} · Hints brugt: {usedHints} · Spor fundet: {found.filter((f) => ['tavle', 'note', 'log'].includes(f)).length}/3</p>
        </section>
      )}

      <button className="btn ghost" onClick={reset}>Genstart rummet</button>
    </div>
  );
}
