import { useEffect, useState } from 'react';
import { useStored } from '../lib/store';

// Original kortfilm-historie: «Signal From Tomorrow».

type Cam = 'total' | 'naer' | 'lav';
interface El { e: string; x: number; y: number; s: number }
interface Scene { id: string; title: string; text: string; secs: number; bg: string; els: El[]; focus: number }

const SCENES: Scene[] = [
  { id: 'lab', title: 'Laboratoriet', text: 'Kl. 23:40. Forskeren Lea opfanger et radiosignal – stemplet med morgendagens dato.', secs: 6, bg: 'linear-gradient(180deg,#0f1d33,#070d18)', focus: 0, els: [{ e: '🧑‍🔬', x: 30, y: 62, s: 3.4 }, { e: '🖥️', x: 62, y: 58, s: 3 }, { e: '📡', x: 84, y: 28, s: 2.4 }] },
  { id: 'besked', title: 'Beskeden', text: 'Skærmen blinker: «Stop forsøget kl. 09:00. Ellers går det galt.»', secs: 4, bg: 'linear-gradient(180deg,#2a0f1d,#12060c)', focus: 0, els: [{ e: '🖥️', x: 50, y: 52, s: 4.4 }, { e: '⚠️', x: 72, y: 30, s: 2 }] },
  { id: 'tvivl', title: 'Tvivlen', text: 'Lea går op på taget. Hvem sender beskeder fra i morgen – og kan hun stole på dem?', secs: 7, bg: 'linear-gradient(180deg,#140f33,#06051a)', focus: 1, els: [{ e: '🌙', x: 78, y: 20, s: 2.4 }, { e: '🧍', x: 40, y: 64, s: 3.2 }, { e: '🌃', x: 62, y: 74, s: 3.6 }] },
  { id: 'forsoeg', title: 'Forsøget', text: 'Kl. 08:59. Holdet står klar. Leas hånd svæver over den røde knap.', secs: 5, bg: 'linear-gradient(180deg,#33180b,#1a0b05)', focus: 1, els: [{ e: '⏱️', x: 78, y: 24, s: 2.2 }, { e: '🔴', x: 50, y: 66, s: 3.4 }, { e: '✋', x: 48, y: 40, s: 3 }] },
];
const ENDINGS: Record<'a' | 'b', Scene> = {
  a: { id: 'slutA', title: 'Slut A: Hun stopper', text: 'Lea afbryder forsøget. Om morgenen kommer et nyt signal – kun ét ord: «Tak.»', secs: 6, bg: 'linear-gradient(180deg,#33280b,#1a1405)', focus: 0, els: [{ e: '🌅', x: 50, y: 40, s: 4 }, { e: '📡', x: 24, y: 66, s: 2.4 }, { e: '💬', x: 76, y: 30, s: 2.4 }] },
  b: { id: 'slutB', title: 'Slut B: Hun trykker', text: 'Lea trykker. Et lysglimt – og signalet starter forfra, med en ny dato: i går.', secs: 6, bg: 'linear-gradient(180deg,#1d0b33,#0c051a)', focus: 0, els: [{ e: '💥', x: 50, y: 46, s: 4.6 }, { e: '🔁', x: 78, y: 26, s: 2.2 }, { e: '📡', x: 22, y: 70, s: 2.2 }] },
};
const CAMS: { id: Cam; label: string }[] = [{ id: 'total', label: 'Total' }, { id: 'naer', label: 'Nær' }, { id: 'lav', label: 'Lav vinkel' }];

function Frame({ scene, cam, small = false }: { scene: Scene; cam: Cam; small?: boolean }) {
  const f = scene.els[scene.focus];
  const t = cam === 'naer' ? `scale(2) translate(${50 - f.x}%, ${50 - f.y}%)` : cam === 'lav' ? 'perspective(500px) rotateX(16deg) scale(1.25) translateY(8%)' : 'none';
  return (
    <div className={`sb-frame ${small ? 'sm' : ''}`} style={{ background: scene.bg }}>
      <div className="sb-comp" style={{ transform: t }}>
        {scene.els.map((el, i) => <span key={i} style={{ left: `${el.x}%`, top: `${el.y}%`, fontSize: `${el.s * (small ? 0.42 : 1)}rem` }}>{el.e}</span>)}
      </div>
      {!small && <span className="sb-cam">● REC · {CAMS.find((c) => c.id === cam)!.label}</span>}
    </div>
  );
}

