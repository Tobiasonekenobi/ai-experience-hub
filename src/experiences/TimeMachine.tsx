import { useState } from 'react';
import { useStored } from '../lib/store';

type Cat = 'teknologi' | 'videnskab' | 'kultur' | 'samfund';
interface Era { id: string; name: string; span: string; mood: string; bg: string; accent: string; icon: string }
interface Ev { id: string; year: number; label: string; title: string; text: string; cat: Cat; era: string }

const ERAS: Era[] = [
  { id: 'oldtid', name: 'Oldtiden', span: 'ca. 3200 f.Kr. – 500 e.Kr.', mood: 'Skrift, byer og de første imperier.', bg: 'linear-gradient(160deg,#3a2614,#1a1208 60%,#0B1020)', accent: '#F0C36A', icon: '𓂀' },
  { id: 'middel', name: 'Middelalderen', span: 'ca. 500 – 1450', mood: 'Klostre, riddere og vikingetogter.', bg: 'linear-gradient(160deg,#2b1f33,#14101c 60%,#0B1020)', accent: '#C9A2FF', icon: '⚔' },
  { id: 'renaes', name: 'Renæssance & opdagelser', span: 'ca. 1450 – 1750', mood: 'Bogtryk, nye kort og et nyt verdensbillede.', bg: 'linear-gradient(160deg,#1f3326,#0f1a14 60%,#0B1020)', accent: '#7BE0A6', icon: '✒' },
  { id: 'industri', name: 'Industrialiseringen', span: 'ca. 1750 – 1900', mood: 'Damp, fabrikker og jernbaner.', bg: 'linear-gradient(160deg,#33281f,#1a1410 60%,#0B1020)', accent: '#F28A3C', icon: '⚙' },
  { id: '1900', name: '1900-tallet', span: '1900 – 1990', mood: 'Fly, medicin og rumkapløbet.', bg: 'linear-gradient(160deg,#1b2a40,#0e1626 60%,#0B1020)', accent: '#4DD9E8', icon: '✈' },
  { id: 'net', name: 'Internettets tid', span: '1990 – i dag', mood: 'Nettet, smartphones og kunstig intelligens.', bg: 'linear-gradient(160deg,#2a1f4a,#120e26 60%,#0B1020)', accent: '#9B7CFF', icon: '◎' },
];

const e = (id: string, year: number, label: string, title: string, text: string, cat: Cat, era: string): Ev => ({ id, year, label, title, text, cat, era });

