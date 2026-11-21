import { lazy, Suspense, useState } from 'react';
import { ALL_MODULES, LEVELS, TRACKS, XP_PER_MODULE, type Module, type Track } from '../data/learn';
import { expById, universeById, type UniverseId } from '../data/experiences';
import { useStored } from '../lib/store';
import { Quiz } from './Quiz';
import { Cover } from './Cover';
import { Boundary } from './Boundary';

const GalaxyScene = lazy(() => import('./GalaxyScene').then((m) => ({ default: m.GalaxyScene })));

interface Note { id: string; module: string; text: string; date: string }

function useProgress() {
  const [done, setDone] = useStored<string[]>('learn_done', []);
  const [notes, setNotes] = useStored<Note[]>('learn_notes', []);
  const xp = done.length * XP_PER_MODULE;
  const level = Math.min(LEVELS.length - 1, Math.floor(done.length / 3));
  return { done, setDone, notes, setNotes, xp, level };
}

const trackDone = (t: Track, done: string[]) => t.modules.filter((m) => done.includes(m.id)).length;
const unlocked = (t: Track, i: number, done: string[]) => i === 0 || done.includes(t.modules[i - 1].id);

/** Lille boks under en oplevelse: moduler der bruger den som demo. */
export function LearnLinks({ expId }: { expId: string }) {
  const mods = ALL_MODULES.filter((m) => m.demo === expId);
  if (!mods.length) return null;
  return (
    <section className="usecase">
      <span className="eyebrow">AI Learning Hub</span>
      <h3>Lær AI’en bag</h3>
      <ul className="learn-links">
        {mods.map((m) => <li key={m.id}><a href={`#/laer/${m.track}/${m.id}`}>{m.title} <small>· {m.minutes} min</small> →</a></li>)}
      </ul>
    </section>
  );
}

export function LearnHub({ track, module }: { track?: UniverseId; module?: string }) {
  const p = useProgress();
  const t = TRACKS.find((x) => x.universe === track);
  const m = t?.modules.find((x) => x.id === module);
  if (t && m) return <ModuleView t={t} m={m} p={p} />;
  if (t) return <TrackView t={t} done={p.done} />;
  return <Overview p={p} />;
}

type P = ReturnType<typeof useProgress>;

