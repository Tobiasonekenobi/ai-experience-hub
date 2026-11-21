import { useEffect, useState, type ReactElement } from 'react';
import { load, useStored } from '../lib/store';
import { ALL_MODULES } from '../data/learn';
import { BarChart, LineChart } from './Charts';

// Dashboard-bygger: start tomt, vælg byggeklodser fra biblioteket, og sæt dem sammen som du vil.
// Alt gemmes lokalt i browseren. Intet er fyldt på på forhånd.

type WType = 'tal' | 'graf' | 'opgaver' | 'note' | 'vane' | 'nedtaelling' | 'timer' | 'links' | 'ur' | 'budget' | 'laering' | 'prompts';
type Data = any;
interface W { id: string; type: WType; title: string; size: 1 | 2; color: string; data: Data }
interface Board { id: string; name: string; widgets: W[] }

const COLORS = ['#F28A3C', '#4DD9E8', '#9B7CFF', '#F0C36A', '#7BE0A6', '#FF5FA2'];
const uid = () => Math.random().toString(36).slice(2, 9);

const LIB: { type: WType; icon: string; name: string; desc: string; data: () => Data; size?: 1 | 2 }[] = [
  { type: 'tal', icon: '🔢', name: 'Nøgletal', desc: 'Ét tal med mål og fremdrift – fx skridt, sider læst, kr. sparet.', data: () => ({ value: 0, unit: '', target: 100, step: 1 }) },
  { type: 'graf', icon: '📊', name: 'Graf', desc: 'Dine egne tal som søjler eller kurve.', data: () => ({ kind: 'bar', rows: [] }), size: 2 },
  { type: 'opgaver', icon: '✅', name: 'Opgaver', desc: 'En simpel to-do-liste.', data: () => ({ items: [] }) },
  { type: 'note', icon: '📝', name: 'Note', desc: 'Fri tekst – idéer, huskeliste, tanker.', data: () => ({ text: '' }) },
  { type: 'vane', icon: '🔁', name: 'Vaner', desc: 'Sæt kryds hver dag og se din stime.', data: () => ({ habits: [] }), size: 2 },
  { type: 'nedtaelling', icon: '⏳', name: 'Nedtælling', desc: 'Dage til en vigtig dato.', data: () => ({ date: '' }) },
  { type: 'timer', icon: '⏱️', name: 'Fokus-timer', desc: 'Arbejd i fokuserede blokke, fx 25 minutter.', data: () => ({ mins: 25 }) },
  { type: 'links', icon: '🔗', name: 'Genveje', desc: 'Dine vigtigste links samlet ét sted.', data: () => ({ links: [] }) },
  { type: 'ur', icon: '🕒', name: 'Ur og dato', desc: 'Tid, dato og en hilsen.', data: () => ({}) },
  { type: 'budget', icon: '💰', name: 'Budget', desc: 'Indtægter og udgifter med saldo.', data: () => ({ entries: [] }) },
  { type: 'laering', icon: '🎓', name: 'AI-læring', desc: 'Din fremgang i AI Learning Hub.', data: () => ({}) },
  { type: 'prompts', icon: '💬', name: 'Mine prompts', desc: 'Seneste prompts fra dit promptbibliotek.', data: () => ({}) },
];
const lib = (t: WType) => LIB.find((l) => l.type === t)!;

type WP = { w: W; edit: boolean; set: (d: Data) => void };

/* ---------------- Widgets ---------------- */

