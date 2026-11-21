import { useRef, useState } from 'react';

// Produkterne vises som forenklede lag (CSS 3D). Delene og deres funktion er beskrevet generelt.

interface Part { name: string; w: number; h: number; color: string; text: string }
interface Product { id: string; name: string; icon: string; parts: Part[] }

const PRODUCTS: Product[] = [
  {
    id: 'pc', name: 'Gaming-pc', icon: '🖥️', parts: [
      { name: 'Kabinet', w: 200, h: 200, color: '#2a3550', text: 'Rammen der holder det hele, styrer luftstrømmen og beskytter komponenterne.' },
      { name: 'Strømforsyning', w: 120, h: 70, color: '#3d4560', text: 'Omdanner vekselstrøm fra stikkontakten til de jævnspændinger, komponenterne bruger.' },
      { name: 'Bundkort', w: 170, h: 170, color: '#1f6b52', text: 'Hovedprintpladen, som forbinder processor, hukommelse, grafikkort og lager.' },
      { name: 'Processor (CPU)', w: 46, h: 46, color: '#b8c2d6', text: 'Computerens generelle regnemotor, der udfører programmernes instruktioner.' },
      { name: 'RAM', w: 90, h: 34, color: '#7a5cff', text: 'Arbejdshukommelse: hurtig, midlertidig plads til data, der bruges lige nu.' },
      { name: 'Grafikkort (GPU)', w: 170, h: 58, color: '#F28A3C', text: 'Specialiseret i mange beregninger på én gang – tegner spillets billeder.' },
      { name: 'CPU-køler', w: 70, h: 70, color: '#4DD9E8', text: 'Køleplade og blæser, der leder varmen væk fra processoren.' },
      { name: 'Glaspanel', w: 200, h: 200, color: 'rgba(155,124,255,.25)', text: 'Gennemsigtigt sidepanel, så man kan se komponenterne og lyset indeni.' },
    ],
  },
  {
    id: 'kamera', name: 'Kamera', icon: '📷', parts: [
      { name: 'Batteri', w: 110, h: 50, color: '#3d4560', text: 'Genopladeligt batteri, der forsyner sensor, processor og skærm med strøm.' },
      { name: 'Hovedprintkort', w: 170, h: 110, color: '#1f6b52', text: 'Rummer billedprocessoren, der omdanner sensorens signaler til et billede.' },
      { name: 'Billedsensor', w: 80, h: 60, color: '#9B7CFF', text: 'Millioner af lysfølsomme punkter (pixels), der måler lyset fra objektivet.' },
      { name: 'Lukker', w: 96, h: 76, color: '#b8c2d6', text: 'Styrer hvor længe lyset rammer sensoren – lukkertiden.' },
      { name: 'Bajonetfatning', w: 110, h: 110, color: '#d9dee8', text: 'Metalringen, som objektivet klikkes fast i.' },
      { name: 'Objektiv', w: 120, h: 120, color: '#4DD9E8', text: 'En række linser, der samler lyset og stiller skarpt på sensoren.' },
    ],
  },
  {
    id: 'motor', name: 'Motor', icon: '⚙️', parts: [
      { name: 'Bundkar', w: 170, h: 100, color: '#3d4560', text: 'Bunden af motoren, hvor motorolien samles.' },
      { name: 'Krumtapaksel', w: 180, h: 30, color: '#b8c2d6', text: 'Omdanner stemplernes op-og-ned-bevægelse til en roterende bevægelse.' },
      { name: 'Stempler og plejlstænger', w: 150, h: 46, color: '#d9dee8', text: 'Stemplerne presses ned af forbrændingen og overfører kraften via plejlstængerne.' },
      { name: 'Cylinderblok', w: 180, h: 110, color: '#5a6788', text: 'Motorens kerne med cylindrene, som stemplerne bevæger sig i.' },
      { name: 'Topstykke', w: 180, h: 90, color: '#F28A3C', text: 'Lukker cylindrene foroven og rummer ventilerne til luft ind og udstødning ud.' },
      { name: 'Knastaksel', w: 180, h: 22, color: '#F0C36A', text: 'Åbner og lukker ventilerne i den rigtige takt.' },
      { name: 'Ventildæksel', w: 180, h: 80, color: '#2a3550', text: 'Låg over knastakslen, som holder olien inde og snavs ude.' },
    ],
  },
];

