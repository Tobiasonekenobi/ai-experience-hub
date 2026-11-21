# AI Experience Hub

*Tryk. Oplev. Udforsk.* – en mobilvenlig platform med 15 oplevelser i fem universer.

## Status (fase 3)

Alle 15 oplevelser er interaktive demoer:

| Univers | Oplevelser |
|---|---|
| Data & Fremtid | Mission Control, Future Simulator, World Data Explorer |
| Visuel Magi | Comic World, Visual Notes Studio, 3D Exploded Lab |
| Viden & Læring | Knowledge Galaxy, Time Machine, SkillTree Academy |
| Spil & Opdagelser | Detective Mode, Escape AI, Decision Lab |
| Kreativitet & Teknologi | Design Playground, AI Brain Explorer (ægte træning i browseren), Storyboard Cinema |

Konstruerede tal (fx World Data) er tydeligt mærket som demotal. Historier, personer og firmaer er opdigtede.

Al data er indbygget demodata. Ingen login, backend eller betalt AI-API.

## Kør lokalt

```bash
npm install
npm run dev      # udvikling
npm run build    # produktion til dist/ (statisk – kan hostes gratis, fx GitHub Pages/Netlify)
```

## Struktur

- `src/data/experiences.ts` – de 15 oplevelser og 5 universer
- `src/components/Cover.tsx` – 15 unikke SVG-covers (ingen billedfiler)
- `src/components/Charts.tsx` – lette SVG-grafer (intet grafbibliotek)
- `src/experiences/` – én fil pr. oplevelse, lazy-loadet
- `src/lib/store.ts` – localStorage med fejlhåndtering (prefix `aeh_`)