const EVENTS: Ev[] = [
  e('skrift', -3200, 'ca. 3200 f.Kr.', 'Kileskrift i Mesopotamien', 'Sumererne begynder at trykke tegn i lerplader – et af verdens ældste skriftsystemer. Først bruges det mest til regnskab.', 'kultur', 'oldtid'),
  e('pyramide', -2560, 'ca. 2560 f.Kr.', 'Den Store Pyramide i Giza', 'Pyramiden bygges til farao Khufu og var i flere tusind år det højeste menneskeskabte bygværk.', 'teknologi', 'oldtid'),
  e('ol', -776, '776 f.Kr.', 'De første kendte olympiske lege', 'Ifølge græsk tradition afholdes de første olympiske lege i Olympia dette år.', 'kultur', 'oldtid'),
  e('papir', 105, 'ca. 105', 'Papir forbedres i Kina', 'Hofembedsmanden Cai Lun tilskrives at have forbedret fremstillingen af papir af bark, hamp og klude.', 'teknologi', 'oldtid'),
  e('lindisfarne', 793, '793', 'Vikinger angriber Lindisfarne', 'Angrebet på klostret på den engelske ø regnes ofte som starten på vikingetiden.', 'samfund', 'middel'),
  e('hastings', 1066, '1066', 'Slaget ved Hastings', 'Vilhelm Erobreren besejrer den engelske kong Harold, og normannerne overtager England.', 'samfund', 'middel'),
  e('tryk', 1450, 'ca. 1450', 'Gutenbergs trykpresse', 'Bogtryk med løse metaltyper gør bøger langt billigere og spreder viden hurtigere i Europa.', 'teknologi', 'renaes'),
  e('columbus', 1492, '1492', 'Columbus når Amerika', 'Christoffer Columbus’ ekspedition når Caribien og indleder varig kontakt mellem Europa og Amerika.', 'samfund', 'renaes'),
  e('kopernikus', 1543, '1543', 'Kopernikus flytter Solen i centrum', 'Nicolaus Kopernikus udgiver sin model, hvor Jorden og planeterne kredser om Solen.', 'videnskab', 'renaes'),
  e('newton', 1687, '1687', 'Newtons Principia', 'Isaac Newton beskriver bevægelseslovene og tyngdeloven i ét samlet værk.', 'videnskab', 'renaes'),
  e('damp', 1769, '1769', 'Watts dampmaskine patenteres', 'James Watt patenterer en mere effektiv dampmaskine, som bliver central for industrialiseringen.', 'teknologi', 'industri'),
  e('telefon', 1876, '1876', 'Telefonen patenteres', 'Alexander Graham Bell får patent på telefonen – stemmer kan nu sendes gennem ledninger.', 'teknologi', 'industri'),
  e('wright', 1903, '1903', 'Det første motorfly', 'Brødrene Wright gennemfører en kort, styret flyvning med et motordrevet fly i North Carolina.', 'teknologi', '1900'),
  e('penicillin', 1928, '1928', 'Penicillin opdages', 'Alexander Fleming opdager, at en skimmelsvamp dræber bakterier. Det fører senere til antibiotika.', 'videnskab', '1900'),
  e('maane', 1969, '1969', 'Mennesker på Månen', 'Med Apollo 11 bliver Neil Armstrong og Buzz Aldrin de første mennesker, der går på Månen.', 'videnskab', '1900'),
  e('www', 1989, '1989', 'World Wide Web foreslås', 'Tim Berners-Lee foreslår på CERN et system af sammenkædede dokumenter – starten på webben.', 'teknologi', '1900'),
  e('iphone', 2007, '2007', 'Smartphonen slår igennem', 'Apple præsenterer den første iPhone, og touchskærm-telefoner bliver hurtigt hverdag.', 'teknologi', 'net'),
  e('chatgpt', 2022, '2022', 'ChatGPT lanceres', 'OpenAI gør ChatGPT offentligt tilgængelig, og sprogmodeller bliver kendt af millioner.', 'teknologi', 'net'),
];

const CATS: { id: Cat; label: string }[] = [
  { id: 'teknologi', label: 'Teknologi' }, { id: 'videnskab', label: 'Videnskab' }, { id: 'kultur', label: 'Kultur' }, { id: 'samfund', label: 'Samfund' },
];

