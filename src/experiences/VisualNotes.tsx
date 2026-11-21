import { useState } from 'react';

interface Concept { id: string; label: string; icon: string; text: string }
interface Topic { id: string; title: string; color: string; center: string; summary: string; concepts: Concept[]; links: [string, string, string][] }

const TOPICS: Topic[] = [
  {
    id: 'ai', title: 'Kunstig intelligens', color: '#9B7CFF', center: '🤖 AI',
    summary: 'AI lærer mønstre fra data. Kvaliteten af data og træning bestemmer, hvor god modellen bliver – og mennesker har ansvaret for, hvordan den bruges.',
    concepts: [
      { id: 'data', label: 'Data', icon: '🗂️', text: 'Eksemplerne en model lærer af: tekst, billeder, tal. Skæve data giver skæve resultater.' },
      { id: 'traening', label: 'Træning', icon: '🏋️', text: 'Modellen gætter, måler hvor forkert gættet var, og justerer sig selv – millioner af gange.' },
      { id: 'model', label: 'Model', icon: '🧩', text: 'Resultatet af træningen: et stort sæt tal (vægte), der omsætter input til output.' },
      { id: 'prompt', label: 'Prompt', icon: '💬', text: 'Beskeden du giver en sprogmodel. Klare mål, kontekst og format giver bedre svar.' },
      { id: 'etik', label: 'Etik', icon: '⚖️', text: 'Spørgsmål om retfærdighed, privatliv og ansvar. Hvem står inde for det, AI’en gør?' },
    ],
    links: [['data', 'traening', 'Data er brændstoffet i træningen'], ['traening', 'model', 'Træning skaber modellen'], ['data', 'etik', 'Hvis data er skæve, bliver resultaterne uretfærdige'], ['prompt', 'model', 'Prompten styrer, hvad modellen svarer']],
  },
  {
    id: 'hjerne', title: 'Hjernen', color: '#FF8FB1', center: '🧠 Hjernen',
    summary: 'Hjernen er et netværk af milliarder af nerveceller, der hele tiden ændrer sig. Søvn og gentagelse hjælper den med at gemme det, du lærer.',
    concepts: [
      { id: 'neuroner', label: 'Neuroner', icon: '✳️', text: 'Nerveceller, der sender elektriske og kemiske signaler. Et ofte citeret skøn er omkring 86 milliarder i en voksen hjerne.' },
      { id: 'hukommelse', label: 'Hukommelse', icon: '📚', text: 'Korttidshukommelsen holder lidt information kort tid. Langtidshukommelsen gemmer det, der gentages eller betyder noget.' },
      { id: 'soevn', label: 'Søvn', icon: '🌙', text: 'Under søvn bearbejder hjernen dagens indtryk, og det spiller en vigtig rolle for at gemme minder.' },
      { id: 'plast', label: 'Plasticitet', icon: '🌱', text: 'Hjernen kan ændre forbindelser hele livet. Når du øver dig, styrkes de forbindelser, du bruger.' },
      { id: 'dopamin', label: 'Dopamin', icon: '⚡', text: 'Et signalstof, der blandt andet har med motivation og forventning om belønning at gøre.' },
    ],
    links: [['soevn', 'hukommelse', 'Søvn hjælper med at gemme minder'], ['plast', 'neuroner', 'Øvelse ændrer forbindelserne mellem neuroner'], ['dopamin', 'plast', 'Motivation får os til at øve og gentage']],
  },
  {
    id: 'vaner', title: 'Vaner', color: '#7BE0A6', center: '🔁 Vaner',
    summary: 'En vane er en sløjfe: et signal udløser en rutine, som giver en belønning. Gør det gode let og det dårlige besværligt.',
    concepts: [
      { id: 'signal', label: 'Signal', icon: '🔔', text: 'Det, der sætter vanen i gang: et tidspunkt, et sted, en følelse eller en anden handling.' },
      { id: 'rutine', label: 'Rutine', icon: '🔄', text: 'Selve handlingen – fx at tage telefonen frem eller at snøre løbeskoene.' },
      { id: 'beloenning', label: 'Belønning', icon: '🎁', text: 'Det gode, du får ud af det. Belønningen får hjernen til at ville gentage sløjfen.' },
      { id: 'smaa', label: 'Små skridt', icon: '👣', text: 'Start så lille, at det næsten er for let: to minutter i stedet for en time.' },
      { id: 'miljoe', label: 'Miljø', icon: '🏠', text: 'Omgivelserne styrer meget. Læg bogen på puden og telefonen i et andet rum.' },
    ],
    links: [['signal', 'rutine', 'Signalet udløser rutinen'], ['rutine', 'beloenning', 'Rutinen giver belønningen'], ['miljoe', 'signal', 'Miljøet skaber signalerne'], ['smaa', 'rutine', 'Små skridt gør rutinen let at starte']],
  },
  {
    id: 'tek', title: 'Teknologi i hverdagen', color: '#4DD9E8', center: '📱 Teknologi',
    summary: 'Din telefon er knudepunktet: chips regner, sensorer måler, batteriet giver strøm, og internettet forbinder alt til cloud-tjenester.',
    concepts: [
      { id: 'chip', label: 'Chip', icon: '🔲', text: 'En processor med milliarder af bittesmå transistorer, der tænder og slukker ekstremt hurtigt.' },
      { id: 'sensor', label: 'Sensorer', icon: '📍', text: 'Måler verden: GPS, kamera, accelerometer og mikrofon gør telefonen bevidst om omgivelserne.' },
      { id: 'internet', label: 'Internet', icon: '🌐', text: 'Et globalt netværk af netværk, hvor data sendes i små pakker ad mange mulige veje.' },
      { id: 'cloud', label: 'Cloud', icon: '☁️', text: 'Andres computere i store datacentre, som gemmer dine filer og kører tjenester for dig.' },
      { id: 'batteri', label: 'Batteri', icon: '🔋', text: 'De fleste telefoner bruger litium-ion-batterier, som kan genoplades mange hundrede gange.' },
    ],
    links: [['internet', 'cloud', 'Internettet forbinder dig til cloud'], ['sensor', 'chip', 'Chippen behandler sensorernes data'], ['batteri', 'chip', 'Batteriet giver chippen strøm']],
  },
];