export default function Storyboard() {
  const [order, setOrder] = useStored<string[]>('sb_order', SCENES.map((s) => s.id));
  const [cams, setCams] = useStored<Record<string, Cam>>('sb_cams', {});
  const [ending, setEnding] = useStored<'a' | 'b'>('sb_end', 'a');
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);

  const seq = [...order.map((id) => SCENES.find((s) => s.id === id)!), ENDINGS[ending]];
  const scene = seq[Math.min(cur, seq.length - 1)];
  const cam = cams[scene.id] ?? 'total';
  const total = seq.reduce((s, x) => s + x.secs, 0);
  const inOrder = order.join() === SCENES.map((s) => s.id).join();

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => { if (cur < seq.length - 1) setCur((c) => c + 1); else setPlaying(false); }, 1800);
    return () => clearTimeout(t);
  }, [playing, cur, seq.length]);

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const o = [...order];
    [o[i], o[j]] = [o[j], o[i]];
    setOrder(o);
    setCur(j);
  };

  return (
    <div className="sb">
      <div className="demo-note">Original kortfilm · «Signal From Tomorrow»</div>

      <div className="sb-monitor" key={scene.id + cam}>
        <Frame scene={scene} cam={cam} />
        <div className="sb-sub"><b>{cur + 1}. {scene.title}</b> {scene.text}</div>
      </div>

      <div className="row-between">
        <div className="seg small" aria-label="Kameravinkel">
          {CAMS.map((c) => <button key={c.id} className={cam === c.id ? 'on' : ''} onClick={() => setCams((m) => ({ ...m, [scene.id]: c.id }))}>{c.label}</button>)}
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn ghost sm" onClick={() => setCur((c) => Math.max(0, c - 1))} disabled={cur === 0} aria-label="Forrige scene">◀</button>
          <button className="btn sm" onClick={() => { if (!playing && cur === seq.length - 1) setCur(0); setPlaying((p) => !p); }}>{playing ? '❚❚ Pause' : '▶ Afspil'}</button>
          <button className="btn ghost sm" onClick={() => setCur((c) => Math.min(seq.length - 1, c + 1))} disabled={cur === seq.length - 1} aria-label="Næste scene">▶</button>
        </div>
      </div>

      <section className="panel">
        <div className="row-between"><h3>Tidslinje</h3><span className="muted small">Samlet længde ca. {total} sek.</span></div>
        <div className="sb-strip">
          {seq.map((s, i) => {
            const isEnd = i === seq.length - 1;
            return (
              <div key={s.id} className={`sb-clip ${i === cur ? 'on' : ''}`} style={{ flexGrow: s.secs }}>
                <button className="sb-thumb" onClick={() => { setCur(i); setPlaying(false); }} aria-label={`Gå til ${s.title}`}>
                  <Frame scene={s} cam={cams[s.id] ?? 'total'} small />
                  <small>{i + 1}. {s.title}</small>
                </button>
                {!isEnd && (
                  <div className="sb-move">
                    <button onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Flyt ${s.title} tidligere`}>←</button>
                    <button onClick={() => move(i, 1)} disabled={i === order.length - 1} aria-label={`Flyt ${s.title} senere`}>→</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!inOrder && <p className="muted small">Du har ændret rækkefølgen. Historien fortælles nu anderledes – fx starter den med {seq[0].title.toLowerCase()}.</p>}
      </section>

      <section className="panel">
        <h3>Alternativt forløb</h3>
        <div className="seg small">
          <button className={ending === 'a' ? 'on' : ''} onClick={() => { setEnding('a'); setCur(seq.length - 1); }}>Hun stopper</button>
          <button className={ending === 'b' ? 'on' : ''} onClick={() => { setEnding('b'); setCur(seq.length - 1); }}>Hun trykker</button>
        </div>
      </section>

      <section className="panel">
        <h3>Sceneoversigt</h3>
        <ol className="sb-list">{seq.map((s, i) => <li key={s.id} className={i === cur ? 'on' : ''}><b>{s.title}</b><span>{CAMS.find((c) => c.id === (cams[s.id] ?? 'total'))!.label} · {s.secs} sek.</span></li>)}</ol>
      </section>

      <button className="btn ghost" onClick={() => { setOrder(SCENES.map((s) => s.id)); setCams({}); setEnding('a'); setCur(0); setPlaying(false); }}>Nulstil klip</button>
    </div>
  );
}
