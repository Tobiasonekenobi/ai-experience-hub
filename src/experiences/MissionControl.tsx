import { useMemo, useState } from 'react';
import { useStored } from '../lib/store';
import { BarChart, LineChart, fmt } from '../components/Charts';

type TaskStatus = 'todo' | 'aktiv' | 'faerdig';
interface Task { id: string; title: string; effort: number; status: TaskStatus; milestone: number }
interface Project {
  id: string; name: string; mission: string; color: string;
  budget: number; spent: number; team: number;
  milestones: string[]; tasks: Task[];
}

const t = (id: string, title: string, effort: number, status: TaskStatus, milestone: number): Task => ({ id, title, effort, status, milestone });

const DEFAULTS: Project[] = [
  {
    id: 'nova', name: 'Project Nova', mission: 'Et netværk af små vejrsensorer i lav kredsløbsbane.', color: 'var(--orange)',
    budget: 2_400_000, spent: 820_000, team: 6,
    milestones: ['Prototype-sensor', 'Testopsendelse', 'Data-platform live'],
    tasks: [
      t('n1', 'Design af sensormodul', 8, 'faerdig', 0), t('n2', 'Strømbudget og solpaneler', 6, 'faerdig', 0),
      t('n3', 'Termisk test i vakuumkammer', 10, 'aktiv', 1), t('n4', 'Software til kredsløbsstyring', 12, 'aktiv', 1),
      t('n5', 'Aftale om opsendelsesplads', 4, 'todo', 1), t('n6', 'Datapipeline til jordstation', 14, 'todo', 2),
      t('n7', 'Offentligt vejr-dashboard', 8, 'todo', 2),
    ],
  },
  {
    id: 'atlas', name: 'Project Atlas', mission: 'Et digitalt 3D-kort over en hel bydel til byplanlægning.', color: 'var(--cyan)',
    budget: 1_600_000, spent: 1_050_000, team: 4,
    milestones: ['Droneskanning', '3D-model', 'Borgerportal'],
    tasks: [
      t('a1', 'Droneruter og tilladelser', 5, 'faerdig', 0), t('a2', 'Skanning af 40 karréer', 12, 'faerdig', 0),
      t('a3', 'Rens af punktskyer', 9, 'faerdig', 1), t('a4', 'Teksturering af facader', 11, 'aktiv', 1),
      t('a5', 'Lag for trafik og grønne områder', 7, 'todo', 2), t('a6', 'Borgerportal med kommentarer', 10, 'todo', 2),
    ],
  },
  {
    id: 'pulse', name: 'Project Pulse', mission: 'En wearable, der måler søvnkvalitet og giver rolige råd.', color: 'var(--violet)',
    budget: 3_100_000, spent: 640_000, team: 8,
    milestones: ['Hardware-prototype', 'Brugertest', 'App i beta'],
    tasks: [
      t('p1', 'Valg af sensorer', 6, 'faerdig', 0), t('p2', 'Første printplade', 9, 'aktiv', 0),
      t('p3', 'Batterilevetid over 5 døgn', 10, 'todo', 0), t('p4', 'Søvnfase-algoritme', 16, 'aktiv', 1),
      t('p5', 'Test med 30 frivillige', 12, 'todo', 1), t('p6', 'App-design', 8, 'todo', 2), t('p7', 'Beta-udgivelse', 6, 'todo', 2),
    ],
  },
];

const STATUS_LABEL: Record<TaskStatus, string> = { todo: 'Ikke startet', aktiv: 'I gang', faerdig: 'Færdig' };
const NEXT: Record<TaskStatus, TaskStatus> = { todo: 'aktiv', aktiv: 'faerdig', faerdig: 'todo' };
const VELOCITY_PER_PERSON = 1.5; // point pr. uge
const COST_PER_PERSON = 22_000; // kr. pr. uge

const KPI_HELP: Record<string, string> = {
  fremdrift: 'Andel af projektets samlede arbejdspoint, der er færdige. Opgaver "i gang" tæller ikke med, før de er færdige.',
  budget: 'Prognose for samlede omkostninger: allerede brugt + (resterende uger × teamstørrelse × 22.000 kr.). Rød hvis over budget.',
  slut: 'Restarbejde divideret med teamets hastighed (1,5 point pr. person pr. uge). Opgaver i gang tæller med halvdelen.',
  team: 'Antal personer på projektet. Flere folk = hurtigere færdig, men højere ugentlig omkostning.',
};

