export interface Series {
  label: string;
  color: string;
  points: number[];
  dashed?: boolean;
}

const W = 320;
const H = 160;
const P = { l: 34, r: 10, t: 10, b: 24 };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / p) * p;
}

export function LineChart({ series, xLabels, refLine, title, unit = '' }: {
  series: Series[];
  xLabels: string[];
  refLine?: { value: number; label: string; color: string };
  title: string;
  unit?: string;
}) {
  const n = Math.max(2, ...series.map((s) => s.points.length));
  const max = niceMax(Math.max(refLine?.value ?? 0, ...series.flatMap((s) => s.points)));
  const x = (i: number) => P.l + (i / (n - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const every = Math.ceil(xLabels.length / 6);
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line x1={P.l} x2={W - P.r} y1={y(max * f)} y2={y(max * f)} className="grid" />
            <text x={P.l - 4} y={y(max * f) + 3} textAnchor="end" className="tick">{fmt(max * f)}{unit}</text>
          </g>
        ))}
        {xLabels.map((l, i) => (i % every === 0 || i === xLabels.length - 1 ? <text key={i} x={x(i)} y={H - 6} textAnchor="middle" className="tick">{l}</text> : null))}
        {refLine && (
          <g><line x1={P.l} x2={W - P.r} y1={y(refLine.value)} y2={y(refLine.value)} stroke={refLine.color} strokeDasharray="4 4" />
            <text x={W - P.r} y={y(refLine.value) - 4} textAnchor="end" className="tick" fill={refLine.color}>{refLine.label}</text></g>
        )}
        {series.map((s) => {
          const d = s.points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
          return (
            <g key={s.label}>
              {!s.dashed && <path d={`${d} L${x(s.points.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} fill={s.color} opacity={0.12} className="anim" />}
              <path d={d} fill="none" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dashed ? '6 5' : undefined} className="anim" />
            </g>
          );
        })}
      </svg>
      <Legend series={series} />
    </figure>
  );
}

export function BarChart({ bars, title, unit = '', refLine }: {
  bars: { label: string; value: number; color: string }[];
  title: string;
  unit?: string;
  refLine?: { value: number; label: string; color: string };
}) {
  const max = niceMax(Math.max(refLine?.value ?? 0, ...bars.map((b) => b.value)));
  const bw = (W - P.l - P.r) / bars.length;
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        {[0, 0.5, 1].map((f) => (
          <g key={f}><line x1={P.l} x2={W - P.r} y1={y(max * f)} y2={y(max * f)} className="grid" />
            <text x={P.l - 4} y={y(max * f) + 3} textAnchor="end" className="tick">{fmt(max * f)}{unit}</text></g>
        ))}
        {bars.map((b, i) => (
          <g key={b.label}>
            <rect x={P.l + i * bw + bw * 0.18} y={y(b.value)} width={bw * 0.64} height={Math.max(0, y(0) - y(b.value))} rx="3" fill={b.color} className="anim" />
            <text x={P.l + i * bw + bw / 2} y={H - 6} textAnchor="middle" className="tick">{b.label}</text>
          </g>
        ))}
        {refLine && (
          <g><line x1={P.l} x2={W - P.r} y1={y(refLine.value)} y2={y(refLine.value)} stroke={refLine.color} strokeDasharray="4 4" strokeWidth="1.5" />
            <text x={W - P.r} y={y(refLine.value) - 4} textAnchor="end" className="tick" fill={refLine.color}>{refLine.label}</text></g>
        )}
      </svg>
    </figure>
  );
}

function Legend({ series }: { series: Series[] }) {
  if (series.length < 2) return null;
  return (
    <div className="legend">
      {series.map((s) => <span key={s.label}><i style={{ background: s.color }} />{s.label}</span>)}
    </div>
  );
}

export function fmt(v: number) {
  if (Math.abs(v) >= 1_000_000) return (v / 1_000_000).toFixed(1).replace('.', ',') + ' mio';
  if (Math.abs(v) >= 10_000) return Math.round(v / 1000) + 'k';
  return Math.round(v).toLocaleString('da-DK');
}
