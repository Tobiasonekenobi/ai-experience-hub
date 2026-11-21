import { useState } from 'react';
import { useStored } from '../lib/store';
import { Quiz, type Question } from '../components/Quiz';

interface Node { id: string; title: string; x: number; y: number; req: string[]; lesson: string; task: string; quiz: Question }
interface Area { id: string; name: string; color: string; nodes: Node[] }

const AREAS: Area[] = [
  {
    id: 'ai', name: 'AI-grundlag', color: 'var(--violet)',
    nodes: [
      { id: 'ai1', title: 'Hvad er AI?', x: 50, y: 88, req: [],
        lesson: 'Kunstig intelligens er computersystemer, der løser opgaver, som normalt kræver menneskelig tænkning – fx at genkende billeder eller forstå sprog. De fleste moderne AI-systemer lærer mønstre fra eksempler i stedet for at følge håndskrevne regler.',
        task: 'Tænk på tre apps du bruger. Hvilke af dem anbefaler, sorterer eller genkender noget for dig?',
        quiz: { q: 'Hvordan lærer de fleste moderne AI-systemer?', opts: ['Ved at finde mønstre i eksempler', 'Ved at læse en manual', 'De lærer slet ikke'], a: 0, why: 'De trænes på store mængder eksempler og justerer sig, så de rammer mønstrene.' } },
      { id: 'ai2', title: 'Træningsdata', x: 25, y: 60, req: ['ai1'],
        lesson: 'En model er aldrig bedre end de data, den trænes på. Hvis dataene er skæve – fx kun billeder af hunde i solskin – bliver modellen også skæv.',
        task: 'Forestil dig en model, der skal genkende frugt. Hvilke slags billeder mangler, hvis alle æbler på billederne er røde?',
        quiz: { q: 'En model trænet kun på røde æbler møder et grønt æble. Hvad er en sandsynlig risiko?', opts: ['Den genkender det ikke som æble', 'Den bliver hurtigere', 'Intet – farve betyder aldrig noget'], a: 0, why: 'Modellen har aldrig set grønne æbler og kan derfor tage fejl.' } },
      { id: 'ai3', title: 'Prompts', x: 75, y: 60, req: ['ai1'],
        lesson: 'En prompt er den besked, du giver en sprogmodel. Gode prompts siger tydeligt hvad du vil have, til hvem, i hvilket format og med hvilke begrænsninger.',
        task: 'Omskriv «skriv om hunde» til en prompt med mål, målgruppe og format.',
        quiz: { q: 'Hvilken prompt giver typisk det mest brugbare svar?', opts: ['«Hunde»', '«Skriv 5 korte tips til nye hundeejere, som punktliste»', '«Skriv noget godt»'], a: 1, why: 'Den angiver indhold, målgruppe, længde og format.' } },
      { id: 'ai4', title: 'Kritisk brug', x: 50, y: 28, req: ['ai2', 'ai3'],
        lesson: 'Sprogmodeller kan lyde sikre og alligevel tage fejl – det kaldes ofte «hallucinationer». Tjek vigtige fakta i pålidelige kilder, og del ikke følsomme oplysninger.',
        task: 'Vælg et faktaspørgsmål, du kender svaret på, og overvej hvordan du ville tjekke et AI-svar.',
        quiz: { q: 'En AI giver dig et præcist årstal til en opgave. Hvad gør du?', opts: ['Bruger det med det samme', 'Tjekker det i en pålidelig kilde', 'Spørger AI’en om den er sikker – det er nok'], a: 1, why: 'AI kan tage fejl med stor selvsikkerhed, så vigtige fakta skal tjekkes.' } },
    ],
  },
  {
    id: 'prob', name: 'Problemløsning', color: 'var(--gold)',
    nodes: [
      { id: 'p1', title: 'Definér problemet', x: 50, y: 88, req: [],
        lesson: 'Mange løsninger fejler, fordi problemet er uklart. Skriv problemet som én sætning: hvem har problemet, hvad er det, og hvordan ved vi, at det er løst?',
        task: 'Skriv et hverdagsproblem som: «[Hvem] har svært ved [hvad], fordi [hvorfor].»',
        quiz: { q: 'Hvad er det første skridt i god problemløsning?', opts: ['At vælge en løsning', 'At forstå og beskrive problemet præcist', 'At spørge om budget'], a: 1, why: 'Først når problemet er klart, kan man vurdere løsninger.' } },
      { id: 'p2', title: 'Del op', x: 25, y: 60, req: ['p1'],
        lesson: 'Store problemer bliver overskuelige, når man deler dem i mindre dele, der kan løses hver for sig. Det kaldes dekomposition og bruges også i programmering.',
        task: 'Del «planlæg en fødselsdag» op i fem mindre opgaver.',
        quiz: { q: 'Hvorfor deler man et stort problem op?', opts: ['For at gøre det mere uoverskueligt', 'Så hver del kan løses og testes for sig', 'Det gør man kun i matematik'], a: 1, why: 'Små dele er lettere at forstå, fordele og tjekke.' } },
      { id: 'p3', title: 'Find mønstre', x: 75, y: 60, req: ['p1'],
        lesson: 'Når man ser et problem, man har løst før i en anden form, kan man genbruge løsningen. At genkende mønstre sparer tid og fejl.',
        task: 'Hvad har det til fælles at pakke en kuffert og at organisere en mappe på computeren?',
        quiz: { q: 'Talrækken er 2, 4, 8, 16 … Hvad kommer næst?', opts: ['18', '24', '32'], a: 2, why: 'Hvert tal fordobles: 16 × 2 = 32.' } },
      { id: 'p4', title: 'Test og forbedr', x: 50, y: 28, req: ['p2', 'p3'],
        lesson: 'En løsning er en hypotese, indtil den er testet. Prøv i lille skala, mål resultatet, og justér. Fejl undervejs er information, ikke nederlag.',
        task: 'Beskriv en lille test, der kan vise om en ny morgenrutine virker.',
        quiz: { q: 'Din løsning virker ikke i første test. Hvad er bedst?', opts: ['Opgive', 'Lære af resultatet og justere', 'Gentage præcis det samme'], a: 1, why: 'Testresultater viser hvad der skal ændres.' } },
    ],
  },
  {
    id: 'krea', name: 'Digital kreativitet', color: '#7BE0A6',
    nodes: [
      { id: 'k1', title: 'Farvelære', x: 50, y: 88, req: [],
        lesson: 'Komplementærfarver ligger over for hinanden i farvecirklen, fx blå og orange. De giver stærk kontrast og får hinanden til at stå frem.',
        task: 'Find to komplementærfarver i et filmplakat eller logo, du kender.',
        quiz: { q: 'Hvilken farve er komplementær til blå?', opts: ['Grøn', 'Orange', 'Lilla'], a: 1, why: 'Blå og orange ligger over for hinanden i farvecirklen.' } },
      { id: 'k2', title: 'Komposition', x: 25, y: 60, req: ['k1'],
        lesson: 'Tredjedelsreglen deler billedet i et 3×3-gitter. Placerer man vigtige elementer ved linjerne eller skæringspunkterne, føles billedet ofte mere levende end med motivet midt i.',
        task: 'Tag et foto, hvor motivet står ved et af tredjedels-punkterne.',
        quiz: { q: 'Hvor placerer tredjedelsreglen typisk motivet?', opts: ['Altid i midten', 'Ved gitterets linjer og skæringspunkter', 'Helt ude i kanten'], a: 1, why: 'Det giver balance og bevægelse i billedet.' } },
      { id: 'k3', title: 'Typografi', x: 75, y: 60, req: ['k1'],
        lesson: 'Brug få skrifttyper – ofte er to nok: én til overskrifter og én til brødtekst. Størrelse, vægt og luft skaber hierarki, så øjet ved hvad det skal læse først.',
        task: 'Se på en hjemmeside: hvor mange skrifttyper bruger den, og hvordan viser den hvad der er vigtigst?',
        quiz: { q: 'Hvad skaber tydeligt hierarki i en tekst?', opts: ['Mange forskellige skrifttyper', 'Forskel i størrelse, vægt og luft', 'Kun store bogstaver'], a: 1, why: 'Kontrast i størrelse og vægt viser rækkefølgen.' } },
      { id: 'k4', title: 'Fortæl en historie', x: 50, y: 28, req: ['k2', 'k3'],
        lesson: 'Godt design og gode videoer følger ofte en simpel struktur: begyndelse (situation), midte (problem eller spænding) og slutning (løsning).',
        task: 'Fortæl en 3-billeders historie om din dag: start, problem, løsning.',
        quiz: { q: 'Hvad hører typisk til midten af en historie?', opts: ['Problemet eller spændingen', 'Rulleteksterne', 'Ingenting'], a: 0, why: 'Midten bygger spænding op, som slutningen forløser.' } },
    ],
  },
];

