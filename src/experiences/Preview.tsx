import type { Experience } from '../data/experiences';

export default function Preview({ exp }: { exp: Experience }) {
  return (
    <div className="preview">
      <div className="status-box">
        <strong>Status: Preview</strong>
        <p>Denne oplevelse er designet, men endnu ikke bygget. Knapperne herunder er en oversigt over de planlagte funktioner – de er ikke klikbare endnu. Den bygges i fase 3.</p>
      </div>
      <section className="panel">
        <h3>Koncept</h3>
        <p>{exp.concept}</p>
      </section>
      <section className="panel">
        <h3>Planlagte funktioner</h3>
        <ul className="planned">
          {exp.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>
      <section className="panel wow">
        <h3>Wow-øjeblikket</h3>
        <p>{exp.wow}</p>
      </section>
    </div>
  );
}
