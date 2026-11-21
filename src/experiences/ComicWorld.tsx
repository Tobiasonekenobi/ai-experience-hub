import { useState } from 'react';
import { useStored } from '../lib/store';

// Tre originale, korte tegneserier. Valg ændrer den næste scene.

interface Bubble { who: string; text: string; side: 'l' | 'r'; think?: boolean }
interface Panel { id: string; chapter: string; bg: string; art: string[]; caption: string; bubbles: Bubble[]; next?: string; choices?: { label: string; to: string }[]; end?: string }
interface Story { id: string; title: string; tagline: string; color: string; panels: Panel[] }

const STORIES: Story[] = [
  {
    id: 'neon', title: 'Neon City', tagline: 'Et bud, en pakke og en nat der lyser.', color: '#FF5FA2',
    panels: [
      { id: 'n1', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#2a0f3d,#120826 60%,#3d0f2e)', art: ['🌃', '🛵'], caption: 'Neon City, kl. 02:00. Regnen lyser lyserød under skiltene.', bubbles: [{ who: 'Kai', text: 'Sidste levering i nat. Så er det sengetid.', side: 'l' }], next: 'n2' },
      { id: 'n2', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#1b1240,#0d0a22)', art: ['📦', '✨'], caption: 'Pakken begynder at summe. Kai læser adressen.', bubbles: [{ who: 'Kai', text: 'Den skal leveres … til min egen lejlighed?', side: 'r', think: true }], choices: [{ label: 'Åbn pakken', to: 'n3a' }, { label: 'Aflevér den på politistationen', to: 'n3b' }] },
      { id: 'n3a', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#0f2a3d,#081622)', art: ['🤖', '💡'], caption: 'Ud af pakken kravler en lille robot.', bubbles: [{ who: 'Robot', text: 'Hej Kai. Byens strøm går i nat. Kun vi to kan nå generatoren.', side: 'l' }], next: 'n4a' },
      { id: 'n4a', chapter: 'Slut A', bg: 'linear-gradient(180deg,#3d2a0f,#1a1208)', art: ['⚡', '🏙️'], caption: 'Klokken 03:59 drejer Kai den sidste kontakt. Lyset bliver ved.', bubbles: [{ who: 'Robot', text: 'Ingen vil vide, hvorfor det ikke blev mørkt. Men vi ved det.', side: 'r' }], end: 'Den modige slutning' },
      { id: 'n3b', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#1d2433,#0b0f19)', art: ['🚓', '📦'], caption: 'Politistationen er lukket. Pakken åbner sig selv.', bubbles: [{ who: 'Robot', text: 'Klogt at være forsigtig. Men vi har travlt!', side: 'l' }], next: 'n4b' },
      { id: 'n4b', chapter: 'Slut B', bg: 'linear-gradient(180deg,#0f3d33,#08221c)', art: ['👮', '🤖', '🛵'], caption: 'Kai, robotten og en træt betjent kører gennem regnen sammen.', bubbles: [{ who: 'Betjent', text: 'Jeg håber, I ved, hvor generatoren er.', side: 'r' }], end: 'Holdets slutning' },
    ],
  },
  {
    id: 'signal', title: 'The Missing Signal', tagline: 'En radiostation på en øde ø. Signalet stopper.', color: '#4DD9E8',
    panels: [
      { id: 's1', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#0b1a33,#050b18)', art: ['📡', '🌌'], caption: 'Forskningsstation Skarv. Ida har lyttet til det samme signal i 41 nætter.', bubbles: [{ who: 'Ida', text: 'Bip … bip … bip. Altid samme rytme.', side: 'l' }], next: 's2' },
      { id: 's2', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#140b33,#08051a)', art: ['🔇', '😮'], caption: 'Klokken 01:13 bliver der stille.', bubbles: [{ who: 'Ida', text: 'Det er stoppet. For første gang.', side: 'r', think: true }], choices: [{ label: 'Send et svar ud i rummet', to: 's3a' }, { label: 'Vent og optag alt', to: 's3b' }] },
      { id: 's3a', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#33240b,#1a1205)', art: ['📻', '➡️', '✨'], caption: 'Ida sender signalets rytme tilbage – baglæns.', bubbles: [{ who: 'Ida', text: 'Hvis nogen lytter, så hører de os nu.', side: 'l' }], next: 's4a' },
      { id: 's4a', chapter: 'Slut A', bg: 'linear-gradient(180deg,#0b3326,#051a13)', art: ['🌅', '📡'], caption: 'Ved solopgang kommer et nyt signal. Det er Idas egen rytme.', bubbles: [{ who: 'Ida', text: 'De svarede. Eller … var det et ekko?', side: 'r', think: true }], end: 'Svarets slutning' },
      { id: 's3b', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#0b2233,#05111a)', art: ['💾', '📈'], caption: 'Ida optager stilheden i seks timer. Den er ikke helt tom.', bubbles: [{ who: 'Ida', text: 'Der er et svagt mønster under støjen …', side: 'l' }], next: 's4b' },
      { id: 's4b', chapter: 'Slut B', bg: 'linear-gradient(180deg,#2a0b33,#14051a)', art: ['🗺️', '⭐'], caption: 'Mønstret er et kort. Det peger på en stjerne, ingen har navngivet.', bubbles: [{ who: 'Ida', text: 'Jeg kalder den Skarv.', side: 'r' }], end: 'Opdagerens slutning' },
    ],
  },
  {
    id: 'valg', title: 'One Small Choice', tagline: 'Et busstoppested. En pung. Et lille valg.', color: '#F0C36A',
    panels: [
      { id: 'v1', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#33280b,#1a1405)', art: ['🚏', '👛'], caption: 'Noor venter på bussen. På bænken ligger en pung.', bubbles: [{ who: 'Noor', text: 'Nogen har glemt den. Bussen kommer om ét minut …', side: 'l', think: true }], next: 'v2' },
      { id: 'v2', chapter: 'Kapitel 1', bg: 'linear-gradient(180deg,#0b2433,#05121a)', art: ['🏃', '🚌'], caption: 'En mand i blå jakke går hurtigt væk ned ad gaden.', bubbles: [{ who: 'Noor', text: 'Er det hans?', side: 'r' }], choices: [{ label: 'Løb efter manden', to: 'v3a' }, { label: 'Giv pungen til buschaufføren', to: 'v3b' }] },
      { id: 'v3a', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#330b1e,#1a050f)', art: ['🏃', '💨', '🧥'], caption: 'Noor løber. Bussen kører uden hende.', bubbles: [{ who: 'Manden', text: 'Min pung! Der er billeder af mine børn i den.', side: 'l' }], next: 'v4a' },
      { id: 'v4a', chapter: 'Slut A', bg: 'linear-gradient(180deg,#0b3317,#051a0b)', art: ['🚗', '😊'], caption: 'Manden kører Noor hjem. Hun kommer for sent – og er glad alligevel.', bubbles: [{ who: 'Noor', text: 'Det var den bedste forsinkelse nogensinde.', side: 'r' }], end: 'Den varme slutning' },
      { id: 'v3b', chapter: 'Kapitel 2', bg: 'linear-gradient(180deg,#1e0b33,#0f051a)', art: ['🚌', '👛', '📞'], caption: 'Chaufføren ringer til selskabets hittegodskontor.', bubbles: [{ who: 'Chauffør', text: 'Godt set. Mange ville bare have ladet den ligge.', side: 'l' }], next: 'v4b' },
      { id: 'v4b', chapter: 'Slut B', bg: 'linear-gradient(180deg,#33240b,#1a1205)', art: ['✉️', '🌻'], caption: 'En uge senere ligger der et brev og en solsikke i Noors postkasse.', bubbles: [{ who: 'Brevet', text: 'Tak. Du reddede min dag.', side: 'r' }], end: 'Den stille slutning' },
    ],
  },
];

export default function ComicWorld() {
  const [storyId, setStoryId] = useStored<string>('cw_story', 'neon');
  const [pos, setPos] = useStored<Record<string, string[]>>('cw_pos', {});
  const [calm, setCalm] = useStored<boolean>('cw_calm', false);
  const [anim, setAnim] = useState(0);

  const story = STORIES.find((s) => s.id === storyId) ?? STORIES[0];
  const path = pos[story.id] ?? [story.panels[0].id];
  const panel = story.panels.find((p) => p.id === path[path.length - 1])!;
  const go = (to: string) => { setPos((p) => ({ ...p, [story.id]: [...path, to] })); setAnim((n) => n + 1); };
  const back = () => { if (path.length > 1) { setPos((p) => ({ ...p, [story.id]: path.slice(0, -1) })); setAnim((n) => n + 1); } };
  const restart = () => { setPos((p) => ({ ...p, [story.id]: [story.panels[0].id] })); setAnim((n) => n + 1); };
  const endings = story.panels.filter((p) => p.end);

  return (
    <div className={`cw ${calm ? 'calm' : ''}`}>
      <div className="cw-shelf">
        {STORIES.map((s) => (
          <button key={s.id} className={`cw-book ${s.id === story.id ? 'on' : ''}`} style={{ ['--c' as string]: s.color }} onClick={() => setStoryId(s.id)}>
            <b>{s.title}</b><small>{s.tagline}</small>
            {pos[s.id] && pos[s.id].length > 1 && <em>Læst til side {pos[s.id].length}</em>}
          </button>
        ))}
      </div>

      <div className="row-between">
        <span className="muted small">{panel.chapter} · side {path.length}</span>
        <label className="cw-calm"><input type="checkbox" checked={calm} onChange={(e) => setCalm(e.target.checked)} /> Rolig læsetilstand</label>
      </div>

      <article className="cw-panel" key={panel.id + anim} style={{ background: panel.bg, ['--c' as string]: story.color }} aria-label={`${story.title}, ${panel.chapter}`}>
        <div className="cw-caption">{panel.caption}</div>
        <div className="cw-art" aria-hidden="true">{panel.art.map((a, i) => <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{a}</span>)}</div>
        {panel.bubbles.map((b, i) => (
          <div key={i} className={`cw-bubble ${b.side} ${b.think ? 'think' : ''}`}><b>{b.who}</b>{b.text}</div>
        ))}
        {panel.end && <div className="cw-end">SLUT · {panel.end}</div>}
      </article>

      {panel.choices && (
        <div className="cw-choices">
          <p><strong>Hvad gør du?</strong></p>
          {panel.choices.map((c) => <button key={c.to} className="btn" onClick={() => go(c.to)}>{c.label}</button>)}
        </div>
      )}

      <div className="btn-row">
        <button className="btn ghost" onClick={back} disabled={path.length < 2}>← Forrige side</button>
        {panel.next && <button className="btn" onClick={() => go(panel.next!)}>Næste side →</button>}
        {panel.end && <button className="btn" onClick={restart}>Læs igen – vælg anderledes</button>}
      </div>

      <section className="panel">
        <h3>Kapitler og slutninger</h3>
        <ol className="cw-chapters">
          {path.map((id, i) => {
            const p = story.panels.find((x) => x.id === id)!;
            return <li key={id + i}><button className="link" onClick={() => { setPos((q) => ({ ...q, [story.id]: path.slice(0, i + 1) })); setAnim((n) => n + 1); }}>{p.chapter}: {p.caption}</button></li>;
          })}
        </ol>
        <p className="muted small">Denne historie har {endings.length} slutninger: {endings.map((e) => e.end).join(' og ')}.</p>
      </section>
    </div>
  );
}
