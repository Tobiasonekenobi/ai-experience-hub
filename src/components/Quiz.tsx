import { useState } from 'react';

export interface Question { q: string; opts: string[]; a: number; why: string }

/** Ét spørgsmål med tre-fire svar. onDone kaldes én gang med om svaret var rigtigt. */
export function Quiz({ question, onDone }: { question: Question; onDone?: (ok: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const answered = pick !== null;
  return (
    <div className="quiz">
      <p><strong>{question.q}</strong></p>
      <div className="opts">
        {question.opts.map((o, i) => {
          const cls = !answered ? '' : i === question.a ? 'right' : i === pick ? 'wrong' : 'dim';
          return (
            <button key={o} className={`opt ${cls}`} disabled={answered} onClick={() => { setPick(i); onDone?.(i === question.a); }}>
              {o}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`fb ${pick === question.a ? 'ok' : 'no'}`} role="status">
          {pick === question.a ? 'Rigtigt! ' : 'Ikke helt. '}{question.why}
        </p>
      )}
    </div>
  );
}
