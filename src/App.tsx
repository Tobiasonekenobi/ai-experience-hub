import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { EXPERIENCES, UNIVERSES, expById, universeById, type UniverseId } from './data/experiences';
import { Card, StatusBadge } from './components/Card';
import { Cover } from './components/Cover';
import { load, pushRecent, useFavorites } from './lib/store';
import Preview from './experiences/Preview';
import { Boundary } from './components/Boundary';
import { BuildPage, UseCase } from './components/Build';

const GalaxyScene = lazy(() => import('./components/GalaxyScene').then((m) => ({ default: m.GalaxyScene })));

const DEMOS: Partial<Record<string, ReturnType<typeof lazy>>> = {
  'mission-control': lazy(() => import('./experiences/MissionControl')),
  'future-simulator': lazy(() => import('./experiences/FutureSimulator')),
  'knowledge-galaxy': lazy(() => import('./experiences/KnowledgeGalaxy')),
  'time-machine': lazy(() => import('./experiences/TimeMachine')),
  skilltree: lazy(() => import('./experiences/SkillTree')),
  'ai-brain': lazy(() => import('./experiences/AIBrain')),
  'decision-lab': lazy(() => import('./experiences/DecisionLab')),
  detective: lazy(() => import('./experiences/Detective')),
  'escape-ai': lazy(() => import('./experiences/EscapeAI')),
  'world-data': lazy(() => import('./experiences/WorldData')),
  'comic-world': lazy(() => import('./experiences/ComicWorld')),
  'visual-notes': lazy(() => import('./experiences/VisualNotes')),
  'exploded-lab': lazy(() => import('./experiences/ExplodedLab')),
  'design-playground': lazy(() => import('./experiences/DesignPlayground')),
  storyboard: lazy(() => import('./experiences/Storyboard')),
};

type Route = { page: 'byg' } | { page: 'opdag' } | { page: 'udforsk'; uni?: UniverseId } | { page: 'gemte' } | { page: 'x'; id: string };

