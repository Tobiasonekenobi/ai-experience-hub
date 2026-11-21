# AI Studio — samlet prototype med PromptSwipe og AI Scout

## Tilføjet fra AI Scout

Indholdet er læst fra ejerens AI Scout-projekt på Floot uden at ændre eller publicere det projekt. `scout.js` indeholder 86 originale prompts, 13 læringsspor med 44 moduler og 15 værktøjsbeskrivelser. Alle læringssporenes henvisninger til prompts er kontrolleret mod det importerede bibliotek. Eksempel-/udkaststatus er bevaret; materialet er ikke fagligt genverificeret.

Studiet har ét bibliotek med de 50 PromptSwipe-kort og 86 AI Scout-prompts. Kildesamlingen kan filtreres. Nogle prompts handler om samme opgave med forskellige instruktioner; de er bevaret som alternative originaltekster, ikke automatisk slået sammen. En senere redaktionel oprydning kan udvælge de bedste varianter.

Under Lær kan brugeren åbne alle 13 spor, vælge et modul, læse trinene, afprøve øvelsen og åbne de tilknyttede prompts direkte i studiet. Afkrydsning gemmes lokalt i browseren. Værktøjsoversigten viser de eksisterende beskrivelser og status. Videosamlingen åbnes via link til AI Scout; der er ikke downloadet eller flyttet videoer.

AI Scouts online projektbygger, database, brugerkonti og betalte AI-kald er ikke flyttet. Desktopappen er den ønskede produktretning; browserudgaven er et gennemprøvet første forslag til dens indhold og samspil.

Windows-kildekoden ligger i `desktop/`. En pakket programmappe kunne bygges, men Windows' programkontrol blokerede start af den nye eksekverbare fil. Installationsbygget fejlede også, da det skulle starte en genereret hjælpefil. Der leveres derfor ikke en færdig eller runtime-verificeret Windows-installation. Ingen sikkerhedsindstillinger er ændret. Det lokale materialebibliotek, lagring på harddisk og native eksport findes i kildekoden, men er ikke funktionstestet i Windows-appen.

Ekstra browserkontrol: modulvalg, markering og fjernelse af gennemførelse, forbindelse fra øvelse til korrekt prompt, filtre for 86 AI Scout-prompts og 50 PromptSwipe-kort. Ingen konsolfejl registreret under kontrollen.

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
