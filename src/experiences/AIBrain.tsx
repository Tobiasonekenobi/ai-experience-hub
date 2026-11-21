import { useCallback, useEffect, useRef, useState } from 'react';

// Et ægte, lille neuralt netværk (2 → skjult lag → 1), der trænes i browseren med gradient descent.
// Ingen forudberegnede resultater: det du ser, er netværket der faktisk lærer.

type Pt = { x: number; y: number; c: 0 | 1 };
type Kind = 'klynger' | 'cirkel' | 'xor';
interface Net { h: number; w1: number[]; b1: number[]; w2: number[]; b2: number }

const KINDS: { id: Kind; label: string; hint: string }[] = [
  { id: 'klynger', label: 'To klynger', hint: 'Let: en ret linje kan næsten skille dem.' },
  { id: 'cirkel', label: 'Cirkel', hint: 'Mellem: netværket skal lære en rund grænse.' },
  { id: 'xor', label: 'Kryds (XOR)', hint: 'Svær: kræver mindst to-tre skjulte neuroner.' },
];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function makeData(kind: Kind, seed: number): Pt[] {
  const r = rng(seed);
  const pts: Pt[] = [];
  const gauss = () => (r() + r() + r() - 1.5) * 0.45;
  for (let i = 0; i < 140; i++) {
    if (kind === 'klynger') {
      const c = (i % 2) as 0 | 1;
      pts.push({ x: (c ? 0.45 : -0.45) + gauss(), y: (c ? 0.35 : -0.35) + gauss(), c });
    } else {
      const x = r() * 2 - 1, y = r() * 2 - 1;
      if (kind === 'cirkel') {
        const d = Math.hypot(x, y);
        if (Math.abs(d - 0.55) < 0.08) continue; // lidt luft om grænsen
        pts.push({ x, y, c: d < 0.55 ? 1 : 0 });
      } else {
        if (Math.abs(x) < 0.08 || Math.abs(y) < 0.08) continue;
        pts.push({ x, y, c: x * y > 0 ? 1 : 0 });
      }
    }
  }
  return pts;
}

function initNet(h: number, seed: number): Net {
  const r = rng(seed);
  const w = () => (r() * 2 - 1) * 1.2;
  return { h, w1: Array.from({ length: h * 2 }, w), b1: Array.from({ length: h }, w), w2: Array.from({ length: h }, w), b2: 0 };
}

function forward(n: Net, x: number, y: number) {
  let s = n.b2;
  const a: number[] = [];
  for (let j = 0; j < n.h; j++) {
    const v = Math.tanh(n.w1[2 * j] * x + n.w1[2 * j + 1] * y + n.b1[j]);
    a.push(v);
    s += n.w2[j] * v;
  }
  return { a, o: 1 / (1 + Math.exp(-s)) };
}

function trainEpoch(n: Net, data: Pt[], lr: number) {
  const g1 = new Array(n.h * 2).fill(0), gb1 = new Array(n.h).fill(0), g2 = new Array(n.h).fill(0);
  let gb2 = 0, loss = 0;
  for (const p of data) {
    const { a, o } = forward(n, p.x, p.y);
    const oc = Math.min(1 - 1e-7, Math.max(1e-7, o));
    loss += -(p.c * Math.log(oc) + (1 - p.c) * Math.log(1 - oc));
    const d = o - p.c;
    gb2 += d;
    for (let j = 0; j < n.h; j++) {
      g2[j] += d * a[j];
      const da = d * n.w2[j] * (1 - a[j] * a[j]);
      g1[2 * j] += da * p.x; g1[2 * j + 1] += da * p.y; gb1[j] += da;
    }
  }
  const k = lr / data.length;
  for (let i = 0; i < g1.length; i++) n.w1[i] -= k * g1[i];
  for (let j = 0; j < n.h; j++) { n.b1[j] -= k * gb1[j]; n.w2[j] -= k * g2[j]; }
  n.b2 -= k * gb2;
  return loss / data.length;
}

const accuracy = (n: Net, data: Pt[]) =>
  data.length ? Math.round((data.filter((p) => (forward(n, p.x, p.y).o > 0.5 ? 1 : 0) === p.c).length / data.length) * 100) : 0;

const MAX_EPOCHS = 4000;

