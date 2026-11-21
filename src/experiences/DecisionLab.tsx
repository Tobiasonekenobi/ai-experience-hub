import { useMemo, useState } from 'react';

// Fiktiv virksomhed og forenklet model. Hvert valg flytter fire målere; nogle runder afhænger af tidligere valg.

type Stat = 'budget' | 'kunder' | 'moral' | 'risiko';
type Delta = Partial<Record<Stat, number>>;
interface Opt { label: string; text: string; flag?: string; delta: (flags: string[]) => Delta; result: (flags: string[]) => string }
interface Round { title: string; situation: (flags: string[]) => string; opts: Opt[] }

const START: Record<Stat, number> = { budget: 10, kunder: 60, moral: 65, risiko: 30 };
const STATS: { id: Stat; label: string; unit: string; max: number; good: 'op' | 'ned'; color: string }[] = [
  { id: 'budget', label: 'Budget', unit: ' mio. kr', max: 20, good: 'op', color: 'var(--gold)' },
  { id: 'kunder', label: 'Kundetilfredshed', unit: '%', max: 100, good: 'op', color: 'var(--cyan)' },
  { id: 'moral', label: 'Teamets moral', unit: '%', max: 100, good: 'op', color: '#7BE0A6' },
  { id: 'risiko', label: 'Risiko', unit: '%', max: 100, good: 'ned', color: 'var(--bad)' },
];

const has = (f: string[], x: string) => f.includes(x);

const ROUNDS: Round[] = [
  {
    title: 'Budgetkrise',
    situation: () => 'Jeres største kunde betaler 3 mio. kr. tre måneder for sent. Lønningerne skal betales om to uger.',
    opts: [
      { label: 'Skær i staben', text: 'Afskedig fire medarbejdere.', flag: 'skaar', delta: () => ({ budget: 3, moral: -20, kunder: -5, risiko: 5 }), result: () => 'Pengene passer, men stemningen på kontoret falder markant.' },
      { label: 'Tag et banklån', text: 'Lån 3 mio. kr. til 8 % rente.', flag: 'laan', delta: () => ({ budget: 3, risiko: 15 }), result: () => 'Alle beholder jobbet, men gælden øger risikoen.' },
      { label: 'Udskyd ny funktion', text: 'Sæt udviklingen af en betalt funktion på pause.', flag: 'udskyd', delta: () => ({ budget: 1.5, kunder: -10 }), result: () => 'I sparer lidt, men kunderne havde glædet sig.' },
    ],
  },
  {
    title: 'Forsinkelse',
    situation: (f) => has(f, 'udskyd') ? 'Den nye app-version er nu seks uger forsinket – og kunderne har allerede ventet én gang.' : 'Den nye app-version er seks uger forsinket.',
    opts: [
      { label: 'Overarbejde', text: 'Bed teamet arbejde aftener i en måned.', delta: (f) => ({ moral: has(f, 'skaar') ? -20 : -12, kunder: 6, budget: -0.5 }), result: (f) => has(f, 'skaar') ? 'Et team, der lige har mistet kolleger, knækker næsten under presset.' : 'Versionen når frem, men folk er trætte.' },
      { label: 'Skær funktioner fra', text: 'Lancér til tiden med færre funktioner.', delta: () => ({ kunder: -4, risiko: -6 }), result: () => 'Lanceringen er stabil, men lidt tynd.' },
      { label: 'Vær ærlig og udskyd', text: 'Fortæl kunderne om forsinkelsen.', delta: (f) => ({ kunder: has(f, 'udskyd') ? -14 : -5, moral: 6 }), result: (f) => has(f, 'udskyd') ? 'Anden forsinkelse i træk – nogle kunder mister tålmodigheden.' : 'Kunderne sætter pris på ærligheden.' },
    ],
  },
  {
    title: 'Nøglemedarbejder',
    situation: (f) => has(f, 'skaar') ? 'Efter fyringerne siger jeres bedste udvikler op – teamet er presset.' : 'En konkurrent tilbyder jeres bedste udvikler 20 % mere i løn.',
    opts: [
      { label: 'Lønforhøjelse', text: 'Match tilbuddet og løft hele teamet lidt.', delta: () => ({ budget: -1.5, moral: 14 }), result: () => 'Dyrt, men teamet føler sig værdsat.' },
      { label: 'Hent freelancere', text: 'Dæk hullet med eksterne folk.', delta: () => ({ budget: -1, risiko: 10, moral: -3 }), result: () => 'Arbejdet fortsætter, men viden forsvinder ud af huset.' },
      { label: 'Lad det ske', text: 'Spar pengene og fordel opgaverne.', delta: () => ({ moral: -14, risiko: 10 }), result: () => 'Resten af teamet må løbe stærkere.' },
    ],
  },
  {
    title: 'Ny mulighed',
    situation: () => 'En stor butikskæde vil have en specialudgave af appen – på kort tid.',
    opts: [
      { label: 'Sig ja med det samme', text: 'Tag ordren på deres deadline.', delta: (f) => ({ budget: 4, moral: -10, risiko: has(f, 'laan') ? 16 : 10 }), result: (f) => has(f, 'laan') ? 'Flot ordre – men med lånet oveni er marginen for fejl lille.' : 'Flot ordre, men teamet er spændt hårdt for.' },
      { label: 'Ja, men forhandl tid', text: 'Bed om to måneder ekstra.', delta: () => ({ budget: 2.5, risiko: 3 }), result: () => 'Lidt mindre ordre, men realistisk.' },
      { label: 'Sig nej', text: 'Fokusér på jeres eksisterende kunder.', delta: () => ({ kunder: 8 }), result: () => 'Kunderne mærker fokus og bliver gladere.' },
    ],
  },
  {
    title: 'Lancering',
    situation: () => 'Det er tid til den store lancering af den nye version.',
    opts: [
      { label: 'Stor kampagne', text: 'Brug 3 mio. kr. på markedsføring.', delta: () => ({ budget: -3, kunder: 12 }), result: () => 'Mange nye brugere – og en stor regning.' },
      { label: 'Beta med loyale kunder', text: 'Lancér først til 500 trofaste brugere.', delta: () => ({ kunder: 6, risiko: -10 }), result: () => 'Fejl findes tidligt, og kernekunderne føler sig hørt.' },
      { label: 'Stille lancering', text: 'Opdatér appen uden ståhej.', delta: () => ({ budget: -0.5, kunder: 2 }), result: () => 'Billigt, men få opdager nyhederne.' },
    ],
  },
];