export default function MissionControl() {
  const [projects, setProjects, resetProjects] = useStored<Project[]>('mc_projects', DEFAULTS);
  const [activeId, setActiveId] = useState('nova');
  const [filter, setFilter] = useState<'alle' | TaskStatus>('alle');
  const [scale, setScale] = useState<'uge' | 'maaned'>('uge');
  const [help, setHelp] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);

  const p = projects.find((x) => x.id === activeId) ?? projects[0];
  const base = DEFAULTS.find((x) => x.id === p.id)!;

  const update = (fn: (p: Project) => Project) => {
    setProjects((all) => all.map((x) => (x.id === p.id ? fn(x) : x)));
    setPulse((n) => n + 1);
  };

  const m = useMemo(() => {
    const total = p.tasks.reduce((s, x) => s + x.effort, 0);
    const done = p.tasks.filter((x) => x.status === 'faerdig').reduce((s, x) => s + x.effort, 0);
    const remaining = p.tasks.reduce((s, x) => s + (x.status === 'todo' ? x.effort : x.status === 'aktiv' ? x.effort / 2 : 0), 0);
    const vel = p.team * VELOCITY_PER_PERSON;
    const weeks = remaining === 0 ? 0 : Math.ceil(remaining / vel);
    const weekly = p.team * COST_PER_PERSON;
    const forecast = p.spent + weeks * weekly;
    const baseVel = base.team * VELOCITY_PER_PERSON;

    const step = scale === 'uge' ? 1 : 4;
    const horizon = Math.max(weeks, Math.ceil(remaining / baseVel), 4);
    const nPts = Math.ceil(horizon / step) + 1;
    const labels = Array.from({ length: nPts }, (_, i) => (scale === 'uge' ? `U${i * step}` : `M${i}`));
    const burn = labels.map((_, i) => Math.max(0, remaining - vel * i * step));
    const plan = labels.map((_, i) => Math.max(0, remaining - baseVel * i * step));

    const nBars = Math.min(scale === 'uge' ? 8 : 6, Math.max(1, Math.ceil(Math.max(weeks, 1) / step)));
    const bars = Array.from({ length: nBars }, (_, i) => {
      const wk = Math.min(weeks, (i + 1) * step);
      const v = p.spent + wk * weekly;
      return { label: scale === 'uge' ? `U${(i + 1) * step}` : `M${i + 1}`, value: v, color: v > p.budget ? '#E5484D' : 'var(--cyan)' };
    });

    // Milepæle: færdig hvis alle opgaver er færdige; ellers forventet uge ud fra kumulativt restarbejde
    let cum = 0;
    const milestones = p.milestones.map((name, i) => {
      const ts = p.tasks.filter((x) => x.milestone === i);
      cum += ts.reduce((s, x) => s + (x.status === 'todo' ? x.effort : x.status === 'aktiv' ? x.effort / 2 : 0), 0);
      const reached = ts.every((x) => x.status === 'faerdig');
      return { name, reached, week: reached ? 0 : Math.ceil(cum / vel) };
    });

    return { total, done, pct: total ? Math.round((done / total) * 100) : 0, remaining, weeks, weekly, forecast, labels, burn, plan, bars, milestones };
  }, [p, base, scale]);

  const tasks = p.tasks.filter((x) => filter === 'alle' || x.status === filter);
  const over = m.forecast > p.budget;

  const kpis = [
    { key: 'fremdrift', label: 'Fremdrift', value: `${m.pct}%`, sub: `${m.done} af ${m.total} point`, tone: 'cyan' },
    { key: 'budget', label: 'Budgetprognose', value: `${fmt(m.forecast)} kr`, sub: `af ${fmt(p.budget)} kr`, tone: over ? 'bad' : 'good' },
    { key: 'slut', label: 'Forventet færdig', value: m.weeks === 0 ? 'Færdig' : `om ${m.weeks} ${m.weeks === 1 ? 'uge' : 'uger'}`, sub: `${m.remaining} point tilbage`, tone: 'orange' },
    { key: 'team', label: 'Team', value: `${p.team} pers.`, sub: `${fmt(m.weekly)} kr/uge`, tone: 'violet' },
  ];

  return (
    <div className="mc">
      <div className="demo-note">Demodata · fiktive projekter og forenklet regnemodel</div>

      <div className="seg" role="tablist" aria-label="Vælg projekt">
        {projects.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === p.id} className={x.id === p.id ? 'on' : ''} onClick={() => setActiveId(x.id)} style={{ ['--c' as string]: x.color }}>
            {x.name.replace('Project ', '')}
          </button>
        ))}
      </div>
      <p className="mc-mission"><strong style={{ color: p.color }}>{p.name}</strong> — {p.mission}</p>

      <div className={`kpis pulse-${pulse % 2}`}>
        {kpis.map((k) => (
          <div key={k.key} className={`kpi ${k.tone}`}>
            <div className="kpi-top"><span>{k.label}</span>
              <button className="info" aria-expanded={help === k.key} aria-label={`Forklar ${k.label}`} onClick={() => setHelp(help === k.key ? null : k.key)}>i</button>
            </div>
            <strong>{k.value}</strong><small>{k.sub}</small>
          </div>
        ))}
      </div>
      {help && <div className="help-box" role="note"><strong>{kpis.find((k) => k.key === help)?.label}:</strong> {KPI_HELP[help]}</div>}

      <section className="panel">
        <div className="row-between">
          <h3>Ressourcer</h3>
          <div className="seg small" aria-label="Tidsskala">
            <button className={scale === 'uge' ? 'on' : ''} onClick={() => setScale('uge')}>Uge</button>
            <button className={scale === 'maaned' ? 'on' : ''} onClick={() => setScale('maaned')}>Måned</button>
          </div>
        </div>
        <label className="slider">
          <span>Teamstørrelse <b>{p.team}</b></span>
          <input type="range" min={2} max={14} value={p.team} onChange={(e) => update((x) => ({ ...x, team: +e.target.value }))} />
        </label>
      </section>

      <div className="charts">
        <LineChart
          title="Restarbejde (point)"
          xLabels={m.labels}
          series={[
            { label: 'Med dit team', color: 'var(--orange)', points: m.burn },
            { label: `Oprindelig plan (${base.team} pers.)`, color: 'var(--m)', points: m.plan, dashed: true },
          ]}
        />
        <BarChart title="Akkumulerede omkostninger (kr)" bars={m.bars} refLine={{ value: p.budget, label: 'Budget', color: 'var(--gold)' }} />
      </div>

      <section className="panel">
        <div className="row-between"><h3>Opgaver</h3><small className="muted">Tryk på status for at ændre den</small></div>
        <div className="chips" role="group" aria-label="Filtrér opgaver">
          {(['alle', 'todo', 'aktiv', 'faerdig'] as const).map((f) => (
            <button key={f} className={`chip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
              {f === 'alle' ? 'Alle' : STATUS_LABEL[f]} <span>{f === 'alle' ? p.tasks.length : p.tasks.filter((x) => x.status === f).length}</span>
            </button>
          ))}
        </div>
        <ul className="tasks">
          {tasks.map((x) => (
            <li key={x.id} className={x.status}>
              <button className={`st ${x.status}`} onClick={() => update((pp) => ({ ...pp, tasks: pp.tasks.map((y) => (y.id === x.id ? { ...y, status: NEXT[y.status] } : y)) }))} aria-label={`${x.title}: ${STATUS_LABEL[x.status]}. Skift status`}>
                {STATUS_LABEL[x.status]}
              </button>
              <span className="tt">{x.title}</span>
              <span className="pts">{x.effort} p</span>
            </li>
          ))}
          {tasks.length === 0 && <li className="empty">Ingen opgaver med denne status.</li>}
        </ul>
      </section>

      <section className="panel">
        <h3>Milepæle</h3>
        <ol className="miles">
          {m.milestones.map((ms) => (
            <li key={ms.name} className={ms.reached ? 'done' : ''}>
              <span className="dot" /><span>{ms.name}</span>
              <em>{ms.reached ? 'Nået ✓' : `ca. uge ${ms.week}`}</em>
            </li>
          ))}
        </ol>
      </section>

      <button className="btn ghost" onClick={() => { resetProjects(); setFilter('alle'); setPulse((n) => n + 1); }}>Nulstil demo</button>
    </div>
  );
}