export default function AIBrain() {
  const [kind, setKind] = useState<Kind>('cirkel');
  const [hidden, setHidden] = useState(5);
  const [lr, setLr] = useState(0.8);
  const [running, setRunning] = useState(false);
  const [brush, setBrush] = useState<0 | 1>(1);
  const [, setTick] = useState(0);
  const seed = useRef(3);
  const data = useRef<Pt[]>(makeData('cirkel', 3));
  const net = useRef<Net>(initNet(5, 3));
  const losses = useRef<number[]>([]);
  const epoch = useRef(0);
  const startAcc = useRef(accuracy(net.current, data.current));
  const cv = useRef<HTMLCanvasElement>(null);
  const lrRef = useRef(lr);
  lrRef.current = lr;

  const rerender = () => setTick((t) => t + 1);

  const restart = useCallback((k: Kind, h: number, newData = true) => {
    seed.current += 1;
    if (newData) data.current = makeData(k, seed.current);
    net.current = initNet(h, seed.current * 7);
    losses.current = [];
    epoch.current = 0;
    startAcc.current = accuracy(net.current, data.current);
    setRunning(false);
    rerender();
  }, []);

  const steps = (count: number) => {
    for (let i = 0; i < count && epoch.current < MAX_EPOCHS; i++) {
      const l = trainEpoch(net.current, data.current, lrRef.current);
      epoch.current++;
      if (epoch.current % 4 === 0) losses.current.push(l);
    }
    if (losses.current.length > 400) losses.current = losses.current.filter((_, i) => i % 2 === 0);
  };

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const loop = () => {
      steps(6);
      rerender();
      if (epoch.current >= MAX_EPOCHS) { setRunning(false); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  // Tegn klassifikationsområder og punkter
  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const S = c.clientWidth || 300;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== Math.round(S * dpr)) { c.width = Math.round(S * dpr); c.height = Math.round(S * dpr); }
    const g = c.getContext('2d');
    if (!g) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const N = 46, cell = S / N;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const x = (i + 0.5) / N * 2 - 1, y = 1 - (j + 0.5) / N * 2;
      const o = forward(net.current, x, y).o;
      const t = Math.abs(o - 0.5) * 2; // sikkerhed
      g.fillStyle = o > 0.5 ? `rgba(242,138,60,${0.05 + t * 0.28})` : `rgba(77,217,232,${0.05 + t * 0.28})`;
      g.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
    }
    for (const p of data.current) {
      const px = (p.x + 1) / 2 * S, py = (1 - p.y) / 2 * S;
      g.beginPath();
      g.arc(px, py, 4.2, 0, Math.PI * 2);
      g.fillStyle = p.c ? '#F28A3C' : '#4DD9E8';
      g.fill();
      g.lineWidth = 1.5;
      g.strokeStyle = '#0B1020';
      g.stroke();
    }
  });

  const addPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = 1 - ((e.clientY - r.top) / r.height) * 2;
    data.current = [...data.current, { x, y, c: brush }];
    rerender();
  };

  const n = net.current;
  const acc = accuracy(n, data.current);
  const L = losses.current;
  const maxL = Math.max(0.01, ...L);
  const lossPath = L.map((v, i) => `${(i / Math.max(1, L.length - 1)) * 300},${90 - (v / maxL) * 84}`).join(' ');
  const lastLoss = L.length ? L[L.length - 1] : null;

  // Arkitektur-diagram
  const yIn = [40, 100], yOut = 70;
  const yHid = Array.from({ length: n.h }, (_, j) => 14 + (j + 0.5) * (112 / n.h));
  const maxW = Math.max(0.5, ...n.w1.map(Math.abs), ...n.w2.map(Math.abs));
  const act = forward(n, 0.3, 0.3).a;

  return (
    <div className="brain">
      <div className="demo-note">Ægte træning i din browser · lille netværk med {n.h} skjulte neuroner</div>

      <div className="seg" role="tablist" aria-label="Vælg træningsdata">
        {KINDS.map((k) => (
          <button key={k.id} role="tab" aria-selected={kind === k.id} className={kind === k.id ? 'on' : ''} onClick={() => { setKind(k.id); restart(k.id, hidden); }}>{k.label}</button>
        ))}
      </div>
      <p className="muted small">{KINDS.find((k) => k.id === kind)!.hint}</p>

      <div className="brain-grid">
        <section className="panel">
          <div className="row-between">
            <h3>Klassifikation</h3>
            <span className={`brain-acc ${acc >= 95 ? 'good' : ''}`}>{acc}% korrekt</span>
          </div>
          <canvas ref={cv} className="brain-cv" onPointerDown={addPoint} aria-label="Datapunkter og netværkets klassifikationsområder. Tryk for at tilføje et punkt." role="img" />
          <div className="row-between">
            <span className="muted small">Tryk på feltet for at tilføje:</span>
            <div className="seg small">
              <button className={brush === 1 ? 'on' : ''} style={{ ['--c' as string]: 'var(--orange)' }} onClick={() => setBrush(1)}>● Orange</button>
              <button className={brush === 0 ? 'on' : ''} style={{ ['--c' as string]: 'var(--cyan)' }} onClick={() => setBrush(0)}>● Cyan</button>
            </div>
          </div>
        </section>

        <div>
          <section className="panel">
            <h3>Arkitektur</h3>
            <svg viewBox="0 0 300 140" className="brain-arch" role="img" aria-label={`2 input, ${n.h} skjulte neuroner, 1 output`}>
              {yIn.map((yi, i) => yHid.map((yh, j) => {
                const w = n.w1[2 * j + i];
                return <line key={`a${i}${j}`} x1={40} y1={yi} x2={150} y2={yh} stroke={w > 0 ? '#F28A3C' : '#4DD9E8'} strokeOpacity={0.25 + 0.6 * Math.abs(w) / maxW} strokeWidth={0.6 + 2.6 * Math.abs(w) / maxW} />;
              }))}
              {yHid.map((yh, j) => <line key={`b${j}`} x1={150} y1={yh} x2={260} y2={yOut} stroke={n.w2[j] > 0 ? '#F28A3C' : '#4DD9E8'} strokeOpacity={0.25 + 0.6 * Math.abs(n.w2[j]) / maxW} strokeWidth={0.6 + 2.6 * Math.abs(n.w2[j]) / maxW} />)}
              {yIn.map((yi, i) => <g key={`i${i}`}><circle cx={40} cy={yi} r={10} className="nrn" /><text x={14} y={yi + 4} className="nlbl">{i ? 'y' : 'x'}</text></g>)}
              {yHid.map((yh, j) => <circle key={`h${j}`} cx={150} cy={yh} r={8} className="nrn" style={{ fill: `rgba(155,124,255,${0.25 + 0.7 * Math.abs(act[j])})` }} />)}
              <circle cx={260} cy={yOut} r={12} className="nrn out" />
            </svg>
            <p className="legend"><span><i style={{ background: 'var(--orange)' }} />Positiv vægt</span><span><i style={{ background: 'var(--cyan)' }} />Negativ vægt</span><span>Tykkelse = styrke</span></p>
          </section>

          <section className="panel">
            <div className="row-between"><h3>Fejlkurve</h3><span className="muted small">Runde {epoch.current}</span></div>
            <svg viewBox="0 0 300 96" className="brain-loss" role="img" aria-label="Fejlen falder, mens netværket lærer">
              <line x1="0" y1="90" x2="300" y2="90" stroke="var(--line)" />
              {L.length > 1 && <polyline points={lossPath} fill="none" stroke="var(--violet)" strokeWidth="2.2" />}
              {L.length < 2 && <text x="150" y="52" textAnchor="middle" className="nlbl">Start træningen for at se fejlen falde</text>}
            </svg>
            <p className="muted small">Fejl (log-loss): {lastLoss === null ? '–' : lastLoss.toFixed(3)} · Før træning: {startAcc.current}% korrekt → nu {acc}%</p>
          </section>
        </div>
      </div>

      <section className="panel">
        <label className="slider"><span>Læringshastighed <b>{lr.toFixed(2)}</b></span>
          <input type="range" min={0.05} max={3} step={0.05} value={lr} onChange={(e) => setLr(+e.target.value)} />
        </label>
        <label className="slider"><span>Skjulte neuroner <b>{hidden}</b></span>
          <input type="range" min={1} max={8} value={hidden} onChange={(e) => { const h = +e.target.value; setHidden(h); restart(kind, h, false); }} />
        </label>
        <div className="btn-row">
          <button className="btn" onClick={() => setRunning((r) => !r)} disabled={epoch.current >= MAX_EPOCHS}>{running ? '❚❚ Pause' : epoch.current ? '▶ Fortsæt' : '▶ Start træning'}</button>
          <button className="btn ghost" onClick={() => { steps(50); rerender(); }} disabled={running}>+50 runder</button>
          <button className="btn ghost" onClick={() => restart(kind, hidden, false)}>Nyt netværk</button>
          <button className="btn ghost" onClick={() => restart(kind, hidden)}>Nye data</button>
        </div>
        <p className="muted small">For høj læringshastighed får fejlen til at hoppe. For få neuroner kan ikke lære krydset. Prøv selv.</p>
      </section>
    </div>
  );
}
