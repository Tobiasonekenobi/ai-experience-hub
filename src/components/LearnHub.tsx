import { lazy, Suspense, useState, type ReactNode } from 'react';
import { ALL_MODULES, LEVELS, TRACKS, XP_PER_MODULE, type Module, type Track } from '../data/learn';
import { expById, universeById, type UniverseId } from '../data/experiences';
import { useStored } from '../lib/store';
import { Quiz } from './Quiz';
import { Cover } from './Cover';
import { Boundary } from './Boundary';
import { WIDGETS } from './LearnWidgets';

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

function Banner({ img, color, children }: { img: string; color: string; children: ReactNode }) {
  return (
    <section className="learn-banner" style={{ ['--c' as string]: color }}>
      <img src={`${import.meta.env.BASE_URL}img/${img}.webp`} alt="" aria-hidden="true" />
      <div className="learn-banner-copy">{children}</div>
    </section>
  );
}

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

function TrackView({ t, done }: { t: Track; done: string[] }) {
  const u = universeById(t.universe);
  const d = trackDone(t, done);
  const mins = t.modules.reduce((s, m) => s + m.minutes, 0);
  const next = t.modules.find((m) => !done.includes(m.id));
  return (
    <>
      <Banner img={t.modules[0].demo} color={u.color}>
        <nav className="learn-crumbs"><a href="#/laer">AI Learning Hub</a> › <span>{u.name}</span></nav>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <div className="learn-meta"><span>{t.modules.length} moduler</span><span>ca. {mins} min</span><span>{d} gennemført</span></div>
        <div className="learn-progress"><i style={{ width: `${(d / t.modules.length) * 100}%` }} /></div>
        {next && <a className="btn lg" href={`#/laer/${t.universe}/${next.id}`}>{d ? 'Fortsæt' : 'Start'}: {next.title} →</a>}
      </Banner>

      <section className="section" style={{ ['--c' as string]: u.color }}>
        <div className="learn-cards">
          {t.modules.map((m, i) => {
            const isDone = done.includes(m.id), open = unlocked(t, i, done);
            const e = expById(m.demo)!;
            const body = (
              <>
                <div className="learn-card-art">
                  <Cover id={m.demo} universe={e.universe} />
                  <span className="learn-card-n">{isDone ? '✓' : i + 1}</span>
                  {!open && <span className="learn-card-lock">🔒 Gennemfør modul {i} først</span>}
                </div>
                <div className="learn-card-body">
                  <small>Modul {i + 1} · {m.minutes} min{m.widget ? ' · interaktiv' : ''}</small>
                  <h3>{m.title}</h3>
                  <p>{firstSentence(m.lesson)}</p>
                  <span className={`learn-card-status ${isDone ? 'done' : ''}`}>{isDone ? 'Gennemført' : open ? 'Klar til start →' : 'Låst'}</span>
                </div>
              </>
            );
            return open
              ? <a key={m.id} href={`#/laer/${t.universe}/${m.id}`} className={`learn-card ${isDone ? 'done' : ''}`}>{body}</a>
              : <div key={m.id} className="learn-card locked">{body}</div>;
          })}
        </div>
        <a href="#/laer" className="btn ghost">← Alle spor</a>
      </section>
    </>
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
  const Widget = m.widget ? WIDGETS[m.widget] : null;

  const go = (i: number) => { setStep(i); document.querySelector('.learn-steps')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); };
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
    <>
      <Banner img={m.demo} color={u.color}>
        <nav className="learn-crumbs"><a href="#/laer">AI Learning Hub</a> › <a href={`#/laer/${t.universe}`}>{t.title}</a></nav>
        <h1>{m.title}</h1>
        <div className="learn-meta"><span>Modul {idx + 1} af {t.modules.length}</span><span>{m.minutes} min</span>{m.widget && <span>Interaktiv</span>}{isDone && <span className="ok">✓ Gennemført</span>}</div>
      </Banner>

      <section className="section learn-module" style={{ ['--c' as string]: u.color }}>
        <div className="learn-steps" role="tablist" aria-label="Trin">
          {STEPS.map((s, i) => (
            <button key={s} role="tab" aria-selected={step === i} className={`${step === i ? 'on' : ''} ${i < step ? 'past' : ''}`} onClick={() => go(i)}>
              <span>{i < step ? '✓' : i + 1}</span>{s}
            </button>
          ))}
        </div>

        <div className="arrive" key={step}>
          {step === 0 && (
            <article className="learn-article">
              <p className="learn-lead">{m.lesson}</p>
              {m.sections ? m.sections.map((s, i) => (
                <div key={s.h}>
                  <section className="learn-sec">
                    <span className="learn-sec-n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h2>{s.h}</h2>
                      {s.p.length > 2 || (s.p.length > 1 && s.p.every((x) => x.length < 140))
                        ? <ul className="learn-sec-list">{s.p.map((x) => { const [a, ...b] = x.split(': '); return <li key={x}>{b.length ? <><b>{a}:</b> {b.join(': ')}</> : x}</li>; })}</ul>
                        : s.p.map((x) => <p key={x}>{x}</p>)}
                    </div>
                  </section>
                  {i === 0 && Widget && <Widget />}
                </div>
              )) : Widget && <Widget />}

              {m.example && (
                <section className="learn-ex">
                  <h3>{m.example.title}</h3>
                  <div className="learn-ex-grid">
                    <div className="bad"><small>✗ Svagt</small><p>{m.example.bad}</p></div>
                    <div className="good"><small>✓ Stærkt</small><p>{m.example.good}</p></div>
                  </div>
                  <p className="muted">{m.example.why}</p>
                </section>
              )}

              {m.mistakes && (
                <section className="learn-box warn">
                  <h3>⚠️ Typiske fejl</h3>
                  <ul>{m.mistakes.map((x) => <li key={x}>{x}</li>)}</ul>
                </section>
              )}

              <section className="learn-box sum">
                <h3>✦ Kort sagt</h3>
                <ul>{m.points.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
            </article>
          )}

          {step === 1 && (
            <div className="lesson">
              <a href={`#/x/${demo.id}`} className="learn-demo">
                <Cover id={demo.id} universe={demo.universe} />
                <div><span className="eyebrow">Interaktiv demo</span><h3>{demo.title}</h3><p>{m.demoWhy}</p><span className="btn sm">Åbn demoen →</span></div>
              </a>
              <p className="muted small">Demoen åbner i Experience Hub. Brug «Tilbage» for at komme hertil igen.</p>
            </div>
          )}

          {step === 2 && (
            <div className="lesson">
              <h3>Prøv selv</h3>
              <p>{m.task}</p>
              <h4>Prompt du kan bruge</h4>
              <div className="learn-prompt">{m.prompt}</div>
              <div className="btn-row"><CopyBtn text={m.prompt} label="Kopiér prompt" /></div>
              <h4>Gem din egen version</h4>
              <textarea className="learn-textarea" value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} rows={5} aria-label="Din prompt eller note" />
              <div className="btn-row"><button className="btn" onClick={saveNote} disabled={saved || !note.trim()}>{saved ? '✓ Gemt i biblioteket' : 'Gem i mit promptbibliotek'}</button></div>
            </div>
          )}

          {step === 3 && (
            <div className="lesson">
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
            </div>
          )}
        </div>

        <div className="btn-row">
          {step > 0 && <button className="btn ghost" onClick={() => go(step - 1)}>← {STEPS[step - 1]}</button>}
          {step < 3 && <button className="btn" onClick={() => go(step + 1)}>Videre: {STEPS[step + 1]} →</button>}
        </div>
      </section>
    </>
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