export default function VisualNotes() {
  const [topicId, setTopicId] = useState('ai');
  const [view, setView] = useState<'mindmap' | 'infografik'>('mindmap');
  const [sel, setSel] = useState<string | null>(null);
  const [showLinks, setShowLinks] = useState(true);
  const [zoom, setZoom] = useState(1);

  const t = TOPICS.find((x) => x.id === topicId)!;
  const n = t.concepts.length;
  const pos = (i: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: 200 + Math.cos(a) * 140, y: 160 + Math.sin(a) * 110 };
  };
  const P = Object.fromEntries(t.concepts.map((c, i) => [c.id, pos(i)]));
  const concept = t.concepts.find((c) => c.id === sel);
  const related = sel ? t.links.filter((l) => l[0] === sel || l[1] === sel) : [];
  const vb = { w: 400 / zoom, h: 320 / zoom };

  return (
    <div className="vn" style={{ ['--c' as string]: t.color }}>
      <div className="chips scroll" role="group" aria-label="Vælg emne">
        {TOPICS.map((x) => <button key={x.id} className={`chip ${x.id === topicId ? 'on' : ''}`} onClick={() => { setTopicId(x.id); setSel(null); }}>{x.title}</button>)}
      </div>

      <div className="row-between">
        <div className="seg small" aria-label="Visning">
          <button className={view === 'mindmap' ? 'on' : ''} onClick={() => setView('mindmap')}>Mindmap</button>
          <button className={view === 'infografik' ? 'on' : ''} onClick={() => setView('infografik')}>Infografik</button>
        </div>
        {view === 'mindmap' && (
          <div className="seg small">
            <button onClick={() => setZoom((z) => Math.max(1, z - 0.25))} disabled={zoom <= 1} aria-label="Zoom ud">−</button>
            <button onClick={() => setZoom((z) => Math.min(2, z + 0.25))} disabled={zoom >= 2} aria-label="Zoom ind">+</button>
            <button className={showLinks ? 'on' : ''} onClick={() => setShowLinks((s) => !s)} aria-pressed={showLinks}>Forbindelser</button>
          </div>
        )}
      </div>

      {view === 'mindmap' ? (
        <div className="vn-paper" key={t.id}>
          <svg viewBox={`${200 - vb.w / 2} ${160 - vb.h / 2} ${vb.w} ${vb.h}`} role="img" aria-label={`Mindmap om ${t.title}`}>
            {t.concepts.map((c, i) => {
              const p = P[c.id];
              const mx = (200 + p.x) / 2 + (i % 2 ? 14 : -14), my = (160 + p.y) / 2;
              return <path key={c.id} d={`M200 160 Q${mx} ${my} ${p.x} ${p.y}`} className={`vn-branch ${sel && sel !== c.id ? 'dim' : ''}`} style={{ animationDelay: `${i * 0.12}s` }} />;
            })}
            {showLinks && t.links.map(([a, b]) => {
              const on = sel === a || sel === b;
              return <line key={a + b} x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y} className={`vn-link ${on ? 'on' : sel ? 'dim' : ''}`} />;
            })}
            <g className="vn-center"><ellipse cx={200} cy={160} rx={56} ry={30} /><text x={200} y={166} textAnchor="middle">{t.center}</text></g>
            {t.concepts.map((c, i) => {
              const p = P[c.id];
              return (
                <g key={c.id} className={`vn-node ${sel === c.id ? 'on' : ''}`} style={{ animationDelay: `${0.3 + i * 0.12}s` }} tabIndex={0} role="button" aria-label={c.label}
                  onClick={() => setSel(sel === c.id ? null : c.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(sel === c.id ? null : c.id); } }}>
                  <rect x={p.x - 50} y={p.y - 17} width={100} height={34} rx={17} />
                  <text x={p.x} y={p.y + 5} textAnchor="middle">{c.icon} {c.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        <div className="vn-info" key={t.id + 'i'}>
          {t.concepts.map((c, i) => (
            <button key={c.id} className={`vn-card ${sel === c.id ? 'on' : ''}`} style={{ animationDelay: `${i * 0.08}s` }} onClick={() => setSel(sel === c.id ? null : c.id)}>
              <span aria-hidden="true">{c.icon}</span><b>{c.label}</b><small>{c.text}</small>
            </button>
          ))}
        </div>
      )}

      {concept && (
        <section className="panel arrive" key={concept.id} style={{ borderColor: t.color }}>
          <h3>{concept.icon} {concept.label}</h3>
          <p>{concept.text}</p>
          {related.length > 0 && <ul className="vn-rel">{related.map((l) => <li key={l[0] + l[1]}>↔ {l[2]}</li>)}</ul>}
        </section>
      )}
      {!concept && <p className="muted center small">Tryk på et begreb for at læse mere.</p>}

      <section className="panel vn-sum">
        <h3>Opsummering</h3>
        <p>{t.summary}</p>
      </section>
    </div>
  );
}
