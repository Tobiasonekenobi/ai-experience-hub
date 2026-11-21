import { useMemo, useState } from 'react';
import { BarChart, LineChart, fmt } from '../components/Charts';

interface Param { key: string; label: string; min: number; max: number; step: number; unit: string; def: number }
interface Result {
  xLabels: string[];
  line: number[];
  lineTitle: string;
  lineUnit?: string;
  ref?: { value: number; label: string };
  bars: { label: string; value: number }[];
  barTitle: string;
  kpis: { label: string; value: string }[];
}
interface Scenario { id: string; name: string; intro: string; params: Param[]; assumptions: string[]; run: (v: Record<string, number>) => Result }

const SCENARIOS: Scenario[] = [
  {
    id: 'opsparing', name: 'Opsparing', intro: 'Hvordan vokser en opsparing med fast månedligt indskud og et antaget gennemsnitligt afkast?',
    params: [
      { key: 'budget', label: 'Månedligt indskud', min: 250, max: 10000, step: 250, unit: ' kr', def: 2000 },
      { key: 'tid', label: 'Tidshorisont', min: 1, max: 40, step: 1, unit: ' år', def: 15 },
      { key: 'ressourcer', label: 'Antaget årligt afkast', min: 0, max: 10, step: 0.5, unit: ' %', def: 4 },
      { key: 'forsinkelse', label: 'Pause i indskud', min: 0, max: 60, step: 1, unit: ' mdr', def: 0 },
    ],
    assumptions: [
      'Afkastet er et fast gennemsnit hvert år. I virkeligheden svinger afkast, og kan også være negativt.',
      'Pausen ligger i starten af perioden – der indskydes ikke i de måneder.',
      'Der regnes ikke med skat, gebyrer eller inflation.',
      'Dette er en regneøvelse, ikke finansiel rådgivning.',
    ],
    run: (v) => {
      const months = v.tid * 12;
      const r = v.ressourcer / 100 / 12;
      let bal = 0, paid = 0;
      const line = [0];
      for (let m = 1; m <= months; m++) {
        bal *= 1 + r;
        if (m > v.forsinkelse) { bal += v.budget; paid += v.budget; }
        if (m % 12 === 0) line.push(bal);
      }
      return {
        xLabels: line.map((_, i) => `${i}`), line, lineTitle: 'Saldo over tid (år)', lineUnit: '',
        bars: [{ label: 'Indskud', value: paid }, { label: 'Afkast', value: Math.max(0, bal - paid) }, { label: 'I alt', value: bal }],
        barTitle: 'Hvor kommer pengene fra? (kr)',
        kpis: [{ label: 'Slutsaldo', value: `${fmt(bal)} kr` }, { label: 'Heraf afkast', value: `${fmt(bal - paid)} kr` }, { label: 'Indskudt', value: `${fmt(paid)} kr` }],
      };
    },
  },
  {
    id: 'projekt', name: 'Digitalt projekt', intro: 'Et appudviklingsprojekt med 120 arbejdspoint. Når I deadline – og holder budgettet?',
    params: [
      { key: 'budget', label: 'Budget', min: 200, max: 3000, step: 50, unit: 'k kr', def: 900 },
      { key: 'tid', label: 'Deadline', min: 4, max: 40, step: 1, unit: ' uger', def: 16 },
      { key: 'ressourcer', label: 'Udviklere', min: 1, max: 10, step: 1, unit: ' pers.', def: 3 },
      { key: 'forsinkelse', label: 'Uventede forsinkelser', min: 0, max: 12, step: 1, unit: ' uger', def: 2 },
    ],
    assumptions: [
      'Projektet består af 120 point. Én udvikler laver 3 point om ugen.',
      'Hver ekstra udvikler giver lidt mindre effekt (koordinering) – 5 % pr. person ud over den første.',
      'En udvikler koster 15.000 kr om ugen. Forsinkelser koster også løn.',
      'Modellen er bevidst simpel og kan ikke forudsige et rigtigt projekt.',
    ],
    run: (v) => {
      const eff = Math.max(0.5, 1 - 0.05 * (v.ressourcer - 1));
      const vel = v.ressourcer * 3 * eff;
      const work = Math.ceil(120 / vel);
      const total = work + v.forsinkelse;
      const cost = total * v.ressourcer * 15;
      const n = Math.max(total, v.tid);
      const line = Array.from({ length: n + 1 }, (_, w) => {
        const active = Math.max(0, w - v.forsinkelse);
        return Math.min(100, (active * vel / 120) * 100);
      });
      return {
        xLabels: line.map((_, i) => `${i}`), line, lineTitle: 'Færdiggørelse (%) pr. uge', lineUnit: '%',
        ref: { value: 100, label: `Deadline uge ${v.tid}` },
        bars: [{ label: 'Budget', value: v.budget }, { label: 'Forbrug', value: cost }],
        barTitle: 'Budget vs. forventet forbrug (k kr)',
        kpis: [
          { label: 'Færdig efter', value: `${total} uger` },
          { label: 'Deadline', value: total <= v.tid ? 'Holder ✓' : `${total - v.tid} ${total - v.tid === 1 ? 'uge' : 'uger'} for sent` },
          { label: 'Budget', value: cost <= v.budget ? `${fmt(v.budget - cost)}k tilbage` : `${fmt(cost - v.budget)}k over` },
        ],
      };
    },
  },
  {
    id: 'arbejde', name: 'Fremtidens arbejde', intro: 'Et tankeeksperiment: Hvor godt følger en medarbejders kompetencer med, når flere opgaver automatiseres?',
    params: [
      { key: 'budget', label: 'Efteruddannelse', min: 0, max: 200, step: 10, unit: ' t/år', def: 40 },
      { key: 'tid', label: 'Periode', min: 2, max: 20, step: 1, unit: ' år', def: 10 },
      { key: 'ressourcer', label: 'Automatiseringstempo', min: 1, max: 15, step: 1, unit: ' %/år', def: 6 },
      { key: 'forsinkelse', label: 'Start på efteruddannelse', min: 0, max: 5, step: 1, unit: ' år', def: 1 },
    ],
    assumptions: [
      'Et fiktivt indeks fra 0–100: hvor stor en del af de nye opgaver medarbejderen er klædt på til.',
      'Hver 10 timers efteruddannelse om året giver +1 indekspoint om året.',
      'Hvert procentpoint automatisering flytter 1 indekspoint væk fra kendte opgaver.',
      'Ingen rigtige statistikker indgår. Modellen viser kun sammenhænge, ikke virkeligheden.',
    ],
    run: (v) => {
      let idx = 70, changed = 0;
      const line = [idx];
      for (let y = 1; y <= v.tid; y++) {
        changed = Math.min(100, changed + v.ressourcer);
        const learn = y > v.forsinkelse ? v.budget / 10 : 0;
        idx = Math.max(0, Math.min(100, idx - v.ressourcer + learn));
        line.push(idx);
      }
      return {
        xLabels: line.map((_, i) => `${i}`), line, lineTitle: 'Kompetenceindeks (0–100) pr. år', lineUnit: '',
        ref: { value: 70, label: 'Udgangspunkt' },
        bars: [{ label: 'Ændrede opg.', value: changed }, { label: 'Indeks', value: idx }],
        barTitle: 'Efter perioden (%)',
        kpis: [
          { label: 'Slutindeks', value: `${Math.round(idx)}` },
          { label: 'Opgaver ændret', value: `${Math.round(changed)} %` },
          { label: 'Udvikling', value: idx >= 70 ? 'Følger med ✓' : 'Halter efter' },
        ],
      };
    },
  },
];

