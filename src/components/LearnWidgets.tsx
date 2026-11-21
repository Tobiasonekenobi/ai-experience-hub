import { useMemo, useState } from 'react';

// Interaktive værktøjer til læringsmodulerne. Tal og opdelinger er forenklede og mærket som sådan.

/* ---------- Næste ord: sådan vælger en sprogmodel ---------- */
type Opt = [string, number];
const NEXT: Record<string, Opt[]> = {
  '': [['kaffe', 0.46], ['te', 0.3], ['varm kakao', 0.12], ['vand', 0.08], ['suppe', 0.04]],
  kaffe: [['om morgenen', 0.38], ['med mælk', 0.27], ['hver dag', 0.2], ['på arbejdet', 0.15]],
  te: [['før jeg sover', 0.35], ['med honning', 0.3], ['når det regner', 0.2], ['om morgenen', 0.15]],
  _: [['om morgenen', 0.4], ['i pausen', 0.3], ['hver dag', 0.3]],
};

export function NextWord() {
  const [picked, setPicked] = useState<string[]>([]);
  const [temp, setTemp] = useState(1);
  const key = picked.length === 0 ? '' : picked.length === 1 ? (NEXT[picked[0]] ? picked[0] : '_') : null;
  const opts = key === null ? [] : NEXT[key];
  const probs = useMemo(() => {
    const ex = opts.map(([, p]) => Math.exp(Math.log(p) / temp));
    const s = ex.reduce((a, b) => a + b, 0);
    return ex.map((x) => x / s);
  }, [opts, temp]);
  const sample = () => {
    let r = Math.random(), i = 0;
    while (i < probs.length - 1 && r > probs[i]) { r -= probs[i]; i++; }
    setPicked((p) => [...p, opts[i][0]]);
  };
  return (
    <div className="lw">
      <div className="lw-head"><b>Prøv: vær sprogmodellen</b><small>Forenklet eksempel · tallene er illustrative</small></div>
      <p className="lw-sentence">Jeg drikker en kop {picked.map((w) => <mark key={w}>{w}</mark>)}{key === null ? '.' : <span className="lw-cursor">▍</span>}</p>
      {key !== null && (
        <>
          <ul className="lw-bars">
            {opts.map(([w], i) => (
              <li key={w}><button onClick={() => setPicked((p) => [...p, w])}>{w}</button><span><i style={{ width: `${probs[i] * 100}%` }} /></span><b>{Math.round(probs[i] * 100)}%</b></li>
            ))}
          </ul>
          <label className="slider"><span>Temperatur (tilfældighed) <b>{temp.toFixed(1)}</b></span>
            <input type="range" min={0.2} max={2} step={0.1} value={temp} onChange={(e) => setTemp(+e.target.value)} />
          </label>
          <div className="btn-row"><button className="btn sm" onClick={sample}>🎲 Lad modellen vælge</button></div>
          <p className="muted small">Lav temperatur: modellen vælger næsten altid det mest sandsynlige. Høj temperatur: mere overraskende ord.</p>
        </>
      )}
      {key === null && <div className="btn-row"><button className="btn ghost sm" onClick={() => setPicked([])}>Start forfra</button></div>}
    </div>
  );
}

/* ---------- Prompt-byggeren ---------- */
const PARTS = [
  { id: 'rolle', label: 'Rolle', text: 'Du er en erfaren tekstforfatter for små, lokale butikker.', guess: 'hvilken stemme og ekspertise svaret skal have' },
  { id: 'kontekst', label: 'Kontekst', text: 'Butikken er en cykelforretning. Kunderne er mest børnefamilier. Udsalget er 20 % på alle børnecykler i den første uge af april.', guess: 'hvad butikken sælger, til hvem og hvad tilbuddet er' },
  { id: 'format', label: 'Format', text: 'Max 80 ord, højst 2 emojis, og afslut med en opfordring til at kigge forbi.', guess: 'længde, opbygning og afslutning' },
  { id: 'tone', label: 'Tone', text: 'Tonen skal være venlig og jordnær – ikke sælgende.', guess: 'hvordan det skal lyde' },
  { id: 'eksempel', label: 'Eksempel', text: 'Her er et tidligere opslag, vi var glade for: «Solen er tilbage, og det samme er cykelhjelmene i alle farver ☀️ Kig ind og find jeres favorit!»', guess: 'hvilken stil du kan lide' },
  { id: 'spoerg', label: 'Lad den spørge', text: 'Stil mig spørgsmål, hvis du mangler noget, før du skriver.', guess: 'om den må gætte, eller skal spørge' },
];

export function PromptBuilder() {
  const [on, setOn] = useState<string[]>([]);
  const prompt = ['Skriv et Facebook-opslag om forårsudsalg.', ...PARTS.filter((p) => on.includes(p.id)).map((p) => p.text)].join(' ');
  const missing = PARTS.filter((p) => !on.includes(p.id));
  const score = Math.round((on.length / PARTS.length) * 100);
  return (
    <div className="lw">
      <div className="lw-head"><b>Prøv: byg en prompt</b><small>Fiktiv butik · tryk på byggestenene</small></div>
      <div className="chips">
        {PARTS.map((p) => <button key={p.id} className={`chip ${on.includes(p.id) ? 'on' : ''}`} aria-pressed={on.includes(p.id)} onClick={() => setOn((o) => (o.includes(p.id) ? o.filter((x) => x !== p.id) : [...o, p.id]))}>{on.includes(p.id) ? '✓ ' : '+ '}{p.label}</button>)}
      </div>
      <div className="learn-prompt">{prompt}</div>
      <div className="lw-meter"><span>Hvor præcis er prompten?</span><span className="lw-track"><i style={{ width: `${Math.max(8, score)}%`, background: score > 66 ? 'var(--good)' : score > 33 ? 'var(--gold)' : 'var(--bad)' }} /></span></div>
      {missing.length > 0
        ? <p className="small muted"><b>AI’en skal selv gætte:</b> {missing.map((m) => m.guess).join(' · ')}.</p>
        : <p className="small" style={{ color: 'var(--good)' }}>Flot – AI’en har alt, hvad den skal bruge.</p>}
    </div>
  );
}

