import { useEffect, useState } from 'react';
import { reducedMotion, useStored } from '../lib/store';

interface Q { q: string; options: string[]; answer: number; why: string }
interface Module { title: string; text: string; facts: [string, string][]; quiz: Q[] }
interface Planet { id: string; name: string; color: string; glow: string; size: number; x: number; y: number; tagline: string; related: string[]; modules: Module[] }

const PLANETS: Planet[] = [
  {
    id: 'ai', name: 'AI', color: '#9B7CFF', glow: '#5B3FD9', size: 62, x: 22, y: 30, tagline: 'Hvordan maskiner lærer af eksempler', related: ['hjernen', 'teknologi'],
    modules: [
      {
        title: 'Hvad er maskinlæring?',
        text: 'I almindelig programmering skriver et menneske reglerne. I maskinlæring giver man i stedet computeren mange eksempler, og den finder selv mønstrene. Viser man en model tusindvis af billeder mærket "kat" og "hund", kan den bagefter gætte på nye billeder, den aldrig har set.',
        facts: [['Data', 'eksempler modellen lærer af'], ['Model', 'det mønster den finder'], ['Forudsigelse', 'gæt på nye eksempler']],
        quiz: [
          { q: 'Hvad lærer en maskinlæringsmodel af?', options: ['Eksempler (data)', 'Tilfældige gæt', 'Kun regler skrevet af mennesker'], answer: 0, why: 'Modellen finder mønstre i de eksempler, den trænes på.' },
          { q: 'Hvad kaldes de data, en model trænes på?', options: ['Testdata', 'Træningsdata', 'Metadata'], answer: 1, why: 'Træningsdata bruges til at lære; testdata bruges bagefter til at måle.' },
        ],
      },
      {
        title: 'Neurale netværk',
        text: 'Et kunstigt neuralt netværk består af lag af små regneenheder, der sender tal videre til hinanden. Hver forbindelse har en vægt. Under træning justeres vægtene lidt ad gangen, så netværkets svar kommer tættere på de rigtige svar. Idéen er løst inspireret af hjernens nerveceller.',
        facts: [['Input', 'fx pixels i et billede'], ['Skjulte lag', 'finder mønstre'], ['Output', 'fx "kat" eller "hund"']],
        quiz: [
          { q: 'Hvad bliver justeret, når et neuralt netværk trænes?', options: ['Skærmens lysstyrke', 'Forbindelsernes vægte', 'Antallet af brugere'], answer: 1, why: 'Træning handler om at finde gode værdier for vægtene.' },
          { q: 'Hvad er neurale netværk løst inspireret af?', options: ['Hjernens nerveceller', 'Planeternes baner', 'Telefonledninger'], answer: 0, why: 'Navnet kommer af neuroner – hjernens nerveceller.' },
        ],
      },
    ],
  },
  {
    id: 'universet', name: 'Universet', color: '#4DD9E8', glow: '#1B7F8C', size: 76, x: 68, y: 22, tagline: 'Lys, afstande og vores solsystem', related: ['historie', 'teknologi'],
    modules: [
      {
        title: 'Lysets hastighed',
        text: 'Lys bevæger sig med omkring 300.000 kilometer i sekundet i tomt rum. Alligevel er afstandene i rummet så store, at lyset fra Solen er cirka 8 minutter om at nå Jorden. Når du ser på Solen, ser du den altså, som den så ud for 8 minutter siden.',
        facts: [['≈300.000', 'km i sekundet'], ['≈8 min', 'fra Solen til Jorden'], ['≈1,3 sek', 'fra Månen til Jorden']],
        quiz: [
          { q: 'Hvor længe er sollys om at nå Jorden?', options: ['Cirka 8 sekunder', 'Cirka 8 minutter', 'Cirka 8 timer'], answer: 1, why: 'Afstanden er ca. 150 mio. km, og det tager lyset ca. 8 minutter.' },
          { q: 'Hvor hurtigt bevæger lys sig i tomt rum?', options: ['Ca. 300.000 km/s', 'Ca. 3.000 km/s', 'Ca. 30 km/s'], answer: 0, why: 'Omkring 300.000 km i sekundet – det hurtigste, vi kender.' },
        ],
      },
      {
        title: 'Solsystemet',
        text: 'Vores solsystem har otte planeter. Merkur ligger nærmest Solen, og Neptun længst væk. Jupiter er den største – den er så stor, at alle de andre planeter kunne være i den. Pluto blev i 2006 omklassificeret til en dværgplanet.',
        facts: [['8', 'planeter'], ['Jupiter', 'den største'], ['Merkur', 'nærmest Solen']],
        quiz: [
          { q: 'Hvilken planet er den største i solsystemet?', options: ['Saturn', 'Jorden', 'Jupiter'], answer: 2, why: 'Jupiter er den største planet.' },
          { q: 'Hvor mange planeter har solsystemet?', options: ['7', '8', '9'], answer: 1, why: 'Otte – Pluto regnes siden 2006 som dværgplanet.' },
        ],
      },
    ],
  },
  {
    id: 'hjernen', name: 'Hjernen', color: '#F28A3C', glow: '#A3461A', size: 58, x: 50, y: 58, tagline: 'Nerveceller, signaler og hukommelse', related: ['ai', 'historie'],
    modules: [
      {
        title: 'Neuroner og synapser',
        text: 'Hjernen består af nerveceller kaldet neuroner – ifølge et ofte citeret estimat omkring 86 milliarder. Neuronerne sender elektriske signaler, og hvor to neuroner mødes, i en synapse, overføres signalet med kemiske stoffer. Når vi lærer, ændres styrken af disse forbindelser.',
        facts: [['≈86 mia.', 'neuroner (estimat)'], ['Synapse', 'kontaktpunkt'], ['El + kemi', 'sådan sendes signaler']],
        quiz: [
          { q: 'Hvad hedder kontaktpunktet mellem to neuroner?', options: ['Synapse', 'Kromosom', 'Pixel'], answer: 0, why: 'I synapsen overføres signalet fra én neuron til den næste.' },
          { q: 'Hvordan sender neuroner signaler?', options: ['Kun med lyd', 'Elektrisk og kemisk', 'Med magnetfelter'], answer: 1, why: 'Elektrisk langs cellen og kemisk over synapsen.' },
        ],
      },
      {
        title: 'Søvn og hukommelse',
        text: 'Et område i hjernen, der hedder hippocampus, spiller en vigtig rolle, når nye minder dannes. Forskning viser, at søvn hjælper hjernen med at bearbejde og fastholde det, vi har lært i løbet af dagen. Derfor er en god nats søvn en del af at lære.',
        facts: [['Hippocampus', 'vigtig for nye minder'], ['Søvn', 'hjælper med at fastholde'], ['Gentagelse', 'styrker forbindelser']],
        quiz: [
          { q: 'Hvilket hjerneområde er vigtigt for at danne nye minder?', options: ['Hippocampus', 'Lillehjernen', 'Hypofysen'], answer: 0, why: 'Hippocampus er central for at danne nye minder.' },
          { q: 'Hvad hjælper søvn hjernen med?', options: ['At glemme alt', 'At fastholde det, vi har lært', 'At vokse flere knogler'], answer: 1, why: 'Søvn hjælper med at bearbejde og fastholde læring.' },
        ],
      },
    ],
  },
  {
    id: 'teknologi', name: 'Teknologi', color: '#7BE0A6', glow: '#2B8A5A', size: 54, x: 82, y: 64, tagline: 'Fra transistoren til internettet', related: ['ai', 'historie'],
    modules: [
      {
        title: 'Transistoren',
        text: 'Transistoren blev opfundet i 1947 hos Bell Labs i USA. Den fungerer som en lille elektrisk kontakt, der kan tænde og slukke ekstremt hurtigt. Moderne computerchips indeholder milliarder af transistorer, og de er grundlaget for næsten al digital teknologi.',
        facts: [['1947', 'opfundet hos Bell Labs'], ['Kontakt', 'tænd/sluk = 1/0'], ['Milliarder', 'i én moderne chip']],
        quiz: [
          { q: 'Hvornår blev transistoren opfundet?', options: ['1907', '1947', '1987'], answer: 1, why: 'I 1947 hos Bell Labs.' },
          { q: 'Hvad gør en transistor grundlæggende?', options: ['Lagrer lys', 'Tænder og slukker strøm', 'Måler temperatur'], answer: 1, why: 'Den virker som en hurtig elektrisk kontakt.' },
        ],
      },
      {
        title: 'Internet og web',
        text: 'Internettet er netværket af forbundne computere. World Wide Web er en tjeneste, der kører oven på internettet – sider forbundet med links. Webbet blev foreslået af Tim Berners-Lee i 1989, mens han arbejdede på forskningscentret CERN ved Genève.',
        facts: [['Internet', 'netværket'], ['Web', 'sider + links'], ['1989', 'webbet foreslås på CERN']],
        quiz: [
          { q: 'Hvem foreslog World Wide Web?', options: ['Tim Berners-Lee', 'Alan Turing', 'Ada Lovelace'], answer: 0, why: 'Tim Berners-Lee foreslog webbet i 1989.' },
          { q: 'Hvor arbejdede han, da webbet blev til?', options: ['NASA', 'CERN', 'MIT'], answer: 1, why: 'På forskningscentret CERN.' },
        ],
      },
    ],
  },
  {
    id: 'historie', name: 'Historie', color: '#F0C36A', glow: '#9A7020', size: 66, x: 20, y: 68, tagline: 'Opfindelser der ændrede verden', related: ['teknologi', 'universet'],
    modules: [
      {
        title: 'Bogtrykkerkunsten',
        text: 'Omkring år 1450 udviklede Johannes Gutenberg i Mainz en trykpresse med løse, bevægelige metaltyper. Bøger kunne nu fremstilles langt hurtigere og billigere end ved afskrift i hånden. Det fik viden til at sprede sig til mange flere mennesker.',
        facts: [['≈1450', 'Gutenbergs presse'], ['Mainz', 'i det nuværende Tyskland'], ['Løse typer', 'genbrugelige bogstaver']],
        quiz: [
          { q: 'Hvem udviklede trykpressen med løse typer i Europa?', options: ['Leonardo da Vinci', 'Johannes Gutenberg', 'Galileo Galilei'], answer: 1, why: 'Johannes Gutenberg i Mainz.' },
          { q: 'Omkring hvilket år skete det?', options: ['1050', '1450', '1750'], answer: 1, why: 'Omkring 1450.' },
        ],
      },
      {
        title: 'Den industrielle revolution',
        text: 'Fra anden halvdel af 1700-tallet begyndte en stor omstilling i Storbritannien: arbejde flyttede fra hånd til maskiner. Dampmaskinen, som bl.a. James Watt forbedrede markant, drev fabrikker, tog og skibe. Mange flyttede fra landet til byerne.',
        facts: [['1700-tallet', 'starten'], ['Storbritannien', 'hvor det begyndte'], ['Damp', 'den store drivkraft']],
        quiz: [
          { q: 'Hvor begyndte den industrielle revolution?', options: ['Storbritannien', 'Japan', 'Brasilien'], answer: 0, why: 'Den begyndte i Storbritannien.' },
          { q: 'Hvilken maskine var central?', options: ['Computeren', 'Dampmaskinen', 'Elbilen'], answer: 1, why: 'Dampmaskinen drev fabrikker og transport.' },
        ],
      },
    ],
  },
];