const defaults = (s: Scenario) => Object.fromEntries(s.params.map((p) => [p.key, p.def]));

export default function FutureSimulator() {
  const [sid, setSid] = useState(SCENARIOS[0].id);
  const s = SCENARIOS.find((x) => x.id === sid)!;
  const [values, setValues] = useState<Record<string, Record<string, number>>>(() => Object.fromEntries(SCENARIOS.map((x) => [x.id, defaults(x)])));
  const [saved, setSaved] = useState<Record<string, Record<string, number> | null>>({});
  const [showAss, setShowAss] = useState(false);

  const v = values[sid];
  const res = useMemo(() => s.run(v), [s, v]);
  const a = saved[sid];
  const resA = useMemo(() => (a ? s.run(a) : null), [s, a]);

  const setVal = (k: string, n: number) => setValues((all) => ({ ...all, [sid]: { ...all[sid], [k]: n } }));
  const changes = s.params.filter((p) => v[p.key] !== p.def);

  const len = Math.max(res.line.length, resA?.line.length ?? 0);
  const pad = (arr: number[]) => (arr.length >= len ? arr : [...arr, ...Array(len - arr.length).fill(arr[arr.length - 1])]);
  const xLabels = Array.from({ length: len }, (_, i) => `${i}`);

  return (
    <div className="fs">
      <div className="demo-note">Forenklede modeller · resultaterne er ikke forudsigelser</div>
      <div className="seg" role="tablist" aria-label="Vælg scenarie">
        {SCENARIOS.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === sid} className={x.id === sid ? 'on' : ''} onClick={() => setSid(x.id)}>{x.name}</button>
        ))}
      </div>
      <p className="muted">{s.intro}</p>

      <div className="fs-grid">
        <section className="panel sliders">
          {s.params.map((p) => (
            <label key={p.key} className="slider">
              <span>{p.label} <b>{p.step < 1 ? v[p.key].toFixed(1).replace('.', ',') : fmt(v[p.key])}{p.unit}</b></span>
              <input type="range" min={p.min} max={p.max} step={p.step} value={v[p.key]} onChange={(e) => setVal(p.key, +e.target.value)} aria-label={p.label} />
            </label>
          ))}
          <div className="btn-row">
            <button className="btn" onClick={() => setSaved((x) => ({ ...x, [sid]: { ...v } }))}>{a ? 'Opdatér scenarie A' : 'Gem som scenarie A'}</button>
            {a && <button className="btn ghost" onClick={() => setSaved((x) => ({ ...x, [sid]: null }))}>Fjern sammenligning</button>}
            <button className="btn ghost" onClick={() => setValues((all) => ({ ...all, [sid]: defaults(s) }))}>Nulstil</button>
          </div>
        </section>

        <div>
          <div className="kpis three">
            {res.kpis.map((k, i) => (
              <div key={k.label} className="kpi">
                <div className="kpi-top"><span>{k.label}</span></div>
                <strong>{k.value}</strong>
                {resA && <small>A: {resA.kpis[i].value}</small>}
              </div>
            ))}
          </div>
          <div className="charts">
            <LineChart
              title={res.lineTitle}
              unit={res.lineUnit}
              xLabels={xLabels}
              refLine={res.ref ? { ...res.ref, color: 'var(--gold)' } : undefined}
              series={[
                { label: resA ? 'B (nu)' : 'Nu', color: 'var(--violet)', points: pad(res.line) },
                ...(resA ? [{ label: 'A (gemt)', color: 'var(--cyan)', points: pad(resA.line), dashed: true }] : []),
              ]}
            />
            <BarChart title={res.barTitle} bars={res.bars.map((b, i) => ({ ...b, color: ['var(--cyan)', 'var(--orange)', 'var(--violet)'][i % 3] }))} />
          </div>
        </div>
      </div>

      <section className="panel">
        <h3>Hvad har du ændret?</h3>
        {changes.length === 0 ? <p className="muted">Du ser standardværdierne. Træk i en slider for at se effekten.</p> : (
          <ul className="changes">
            {changes.map((p) => {
              const d = v[p.key] - p.def;
              return <li key={p.key}><b>{p.label}</b>: {d > 0 ? '+' : ''}{p.step < 1 ? d.toFixed(1).replace('.', ',') : fmt(d)}{p.unit} i forhold til start ({fmt(p.def)}{p.unit})</li>;
            })}
          </ul>
        )}
        <button className="link" aria-expanded={showAss} onClick={() => setShowAss((x) => !x)}>{showAss ? 'Skjul antagelser' : 'Vis antagelser bag modellen'}</button>
        {showAss && <ul className="assume">{s.assumptions.map((x) => <li key={x}>{x}</li>)}</ul>}
      </section>
    </div>
  );
}