/* ---------- Tokens og kontekstvindue ---------- */
function roughTokens(text: string) {
  const out: string[] = [];
  for (const w of text.match(/\s*[\p{L}\p{N}]+|\s*[^\s\p{L}\p{N}]/gu) ?? []) {
    const core = w.trimStart();
    if (core.length <= 6) { out.push(w); continue; }
    const lead = w.slice(0, w.length - core.length);
    for (let i = 0; i < core.length; i += 4) out.push((i === 0 ? lead : '') + core.slice(i, i + 4));
  }
  return out;
}

export function TokenView() {
  const [text, setText] = useState('Fodboldtræningen er rykket til torsdag aften, så husk madpakke og vandflaske!');
  const [msgs, setMsgs] = useState(40);
  const toks = roughTokens(text);
  const WINDOW = 200_000, PER_MSG = 600;
  const used = msgs * PER_MSG;
  const pct = Math.min(100, (used / WINDOW) * 100);
  return (
    <div className="lw">
      <div className="lw-head"><b>Prøv: se teksten som tokens</b><small>Omtrentlig opdeling · rigtige tokenizere deler anderledes</small></div>
      <textarea className="learn-textarea" rows={2} value={text} onChange={(e) => setText(e.target.value)} aria-label="Skriv en tekst" />
      <p className="lw-tokens">{toks.map((t, i) => <span key={i} className={`c${i % 5}`}>{t.replace(/ /g, '·')}</span>)}</p>
      <p className="small muted">{text.length} tegn → ca. {toks.length} tokens. Lange, sammensatte danske ord bliver ofte til flere tokens.</p>
      <h4>Kontekstvinduet fyldes op</h4>
      <label className="slider"><span>Beskeder i samtalen <b>{msgs}</b></span>
        <input type="range" min={1} max={450} value={msgs} onChange={(e) => setMsgs(+e.target.value)} />
      </label>
      <div className="lw-window"><i style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--bad)' : pct > 75 ? 'var(--gold)' : 'var(--cyan)' }} /></div>
      <p className="small muted">Eksempel: et vindue på 200.000 tokens og ca. 600 tokens pr. besked. Størrelsen varierer mellem modeller. {pct >= 100 ? <b style={{ color: 'var(--bad)' }}>Fyldt – de ældste dele skæres fra eller opsummeres.</b> : `Brugt: ${Math.round(pct)} %.`}</p>
    </div>
  );
}

/* ---------- Tjek selv eller fint at bruge? ---------- */
const CLAIMS = [
  { t: 'En forklaring på forskellen mellem RAM og harddisk.', check: false, why: 'Generel, velkendt viden, som er let at forklare korrekt.' },
  { t: '«En undersøgelse fra 2019 viser, at 37 % af danskerne …» – uden link.', check: true, why: 'Præcist tal + kilde uden link er klassisk hallucinationsrisiko.' },
  { t: 'Fem idéer til navne på din podcast.', check: false, why: 'Kreativt indhold – der er ingen fakta, der kan være forkerte.' },
  { t: 'Et ordret citat fra side 214 i en bestemt bog.', check: true, why: 'Ordrette citater og sidetal bliver ofte opfundet.' },
  { t: '«Butikken på hjørnet har åbent til kl. 20 i dag.»', check: true, why: 'Lokale og aktuelle oplysninger kan modellen ikke vide uden søgning.' },
  { t: 'En omskrivning af din egen mail, så den lyder venligere.', check: false, why: 'AI’en arbejder med din tekst – men læs den igennem før du sender.' },
];

export function FactCheck() {
  const [ans, setAns] = useState<Record<number, boolean>>({});
  const n = Object.keys(ans).length;
  const right = CLAIMS.filter((c, i) => ans[i] === c.check).length;
  return (
    <div className="lw">
      <div className="lw-head"><b>Prøv: hvad skal du tjekke?</b><small>{n}/{CLAIMS.length} besvaret{n === CLAIMS.length ? ` · ${right} rigtige` : ''}</small></div>
      <ul className="lw-claims">
        {CLAIMS.map((c, i) => {
          const a = ans[i];
          return (
            <li key={i} className={a === undefined ? '' : a === c.check ? 'ok' : 'no'}>
              <p>{c.t}</p>
              {a === undefined ? (
                <div className="btn-row" style={{ marginTop: 6 }}>
                  <button className="btn ghost sm" onClick={() => setAns({ ...ans, [i]: false })}>👍 Fint at bruge</button>
                  <button className="btn ghost sm" onClick={() => setAns({ ...ans, [i]: true })}>🔍 Tjek selv</button>
                </div>
              ) : <small>{a === c.check ? '✓ ' : '✗ '}{c.check ? 'Tjek selv' : 'Fint at bruge'}: {c.why}</small>}
            </li>
          );
        })}
      </ul>
      {n > 0 && <button className="btn ghost sm" onClick={() => setAns({})}>Prøv igen</button>}
    </div>
  );
}

export const WIDGETS = { nextword: NextWord, promptbuilder: PromptBuilder, tokens: TokenView, factcheck: FactCheck };
export type WidgetId = keyof typeof WIDGETS;
