import { useState } from 'react';
import { useStored } from '../lib/store';

// Original, fiktiv sag. Alle personer, firmaer og produkter er opdigtede.

interface Ev { id: string; icon: string; title: string; text: string; time?: string; timeLabel?: string }
interface Suspect { id: string; name: string; role: string; talk: { q: string; a: string }[] }
interface Link { a: string; b: string; insight: string }

const EVIDENCE: Ev[] = [
  { id: 'adgang', icon: '🪪', title: 'Adgangslog', text: 'Laboratoriets dør blev åbnet kl. 23:14 med Jonas Holms adgangskort.', time: '23:14', timeLabel: 'Laboratoriet åbnes med Jonas’ kort' },
  { id: 'kamera', icon: '📹', title: 'Kameralog', text: 'Gangkameraet blev slukket kl. 23:10 og tændt igen 23:25. Kommandoen kom fra serverrummet.', time: '23:10', timeLabel: 'Gangkameraet slukkes fra serverrummet' },
  { id: 'server', icon: '🗄️', title: 'Serverrummets adgangsliste', text: 'Kun tre ingeniører har adgang til serverrummet. To af dem har været på ferie hele ugen. Den tredje er Maja Lind.' },
  { id: 'frokost', icon: '🥪', title: 'Jonas’ forklaring', text: '«Jeg opdagede først om aftenen, at mit kort var væk. Sidst jeg havde det, var til frokostmødet med Maja.»', time: '12:30', timeLabel: 'Frokostmøde: Jonas og Maja' },
  { id: 'tog', icon: '🎫', title: 'Togbillet', text: 'Digital togbillet: Ali Rahimi tjekkede ind på stationen kl. 18:04 og ud i Roskilde 18:31.', time: '18:04', timeLabel: 'Ali tager toget hjem' },
  { id: 'sms', icon: '💬', title: 'Sms på Majas telefon', text: 'Fra en kontakt hos konkurrenten Vexa: «Tilbuddet står stadig – hvis du har noget konkret at vise os.»' },
  { id: 'elevator', icon: '🛗', title: 'Natvagtens notat', text: 'Sara Berg noterede: «Elevatoren kørte til 3. sal kl. 23:20.» 3. sal er ingeniørernes etage.', time: '23:20', timeLabel: 'Elevatoren kører til 3. sal' },
];

const SUSPECTS: Suspect[] = [
  { id: 'maja', name: 'Maja Lind', role: 'Ingeniør', talk: [
    { q: 'Hvor var du i aftes?', a: '«Hjemme. Jeg gik vist ved 17-tiden.»' },
    { q: 'Kender du nogen hos Vexa?', a: '«Nogle stykker – branchen er lille. Hvorfor spørger du?»' },
  ] },
  { id: 'jonas', name: 'Jonas Holm', role: 'Salgschef', talk: [
    { q: 'Dit kort blev brugt kl. 23:14.', a: '«Det var ikke mig! Jeg meldte det bortkommet i morges.»' },
    { q: 'Hvad lavede du i aftes?', a: '«Jeg var til min datters håndboldkamp til kl. 22.»' },
  ] },
  { id: 'sara', name: 'Sara Berg', role: 'Natvagt', talk: [
    { q: 'Så du noget usædvanligt?', a: '«Kun elevatoren, der kørte op 23:20. Jeg tænkte, nogen havde glemt noget.»' },
    { q: 'Hvorfor tjekkede du ikke?', a: '«Kameraet i gangen viste ingenting, så jeg troede, det var en fejl.»' },
  ] },
  { id: 'ali', name: 'Ali Rahimi', role: 'Praktikant', talk: [
    { q: 'Hvornår gik du hjem?', a: '«Lidt før seks. Jeg skulle nå toget til Roskilde.»' },
    { q: 'Havde du adgang til prototypen?', a: '«Kun når en ingeniør var med. Jeg har ikke eget kort til laboratoriet.»' },
  ] },
];