function Overview({ p }: { p: P }) {
  const next = ALL_MODULES.find((m) => !p.done.includes(m.id));
  const total = ALL_MODULES.length;
  return (
    <>
      <section className="hero learn-hero">
        <div className="hero-bg" aria-hidden="true">
          <img className="hero-img" src={`${import.meta.env.BASE_URL}img/knowledge-galaxy.webp`} alt="" />
          <Boundary fallback={null}><Suspense fallback={null}><GalaxyScene /></Suspense></Boundary>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">AI Learning Hub</span>
          <h1>Lær AI ved at gøre det</h1>
          <p>Fem spor, {total} korte moduler. Hvert modul: lær, se en demo, prøv selv i dine egne AI-værktøjer, og tjek din forståelse.</p>
          {next && <a className="btn lg" href={`#/laer/${next.track}/${next.id}`}>{p.done.length ? 'Fortsæt' : 'Start'}: {next.title}</a>}
          {!next && <span className="btn lg">Alle moduler gennemført 🎉</span>}
        </div>
      </section>

      <section className="section">
        <div className="learn-hud">
          <div><small>Niveau</small><b>{LEVELS[p.level]}</b></div>
          <div className="learn-bar"><small>{p.done.length} af {total} moduler · {p.xp} XP</small><span><i style={{ width: `${(p.done.length / total) * 100}%` }} /></span></div>
        </div>

        <h2 className="h-sec">Fem spor</h2>
        <div className="learn-tracks">
          {TRACKS.map((t, i) => {
            const u = universeById(t.universe);
            const d = trackDone(t, p.done);
            return (
              <a key={t.universe} href={`#/laer/${t.universe}`} className="learn-track" style={{ ['--c' as string]: u.color }}>
                <div className="learn-track-art"><Cover id={t.modules[0].demo} universe={t.universe} /><span className="learn-ring" style={{ ['--p' as string]: `${(d / t.modules.length) * 100}%` }}>{d}/{t.modules.length}</span></div>
                <div className="learn-track-body">
                  <span className="uni" style={{ color: u.color }}>{u.name}{i === 0 ? ' · start her' : ''}</span>
                  <h3>{t.title}</h3>
                  <p>{t.intro}</p>
                </div>
              </a>
            );
          })}
        </div>

        <h2 className="h-sec">Mit promptbibliotek</h2>
        {p.notes.length === 0 ? <div className="empty-box">Når du gemmer en prompt eller note under «Prøv selv», havner den her.</div> : (
          <div className="learn-notes">
            {p.notes.map((n) => {
              const mod = ALL_MODULES.find((x) => x.id === n.module);
              return (
                <article key={n.id} className="panel">
                  <div className="row-between"><small className="muted">{mod?.title} · {n.date}</small>
                    <div className="btn-row" style={{ marginTop: 0 }}>
                      <CopyBtn text={n.text} />
                      <button className="btn ghost sm" onClick={() => p.setNotes(p.notes.filter((x) => x.id !== n.id))}>Slet</button>
                    </div>
                  </div>
                  <p className="learn-note-text">{n.text}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

function TrackView({ t, done }: { t: Track; done: string[] }) {
  const u = universeById(t.universe);
  return (
    <section className="section" style={{ ['--c' as string]: u.color }}>
      <a href="#/laer" className="btn ghost sm">← AI Learning Hub</a>
      <div className="learn-track-head">
        <span className="uni" style={{ color: u.color }}>{u.name}</span>
        <h1 className="h-page">{t.title}</h1>
        <p className="muted">{t.intro}</p>
      </div>
      <ol className="learn-path">
        {t.modules.map((m, i) => {
          const isDone = done.includes(m.id), open = unlocked(t, i, done);
          return (
            <li key={m.id} className={isDone ? 'done' : open ? 'open' : 'locked'}>
              <span className="learn-node">{isDone ? '✓' : open ? i + 1 : '🔒'}</span>
              {open ? (
                <a href={`#/laer/${t.universe}/${m.id}`} className="learn-mod">
                  <b>{m.title}</b><small>{m.minutes} min · {isDone ? 'Gennemført' : 'Klar'}</small>
                </a>
              ) : (
                <div className="learn-mod"><b>{m.title}</b><small>Gennemfør forrige modul først</small></div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const STEPS = ['Lær', 'Se', 'Prøv', 'Tjek'] as const;

function ModuleView({ t, m, p }: { t: Track; m: Module; p: P }) {
  const u = universeById(t.universe);
  const [step, setStep] = useState(0);
  const [right, setRight] = useState<boolean[]>([]);
  const [tries, setTries] = useState(0);
  const [note, setNote] = useState(m.prompt);
  const [saved, setSaved] = useState(false);
  const idx = t.modules.findIndex((x) => x.id === m.id);
  const nextMod = t.modules[idx + 1];
  const isDone = p.done.includes(m.id);
  const demo = expById(m.demo)!;
  const allRight = right.length === m.quiz.length && right.every(Boolean);
  const answered = right.filter((x) => x !== undefined).length === m.quiz.length;

  const answer = (i: number, ok: boolean) => {
    const r = [...right];
    r[i] = ok;
    setRight(r);
    if (r.length === m.quiz.length && r.every(Boolean) && !p.done.includes(m.id)) p.setDone([...p.done, m.id]);
  };
  const saveNote = () => {
    p.setNotes([{ id: String(Date.now()), module: m.id, text: note.trim(), date: new Date().toLocaleDateString('da-DK') }, ...p.notes]);
    setSaved(true);
  };

  return (
    <section className="section learn-module" style={{ ['--c' as string]: u.color }}>
      <a href={`#/laer/${t.universe}`} className="btn ghost sm">← {t.title}</a>
      <div className="learn-track-head">
        <span className="uni" style={{ color: u.color }}>{t.title} · modul {idx + 1} af {t.modules.length} · {m.minutes} min</span>
        <h1 className="h-page">{m.title}{isDone && <span className="badge live" style={{ marginLeft: 10, verticalAlign: 'middle' }}>✓ Gennemført</span>}</h1>
      </div>

      <div className="learn-steps" role="tablist" aria-label="Trin">
        {STEPS.map((s, i) => (
          <button key={s} role="tab" aria-selected={step === i} className={`${step === i ? 'on' : ''} ${i < step ? 'past' : ''}`} onClick={() => setStep(i)}>
            <span>{i + 1}</span>{s}
          </button>
        ))}
      </div>

      <div className="lesson arrive" key={step}>
        {step === 0 && (
          <>
            <p className="learn-lead">{m.lesson}</p>
            <ul className="learn-points">{m.points.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        {step === 1 && (
          <>
            <a href={`#/x/${demo.id}`} className="learn-demo">
              <Cover id={demo.id} universe={demo.universe} />
              <div><span className="eyebrow">Interaktiv demo</span><h3>{demo.title}</h3><p>{m.demoWhy}</p><span className="btn sm">Åbn demoen →</span></div>
            </a>
            <p className="muted small">Demoen åbner i Experience Hub. Brug «Tilbage» for at komme hertil igen.</p>
          </>
        )}
        {step === 2 && (
          <>
            <h3>Prøv selv</h3>
            <p>{m.task}</p>
            <h4>Prompt du kan bruge</h4>
            <div className="learn-prompt">{m.prompt}</div>
            <div className="btn-row"><CopyBtn text={m.prompt} label="Kopiér prompt" /></div>
            <h4>Gem din egen version</h4>
            <textarea className="learn-textarea" value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} rows={5} aria-label="Din prompt eller note" />
            <div className="btn-row"><button className="btn" onClick={saveNote} disabled={saved || !note.trim()}>{saved ? '✓ Gemt i biblioteket' : 'Gem i mit promptbibliotek'}</button></div>
          </>
        )}
        {step === 3 && (
          <>
            {m.quiz.map((q, i) => <Quiz key={`${m.id}${i}${tries}`} question={q} onDone={(ok) => answer(i, ok)} />)}
            {answered && !allRight && <button className="btn ghost" onClick={() => { setRight([]); setTries((x) => x + 1); }}>Prøv quizzen igen</button>}
            {(allRight || isDone) && (
              <div className="learn-win arrive">
                <b>+{XP_PER_MODULE} XP</b> Modulet er gennemført.
                <div className="btn-row">
                  {nextMod ? <a className="btn" href={`#/laer/${t.universe}/${nextMod.id}`}>Næste: {nextMod.title} →</a> : <a className="btn" href="#/laer">Sporet er færdigt – vælg et nyt</a>}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="btn-row">
        {step > 0 && <button className="btn ghost" onClick={() => setStep(step - 1)}>← {STEPS[step - 1]}</button>}
        {step < 3 && <button className="btn" onClick={() => setStep(step + 1)}>{STEPS[step + 1]} →</button>}
      </div>
    </section>
  );
}

function CopyBtn({ text, label = 'Kopiér' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button className="btn ghost sm" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch { /* udklipsholder ikke tilladt */ }
    }}>{ok ? '✓ Kopieret' : label}</button>
  );
}
