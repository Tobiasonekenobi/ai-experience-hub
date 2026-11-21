# AI Experience Hub

*Tryk. Oplev. Udforsk.* – en mobilvenlig platform med 15 oplevelser i fem universer.

## Status (fase 2-prototype)

| Del | Status |
|---|---|
| Forside, Udforsk, Gemte, søgning, filtre, favoritter, senest besøgte | ✅ Virker |
| 01 Mission Control | ✅ Interaktiv demo |
| 02 Future Simulator | ✅ Interaktiv demo |
| 07 Knowledge Galaxy | ✅ Interaktiv demo |
| De øvrige 12 oplevelser | 🟡 Preview med koncept og planlagte funktioner – bygges i fase 3 |

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
