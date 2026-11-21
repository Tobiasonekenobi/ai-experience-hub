import type { Experience } from '../data/experiences';
import { universeById } from '../data/experiences';
import { Cover } from './Cover';

export function StatusBadge({ status }: { status: Experience['status'] }) {
  return status === 'demo'
    ? <span className="badge live">● Interaktiv demo</span>
    : <span className="badge soon">Preview · bygges senere</span>;
}

export function Card({ exp, fav, onFav, compact = false }: {
  exp: Experience;
  fav: boolean;
  onFav: (id: string) => void;
  compact?: boolean;
}) {
  const u = universeById(exp.universe);
  return (
    <article className={`card ${compact ? 'compact' : ''}`}>
      <a href={`#/x/${exp.id}`} className="card-cover" aria-label={`Åbn ${exp.title}`}>
        <Cover id={exp.id} universe={exp.universe} />
        <span className="card-nr">{String(exp.nr).padStart(2, '0')}</span>
      </a>
      <button
        className={`fav ${fav ? 'on' : ''}`}
        onClick={() => onFav(exp.id)}
        aria-pressed={fav}
        aria-label={fav ? `Fjern ${exp.title} fra gemte` : `Gem ${exp.title}`}
      >
        {fav ? '♥' : '♡'}
      </button>
      <div className="card-body">
        <span className="uni" style={{ color: u.color }}>{u.name}</span>
        <h3>{exp.title}</h3>
        {!compact && <p>{exp.short}</p>}
        <div className="card-foot">
          <StatusBadge status={exp.status} />
          <a className="btn sm" href={`#/x/${exp.id}`}>Oplev nu</a>
        </div>
      </div>
    </article>
  );
}
