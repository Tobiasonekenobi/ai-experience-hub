# AI Studio til Windows — kildekode, ikke færdig installation

Desktopudgaven indeholder det samlede studie med 136 prompts, 13 læringsspor, 44 moduler og 15 værktøjsbeskrivelser. Billeder og skrifter pakkes lokalt. De oprindelige onlinetjenester åbnes i brugerens browser; AI Scout-videoerne er ikke downloadet.

Koden tilføjer lokal projektlagring i appens datamappe, materialebibliotek med kopier af brugerens valgte filer og en almindelig Gem som-dialog til teksteksport. Materialerne sendes ikke automatisk til en AI-tjeneste.

## Bygning

`npm ci` installerer de låste udviklingsafhængigheder. `npm run dist` forbereder aktiver og bygger med Electron og electron-builder. Afhængighederne og deres præcise versioner står i package-lock.json.

Appen bruger et lokalt protokolnavn, isoleret brugerflade, en begrænset bro til de konkrete lagringsfunktioner og en indholdspolitik, der kun tillader den pakkede kode. Eksterne HTTPS-links åbnes i systemets browser. Der er ingen generel filadgang fra brugerfladen.

## Aktuel kontrolstatus

- JavaScript-filerne er syntakskontrolleret.
- Den udpakkede programmappe blev bygget.
- Windows blokerede opstart: “En politik for programkontrol har blokeret denne fil.”
- Installationsbygget fejlede, da en genereret hjælpefil skulle startes.
- Ingen Windows-appfunktioner er derfor runtime-verificeret, og der leveres ingen installer som færdigt produkt.
- Ingen sikkerhedsindstillinger er ændret eller omgået.

Browserudgavens funktioner er afprøvet separat. Før udgivelse som Windows-app skal pakken bygges og kontrolleres i et godkendt miljø og distribueres med en passende signering. Brug den eksisterende webprototype til produktgennemgangen imens.