export default function TimeMachine() {
  const [pos, setPos] = useState(400); // 0–599: én enhed pr. 1/100 periode
  const [cats, setCats] = useState<Cat[]>(CATS.map((c) => c.id));
  const [open, setOpen] = useState<string | null>(null);
  const [favs, setFavs] = useStored<string[]>('tm_favs', []);
  const [compare, setCompare] = useState<[string, string] | null>(null);

  const eraIdx = Math.min(ERAS.length - 1, Math.floor(pos / 100));
  const era = ERAS[eraIdx];
  const list = EVENTS.filter((x) => x.era === era.id && cats.includes(x.cat));
  const ev = EVENTS.find((x) => x.id === open);
  const toggleCat = (c: Cat) => setCats((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  const toggleFav = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const jump = (i: number) => { setPos(i * 100 + 50); setOpen(null); };

  return (
    <div className="tm">
      <div className="demo-note">Rigtige historiske begivenheder · årstal med «ca.» er omtrentlige</div>

      <div className="tm-stage" style={{ background: era.bg, ['--a' as string]: era.accent }} key={era.id}>
        <span className="tm-icon" aria-hidden="true">{era.icon}</span>
        <div className="tm-era">
          <small>{era.span}</small>
          <h2>{era.name}</h2>
          <p>{era.mood}</p>
        </div>
      </div>

      <label className="slider tm-slider">
        <span>Træk gennem tiden <b>{era.name}</b></span>
        <input type="range" min={0} max={599} value={pos} onChange={(e) => { setPos(+e.target.value); setOpen(null); }} aria-valuetext={era.name} style={{ ['--a' as string]: era.accent }} />
      </label>
      <div className="chips scroll" role="group" aria-label="Vælg periode">
        {ERAS.map((x, i) => <button key={x.id} className={`chip ${i === eraIdx ? 'on' : ''}`} onClick={() => jump(i)}>{x.name}</button>)}
      </div>

      <div className="chips" role="group" aria-label="Emnefiltre">
        {CATS.map((c) => <button key={c.id} className={`chip ${cats.includes(c.id) ? 'on' : ''}`} aria-pressed={cats.includes(c.id)} onClick={() => toggleCat(c.id)}>{c.label}</button>)}
      </div>

      <div className="tm-events">
        {list.map((x) => (
          <button key={x.id} className={`tm-ev ${open === x.id ? 'on' : ''}`} style={{ ['--a' as string]: era.accent }} onClick={() => setOpen(open === x.id ? null : x.id)} aria-expanded={open === x.id}>
            <b>{x.label}</b><span>{x.title}</span>{favs.includes(x.id) && <i aria-label="favorit">♥</i>}
          </button>
        ))}
        {list.length === 0 && <div className="empty-box">Ingen begivenheder med de valgte emner i denne periode.</div>}
      </div>

      {ev && (
        <section className="panel arrive" style={{ borderColor: era.accent }}>
          <div className="row-between"><h3>{ev.title}</h3><span className="muted small">{ev.label} · {CATS.find((c) => c.id === ev.cat)!.label}</span></div>
          <p>{ev.text}</p>
          <button className={`btn ghost sm ${favs.includes(ev.id) ? 'fav-on' : ''}`} onClick={() => toggleFav(ev.id)} aria-pressed={favs.includes(ev.id)}>{favs.includes(ev.id) ? '♥ Favorit' : '♡ Gem som favorit'}</button>
        </section>
      )}

      <section className="panel">
        <div className="row-between">
          <h3>Sammenlign perioder</h3>
          {!compare && <button className="btn ghost sm" onClick={() => setCompare([era.id, ERAS[Math.min(ERAS.length - 1, eraIdx + 1 === ERAS.length ? 0 : eraIdx + 1)].id])}>Sammenlign</button>}
          {compare && <button className="btn ghost sm" onClick={() => setCompare(null)}>Luk</button>}
        </div>
        {compare && (
          <div className="tm-cmp">
            {compare.map((id, side) => {
              const x = ERAS.find((r) => r.id === id)!;
              const evs = EVENTS.filter((v) => v.era === id);
              return (
                <div key={side} className="tm-cmp-col" style={{ ['--a' as string]: x.accent }}>
                  <select value={id} onChange={(ev) => setCompare((c) => { const n = [...c!] as [string, string]; n[side] = ev.target.value; return n; })} aria-label={`Periode ${side + 1}`}>
                    {ERAS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                  <small>{x.span}</small>
                  <p>{x.mood}</p>
                  <ul>{CATS.map((c) => <li key={c.id}><span>{c.label}</span><b>{evs.filter((v) => v.cat === c.id).length}</b></li>)}</ul>
                </div>
              );
            })}
          </div>
        )}
        {!compare && <p className="muted small">Se to perioder side om side: tidsrum, stemning og hvor mange begivenheder der er inden for hvert emne.</p>}
      </section>

      {favs.length > 0 && (
        <section className="panel">
          <h3>Dine favoritter</h3>
          <div className="chips">
            {EVENTS.filter((x) => favs.includes(x.id)).map((x) => (
              <button key={x.id} className="chip" onClick={() => { jump(ERAS.findIndex((r) => r.id === x.era)); setOpen(x.id); }}>{x.label} · {x.title}</button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
