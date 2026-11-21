import { CONTACT, FAQ, SERVICES, STEPS, USE_CASES } from '../data/business';
import { expById } from '../data/experiences';
import { Cover } from './Cover';

export function ContactButton({ subject = 'Jeg vil gerne have bygget noget', className = 'btn lg' }: { subject?: string; className?: string }) {
  if (!CONTACT.email) return <span className="build-soon">Kontaktoplysninger kommer snart</span>;
  return <a className={className} href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`}>Skriv og hør mere</a>;
}

/** Boks under hver oplevelse: hvad en virksomhed kunne bruge den til. */
export function UseCase({ id }: { id: string }) {
  const u = USE_CASES[id];
  if (!u) return null;
  return (
    <section className="usecase">
      <span className="eyebrow">Til din virksomhed</span>
      <h3>{u.title}</h3>
      <p>{u.text}</p>
      <a href="#/byg" className="btn sm">Få bygget noget lignende →</a>
    </section>
  );
}

export function BuildPage() {
  return (
    <section className="section build">
      <div className="build-hero">
        <span className="eyebrow">Få bygget din egen</span>
        <h1>Alt du har klikket rundt i her, kan bygges til din virksomhed</h1>
        <p>Dashboards, læringsforløb, kampagnespil og produktvisninger – interaktive oplevelser, der virker på mobil og computer.</p>
        <div className="btn-row"><ContactButton /><a href="#/udforsk" className="btn ghost lg">Se eksemplerne</a></div>
      </div>

      <h2 className="h-sec">Hvad kan bygges?</h2>
      <div className="build-services">
        {SERVICES.map((s) => (
          <article key={s.title} className="build-service">
            <span className="build-icon" aria-hidden="true">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="build-ex">
              {s.ex.map((id) => {
                const e = expById(id)!;
                return (
                  <a key={id} href={`#/x/${id}`} className="build-ex-item">
                    <Cover id={id} universe={e.universe} />
                    <span>{e.title}</span>
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <h2 className="h-sec">Sådan foregår det</h2>
      <ol className="build-steps">
        {STEPS.map((s, i) => <li key={s.title}><b>{i + 1}</b><div><h3>{s.title}</h3><p>{s.text}</p></div></li>)}
      </ol>

      <h2 className="h-sec">Spørgsmål</h2>
      <div className="build-faq">
        {FAQ.map((f) => <details key={f.q} className="panel"><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div>

      <div className="build-cta">
        <h2>Har du en idé?</h2>
        <p>Den behøver ikke være færdigtænkt. Fortæl hvad du vil opnå, så finder vi ud af, hvad der giver mening.</p>
        <ContactButton />
      </div>
    </section>
  );
}