function Tal({ w, edit, set }: WP) {
  const d = w.data;
  const pct = d.target ? Math.max(0, Math.min(100, (d.value / d.target) * 100)) : null;
  return (
    <>
      <div className="dw-big">{d.value.toLocaleString('da-DK')}<small>{d.unit}</small></div>
      {pct !== null && <><div className="dw-prog"><i style={{ width: `${pct}%` }} /></div><small className="muted">{Math.round(pct)} % af {d.target.toLocaleString('da-DK')} {d.unit}</small></>}
      <div className="btn-row">
        <button className="btn ghost sm" onClick={() => set({ ...d, value: d.value - d.step })}>− {d.step}</button>
        <button className="btn sm" onClick={() => set({ ...d, value: d.value + d.step })}>+ {d.step}</button>
      </div>
      {edit && (
        <div className="dw-form">
          <label>Værdi<input type="number" value={d.value} onChange={(e) => set({ ...d, value: +e.target.value })} /></label>
          <label>Enhed<input value={d.unit} placeholder="fx kr, sider" onChange={(e) => set({ ...d, unit: e.target.value })} /></label>
          <label>Mål (0 = intet)<input type="number" value={d.target ?? 0} onChange={(e) => set({ ...d, target: +e.target.value || null })} /></label>
          <label>Trin<input type="number" value={d.step} min={1} onChange={(e) => set({ ...d, step: Math.max(1, +e.target.value) })} /></label>
        </div>
      )}
    </>
  );
}

function Graf({ w, edit, set }: WP) {
  const d = w.data as { kind: 'bar' | 'line'; rows: { l: string; v: number }[] };
  const [l, setL] = useState('');
  const [v, setV] = useState('');
  const add = () => { if (!l.trim() || v === '') return; set({ ...d, rows: [...d.rows, { l: l.trim(), v: +v }] }); setL(''); setV(''); };
  return (
    <>
      {d.rows.length === 0 ? <p className="muted small">Ingen tal endnu. Tilføj et punkt herunder – fx «Jan» og «1200».</p>
        : d.kind === 'bar'
          ? <BarChart title="" bars={d.rows.map((r) => ({ label: r.l, value: r.v, color: w.color }))} />
          : <LineChart title="" xLabels={d.rows.map((r) => r.l)} series={[{ label: w.title, color: w.color, points: d.rows.map((r) => r.v) }]} />}
      <div className="dw-add">
        <input value={l} onChange={(e) => setL(e.target.value)} placeholder="Navn" aria-label="Navn på punkt" />
        <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Tal" type="number" aria-label="Værdi" onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button className="btn sm" onClick={add}>+</button>
      </div>
      {edit && (
        <div className="dw-form">
          <div className="seg small"><button className={d.kind === 'bar' ? 'on' : ''} onClick={() => set({ ...d, kind: 'bar' })}>Søjler</button><button className={d.kind === 'line' ? 'on' : ''} onClick={() => set({ ...d, kind: 'line' })}>Kurve</button></div>
          <ul className="dw-list">{d.rows.map((r, i) => <li key={i}><span>{r.l}</span><b>{r.v}</b><button className="dw-x" aria-label={`Fjern ${r.l}`} onClick={() => set({ ...d, rows: d.rows.filter((_, j) => j !== i) })}>✕</button></li>)}</ul>
        </div>
      )}
    </>
  );
}

function Opgaver({ w, set }: WP) {
  const d = w.data as { items: { id: string; t: string; done: boolean }[] };
  const [t, setT] = useState('');
  const add = () => { if (!t.trim()) return; set({ items: [...d.items, { id: uid(), t: t.trim(), done: false }] }); setT(''); };
  const open = d.items.filter((x) => !x.done).length;
  return (
    <>
      <small className="muted">{open} tilbage af {d.items.length}</small>
      <ul className="dw-todo">
        {d.items.map((x) => (
          <li key={x.id} className={x.done ? 'done' : ''}>
            <label><input type="checkbox" checked={x.done} onChange={() => set({ items: d.items.map((y) => (y.id === x.id ? { ...y, done: !y.done } : y)) })} /> {x.t}</label>
            <button className="dw-x" aria-label={`Slet ${x.t}`} onClick={() => set({ items: d.items.filter((y) => y.id !== x.id) })}>✕</button>
          </li>
        ))}
      </ul>
      <div className="dw-add"><input value={t} onChange={(e) => setT(e.target.value)} placeholder="Ny opgave" aria-label="Ny opgave" onKeyDown={(e) => e.key === 'Enter' && add()} /><button className="btn sm" onClick={add}>+</button></div>
    </>
  );
}