const XP_PER = 50;
const LEVEL = 150;

export default function SkillTree() {
  const [areaId, setAreaId] = useState('ai');
  const [done, setDone, reset] = useStored<string[]>('st_done', []);
  const [sel, setSel] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [glow, setGlow] = useState<string | null>(null);
  const [tries, setTries] = useState(0);

  const area = AREAS.find((a) => a.id === areaId)!;
  const xp = done.length * XP_PER;
  const level = Math.floor(xp / LEVEL) + 1;
  const unlocked = (n: Node) => n.req.every((r) => done.includes(r));
  const node = area.nodes.find((n) => n.id === sel);

  const finish = (ok: boolean) => {
    setAnswered(ok);
    if (ok && node && !done.includes(node.id)) {
      setDone((d) => [...d, node.id]);
      setGlow(node.id);
    }
  };

  return (
    <div className="st">
      <div className="st-hud">
        <div><small>Niveau</small><b>{level}</b></div>
        <div className="st-bar"><small>{xp} XP · {LEVEL - (xp % LEVEL)} XP til næste niveau</small><span><i style={{ width: `${((xp % LEVEL) / LEVEL) * 100}%` }} /></span></div>
        <div><small>Låst op</small><b>{done.length}/12</b></div>
      </div>

      <div className="seg" role="tablist" aria-label="Vælg område">
        {AREAS.map((a) => (
          <button key={a.id} role="tab" aria-selected={a.id === areaId} className={a.id === areaId ? 'on' : ''} style={{ ['--c' as string]: a.color }} onClick={() => { setAreaId(a.id); setSel(null); }}>
            {a.name} <small>{a.nodes.filter((n) => done.includes(n.id)).length}/4</small>
          </button>
        ))}
      </div>

      <div className="st-tree" style={{ ['--c' as string]: area.color }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {area.nodes.flatMap((n) => n.req.map((r) => {
            const from = area.nodes.find((m) => m.id === r)!;
            const lit = done.includes(r) && done.includes(n.id);
            return <line key={r + n.id} x1={from.x} y1={from.y} x2={n.x} y2={n.y} className={`st-link ${lit ? 'lit' : unlocked(n) ? 'open' : ''}`} vectorEffect="non-scaling-stroke" />;
          }))}
        </svg>
        {area.nodes.map((n) => {
          const isDone = done.includes(n.id), open = unlocked(n);
          return (
            <button key={n.id} className={`st-node ${isDone ? 'done' : open ? 'open' : 'locked'} ${sel === n.id ? 'sel' : ''} ${glow === n.id ? 'glow' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }} disabled={!open}
              onClick={() => { setSel(n.id); setAnswered(null); }}
              aria-label={`${n.title}: ${isDone ? 'gennemført' : open ? 'klar' : 'låst'}`}>
              <span>{isDone ? '✓' : open ? '◆' : '🔒'}</span><em>{n.title}</em>
            </button>
          );
        })}
      </div>

      {!node && <p className="muted center">Vælg en oplyst node for at starte en mission. Gennemfør to noder for at låse den øverste op.</p>}

      {node && (
        <section className="lesson arrive" key={node.id} style={{ ['--c' as string]: area.color }}>
          <span className="mod-n">{area.name} · mission</span>
          <h3>{node.title}</h3>
          <p>{node.lesson}</p>
          <h4>Praktisk udfordring</h4>
          <p className="muted">{node.task}</p>
          <h4>Tjek din forståelse</h4>
          <Quiz key={node.id + tries} question={node.quiz} onDone={finish} />
          {answered === true && <p className="fb ok">{done.includes(node.id) ? `+${XP_PER} XP – noden er låst op!` : ''}</p>}
          {answered === false && <button className="btn ghost sm" onClick={() => { setAnswered(null); setTries((t) => t + 1); }}>Prøv igen</button>}
        </section>
      )}

      <button className="btn ghost" onClick={() => { reset(); setSel(null); setGlow(null); }}>Nulstil fremskridt</button>
    </div>
  );
}
