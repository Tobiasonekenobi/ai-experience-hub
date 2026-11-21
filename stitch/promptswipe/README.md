# AI Studio — første fungerende version

AI Studio bruger de 50 originale kort og lokale billeder fra PromptSwipe i et selvstændigt studie med Experience Hubs farver, skrifter og filmiske billedmateriale. Det indlæser ikke PromptSwipe i en iframe.

## Indhold

- Katalog og studievisning, emnefiltre og søgning.
- Originale prompts og billeder til alle 50 kort.
- Farvepaletter, visuel retning og format for visuelle kort.
- Målgruppe og svarformat for tekst-, lærings- og værktøjskort.
- Udfyldning af felterne fra den originale prompt.
- Favoritter, swipe på touchskærm og navigation med pile.
- Gemte projekter med genåbning af valgene på samme enhed.
- Kopiering, teksteksport, AI-tjenestevalg og stor billedvisning.

Der er ikke tilsluttet en AI-tjeneste. Billederne er de oprindelige eksempler og ændres ikke af stilvalgene. Brugeren kopierer sin samlede prompt og indsætter den i en selvvalgt AI-tjeneste. Integrationer såsom Gmail og Drive skal forbindes i den tjeneste. Gemte projekter og favoritter ligger kun i browserens lokale lager.

## Placering og udgivelse

Åbn `/stitch/promptswipe/` via en lokal webserver eller GitHub Pages. Siden anvender JavaScript-moduler og skal derfor ikke åbnes direkte som en lokal fil.

Indgangen er tilføjet til Stitch-galleriet og den originale filmiske forside. De øvrige oplevelsessider er bevaret.

Ændringerne bygger på `gh-pages`, hvor Stitch-materialet ligger. Projektets nuværende deploy-script i `main` genskaber hele `gh-pages`. Før næste udgivelse fra `main` skal den nye `stitch/promptswipe`-mappe og indgangene derfor med i udgivelseskilden, ellers kan de blive overskrevet.

## Kontrol

Kontrolleret i browser på desktop og 390 px mobilbredde: kortvalg, søgning, tomt resultat, visuelle valg, promptopbygning, favoritter, projektgemning og genåbning efter genindlæsning, kopiering, AI-link, tekstdownload og billeddialog. Ingen registrerede JavaScript-fejl under kontrollen. Mobilvisningen havde ingen vandret overflow eller fejlindlæste billeder med en angivet kilde. Touchbevægelse er implementeret, men er ikke afprøvet på fysisk telefon.