function Note({ w, set }: WP) {
  return <textarea className="dw-note" value={w.data.text} onChange={(e) => set({ text: e.target.value })} placeholder="Skriv her …" aria-label={w.title} rows={6} />;
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);
function Vane({ w, set }: WP) {
  const d = w.data as { habits: { id: string; name: string; days: string[] }[] };
  const [n, setN] = useState('');
  const days = Array.from({ length: 7 }, (_, i) => { const x = new Date(); x.setDate(x.getDate() - (6 - i)); return x; });
  const streak = (h: { days: string[] }) => { let s = 0; const x = new Date(); while (h.days.includes(dayKey(x))) { s++; x.setDate(x.getDate() - 1); } return s; };
  const toggle = (id: string, k: string) => set({ habits: d.habits.map((h) => (h.id === id ? { ...h, days: h.days.includes(k) ? h.days.filter((y) => y !== k) : [...h.days, k] } : h)) });
  const add = () => { if (!n.trim()) return; set({ habits: [...d.habits, { id: uid(), name: n.trim(), days: [] }] }); setN(''); };
  return (
    <>
      {d.habits.length > 0 && (
        <div className="dw-habits">
          <div className="dw-hrow head"><span />{days.map((x) => <small key={dayKey(x)}>{x.toLocaleDateString('da-DK', { weekday: 'narrow' })}</small>)}<small>🔥</small></div>
          {d.habits.map((h) => (
            <div key={h.id} className="dw-hrow">
              <span title={h.name}>{h.name}</span>
              {days.map((x) => { const k = dayKey(x); const on = h.days.includes(k); return <button key={k} className={`dw-day ${on ? 'on' : ''}`} aria-pressed={on} aria-label={`${h.name} ${x.toLocaleDateString('da-DK')}`} onClick={() => toggle(h.id, k)} />; })}
              <b>{streak(h)}</b>
            </div>
          ))}
        </div>
      )}
      <div className="dw-add"><input value={n} onChange={(e) => setN(e.target.value)} placeholder="Ny vane, fx «Gå en tur»" aria-label="Ny vane" onKeyDown={(e) => e.key === 'Enter' && add()} /><button className="btn sm" onClick={add}>+</button></div>
    </>
  );
}

function Nedtaelling({ w, edit, set }: WP) {
  const d = w.data as { date: string };
  const days = d.date ? Math.ceil((new Date(d.date + 'T00:00').getTime() - new Date(dayKey(new Date()) + 'T00:00').getTime()) / 86400000) : null;
  return (
    <>
      {days === null ? <p className="muted small">Vælg en dato.</p>
        : <div className="dw-big">{Math.abs(days)}<small>{days === 0 ? 'i dag!' : days > 0 ? (days === 1 ? 'dag tilbage' : 'dage tilbage') : 'dage siden'}</small></div>}
      {(edit || !d.date) && <div className="dw-form"><label>Dato<input type="date" value={d.date} onChange={(e) => set({ date: e.target.value })} /></label></div>}
    </>
  );
}