const LINKS: Link[] = [
  { a: 'adgang', b: 'frokost', insight: 'Jonas’ kort blev brugt om natten – men han mistede det til frokost med Maja.' },
  { a: 'kamera', b: 'server', insight: 'Kameraet blev slukket fra serverrummet, og den eneste med adgang, der var på arbejde, er Maja.' },
  { a: 'sms', b: 'elevator', insight: 'Motiv og spor: Maja havde et tilbud fra Vexa, og elevatoren kørte til hendes etage.' },
  { a: 'tog', b: 'adgang', insight: 'Ali var i Roskilde, da døren blev åbnet – han kan udelukkes.' },
];

const CULPRIT = 'maja';
const keyOf = (a: string, b: string) => [a, b].sort().join('+');

export default function Detective() {
  const [seen, setSeen] = useStored<string[]>('det_seen', []);
  const [found, setFound] = useStored<string[]>('det_links', []);
  const [sel, setSel] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [tab, setTab] = useState<'beviser' | 'afhoering' | 'tidslinje'>('beviser');
  const [talkTo, setTalkTo] = useState('maja');
  const [asked, setAsked] = useState<string[]>([]);
  const [accused, setAccused] = useState<string | null>(null);

  const pick = (id: string) => {
    setMsg(null);
    if (!seen.includes(id)) { setSeen([...seen, id]); return; } // første tryk: læs beviset
    if (sel.includes(id)) { setSel(sel.filter((x) => x !== id)); return; }
    const next = [...sel, id];
    if (next.length < 2) { setSel(next); return; }
    setSel([]);
    const link = LINKS.find((l) => keyOf(l.a, l.b) === keyOf(next[0], next[1]));
    if (!link) { setMsg({ ok: false, text: 'Ingen tydelig forbindelse mellem de to. Prøv en anden kombination.' }); return; }
    const k = keyOf(link.a, link.b);
    if (!found.includes(k)) setFound([...found, k]);
    setMsg({ ok: true, text: link.insight });
  };

  const accuse = (id: string) => setAccused(id);
  const strong = found.filter((k) => k !== keyOf('tog', 'adgang')).length;
  const timeline = EVIDENCE.filter((e) => e.time && seen.includes(e.id)).sort((a, b) => a.time!.localeCompare(b.time!));
  const reset = () => { setSeen([]); setFound([]); setSel([]); setMsg(null); setAccused(null); setAsked([]); };

  return (
    <div className="det">
      <div className="demo-note">Original fiktiv sag · alle personer og firmaer er opdigtede</div>

      <section className="det-file">
        <span className="det-stamp">Sagsmappe #07</span>
        <h3>The Vanishing Prototype</h3>
        <p>Natten før lanceringen forsvandt prototypen <b>Aurora</b> – et par smarte briller – fra laboratoriet hos Helix Labs. Ingen tegn på indbrud. Find ud af, hvem der tog den.</p>
        <div className="det-prog"><span>Beviser undersøgt <b>{seen.length}/{EVIDENCE.length}</b></span><span>Forbindelser <b>{found.length}/{LINKS.length}</b></span></div>
      </section>

      <div className="seg" role="tablist" aria-label="Efterforskning">
        <button role="tab" aria-selected={tab === 'beviser'} className={tab === 'beviser' ? 'on' : ''} onClick={() => setTab('beviser')}>Bevisbræt</button>
        <button role="tab" aria-selected={tab === 'afhoering'} className={tab === 'afhoering' ? 'on' : ''} onClick={() => setTab('afhoering')}>Afhøringer</button>
        <button role="tab" aria-selected={tab === 'tidslinje'} className={tab === 'tidslinje' ? 'on' : ''} onClick={() => setTab('tidslinje')}>Tidslinje</button>
      </div>

      {tab === 'beviser' && (
        <>
          <p className="muted small">Tryk på et bevis for at undersøge det. Tryk derefter på to undersøgte beviser for at forbinde dem.</p>
          <div className="det-board">
            {EVIDENCE.map((e) => (
              <button key={e.id} className={`det-card ${sel.includes(e.id) ? 'sel' : ''} ${seen.includes(e.id) ? 'seen' : ''}`} onClick={() => pick(e.id)} aria-pressed={sel.includes(e.id)}>
                <span className="det-pin" aria-hidden="true" />
                <b><span aria-hidden="true">{e.icon}</span> {e.title}</b>
                {seen.includes(e.id) ? <small>{e.text}</small> : <small className="muted">Ikke undersøgt</small>}
              </button>
            ))}
          </div>
          {msg && <div className={`help-box arrive ${msg.ok ? 'det-ok' : ''}`} role="status">{msg.ok ? '🔗 Ny forbindelse: ' : ''}{msg.text}</div>}
          {found.length > 0 && (
            <section className="panel">
              <h3>Fundne forbindelser</h3>
              <ul className="det-links">{LINKS.filter((l) => found.includes(keyOf(l.a, l.b))).map((l) => <li key={l.a + l.b}>{l.insight}</li>)}</ul>
            </section>
          )}
        </>
      )}

      {tab === 'afhoering' && (
        <section className="panel">
          <div className="chips" role="group" aria-label="Vælg person">
            {SUSPECTS.map((s) => <button key={s.id} className={`chip ${talkTo === s.id ? 'on' : ''}`} onClick={() => setTalkTo(s.id)}>{s.name} <span>{s.role}</span></button>)}
          </div>
          {SUSPECTS.filter((s) => s.id === talkTo).map((s) => (
            <div key={s.id} className="det-talk">
              {s.talk.map((t, i) => {
                const k = s.id + i;
                return asked.includes(k)
                  ? <div key={k} className="det-qa arrive"><p className="det-q">{t.q}</p><p className="det-a">{t.a}</p></div>
                  : <button key={k} className="opt" onClick={() => setAsked((a) => [...a, k])}>Spørg: {t.q}</button>;
              })}
            </div>
          ))}
        </section>
      )}

      {tab === 'tidslinje' && (
        <section className="panel">
          <h3>Tidslinje</h3>
          {timeline.length === 0 ? <p className="muted">Undersøg beviser med et tidspunkt for at bygge tidslinjen.</p> : (
            <ol className="miles">{timeline.map((e) => <li key={e.id} className="done"><span className="dot" /><span>{e.timeLabel}</span><em>{e.time}</em></li>)}</ol>
          )}
        </section>
      )}

      <section className="panel">
        <h3>Fremsæt din teori</h3>
        {!accused && <p className="muted small">Hvem tog prototypen? Jo flere forbindelser du har fundet, jo stærkere står din sag.</p>}
        <div className="chips">
          {SUSPECTS.map((s) => <button key={s.id} className={`chip ${accused === s.id ? 'on' : ''}`} onClick={() => accuse(s.id)}>{s.name}</button>)}
        </div>
        {accused && (accused === CULPRIT ? (
          strong >= 2
            ? <div className="help-box det-ok arrive"><strong>Sagen er opklaret!</strong> Maja lånte Jonas’ kort ved frokosten, slukkede kameraet fra serverrummet og tog prototypen for at vise den til Vexa. Dine {strong} forbindelser holder i retten.</div>
            : <div className="help-box arrive"><strong>Rigtigt gæt – men for tynde beviser.</strong> Find mindst to forbindelser, der peger på hende, før sagen holder.</div>
        ) : (
          <div className="help-box arrive"><strong>Det holder ikke.</strong> {accused === 'ali' ? 'Togbilletten viser, at Ali var i Roskilde.' : accused === 'jonas' ? 'Jonas havde mistet sit kort – hvem var sammen med ham, da det forsvandt?' : 'Sara så elevatoren, men har ikke adgang til serverrummet.'}</div>
        ))}
      </section>

      <button className="btn ghost" onClick={reset}>Start sagen forfra</button>
    </div>
  );
}