interface Progress { read: string[]; correct: string[]; answered: Record<string, number> }
const EMPTY: Progress = { read: [], correct: [], answered: {} };

let seed = 42;
const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const stars = Array.from({ length: 90 }, () => ({ x: rand() * 100, y: rand() * 100, s: rand() * 2 + 0.5, o: rand() * 0.7 + 0.2 }));

export default function KnowledgeGalaxy() {
  const [prog, setProg, resetProg] = useStored<Progress>('kg_progress', EMPTY);
  const [planetId, setPlanetId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [modIdx, setModIdx] = useState<number | null>(null);

  const xp = prog.read.length * 5 + prog.correct.length * 10;
  const level = Math.floor(xp / 50) + 1;
  const planet = PLANETS.find((p) => p.id === planetId) ?? null;

  const planetPct = (p: Planet) => {
    const total = p.modules.length * 3;
    const got = p.modules.reduce((s, _, i) => s + (prog.read.includes(`${p.id}-${i}`) ? 1 : 0) + p.modules[i].quiz.filter((_, qi) => prog.correct.includes(`${p.id}-${i}-${qi}`)).length, 0);
    return Math.round((got / total) * 100);
  };

  const open = (id: string) => {
    if (reducedMotion()) { setPlanetId(id); setModIdx(null); return; }
    setZoom(id);
    window.setTimeout(() => { setPlanetId(id); setModIdx(null); setZoom(null); }, 520);
  };

  const openModule = (i: number) => {
    setModIdx(i);
    const key = `${planetId}-${i}`;
    if (!prog.read.includes(key)) setProg((p) => ({ ...p, read: [...p.read, key] }));
  };

  const answer = (qKey: string, opt: number, correct: boolean) => {
    if (prog.answered[qKey] !== undefined) return;
    setProg((p) => ({ ...p, answered: { ...p.answered, [qKey]: opt }, correct: correct ? [...p.correct, qKey] : p.correct }));
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [planetId, modIdx]);

  const header = (
    <div className="kg-hud">
      <span>Niveau <b>{level}</b></span>
      <div className="bar" aria-label={`${xp % 50} af 50 XP til næste niveau`}><i style={{ width: `${((xp % 50) / 50) * 100}%` }} /></div>
      <span><b>{xp}</b> XP</span>
    </div>
  );

  if (!planet) {
    return (
      <div className="kg">
        {header}
        <div className={`galaxy ${zoom ? 'zooming' : ''}`} style={zoom ? ({ ['--zx' as string]: `${PLANETS.find((p) => p.id === zoom)!.x}%`, ['--zy' as string]: `${PLANETS.find((p) => p.id === zoom)!.y}%` }) : undefined}>
          {stars.map((s, i) => <i key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }} />)}
          <svg className="orbits" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy="48" rx="40" ry="30" /><ellipse cx="50" cy="48" rx="24" ry="17" />
          </svg>
          {PLANETS.map((p) => (
            <button key={p.id} className={`planet ${zoom === p.id ? 'target' : ''}`} onClick={() => open(p.id)}
              style={{ left: `${p.x}%`, top: `${p.y}%`, ['--c' as string]: p.color, ['--g' as string]: p.glow, ['--s' as string]: `${p.size}px` }}>
              <span className="orb" />
              <span className="pl-name">{p.name}</span>
              <span className="pl-pct">{planetPct(p)}%</span>
            </button>
          ))}
        </div>
        <p className="muted center">Tryk på en planet for at rejse derhen.</p>
        {xp > 0 && <button className="btn ghost" onClick={() => resetProg()}>Nulstil fremskridt</button>}
      </div>
    );
  }

  const mod = modIdx != null ? planet.modules[modIdx] : null;

  return (
    <div className="kg" style={{ ['--c' as string]: planet.color, ['--g' as string]: planet.glow }}>
      {header}
      <div className={`pl-hero arrive pl-${planet.id}`}>
        <span className="orb big" />
        <div>
          <h2>{planet.name}</h2>
          <p>{planet.tagline}</p>
          <div className="bar"><i style={{ width: `${planetPct(planet)}%` }} /></div>
          <small>{planetPct(planet)}% udforsket</small>
        </div>
      </div>

      {!mod ? (
        <>
          <div className="mods">
            {planet.modules.map((m, i) => {
              const read = prog.read.includes(`${planet.id}-${i}`);
              const right = m.quiz.filter((_, qi) => prog.correct.includes(`${planet.id}-${i}-${qi}`)).length;
              return (
                <button key={m.title} className="mod" onClick={() => openModule(i)}>
                  <span className="mod-n">Modul {i + 1}</span>
                  <strong>{m.title}</strong>
                  <small>{read ? `Læst · quiz ${right}/${m.quiz.length}` : '+5 XP for at læse · +10 XP pr. rigtigt svar'}</small>
                </button>
              );
            })}
          </div>
          <h3 className="sub">Relaterede planeter</h3>
          <div className="chips">
            {planet.related.map((r) => { const rp = PLANETS.find((p) => p.id === r)!; return <button key={r} className="chip" onClick={() => { setPlanetId(r); setModIdx(null); }} style={{ borderColor: rp.color }}>{rp.name} →</button>; })}
          </div>
          <button className="btn ghost" onClick={() => setPlanetId(null)}>← Tilbage til galaksen</button>
        </>
      ) : (
        <article className="lesson">
          <span className="mod-n">Modul {modIdx! + 1}</span>
          <h3>{mod.title}</h3>
          <p>{mod.text}</p>
          <div className="facts">
            {mod.facts.map(([big, small], i) => (
              <div key={big} className="fact" style={{ animationDelay: `${i * 90}ms` }}><b>{big}</b><span>{small}</span></div>
            ))}
          </div>
          <h4>Quiz</h4>
          {mod.quiz.map((q, qi) => {
            const key = `${planet.id}-${modIdx}-${qi}`;
            const picked = prog.answered[key];
            return (
              <div key={key} className="quiz">
                <p><b>{q.q}</b></p>
                <div className="opts">
                  {q.options.map((o, oi) => {
                    const state = picked === undefined ? '' : oi === q.answer ? 'right' : oi === picked ? 'wrong' : 'dim';
                    return <button key={o} className={`opt ${state}`} disabled={picked !== undefined} onClick={() => answer(key, oi, oi === q.answer)}>{o}</button>;
                  })}
                </div>
                {picked !== undefined && <p className={`fb ${picked === q.answer ? 'ok' : 'no'}`}>{picked === q.answer ? 'Rigtigt! +10 XP. ' : 'Ikke helt. '}{q.why}</p>}
              </div>
            );
          })}
          <div className="btn-row">
            <button className="btn ghost" onClick={() => setModIdx(null)}>← {planet.name}</button>
            {modIdx! < planet.modules.length - 1 && <button className="btn" onClick={() => openModule(modIdx! + 1)}>Næste modul →</button>}
          </div>
        </article>
      )}
    </div>
  );
}