function Timer({ w, edit, set }: WP) {
  const total = w.data.mins * 60;
  const [left, setLeft] = useState(total);
  const [run, setRun] = useState(false);
  useEffect(() => { setLeft(total); setRun(false); }, [total]);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { setRun(false); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [run]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  return (
    <>
      <div className="dw-big mono">{mm}:{ss}{left === 0 && <small>Færdig – hold en pause</small>}</div>
      <div className="dw-prog"><i style={{ width: `${(1 - left / total) * 100}%` }} /></div>
      <div className="btn-row">
        <button className="btn sm" onClick={() => setRun((r) => !r)} disabled={left === 0}>{run ? '❚❚ Pause' : '▶ Start'}</button>
        <button className="btn ghost sm" onClick={() => { setRun(false); setLeft(total); }}>Nulstil</button>
      </div>
      {edit && <div className="dw-form"><label>Minutter<input type="number" min={1} max={180} value={w.data.mins} onChange={(e) => set({ mins: Math.max(1, Math.min(180, +e.target.value)) })} /></label></div>}
    </>
  );
}

function Links({ w, set }: WP) {
  const d = w.data as { links: { id: string; t: string; u: string }[] };
  const [t, setT] = useState('');
  const [u, setU] = useState('');
  const add = () => {
    const url = /^https?:\/\//i.test(u.trim()) ? u.trim() : `https://${u.trim()}`;
    if (!u.trim()) return;
    set({ links: [...d.links, { id: uid(), t: t.trim() || u.trim(), u: url }] }); setT(''); setU('');
  };
  return (
    <>
      <ul className="dw-links">{d.links.map((x) => <li key={x.id}><a href={x.u} target="_blank" rel="noopener noreferrer">{x.t} ↗</a><button className="dw-x" aria-label={`Fjern ${x.t}`} onClick={() => set({ links: d.links.filter((y) => y.id !== x.id) })}>✕</button></li>)}</ul>
      <div className="dw-add"><input value={t} onChange={(e) => setT(e.target.value)} placeholder="Navn" aria-label="Navn" /><input value={u} onChange={(e) => setU(e.target.value)} placeholder="adresse.dk" aria-label="Adresse" onKeyDown={(e) => e.key === 'Enter' && add()} /><button className="btn sm" onClick={add}>+</button></div>
    </>
  );
}

function Ur() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  const h = now.getHours();
  const hi = h < 5 ? 'God nat' : h < 10 ? 'God morgen' : h < 12 ? 'God formiddag' : h < 18 ? 'God eftermiddag' : 'God aften';
  return (
    <>
      <div className="dw-big mono">{now.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}</div>
      <p style={{ margin: 0 }}>{hi} · {now.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
    </>
  );
}

function Budget({ w, set }: WP) {
  const d = w.data as { entries: { id: string; t: string; amt: number }[] };
  const [t, setT] = useState('');
  const [a, setA] = useState('');
  const [sign, setSign] = useState<1 | -1>(-1);
  const sum = d.entries.reduce((s, x) => s + x.amt, 0);
  const add = () => { if (!a || !+a) return; set({ entries: [{ id: uid(), t: t.trim() || (sign > 0 ? 'Indtægt' : 'Udgift'), amt: sign * Math.abs(+a) }, ...d.entries] }); setT(''); setA(''); };
  const kr = (n: number) => `${n.toLocaleString('da-DK', { maximumFractionDigits: 2 })} kr`;
  return (
    <>
      <div className="dw-big" style={{ color: sum < 0 ? 'var(--bad)' : undefined }}>{kr(sum)}<small>saldo</small></div>
      <ul className="dw-list">{d.entries.slice(0, 5).map((x) => <li key={x.id}><span>{x.t}</span><b className={x.amt < 0 ? 'neg' : 'pos'}>{x.amt > 0 ? '+' : ''}{kr(x.amt)}</b><button className="dw-x" aria-label={`Slet ${x.t}`} onClick={() => set({ entries: d.entries.filter((y) => y.id !== x.id) })}>✕</button></li>)}</ul>
      {d.entries.length > 5 && <small className="muted">+ {d.entries.length - 5} ældre posteringer</small>}
      <div className="dw-add">
        <button className={`btn sm ${sign > 0 ? '' : 'ghost'}`} onClick={() => setSign(sign > 0 ? -1 : 1)} aria-label="Skift mellem indtægt og udgift">{sign > 0 ? '+' : '−'}</button>
        <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Hvad" aria-label="Hvad" />
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Beløb" type="number" aria-label="Beløb" onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button className="btn sm" onClick={add}>Tilføj</button>
      </div>
    </>
  );
}

function Laering() {
  const done = load<string[]>('learn_done', []);
  const next = ALL_MODULES.find((m) => !done.includes(m.id));
  return (
    <>
      <div className="dw-big">{done.length}<small>af {ALL_MODULES.length} moduler</small></div>
      <div className="dw-prog"><i style={{ width: `${(done.length / ALL_MODULES.length) * 100}%` }} /></div>
      {next && <a className="btn sm" href={`#/laer/${next.track}/${next.id}`} style={{ marginTop: 10 }}>Næste: {next.title} →</a>}
    </>
  );
}

function Prompts() {
  const notes = load<{ id: string; text: string }[]>('learn_notes', []);
  if (!notes.length) return <p className="muted small">Ingen gemte prompts endnu. Gem dem under «Prøv selv» i <a className="link" href="#/laer">AI Learning Hub</a>.</p>;
  return <ul className="dw-prompts">{notes.slice(0, 3).map((n) => <li key={n.id}><p>{n.text}</p><button className="btn ghost sm" onClick={() => navigator.clipboard?.writeText(n.text).catch(() => undefined)}>Kopiér</button></li>)}</ul>;
}

const RENDER: Record<WType, (p: WP) => ReactElement> = { tal: Tal, graf: Graf, opgaver: Opgaver, note: Note, vane: Vane, nedtaelling: Nedtaelling, timer: Timer, links: Links, ur: Ur, budget: Budget, laering: Laering, prompts: Prompts };

/* ---------------- Byggeren ---------------- */

export function DashboardBuilder() {
  const [boards, setBoards] = useStored<Board[]>('dash_boards', [{ id: 'b1', name: 'Mit dashboard', widgets: [] }]);
  const [activeId, setActiveId] = useStored<string>('dash_active', 'b1');
  const [edit, setEdit] = useState(false);
  const [picker, setPicker] = useState(false);
  const board = boards.find((b) => b.id === activeId) ?? boards[0];

  const setBoard = (fn: (b: Board) => Board) => setBoards((bs) => bs.map((b) => (b.id === board.id ? fn(b) : b)));
  const setW = (id: string, fn: (w: W) => W) => setBoard((b) => ({ ...b, widgets: b.widgets.map((w) => (w.id === id ? fn(w) : w)) }));
  const add = (t: WType) => {
    const l = lib(t);
    setBoard((b) => ({ ...b, widgets: [...b.widgets, { id: uid(), type: t, title: l.name, size: l.size ?? 1, color: COLORS[b.widgets.length % COLORS.length], data: l.data() }] }));
    setPicker(false);
  };
  const move = (i: number, d: -1 | 1) => setBoard((b) => { const ws = [...b.widgets]; const j = i + d; if (j < 0 || j >= ws.length) return b; [ws[i], ws[j]] = [ws[j], ws[i]]; return { ...b, widgets: ws }; });
  const newBoard = () => { const id = uid(); setBoards((bs) => [...bs, { id, name: `Dashboard ${bs.length + 1}`, widgets: [] }]); setActiveId(id); setEdit(true); };
  const delBoard = () => {
    if (boards.length < 2 || !confirm(`Slet «${board.name}» og alle dens byggeklodser?`)) return;
    const rest = boards.filter((b) => b.id !== board.id);
    setBoards(rest); setActiveId(rest[0].id);
  };

  return (
    <section className="section dash">
      <div className="dash-head">
        <div>
          <span className="eyebrow">Dashboard-bygger</span>
          {edit ? <input className="dash-name" value={board.name} onChange={(e) => setBoard((b) => ({ ...b, name: e.target.value }))} aria-label="Dashboardets navn" />
            : <h1 className="h-page">{board.name}</h1>}
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn" onClick={() => setPicker(true)}>+ Tilføj</button>
          <button className={`btn ${edit ? '' : 'ghost'}`} onClick={() => setEdit((e) => !e)} aria-pressed={edit}>{edit ? '✓ Færdig' : '✎ Redigér'}</button>
        </div>
      </div>

      {(boards.length > 1 || edit) && (
        <div className="chips scroll" role="tablist" aria-label="Dine dashboards">
          {boards.map((b) => <button key={b.id} role="tab" aria-selected={b.id === board.id} className={`chip ${b.id === board.id ? 'on' : ''}`} onClick={() => setActiveId(b.id)}>{b.name} <span>{b.widgets.length}</span></button>)}
          {edit && <button className="chip" onClick={newBoard}>+ Nyt dashboard</button>}
          {edit && boards.length > 1 && <button className="chip" onClick={delBoard}>Slet dette</button>}
        </div>
      )}

      {board.widgets.length === 0 ? (
        <div className="dash-empty">
          <span aria-hidden="true">▦</span>
          <h2>Dit dashboard er tomt</h2>
          <p>Vælg de byggeklodser, du selv vil have – nøgletal, grafer, opgaver, vaner, budget, timer og mere. Du bestemmer rækkefølge, størrelse og farve.</p>
          <button className="btn lg" onClick={() => setPicker(true)}>Tilføj din første byggeklods</button>
        </div>
      ) : (
        <div className={`dash-grid ${edit ? 'editing' : ''}`}>
          {board.widgets.map((w, i) => {
            const R = RENDER[w.type];
            return (
              <article key={w.id} className={`dw ${w.size === 2 ? 'wide' : ''}`} style={{ ['--c' as string]: w.color }}>
                <header className="dw-head">
                  <span aria-hidden="true">{lib(w.type).icon}</span>
                  {edit ? <input value={w.title} onChange={(e) => setW(w.id, (x) => ({ ...x, title: e.target.value }))} aria-label="Titel" /> : <h3>{w.title}</h3>}
                </header>
                {edit && (
                  <div className="dw-tools">
                    <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Flyt op">↑</button>
                    <button onClick={() => move(i, 1)} disabled={i === board.widgets.length - 1} aria-label="Flyt ned">↓</button>
                    <button onClick={() => setW(w.id, (x) => ({ ...x, size: x.size === 1 ? 2 : 1 }))} aria-label="Skift størrelse">{w.size === 1 ? '⇔ Bred' : '⇥ Smal'}</button>
                    {COLORS.map((c) => <button key={c} className={`dw-color ${w.color === c ? 'on' : ''}`} style={{ background: c }} onClick={() => setW(w.id, (x) => ({ ...x, color: c }))} aria-label={`Farve ${c}`} />)}
                    <button className="dw-del" onClick={() => setBoard((b) => ({ ...b, widgets: b.widgets.filter((x) => x.id !== w.id) }))} aria-label={`Fjern ${w.title}`}>✕ Fjern</button>
                  </div>
                )}
                <div className="dw-body"><R w={w} edit={edit} set={(d) => setW(w.id, (x) => ({ ...x, data: d }))} /></div>
              </article>
            );
          })}
        </div>
      )}

      {picker && (
        <div className="dash-picker" role="dialog" aria-modal="true" aria-label="Vælg byggeklods" onClick={() => setPicker(false)}>
          <div className="dash-picker-box" onClick={(e) => e.stopPropagation()}>
            <div className="row-between"><h2>Vælg en byggeklods</h2><button className="btn ghost sm" onClick={() => setPicker(false)}>Luk</button></div>
            <div className="dash-lib">
              {LIB.map((l) => (
                <button key={l.type} className="dash-lib-item" onClick={() => add(l.type)}>
                  <span aria-hidden="true">{l.icon}</span><b>{l.name}</b><small>{l.desc}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="muted small center">Gemmes kun i denne browser. Dashboards på telefon og computer er adskilte.</p>
    </section>
  );
}