function parse(hash: string): Route {
  const [, a, b] = hash.replace(/^#/, '').split('/');
  if (a === 'udforsk') return { page: 'udforsk', uni: (UNIVERSES.some((u) => u.id === b) ? b : undefined) as UniverseId | undefined };
  if (a === 'gemte') return { page: 'gemte' };
  if (a === 'byg') return { page: 'byg' };
  if (a === 'x' && b && expById(b)) return { page: 'x', id: b };
  return { page: 'opdag' };
}

function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => { setRoute(parse(location.hash)); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

const NAV = [
  { page: 'opdag', href: '#/', label: 'Opdag', icon: '✦' },
  { page: 'udforsk', href: '#/udforsk', label: 'Udforsk', icon: '◎' },
  { page: 'gemte', href: '#/gemte', label: 'Gemte', icon: '♥' },
  { page: 'byg', href: '#/byg', label: 'Få bygget', icon: '✚' },
] as const;

export default function App() {
  const route = useRoute();
  const fav = useFavorites();
  const active = route.page === 'x' ? '' : route.page;

  return (
    <div className="app">
      <header className="top">
        <a href="#/" className="logo" aria-label="AI Experience Hub – forside"><span className="logo-mark">◆</span> Experience Hub</a>
        <nav className="top-nav" aria-label="Hovedmenu">
          {NAV.map((n) => <a key={n.page} href={n.href} className={active === n.page ? 'on' : ''} aria-current={active === n.page ? 'page' : undefined}>{n.label}</a>)}
        </nav>
        <a href="#/udforsk" className="top-search" aria-label="Søg i oplevelser">⌕ <span>Søg</span></a>
      </header>

      <main id="main">
        {route.page === 'opdag' && <Home fav={fav} />}
        {route.page === 'udforsk' && <Explore fav={fav} uni={route.uni} />}
        {route.page === 'gemte' && <Saved fav={fav} />}
        {route.page === 'byg' && <BuildPage />}
        {route.page === 'x' && <ExperiencePage id={route.id} fav={fav} />}
      </main>

      <nav className="bottom-nav" aria-label="Mobilmenu">
        {NAV.map((n) => (
          <a key={n.page} href={n.href} className={active === n.page ? 'on' : ''} aria-current={active === n.page ? 'page' : undefined}>
            <span aria-hidden="true">{n.icon}</span>{n.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

type Fav = ReturnType<typeof useFavorites>;

function Grid({ items, fav }: { items: typeof EXPERIENCES; fav: Fav }) {
  return <div className="grid">{items.map((e) => <Card key={e.id} exp={e} fav={fav.isFav(e.id)} onFav={fav.toggle} />)}</div>;
}

function Home({ fav }: { fav: Fav }) {
  const week = expById('knowledge-galaxy')!;
  const popular = EXPERIENCES.filter((e) => e.status === 'demo');
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <img className="hero-img" src={`${import.meta.env.BASE_URL}img/hero.webp`} alt="" />
          <Boundary fallback={null}><Suspense fallback={null}><GalaxyScene /></Suspense></Boundary>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">Tryk. Oplev. Udforsk.</span>
          <h1>En verden af oplevelser venter</h1>
          <p>15 oplevelser i fem universer – fra kontrolcentre og fremtidsscenarier til galakser af viden.</p>
          <div className="btn-row"><a href="#/udforsk" className="btn lg">Udforsk oplevelser</a><a href="#/byg" className="btn ghost lg">Få bygget din egen</a></div>
        </div>
      </section>

      <section className="section">
        <a href={`#/x/${week.id}`} className="feature">
          <div className="feature-art"><Cover id={week.id} universe={week.universe} eager /></div>
          <div className="feature-copy">
            <span className="eyebrow">✦ Ugens oplevelse</span>
            <h2>Et helt univers venter.</h2>
            <p>Besøg fem planeter, lær noget nyt og saml XP i {week.title}.</p>
            <span className="btn white">▶ Start {week.title}</span>
          </div>
        </a>
        <div className="stats">
          <div><b>{EXPERIENCES.length}</b><span>Oplevelser</span></div>
          <div><b>{UNIVERSES.length}</b><span>Universer</span></div>
          <div><b>{EXPERIENCES.filter((e) => e.status === "demo").length}</b><span>Interaktive demoer</span></div>
        </div>
      </section>

      <section className="section">
        <h2 className="h-sec">Populære lige nu</h2>
        <div className="rail">{popular.map((e) => <Card key={e.id} exp={e} fav={fav.isFav(e.id)} onFav={fav.toggle} compact />)}</div>
      </section>

      <section className="section">
        <h2 className="h-sec">Fem universer</h2>
        <div className="unis">
          {UNIVERSES.map((u) => (
            <a key={u.id} href={`#/udforsk/${u.id}`} className="uni-card" style={{ ['--c' as string]: u.color }}>
              <strong>{u.name}</strong><small>{u.tagline}</small>
              <span className="uni-count">{EXPERIENCES.filter((e) => e.universe === u.id).length} oplevelser →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="h-sec">Alle 15 oplevelser</h2>
        <Grid items={EXPERIENCES} fav={fav} />
      </section>
      <footer className="foot">AI Experience Hub · V0.3 · alle 15 oplevelser er interaktive.</footer>
    </>
  );
}

function Explore({ fav, uni }: { fav: Fav; uni?: UniverseId }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'alle' | 'demo' | 'preview'>('alle');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return EXPERIENCES.filter((e) =>
      (!uni || e.universe === uni) &&
      (status === 'alle' || e.status === status) &&
      (!s || [e.title, e.short, e.concept, universeById(e.universe).name, ...e.features].join(' ').toLowerCase().includes(s)));
  }, [q, uni, status]);

  return (
    <section className="section">
      <h1 className="h-page">Udforsk</h1>
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Søg efter oplevelse, emne eller funktion" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Søg" />
      </label>
      <div className="chips scroll" role="group" aria-label="Filtrér univers">
        <a href="#/udforsk" className={`chip ${!uni ? 'on' : ''}`}>Alle</a>
        {UNIVERSES.map((u) => <a key={u.id} href={`#/udforsk/${u.id}`} className={`chip ${uni === u.id ? 'on' : ''}`}>{u.name}</a>)}
      </div>
      <div className="chips" role="group" aria-label="Filtrér status">
        {(['alle', 'demo', 'preview'] as const).map((s) => (
          <button key={s} className={`chip ${status === s ? 'on' : ''}`} onClick={() => setStatus(s)}>{s === 'alle' ? 'Alle typer' : s === 'demo' ? 'Interaktive demoer' : 'Previews'}</button>
        ))}
      </div>
      <p className="muted" aria-live="polite">{items.length} {items.length === 1 ? 'oplevelse' : 'oplevelser'}</p>
      {items.length ? <Grid items={items} fav={fav} /> : (
        <div className="empty-box">Ingen oplevelser matcher «{q}». <button className="link" onClick={() => { setQ(''); setStatus('alle'); }}>Ryd søgning</button></div>
      )}
    </section>
  );
}

function Saved({ fav }: { fav: Fav }) {
  const recent = load<string[]>('recent', []).map(expById).filter(Boolean) as typeof EXPERIENCES;
  const favs = fav.favs.map(expById).filter(Boolean) as typeof EXPERIENCES;
  return (
    <section className="section">
      <h1 className="h-page">Gemte</h1>
      <h2 className="h-sec">Favoritter</h2>
      {favs.length ? <Grid items={favs} fav={fav} /> : <div className="empty-box">Tryk på ♡ på en oplevelse for at gemme den her.</div>}
      <h2 className="h-sec">Senest besøgte</h2>
      {recent.length ? <div className="rail">{recent.map((e) => <Card key={e.id} exp={e} fav={fav.isFav(e.id)} onFav={fav.toggle} compact />)}</div>
        : <div className="empty-box">Du har ikke åbnet nogen oplevelser endnu. <a className="link" href="#/udforsk">Udforsk</a></div>}
    </section>
  );
}

function ExperiencePage({ id, fav }: { id: string; fav: Fav }) {
  const exp = expById(id)!;
  const u = universeById(exp.universe);
  const Demo = DEMOS[id];
  const [full, setFull] = useState(false);
  useEffect(() => pushRecent(id), [id]);

  const toggleFull = async () => {
    try {
      if (!document.fullscreenElement) { await document.documentElement.requestFullscreen(); setFull(true); }
      else { await document.exitFullscreen(); setFull(false); }
    } catch { /* fuldskærm understøttes ikke her */ }
  };
  useEffect(() => {
    const on = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  return (
    <section className="section xp">
      <div className="xp-bar">
        <button className="btn ghost sm" onClick={() => (history.length > 1 ? history.back() : (location.hash = '#/'))}>← Tilbage</button>
        <div className="xp-actions">
          {Demo && document.fullscreenEnabled && <button className="btn ghost sm" onClick={toggleFull}>{full ? 'Luk fuldskærm' : 'Fuldskærm'}</button>}
          <button className={`btn ghost sm ${fav.isFav(id) ? 'fav-on' : ''}`} onClick={() => fav.toggle(id)} aria-pressed={fav.isFav(id)}>{fav.isFav(id) ? '♥ Gemt' : '♡ Gem'}</button>
        </div>
      </div>
      <div className="xp-head">
        <Cover id={exp.id} universe={exp.universe} className="xp-cover" />
        <div className="xp-title">
          <span className="uni" style={{ color: u.color }}>{u.name} · {String(exp.nr).padStart(2, '0')}</span>
          <h1>{exp.title}</h1>
          <p>{exp.short}</p>
          <StatusBadge status={exp.status} />
        </div>
      </div>
      {Demo ? <Boundary key={id}><Suspense fallback={<div className="loading">Indlæser oplevelse…</div>}><Demo /></Suspense></Boundary> : <Preview exp={exp} />}
      <UseCase id={id} />
    </section>
  );
}