const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));

export default function DecisionLab() {
  const [picks, setPicks] = useState<number[]>([]);
  const round = picks.length;
  const over = round >= ROUNDS.length;

  const { stats, flags, log } = useMemo(() => {
    const s = { ...START };
    const f: string[] = [];
    const l: { round: string; label: string; result: string; delta: Delta }[] = [];
    picks.forEach((p, i) => {
      const o = ROUNDS[i].opts[p];
      const d = o.delta(f);
      (Object.keys(d) as Stat[]).forEach((k) => { s[k] = clamp(s[k] + (d[k] ?? 0), STATS.find((x) => x.id === k)!.max); });
      l.push({ round: ROUNDS[i].title, label: o.label, result: o.result(f), delta: d });
      if (o.flag) f.push(o.flag);
    });
    return { stats: s, flags: f, log: l };
  }, [picks]);

  const score = Math.round(stats.budget * 2 + stats.kunder * 0.6 + stats.moral * 0.5 - stats.risiko * 0.5);
  const verdict = stats.budget <= 1 ? { t: 'Pengene slap op', d: 'Virksomheden overlevede ikke kassekrisen. Prøv at holde mere luft i budgettet.' }
    : score >= 95 ? { t: 'Stærk fremtid', d: 'Sund økonomi, glade kunder og et team der bliver. Flot styret!' }
      : score >= 75 ? { t: 'Stabil kurs', d: 'Virksomheden klarer sig, men der er svage punkter at arbejde med.' }
        : { t: 'Hårdt pres', d: 'Virksomheden lever, men risiko og utilfredshed truer de næste år.' };

  const last = log[log.length - 1];

  return (
    <div className="dl">
      <div className="demo-note">Fiktiv virksomhed «Nordlys Tech» · forenklet model</div>

      <div className="dl-stats">
        {STATS.map((s) => {
          const v = stats[s.id];
          const d = last?.delta[s.id];
          return (
            <div key={s.id} className="dl-stat" style={{ ['--c' as string]: s.color }}>
              <small>{s.label}</small>
              <b>{s.id === 'budget' ? v.toFixed(1).replace('.', ',') : Math.round(v)}{s.unit}</b>
              <span className="dl-meter"><i style={{ width: `${(v / s.max) * 100}%` }} /></span>
              {d ? <em className={(d > 0) === (s.good === 'op') ? 'up' : 'down'} key={round}>{d > 0 ? '+' : ''}{String(d).replace('.', ',')}</em> : null}
            </div>
          );
        })}
      </div>

      <svg className="dl-tree" viewBox="0 0 500 120" role="img" aria-label={`Beslutningstræ: runde ${Math.min(round + 1, 5)} af 5`}>
        {ROUNDS.map((_, i) => [0, 1, 2].map((j) => {
          const x = 50 + i * 100, y = 20 + j * 40;
          const chosen = picks[i] === j;
          const prev = i > 0 ? picks[i - 1] : null;
          return (
            <g key={`${i}${j}`}>
              {i > 0 && prev !== null && chosen && <line x1={x - 100} y1={20 + prev * 40} x2={x} y2={y} className="dl-path" />}
              <circle cx={x} cy={y} r={chosen ? 9 : 6} className={chosen ? 'dl-dot on' : i === round ? 'dl-dot next' : 'dl-dot'} />
            </g>
          );
        }))}
      </svg>

      {last && (
        <div className="help-box arrive" key={round} role="status"><strong>{last.label}:</strong> {last.result}</div>
      )}

      {!over && (
        <section className="panel" key={`r${round}`}>
          <span className="mod-n" style={{ ['--c' as string]: 'var(--orange)' }}>Runde {round + 1} af {ROUNDS.length} · {ROUNDS[round].title}</span>
          <p className="dl-sit">{ROUNDS[round].situation(flags)}</p>
          <div className="dl-cards">
            {ROUNDS[round].opts.map((o, i) => (
              <button key={o.label} className="dl-card" onClick={() => setPicks((p) => [...p, i])}>
                <strong>{o.label}</strong><span>{o.text}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {over && (
        <section className="lesson arrive" style={{ ['--c' as string]: 'var(--gold)' }}>
          <span className="mod-n">Slutresultat · {score} point</span>
          <h3>{verdict.t}</h3>
          <p>{verdict.d}</p>
          <ol className="dl-log">
            {log.map((l) => <li key={l.round}><b>{l.round}:</b> {l.label} – <span className="muted">{l.result}</span></li>)}
          </ol>
        </section>
      )}

      <div className="btn-row">
        {round > 0 && !over && <button className="btn ghost" onClick={() => setPicks((p) => p.slice(0, -1))}>↶ Fortryd valg</button>}
        <button className="btn ghost" onClick={() => setPicks([])}>{over ? 'Spil igen' : 'Start forfra'}</button>
      </div>
    </div>
  );
}