export default function ExplodedLab() {
  const [pid, setPid] = useState('pc');
  const [sep, setSep] = useState(40);
  const [rot, setRot] = useState(35);
  const [tilt, setTilt] = useState(58);
  const [zoom, setZoom] = useState(1);
  const [sel, setSel] = useState<number | null>(null);
  const drag = useRef<{ x: number; y: number; r: number; t: number } | null>(null);

  const p = PRODUCTS.find((x) => x.id === pid)!;
  const part = sel !== null ? p.parts[sel] : null;
  const N = p.parts.length;

  return (
    <div className="ex">
      <div className="demo-note">Forenklet model · delene er stiliserede, ikke tegninger af et bestemt produkt</div>
      <div className="seg" role="tablist" aria-label="Vælg produkt">
        {PRODUCTS.map((x) => <button key={x.id} role="tab" aria-selected={x.id === pid} className={x.id === pid ? 'on' : ''} onClick={() => { setPid(x.id); setSel(null); }}>{x.icon} {x.name}</button>)}
      </div>

      <div className="ex-stage" aria-label={`${p.name} i ${N} lag. Træk for at rotere.`} role="img"
        onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY, r: rot, t: tilt }; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!drag.current) return; setRot(drag.current.r + (e.clientX - drag.current.x) * 0.5); setTilt(Math.max(20, Math.min(80, drag.current.t - (e.clientY - drag.current.y) * 0.3))); }}
        onPointerUp={() => (drag.current = null)}>
        <div className="ex-world" style={{ transform: `scale(${zoom}) rotateX(${tilt}deg) rotateZ(${rot}deg)` }}>
          {p.parts.map((pt, i) => (
            <button key={pt.name} className={`ex-part ${sel === i ? 'on' : ''} ${sel !== null && sel !== i ? 'dim' : ''}`}
              style={{ width: pt.w, height: pt.h, marginLeft: -pt.w / 2, marginTop: -pt.h / 2, background: pt.color, transform: `translateZ(${(i - (N - 1) / 2) * sep}px)`, ['--c' as string]: pt.color }}
              onClick={(e) => { e.stopPropagation(); setSel(sel === i ? null : i); }} aria-label={pt.name} aria-pressed={sel === i}>
              <span>{i + 1}</span>
            </button>
          ))}
        </div>
        <span className="ex-hint">Træk for at rotere · tryk på en del</span>
      </div>

      {part ? (
        <section className="panel arrive" key={part.name} style={{ borderColor: part.color }}>
          <div className="row-between"><h3>{(sel ?? 0) + 1}. {part.name}</h3><button className="btn ghost sm" onClick={() => setSel(null)}>Luk</button></div>
          <p>{part.text}</p>
        </section>
      ) : <p className="muted center small">Vælg en del i modellen eller på listen.</p>}

      <section className="panel">
        <label className="slider"><span>Adskillelse <b>{sep === 0 ? 'Samlet' : `${sep}`}</b></span>
          <input type="range" min={0} max={70} value={sep} onChange={(e) => setSep(+e.target.value)} />
        </label>
        <label className="slider"><span>Rotation <b>{Math.round(((rot % 360) + 360) % 360)}°</b></span>
          <input type="range" min={-180} max={180} value={Math.round(((rot + 180) % 360 + 360) % 360 - 180)} onChange={(e) => setRot(+e.target.value)} />
        </label>
        <label className="slider"><span>Zoom <b>{zoom.toFixed(1)}×</b></span>
          <input type="range" min={0.6} max={1.4} step={0.1} value={zoom} onChange={(e) => setZoom(+e.target.value)} />
        </label>
        <div className="btn-row">
          <button className="btn" onClick={() => setSep(sep === 0 ? 45 : 0)}>{sep === 0 ? 'Skil ad' : 'Saml igen'}</button>
          <button className="btn ghost" onClick={() => { setRot(35); setTilt(58); setZoom(1); setSep(40); setSel(null); }}>Nulstil visning</button>
        </div>
      </section>

      <section className="panel">
        <h3>Dele ({N})</h3>
        <ol className="ex-list">
          {p.parts.map((pt, i) => (
            <li key={pt.name}><button className={sel === i ? 'on' : ''} onClick={() => setSel(sel === i ? null : i)}><i style={{ background: pt.color }} />{pt.name}</button></li>
          ))}
        </ol>
      </section>
    </div>
  );
}
