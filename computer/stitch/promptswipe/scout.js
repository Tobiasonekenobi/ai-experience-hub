// Eksporteret fra ejerens AI Scout-indhold. Kildestatus er bevaret.
export const scoutCards = [
  {
    "id": "scout-tobyone-pdf-guide",
    "name": "Claude Code",
    "title": "Færdig dansk PDF-guide i TobyOne 2.1-stil",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts dokumenter-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Byg og lever en færdig dansk PDF i TobyOne 2.1-stil.\n\nOPGAVEN\nTitel: [TITEL]\nUndertitel: [ÉN LINJE OM, HVAD LÆSEREN FÅR UD AF GUIDEN]\nEmne: [EMNE OG INDHOLD, DER SKAL MED]\nMålgruppe: [HVEM GUIDEN ER TIL]\nKildemateriale: [NOTER, FILER ELLER LINKS]\n\nVISUEL RETNING\nBrug den vedhæftede TOBYONE AI GUIDE 2.1 som designreference, hvis den er tilgængelig. Følg dens sideopbygning, typografiske hierarki og afstande. Tilpas illustrationer og indhold til det nye emne.\n\nSæt dokumentet op i stående A4 med mørk marineblå baggrund, lyseblåhvid tekst og klar cyan som accent. Brug lidt lysere marineblå til bokse og tynde, afdæmpede blå linjer til skillelinjer. Hold cyan til titler, markører, links og sidetal. Brug en moderne sans serif til overskrifter og brødtekst og en diskret monospace til små sektionsmærker.\n\nFORSIDE\n- Læg en tynd cyan linje langs toppen. Sæt TOBYONE / FELTGUIDE til venstre og udgaven til højre.\n- Sæt titlen stort over to linjer. Brug lys tekst på den første og cyan på den anden. Sæt en kort undertitel nedenunder.\n- Brug en teknisk illustration som hovedmotiv, fx et radardiagram på et diskret grid eller et diagram, der passer til emnet. Hold motivet i tynde linjer med få cyan markører.\n- Vis op til tre tal med korte labels nederst, hvis de giver læseren et overblik. Tallene skal stemme med indholdet.\n\nINDHOLDSSIDER\n- Gør indholdsfortegnelsen klikbar. Gruppér kapitlerne i tydelige sektioner, og sæt sidetallene til højre.\n- Brug samme top- og bundlinje hele vejen igennem. Sæt dokumentnavn øverst til venstre, sektionsnavn øverst til højre og sidetal nederst til højre i formatet 01 / 24. Brug det faktiske sideantal.\n- Start hver hovedside med et lille sektionsmærke i cyan, en stor overskrift og en kort introduktion.\n- Brug afrundede bokse med tynd kant til eksempler, øvelser og næste handling. Giv den vigtigste boks en cyan markør langs venstre kant.\n- Brug tabeller til sammenligninger og enkle diagrammer, når de forklarer noget bedre end tekst. Giv indholdet plads, og tilføj en side, hvis teksten ellers bliver for tæt.\n- Hvis guiden har moduler, så giv hvert modul et mål, en konkret øvelse og én tydelig næste handling. Hvis der er prompts, så sæt dem i egne bokse med markerbar tekst, der kan kopieres.\n\nLEVERING\nSkriv på klart dansk, og brug konkrete eksempler, der passer til målgruppen. Hvis guiden indeholder priser, aktuelle produktfunktioner eller vilkår, så tjek dem hos primære kilder og angiv datoen for opslaget. Markér oplysninger, der ikke kunne verificeres.\n\nEksportér den færdige PDF, og render alle sider til visuel kontrol. Tjek kontrast, tekststørrelse, sideskift, sidetal og links. Ret fejl, og lever den færdige PDF som en fil, jeg kan downloade.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-stitch-claude-code-ui",
    "name": "Claude Code",
    "title": "Stitch → Claude Code: byg UI fra Stitch-design",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Du har adgang til mit Google Stitch-projekt via MCP. Gør følgende:\n\n1. Hent alle skærme og designsystemet fra Stitch-projektet (farver, typografi, spacing, radius, skygger, komponenter). List dem kort for mig, før du går i gang.\n2. Opsæt designsystemet som design tokens (CSS-variabler eller Tailwind-config), så intet er hardcoded.\n3. Byg genbrugelige komponenter ud fra Stitch-designet (knapper, kort, inputs, navigation osv.), og så skærmene af dem. Følg layout, afstande og farver så tæt som muligt.\n4. Forbind skærmene med routing, så hele flowet kan klikkes igennem.\n5. Tilføj afdæmpede animationer: sideskift, hover og fokus, indlæsning. Respektér prefers-reduced-motion.\n6. Gør det responsivt (mobil først) og tilgængeligt: kontrast, tastaturnavigation, labels.\n7. Kør appen, tjek hver skærm mod Stitch-designet, og ret afvigelser.\n\nBrug det stack, der allerede er i projektet. Hvis der ikke er et, så spørg mig først. Spørg, hvis noget i designet er uklart, i stedet for at gætte.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-anti-robotsprog",
    "name": "Claude",
    "title": "Fjern floskler og robotsprog",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv som en skarp, erfaren dansk fagperson med respekt for modtagerens tid.\n\nOmskriv følgende tekst til målgruppen [MÅLGRUPPE]:\n\"[INDSÆT TEKST]\"\n\nREGLER:\n1. Fjern buzzwords (\"holistisk\", \"banebrydende\", \"i dagens digitale tidsalder\").\n2. Højst 18 ord pr. sætning. Brug aktiv form.\n3. Bevar kernepointen, men skær mindst 30% af længden væk.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-kold-salgsmail",
    "name": "Claude",
    "title": "Kold salgsmail uden spam-præg",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts mail-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "OBS: Tjek reglerne for markedsføring pr. mail, før du sender den.\n\nSkriv en e-mail på 4 sætninger til [BESLUTNINGSTAGER] i [BRANCHE].\nNævn én konkret udfordring [UDFORDRING] uden at rose deres firma. Slut med ét lavfriktions-spørgsmål.\n\nTone: direkte og høflig. Ingen udråbstegn, ingen emojis.",
    "image": "images/e80e889c-e394-49ea-b6b3-d384a7e85df7.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-moedereferat",
    "name": "ChatGPT",
    "title": "Mødereferat uden fyld",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "OBS: Fjern navne og andre personoplysninger fra transskriptionen, før du indsætter den.\n\nLæs denne transskription. Udtræk kun:\n1) Hvem gør hvad hvornår\n2) Hvilke uafklarede risici der blev nævnt.\n\nFjern høflighedssnak og smalltalk. Formatér som ren punktliste.\n\n[INDSÆT TRANSSKRIPTION]",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-code-reviewer",
    "name": "Claude",
    "title": "Code reviewer der fanger edge cases",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Gennemgå følgende [SPROG/KODEBLOK]. Ignorér ligegyldig styling, men led efter:\n1) Memory leaks\n2) Ubeskyttede endpoints, input der ikke valideres\n3) Race conditions\n\nGiv konkrete fiks til hvert fund, og angiv hvor sikker du er.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "debug",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-rapport-resume",
    "name": "Claude",
    "title": "Forklar en kompleks rapport på 3 minutter",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Opsummer denne [RAPPORT/DOKUMENT] som en mundtlig briefing til en travl direktør.\n\nStart med bundlinjen: hvad er hovedpointen, hvad har det af betydning for os, og hvad er risikoen. Brug højst 6 sætninger, derefter 3 punkter med det, der kræver en beslutning.\n\n[INDSÆT DOKUMENT]",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-ret-og-forbedr",
    "name": "Claude",
    "title": "Ret og forbedr min tekst",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Ret stavefejl, grammatik og komma i teksten nedenfor. Behold min tone og mine ord, så meget som muligt.\n\nBagefter: list de tre vigtigste ændringer, du har lavet, og foreslå én ting, der kunne gøre teksten tydeligere.\n\n[INDSÆT TEKST]",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "human",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-kort-version",
    "name": "Claude",
    "title": "Gør teksten kortere uden at miste pointen",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Forkort teksten nedenfor til højst [ANTAL] ord. Bevar de vigtigste fakta og tal. Fjern gentagelser og fyld.\n\nVis først den korte version, og list derefter, hvad du har skåret væk.\n\n[INDSÆT TEKST]",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "shorten",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-tone-skift",
    "name": "ChatGPT",
    "title": "Skift tone: fra formel til personlig (eller omvendt)",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Omskriv teksten nedenfor, så tonen bliver [TONE, fx varm og direkte / formel og saglig]. Modtageren er [MODTAGER]. Behold indholdet, ændr kun sproget.\n\n[INDSÆT TEKST]",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-linkedin-opslag",
    "name": "Claude",
    "title": "LinkedIn-opslag ud fra en erfaring",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv et LinkedIn-opslag på dansk ud fra denne erfaring: [ERFARING].\n\nKrav: stærk første linje, højst 150 ord, én konkret pointe, ingen buzzwords og ingen emojis. Slut med et spørgsmål, der inviterer til svar.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-overskrifter",
    "name": "ChatGPT",
    "title": "10 overskrifter at vælge imellem",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv 10 forskellige overskrifter til [EMNE] målrettet [MÅLGRUPPE]. Varier: spørgsmål, løfte, tal og direkte tiltale. Højst 8 ord pr. overskrift. Marker de to, du tror fungerer bedst, og forklar kort hvorfor.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-mail-svar",
    "name": "Claude",
    "title": "Svar høfligt og kort på en mail",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts mail-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er en mail, jeg har fået:\n\n[INDSÆT MAIL]\n\nSkriv et svar på højst 5 sætninger. Mit udgangspunkt er: [DIT SVAR I STIKORD]. Tonen skal være [TONE]. Hvis mailen indeholder noget, jeg bør afklare først, så skriv det over svaret.",
    "image": "images/e80e889c-e394-49ea-b6b3-d384a7e85df7.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-svær-mail",
    "name": "Claude",
    "title": "Skriv en svær besked roligt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts mail-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg skal give en svær besked: [SITUATION]. Modtageren er [MODTAGER].\n\nSkriv en mail, der er ærlig, rolig og konkret. Ingen skyldfordeling, ingen undskyldninger i overflod. Foreslå et næste skridt til sidst.",
    "image": "images/e80e889c-e394-49ea-b6b3-d384a7e85df7.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-opfoelgning",
    "name": "ChatGPT",
    "title": "Opfølgningsmail når der ikke kommer svar",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts mail-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv en venlig opfølgningsmail på højst 3 sætninger. Min første mail handlede om [EMNE], og jeg har ikke hørt noget i [ANTAL] dage. Gør det nemt at svare med ét ord. Ingen tryk, ingen skyldfølelse.",
    "image": "images/e80e889c-e394-49ea-b6b3-d384a7e85df7.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-mail-opsummer",
    "name": "Gemini",
    "title": "Opsummer en lang mailtråd",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts mail-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "OBS: Fjern personoplysninger, før du indsætter tråden.\n\nOpsummer mailtråden nedenfor i tre dele:\n1) Hvad er besluttet\n2) Hvad er uafklaret\n3) Hvem skal gøre hvad, og hvornår\n\n[INDSÆT MAILTRÅD]",
    "image": "images/e80e889c-e394-49ea-b6b3-d384a7e85df7.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-tilbud",
    "name": "Claude",
    "title": "Skriv et kort tilbud ud fra stikord",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv et tilbud på dansk til [KUNDE] ud fra disse stikord: [OPGAVE, OMFANG, PRIS, TIDSPLAN].\n\nStruktur: kort indledning, hvad kunden får, pris og betingelser, næste skridt. Højst en side. Skriv ikke noget, jeg ikke har opgivet.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-kundeindvending",
    "name": "Claude",
    "title": "Håndter en kundeindvending",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "En kunde siger: «[INDVENDING]». Jeg sælger [PRODUKT/YDELSE].\n\nGiv mig tre mulige svar: ét der stiller et afklarende spørgsmål, ét der anerkender og svarer direkte, og ét der foreslår en lille prøve. Hold hvert svar under 40 ord.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-produktbeskrivelse",
    "name": "ChatGPT",
    "title": "Produktbeskrivelse der er til at forstå",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv en produktbeskrivelse på 80-100 ord for [PRODUKT]. Målgruppe: [MÅLGRUPPE]. Fakta jeg har: [FAKTA]. Brug kun de fakta, jeg har givet. Ingen overdrivelser og ingen superlativer.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "adcreative",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-konkurrent-overblik",
    "name": "Perplexity",
    "title": "Overblik over konkurrenter",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts research-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Giv et overblik over de vigtigste konkurrenter til [VIRKSOMHED/PRODUKT] i [MARKED/LAND]. For hver: hvad de tilbyder, hvem de rammer, og hvad de er kendt for. Angiv kilde og dato for hver oplysning, og sig tydeligt, hvad du er usikker på.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-faktatjek",
    "name": "Perplexity",
    "title": "Faktatjek en påstand",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts research-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Tjek denne påstand: «[PÅSTAND]».\n\nSvar med: stemmer / stemmer delvist / stemmer ikke / kan ikke afgøres. Giv mindst to uafhængige kilder og angiv, hvad der taler imod. Skriv ikke noget, du ikke kan kilde.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "research",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-spoergsmaal-til-kilder",
    "name": "NotebookLM",
    "title": "Svar kun ud fra mine kilder",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts research-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Besvar spørgsmålet kun ud fra de kilder, jeg har lagt ind: [SPØRGSMÅL].\n\nHenvis til, hvilken kilde og hvilket sted svaret står. Hvis kilderne ikke kan svare, så sig det i stedet for at gætte.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-sammenlign-kilder",
    "name": "Claude",
    "title": "Sammenlign to dokumenter",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Sammenlign de to dokumenter nedenfor. Lav en tabel med: hvad de er enige om, hvad de er uenige om, og hvad kun det ene nævner. Afslut med de tre forskelle, der har størst betydning for [FORMÅL].\n\nDOKUMENT A:\n[INDSÆT]\n\nDOKUMENT B:\n[INDSÆT]",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "compare",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-beslutning",
    "name": "Claude",
    "title": "Hjælp mig med at beslutte mellem to muligheder",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg skal vælge mellem [MULIGHED A] og [MULIGHED B]. Det vigtigste for mig er [KRITERIER].\n\nLav en kort for/imod-oversigt, peg på hvad jeg bør afklare, før jeg vælger, og sig hvilken du hælder til og hvorfor. Skriv også, hvad der ville få dig til at ændre mening.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-data-fra-tekst",
    "name": "ChatGPT",
    "title": "Træk data ud af en tekst som tabel",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Træk disse oplysninger ud af teksten nedenfor og vis dem som tabel: [KOLONNER, fx navn, dato, beløb, status]. Hvis en oplysning mangler, skriv «mangler». Tilføj ikke noget, der ikke står i teksten.\n\n[INDSÆT TEKST]",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "diagram",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-risikotjek",
    "name": "Claude",
    "title": "Find risici i en plan",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er min plan:\n\n[INDSÆT PLAN]\n\nFind de fem største risici. For hver: hvor sandsynlig den er (lav/mellem/høj), hvad den koster, hvis den rammer, og hvad jeg kan gøre nu for at mindske den.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "quality",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-forklar-simpelt",
    "name": "Claude",
    "title": "Forklar det, som om jeg er nybegynder",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Forklar [EMNE] til en voksen uden forkundskaber. Brug hverdagsord, ét billede eller eksempel og højst 150 ord. Bagefter: stil mig tre spørgsmål, så jeg kan tjekke, om jeg har forstået det.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "eli5",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-laeringsplan",
    "name": "ChatGPT",
    "title": "Lav en læringsplan på 2 uger",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg vil lære [EMNE]. Jeg har [TID PR. DAG] om dagen, og mit niveau er [NIVEAU].\n\nLav en plan for 2 uger med én lille opgave pr. dag og en lille øvelse hver fredag. Hold den realistisk, og skriv, hvordan jeg ved, at jeg er nået i mål.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "studyguide",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-quiz-mig",
    "name": "Claude",
    "title": "Quiz mig i det, jeg lige har læst",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Stil mig 8 spørgsmål ud fra teksten nedenfor, ét ad gangen. Vent på mit svar, ret mig venligt, og forklar, hvis jeg tager fejl. Slut med en kort opsummering af, hvad jeg bør læse igen.\n\n[INDSÆT TEKST]",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "quiz",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-debug-fejl",
    "name": "Claude",
    "title": "Find fejlen i min kode",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Min kode giver denne fejl: [FEJLBESKEDEN]\n\nKoden:\n[INDSÆT KODE]\n\nForklar årsagen med almindelige ord, vis den mindste ændring der løser den, og sig hvordan jeg kan tjekke, at den er løst. Gæt ikke, hvis du mangler information: spørg.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "debug",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-forklar-kode",
    "name": "Claude",
    "title": "Forklar kode linje for linje",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Forklar koden nedenfor, som om jeg ikke har en teknisk baggrund. Start med, hvad den gør samlet, og gå derefter igennem de vigtigste dele. Fremhæv alt, der kan gå galt.\n\n[INDSÆT KODE]",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-claude-code-plan",
    "name": "Claude Code",
    "title": "Claude Code: lav en plan, før du ændrer noget",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg vil [OPGAVE]. Læs projektet først, og lav en plan i små trin. Skriv hvilke filer du vil røre, og hvad der kan gå galt. Ændr ikke noget, før jeg har godkendt planen. Når jeg har godkendt, så tag ét trin ad gangen, og kør projektet efter hvert trin.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-claude-code-bugfix",
    "name": "Claude Code",
    "title": "Claude Code: ret en fejl uden at bygge om",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Der er en fejl: [BESKRIV FEJLEN, og hvordan den kan genskabes]. Find årsagen, og ret den med den mindste mulige ændring. Omskriv ikke ting, der virker. Forklar bagefter, hvad der var galt, og hvordan jeg kan tjekke, at det er løst.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "debug",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-claude-code-review",
    "name": "Claude Code",
    "title": "Claude Code: gennemgå mine ændringer før jeg bruger dem",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Gennemgå alle ændringer, der er lavet i dag. List filerne, forklar hvad hver ændring gør, og peg på alt, der kan skabe fejl, sikkerhedshuller eller rod. Ret intet, før jeg siger til.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-sikkerhedstjek",
    "name": "Claude Code",
    "title": "Sikkerhedstjek af en lille app",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Gennemgå projektet for sikkerhedsproblemer: nøgler eller adgangskoder i koden, endpoints uden login, input der ikke valideres, og afhængigheder der er forældede. Giv en prioriteret liste med forslag til rettelser. Ret ikke noget endnu.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-n8n-flow-idee",
    "name": "ChatGPT",
    "title": "Find en opgave, der kan automatiseres",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts automatisering-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg arbejder som [ROLLE]. Her er mine tilbagevendende opgaver: [LISTE].\n\nVælg de tre bedste at automatisere. For hver: hvad der udløser den, hvad der skal ske, hvilke værktøjer der skal bruges (fx n8n), og hvad der kan gå galt. Start med den letteste.",
    "image": "images/b0a709d9-c209-4f31-abca-5451d90d0ff8.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-proces-beskrivelse",
    "name": "Claude",
    "title": "Beskriv en arbejdsgang som trin",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts automatisering-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er hvordan jeg gør [OPGAVE] i dag, skrevet i stikord:\n[STIKORD]\n\nGør det til en nummereret arbejdsgang med: hvem gør hvad, hvilke data der bruges, og hvor det kan automatiseres. Marker de trin, hvor et menneske bør tjekke.",
    "image": "images/b0a709d9-c209-4f31-abca-5451d90d0ff8.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-billede-prompt",
    "name": "Midjourney",
    "title": "Skriv en god billedprompt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts billeder-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv 3 varianter af en billedprompt til [MOTIV]. Angiv: motiv, stil, lys, farver, kameravinkel og stemning. Skriv på engelsk, og forklar kort på dansk, hvad der adskiller de tre varianter. Intet tekst i billedet.",
    "image": "images/b138eafd-36d0-43aa-bc4b-685c170ed9fd.png",
    "group": "Visuelt",
    "visual": true,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "hero",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-moede-forberedelse",
    "name": "Claude",
    "title": "Forbered et møde",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg skal til møde med [PERSON/FIRMA] om [EMNE]. Mit mål er [MÅL].\n\nLav en kort dagsorden, de tre vigtigste spørgsmål jeg bør stille, de to indvendinger jeg kan forvente, og hvad jeg ønsker som konkret resultat af mødet.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-ugeplan",
    "name": "ChatGPT",
    "title": "Lav en realistisk ugeplan",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er mine opgaver denne uge: [LISTE MED ESTIMERET TID]. Faste aftaler: [AFTALER]. Jeg har [TIMER] timer om dagen til fokusarbejde.\n\nLav en ugeplan, hvor det vigtigste kommer først, og hvor der er luft til det uventede. Sig, hvad du foreslår at droppe eller udskyde, hvis det ikke kan nå at blive til noget.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-ai-politik",
    "name": "Claude",
    "title": "Udkast til regler for AI på arbejdspladsen",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv et udkast til en kort AI-politik på 1 side til [VIRKSOMHED/TEAM]. Medtag: hvilke værktøjer der må bruges, hvilke data der aldrig må lægges ind, krav om at tjekke resultater, og hvem man spørger ved tvivl. Skriv i punkter og på almindeligt dansk. Det er et udkast, som skal gennemgås af en med ansvar for jura og IT.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-cv-tilpas",
    "name": "Claude",
    "title": "Tilpas mit CV til et jobopslag",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts karriere-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er mit CV og et jobopslag. Foreslå, hvilke af mine erfaringer jeg bør fremhæve, og hvilke ord fra opslaget jeg bør bruge. Opfind ikke erfaring, jeg ikke har. Giv forslag til ændringer i punktform.\n\nCV:\n[INDSÆT CV]\n\nJOBOPSLAG:\n[INDSÆT OPSLAG]",
    "image": "images/1e9cbc8b-fcca-4c1e-8f65-d52a44e8548f.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-ansoegning",
    "name": "ChatGPT",
    "title": "Skriv en kort ansøgning",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts karriere-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv en ansøgning på højst 200 ord til stillingen [STILLING] hos [VIRKSOMHED]. Brug kun disse fakta om mig: [FAKTA]. Start med noget konkret frem for «Hermed ansøger jeg». Ingen floskler.",
    "image": "images/1e9cbc8b-fcca-4c1e-8f65-d52a44e8548f.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-jobsamtale",
    "name": "Claude",
    "title": "Øv jobsamtale",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts karriere-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Spil rollen som den, der interviewer mig til stillingen [STILLING]. Stil ét spørgsmål ad gangen, vent på mit svar, og giv kort feedback (hvad var stærkt, hvad var uklart), før du går videre. Tag 8 spørgsmål.",
    "image": "images/1e9cbc8b-fcca-4c1e-8f65-d52a44e8548f.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-fra-noter-til-plan",
    "name": "Claude",
    "title": "Gør rodede noter til en handleplan",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er mine rodede noter:\n\n[INDSÆT NOTER]\n\nSortér dem i: beslutninger, opgaver (med ansvarlig og frist, hvis nævnt), spørgsmål og ideer. Tilføj ikke noget, der ikke står i noterne.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "mindmap",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-projektstart",
    "name": "Claude",
    "title": "Kom i gang med et lille projekt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg vil [PROJEKT]. Jeg har [TID] og [RESSOURCER]. Del det op i fem små trin, hvor hvert trin kan gøres på under en time. Sig, hvad der er det allerførste skridt, og hvordan jeg ved, at projektet er færdigt.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": "blueprint",
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-faq",
    "name": "ChatGPT",
    "title": "Lav en FAQ til kunder",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Lav en FAQ med 8 spørgsmål og korte svar til [PRODUKT/YDELSE]. Brug de spørgsmål, kunder typisk stiller: [EKSEMPLER]. Svar kun ud fra de oplysninger, jeg har givet: [OPLYSNINGER]. Hvis svaret mangler, så skriv det i stedet for at opfinde.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-anmeldelse-svar",
    "name": "Claude",
    "title": "Svar på en dårlig anmeldelse",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "En kunde har skrevet: «[ANMELDELSE]». Skriv et svar på højst 80 ord, der anerkender problemet, ikke forsvarer sig, og tilbyder en konkret løsning: [LØSNING]. Tonen er rolig og professionel.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-nyhedsbrev",
    "name": "ChatGPT",
    "title": "Nyhedsbrev ud fra tre pointer",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv et nyhedsbrev på højst 200 ord til [MÅLGRUPPE] med disse tre pointer: [POINTE 1], [POINTE 2], [POINTE 3]. Giv det en overskrift, en kort indledning og ét tydeligt næste skridt til sidst.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-social-serie",
    "name": "Gemini",
    "title": "En uge med opslag ud fra én idé",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Tag denne idé: [IDÉ]. Lav 5 opslag til [PLATFORM] fordelt over en uge, hver med en ny vinkel (fx tip, historie, spørgsmål, fejl jeg lærte af, opsummering). Højst 80 ord pr. opslag.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-oversaet-dansk",
    "name": "Claude",
    "title": "Oversæt og tilpas til dansk",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Oversæt teksten nedenfor til naturligt dansk, ikke ord for ord. Tilpas eksempler og vendinger til en dansk læser. Marker de steder, hvor du er i tvivl om oversættelsen.\n\n[INDSÆT TEKST]",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-gdpr-tjek",
    "name": "Claude",
    "title": "Hvilke oplysninger skal jeg fjerne først?",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Gennemgå teksten nedenfor, og list alt, der kan identificere en person eller en virksomhed (navne, adresser, numre, mailadresser, særlige forhold). Foreslå en anonymiseret version, hvor de er erstattet med [PERSON 1], [FIRMA 1] osv. Du er ikke juridisk rådgiver: skriv, hvis noget kræver en menneskelig vurdering.\n\n[INDSÆT TEKST]",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-ai-svar-tjek",
    "name": "Claude",
    "title": "Tjek et AI-svar for fejl",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er et svar, en AI har givet mig:\n\n[INDSÆT SVAR]\n\nGennemgå det kritisk. List påstande, der kan være forkerte, tal og navne jeg bør tjekke mod en kilde, og noget der lyder sikkert uden at være dokumenteret. Foreslå, hvordan jeg tjekker hver ting.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-sql-forklar",
    "name": "ChatGPT",
    "title": "Skriv en forespørgsel til mine data",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg har en tabel [TABELNAVN] med kolonnerne [KOLONNER]. Skriv en SQL-forespørgsel, der [HVAD DU VIL HAVE]. Forklar den kort linje for linje, og sig, hvad jeg skal tjekke, før jeg kører den på rigtige data.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-regneark-formel",
    "name": "Gemini",
    "title": "Find den rigtige formel i regnearket",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg bruger [EXCEL/GOOGLE SHEETS]. Kolonne A indeholder [INDHOLD], kolonne B indeholder [INDHOLD]. Jeg vil [HVAD DU VIL OPNÅ]. Giv mig formlen, forklar den kort, og vis et eksempel med tre rækker.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-prompt-forbedrer",
    "name": "Claude",
    "title": "Forbedr min prompt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er en prompt, jeg har brugt: «[DIN PROMPT]». Svarene har været [PROBLEM, fx for lange, upræcise, for floskelprægede].\n\nSkriv en forbedret version med rolle, opgave, kontekst og format. Forklar kort, hvad du har ændret, og hvorfor.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-stemme-manus",
    "name": "ElevenLabs",
    "title": "Manuskript til voiceover",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts lyd-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv et voiceover-manuskript på ca. [ANTAL] sekunder om [EMNE] til [MÅLGRUPPE]. Korte sætninger, der er lette at læse højt. Skriv tal og forkortelser ud, så udtalen bliver rigtig. Markér pauser med «...».",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-sandhedsprompt",
    "name": "Claude",
    "title": "Sandhedsprompt: skel mellem fakta og gæt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Fra nu af i denne samtale: Skel i hvert svar mellem (1) det du ved, (2) det du antager, og (3) det du ikke ved. Giv en sikkerhed fra 0 til 100 % på hver vigtig påstand. Hvis du ikke kan kilde noget, så sig det i stedet for at fylde hullet. Spørg mig, hvis noget er uklart.\n\nBekræft med ét ord, og vent på min første opgave.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-raadgiverpanel",
    "name": "ChatGPT",
    "title": "Rådgiverpanel: få modsagt min idé",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg overvejer: [BESLUTNING/IDÉ].\n\nLad fem rådgivere svare hver for sig: en skeptiker, en økonom, en bruger/kunde, en der ser langt frem, og en praktiker. Hver må højst skrive 4 sætninger og skal pege på noget, jeg overser. Lav bagefter en kort samlet vurdering, og sig tydeligt, hvor de er uenige. Vær ikke høflig på bekostning af ærlighed.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-trin-for-trin-tjek",
    "name": "Claude",
    "title": "Del op, løs og tjek dit eget svar",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Opgave: [OPGAVE].\n\nGør sådan: 1) Del den op i delspørgsmål. 2) Løs hvert delspørgsmål, og angiv sikkerhed (0-1). 3) Tjek logik, fakta og om noget mangler. 4) Hvis en del har under 0,8 i sikkerhed, så sig hvorfor, og forbedr den. 5) Giv et samlet svar og list det, jeg bør verificere selv.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-lav-mig-til-ekspert",
    "name": "ChatGPT",
    "title": "Lær mig en færdighed som en personlig tutor",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vær min tutor i [EMNE]. Mit niveau er [NIVEAU], og jeg har [TID] pr. uge.\n\nSpørg mig først tre ting om mit mål. Lav derefter et kort pensum med 6 lektioner. Undervis én lektion ad gangen: forklar kort, giv en øvelse, vent på mit svar, og ret mig venligt. Gå først videre, når jeg har forstået det.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-mig-i-en-fil",
    "name": "Claude",
    "title": "Skriv en kort «om mig»-fil til AI'en",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts grundlæggende-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Interview mig, så du kan skrive en kort kontekstfil til brug i fremtidige samtaler. Stil ét spørgsmål ad gangen om: mit arbejde, mine mål, hvordan jeg vil have svar (længde, tone, format), og hvad jeg ikke vil have. Spørg ikke om følsomme oplysninger som CPR, adgangskoder eller helbred. Når du har nok, så skriv filen på højst 250 ord, og lad mig rette den.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-tidsaudit",
    "name": "ChatGPT",
    "title": "Find tidsspild i min uge",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er, hvordan jeg bruger en almindelig uge: [LISTE MED OPGAVER OG ESTIMERET TID].\n\nSortér dem i: skal jeg selv gøre, kan automatiseres, kan delegeres, kan droppes. Vis de tre ting, der sparer mest tid, og foreslå én lille ændring til hver, som jeg kan prøve i næste uge. Gæt ikke på tal, jeg ikke har givet.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-abonnement-overblik",
    "name": "Claude",
    "title": "Overblik over mine faste udgifter",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts privatøkonomi-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "OBS: Fjern kontonumre, CPR og navne fra udtoget, før du indsætter det.\n\nHer er en liste over mine faste udgifter: [INDSÆT]. Gruppér dem, find abonnementer og udgifter, der ligner hinanden, og foreslå, hvilke jeg bør gennemgå. Skriv, hvad du har gættet på. Du giver ikke økonomisk rådgivning, kun et overblik.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-dokument-gennemgang",
    "name": "Claude",
    "title": "Læs et dokument, før jeg skriver under",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "OBS: Fjern personoplysninger. Dette erstatter ikke en rådgiver.\n\nLæs dokumentet nedenfor (aftale/abonnement/forsikring). List: hvad jeg forpligter mig til, pris og binding, opsigelsesvilkår, skjulte gebyrer og alt, jeg bør spørge om, før jeg skriver under. Citér det afsnit, hver pointe kommer fra.\n\n[INDSÆT DOKUMENT]",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-annonce-brugt",
    "name": "ChatGPT",
    "title": "Annonce til brugte ting",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts salg-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Skriv en ærlig annonce til [GENSTAND]. Fakta: [ALDER, STAND, FEJL, MÅL]. Titel på højst 8 ord, en kort beskrivelse og et forslag til prisinterval, som jeg selv tjekker mod lignende annoncer. Nævn fejl åbent. Skriv ikke noget, jeg ikke har opgivet.",
    "image": "images/3a523c03-91e5-470c-b987-07df9ddf1403.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-oprydning-filer",
    "name": "Claude",
    "title": "Plan for at rydde op i mine filer",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts planlægning-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Her er en liste over mapper og filtyper på min computer: [INDSÆT]. Foreslå en simpel mappestruktur og regler for navngivning. Slet ikke noget: foreslå en «til gennemsyn»-mappe i stedet, og beskriv hvordan jeg finder dubletter og tager backup, før jeg flytter noget.",
    "image": "images/0a16d821-8078-4f74-9cee-8cb84d4c1191.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-rutine-opgave",
    "name": "Claude",
    "title": "Planlæg en tilbagevendende AI-opgave",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts automatisering-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg vil have hjælp til en fast opgave hver [DAG/UGE]: [OPGAVE]. Beskriv hvornår den kører, hvilke data den skal bruge, hvad den må og ikke må gøre selv, og hvor jeg skal godkende, før noget sendes eller ændres. Lav en kort prompt, jeg kan gemme som rutine.",
    "image": "images/b0a709d9-c209-4f31-abca-5451d90d0ff8.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-sprog-traener",
    "name": "Claude",
    "title": "Sprogtræner i korte samtaler",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vær min samtalepartner i [SPROG]. Mit niveau er [NIVEAU]. Tal kun på sproget, med korte sætninger. Ret mine fejl efter hver besked: vis den rettede sætning og forklar kort. Slut hver samtale med tre nye ord, jeg skal øve.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-traeningsplan",
    "name": "Claude",
    "title": "Udkast til en træningsuge",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts hverdag-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Lav et udkast til en træningsuge med [ANTAL] dage. Mål: [MÅL]. Udstyr: [UDSTYR]. Begrænsninger: [SKADER/TID]. Hold det realistisk, med hviledage. Du er ikke læge eller træner: skriv, hvornår jeg bør spørge en fagperson, og stop, hvis noget gør ondt.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-rejseplan",
    "name": "Perplexity",
    "title": "Rejseplan med plads til luft",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts hverdag-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Planlæg [ANTAL] dage i [STED] for [ANTAL PERSONER]. Interesser: [INTERESSER]. Budget: [BUDGET]. Højst tre faste aktiviteter pr. dag. Angiv kilder og åbningstider med dato, og marker det, jeg selv skal bekræfte, før jeg booker.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-svindel-aftale",
    "name": "Claude",
    "title": "Familiens kodeord mod svindel",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts ansvarlig brug-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Hjælp mig med at lave en simpel svindelaftale for min familie: et fælles kodeord, som vi bruger, hvis nogen ringer og beder om penge eller oplysninger, selv hvis stemmen lyder som en, vi kender. Skriv en kort vejledning på 8 linjer, som alle kan forstå, og tre eksempler på, hvordan svindlere ringer. Foreslå ikke, at jeg gemmer selve kodeordet i en chat.",
    "image": "images/ec64f0ce-d2f0-46d8-9eba-07e78c17d332.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-stamtraes-interview",
    "name": "Claude",
    "title": "Interview til familiehistorien",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts hverdag-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Interview mig om min familiehistorie, ét spørgsmål ad gangen: navne, steder, årstal, historier. Gem det i en struktureret oversigt, og marker, hvad der er sikkert, og hvad der er husket. Bed mig om at tjekke mod dokumenter. Gæt ikke på slægtninge, og anbring ikke private oplysninger om levende personer i noget, der deles.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-rum-indretning",
    "name": "Claude",
    "title": "Idéer til at indrette et rum",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts hverdag-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Jeg vil indrette [RUM] på [MÅL] m². Stil: [STIL]. Budget: [BUDGET]. Det skal kunne: [FUNKTIONER]. Giv tre forslag til opstilling med korte begrundelser, en indkøbsliste med prioritet og tre ting, jeg skal måle, før jeg køber.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-rolle-opgave-kontekst-format",
    "name": "Claude",
    "title": "Fire dele: resultat, opgave, kontekst, format",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts grundlæggende-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "RESULTAT: Hvad skal jeg bruge svaret til? [RESULTAT]\nOPGAVE: Hvad skal du gøre? [OPGAVE]\nKONTEKST: Det skal du vide: [BAGGRUND, MÅLGRUPPE, BEGRÆNSNINGER]\nFORMAT: Sådan vil jeg have det: [LÆNGDE, STRUKTUR, TONE]\n\nHvis noget er uklart, så stil mig op til tre spørgsmål, før du begynder.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "eksempel",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-autonomt-byggearbejde",
    "name": "Claude Code",
    "title": "Byg afgrænset og verificér: fra status til resultat",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: aktuel kode, overdragelsesnotat, opgave og acceptkriterier.\n\nLæs kilderne i prioriteret rækkefølge. Find den mindste komplette ændring, og genbrug eksisterende logik. Verificér både det normale forløb og de relevante fejlforløb. Rapportér: filændringer, hvad du har verificeret, og resterende blokeringer. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-fortsaet-projekt",
    "name": "Claude Code",
    "title": "Fortsæt ét afgrænset byggearbejde i et projekt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts kode-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: projektnavn, repo, overdragelsesnotat og valgt mål.\n\nKortlæg status og afhængigheder. Vælg én godkendt opgave, som kan fortrydes, implementér den, og verificér den gennem den normale brugerrejse. Vis ændringer, testbeviser og næste afgrænsede opgave. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/860e051d-51e8-4422-b79d-6977111d2eaf.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-udviklingsproces",
    "name": "Claude",
    "title": "Beskriv en gentagelig udviklingsproces",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts automatisering-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: backlog, repo og et eksempel på en nylig leverance.\n\nKortlæg flowet fra idé, afgrænsning og plan til ændring, review, QA og overlevering. Definér, hvad der skal være opfyldt, før man går videre fra hvert trin. Lever et proceskort, ansvar for hvert trin og en gennemgået eksempelopgave. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/b0a709d9-c209-4f31-abca-5451d90d0ff8.png",
    "group": "Byg & udvikl",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-oversaet-laering",
    "name": "Claude",
    "title": "Oversæt materiale og gør det til læring",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: kildetekst, målsprog [SPROG], niveau [NIVEAU] og fagord [FAGORD].\n\nBevar betydning og struktur. Markér tvetydige passager, lav en ordliste, og lav øvelser med svar, der er baseret på teksten. Lever: oversættelse, kort resumé og læringskort med henvisning til kildeafsnit. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-proof-of-money",
    "name": "Claude",
    "title": "Gør en indtjeningsmulighed til et målbart forsøg",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts muligheder-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: en konkret mulighed, forventet tidsforbrug og dokumentation for udfaldet.\n\nSkeln skarpt mellem: fundet, afprøvet, optjent beløb og bekræftet udbetaling. Registrér tid og udgifter hver for sig. Lever et testforløb og en log, hvor status kun ændres, når der er belæg. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-opportunity-bridge",
    "name": "Claude",
    "title": "Gør et fund til én konkret næste handling",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts muligheder-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: muligheden, kilden, fristen og de relevante forudsætninger.\n\nOpsummér kravene, afgør hvad der mangler at blive bekræftet, og foreslå ét næste skridt med en tydelig stopbetingelse. Lever et handlingskort med kilde, frist og punkter, der skal afklares. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-job-forklar",
    "name": "Claude",
    "title": "Forklar et jobopslag og dets kilde",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts muligheder-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: opslaget, kildens URL og den rolle, jeg overvejer: [ROLLE].\n\nUdtræk krav, opgaver og vilkår. Hold det kilden siger adskilt fra din egen fortolkning, og markér, hvad der mangler. Lever en forklaring af jobbet, et kilderegister og en feltstruktur. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/3f418639-a8b7-4366-aca3-644a2a01b787.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-vaerktoejskatalog",
    "name": "Claude",
    "title": "Lav et katalog over mine AI-værktøjer",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Vedlæg: mit eksisterende katalog (hvis jeg har et) og de situationer, jeg bruger værktøjerne i.\n\nKortlæg hvert værktøj efter opgave, adgang, input, output og afhængigheder. Sæt åbne oplysninger til «afventer verifikation». Lever en katalogskitse og de spørgsmål, jeg skal have afklaret, før værktøjerne kan kobles sammen. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-laeringsforloeb",
    "name": "Claude",
    "title": "Læringsforløb i fire niveauer: fra begynder til bygger",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts læring-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Mit læringsmål er: [MÅL].\n\nBeskriv fire niveauer: BEGINNER, USER, OPERATOR og SYSTEM BUILDER. Tilføj en praksisopgave og et checkpoint, jeg kan observere, for hvert niveau. Lever et læringsforløb med progression og feedback. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/1379f7f7-cf8f-4446-a9a0-6fee8283bb0f.png",
    "group": "Læring",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-modelvalg",
    "name": "Claude",
    "title": "Model, udbyder og brugerflade: vælg rigtigt",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts analyse-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Min opgave er: [OPGAVE].\n\nSkeln mellem model, udbyder og brugerflade. Angiv, hvilke aktuelle egenskaber der skal tjekkes i den officielle dokumentation, før jeg vælger. Lever et begrebskort og valgkriterier med kilde og dato. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/024b3531-e36d-42ba-a294-d0b289812e18.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  },
  {
    "id": "scout-egen-motivation-serie",
    "name": "ChatGPT",
    "title": "Tre vinkler på et motivationsopslag",
    "category": "Prompts",
    "level": 2,
    "desc": "Fra AI Scouts tekst-bibliotek. Tilpas instruktionen til dit eget materiale.",
    "prompt": "Målgruppe: [MÅLGRUPPE]. Kanal: [KANAL]. Tone: [TONE]. Emne: [EMNE].\n\nLav tre forskellige vinkler. Skriv hook, hovedbudskab og afslutning til hver. Markér udsagn, der kræver belæg. Lever kladder og en kort redaktionel kontrol til gennemgang. Angiv hvilke oplysninger der er verificeret, og hvilke der kræver afklaring.",
    "image": "images/dae09714-8bf2-4226-95ed-c69b5d4034e0.png",
    "group": "Hverdag",
    "visual": false,
    "source": "AI Scout",
    "status": "egen",
    "equivalent": null,
    "imageCaption": "TEMAILLUSTRATION · IKKE ET RESULTAT AF DENNE PROMPT"
  }
];
export const tracks = [
  {
    "id": "kom-i-gang-prompts",
    "title": "Kom i gang med gode prompts",
    "level": "Begynder",
    "category": "Grundlæggende",
    "summary": "Lær at give AI klare opgaver, så du får brugbare svar første gang.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Sådan beder du en AI om noget",
        "minutes": 10,
        "summary": "En god prompt har fire dele: rolle, opgave, kontekst og format.",
        "steps": [
          "Sig, hvem AI'en skal være (fx \"en erfaren dansk tekstforfatter\")",
          "Beskriv opgaven i én klar sætning",
          "Giv kontekst: hvem læser det, og hvad skal det bruges til",
          "Angiv formatet: længde, punktliste, tone"
        ],
        "exercise": "Start med denne svage prompt: «Skriv en mail om et møde.» Sæt den ind i Claude eller ChatGPT. Skriv den derefter om med alle fire dele (fx: «Du er en venlig kollega. Skriv en mail på højst 80 ord til mit team, hvor du foreslår et møde torsdag kl. 10 om næste uges plan. Tonen skal være uformel.»), og sammenlign de to svar. Har du allerede en prompt, du bruger, kan du i stedet bruge den.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Giv rammer og eksempler",
        "minutes": 10,
        "summary": "Rammer og eksempler gør svaret mere præcist end lange forklaringer.",
        "steps": [
          "Vis ét eksempel på den tone eller det format, du vil have",
          "Sig, hvad AI'en ikke må gøre (fx ingen floskler)",
          "Sæt grænser: højst et antal ord eller punkter"
        ],
        "exercise": "Brug prompten \"Fjern floskler og robotsprog\" på en tekst, du selv har skrevet.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "anti-robotsprog"
        ]
      },
      {
        "id": "m3",
        "title": "Tjek svaret",
        "minutes": 10,
        "summary": "AI kan tage fejl og lyde sikker. Lav en fast vane med at kontrollere.",
        "steps": [
          "Bed AI'en markere, hvad den er usikker på",
          "Tjek tal, navne og citater mod en kilde",
          "Brug et søgeværktøj med kildehenvisninger til fakta"
        ],
        "exercise": "Stil et faktaspørgsmål, du kender svaret på, og se, om AI'en har ret.",
        "toolIds": [
          "perplexity"
        ],
        "promptIds": []
      },
      {
        "id": "m4",
        "title": "Byg dit eget prompt-bibliotek",
        "minutes": 8,
        "summary": "Gem de prompts, der virker, så du ikke starter forfra hver gang.",
        "steps": [
          "Gem prompts med en klar titel og de felter, der skal udfyldes",
          "Skriv felterne i [KLAMMER], så de er nemme at finde",
          "Ret prompten, hver gang den skuffer"
        ],
        "exercise": "Tilføj én egen prompt til prompt-biblioteket.",
        "toolIds": [],
        "promptIds": []
      }
    ]
  },
  {
    "id": "claude-code-faa-bygget",
    "title": "Claude Code: fra idé til kørende side",
    "level": "Mellem",
    "category": "Kode",
    "summary": "Brug en kodeagent (et AI-program, der skriver kode for dig fra en kommandolinje) til at bygge og ændre et lille projekt, uden at miste overblikket.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Kom i gang",
        "minutes": 15,
        "summary": "Installér efter leverandørens guide, åbn en terminal i din projektmappe, og start Claude Code.",
        "steps": [
          "Følg installationsguiden på leverandørens side",
          "Åbn en terminal i den mappe, du vil arbejde i",
          "Start med kommandoen claude, og log ind"
        ],
        "exercise": "Start Claude Code i en tom testmappe, og bed den lave en enkel index.html.",
        "toolIds": [
          "claude-code"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Giv den små, klare opgaver",
        "minutes": 12,
        "summary": "Små opgaver giver bedre resultater end \"byg hele appen\".",
        "steps": [
          "Bed om en plan, før den ændrer noget",
          "Giv én opgave ad gangen",
          "Sig, hvad \"færdig\" betyder (fx at siden kan åbnes uden fejl)"
        ],
        "exercise": "Bed om en plan for en landing page, godkend den, og lad den bygge første sektion.",
        "toolIds": [
          "claude-code"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Gennemgå ændringerne",
        "minutes": 10,
        "summary": "Læs, hvad der er ændret, før du bruger det. Du har ansvaret for koden.",
        "steps": [
          "Bed om en oversigt over ændrede filer",
          "Kør projektet og klik rundt",
          "Bed en anden prompt gennemgå koden for fejl"
        ],
        "exercise": "Brug code-reviewer-prompten på det, du har bygget.",
        "toolIds": [
          "claude-code"
        ],
        "promptIds": [
          "code-reviewer"
        ]
      },
      {
        "id": "m4",
        "title": "Byg ud fra et design",
        "minutes": 20,
        "summary": "Hent designet fra et værktøj som Google Stitch, og lad Claude Code bygge det.",
        "steps": [
          "Eksportér designet fra Stitch (zip eller MCP)",
          "Giv Claude Code mappen eller forbindelsen",
          "Bed den bygge én skærm ad gangen og sammenligne med designet"
        ],
        "exercise": "Brug Stitch-prompten i prompt-biblioteket på et lille design.",
        "toolIds": [
          "claude-code"
        ],
        "promptIds": [
          "stitch-claude-code-ui"
        ]
      }
    ]
  },
  {
    "id": "research-med-kilder",
    "title": "Research med AI og kilder",
    "level": "Begynder",
    "category": "Søgning og kilder",
    "summary": "Få overblik hurtigt, og bliv ved med at kunne vise, hvor oplysningerne kommer fra.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Stil det rigtige spørgsmål",
        "minutes": 8,
        "summary": "Et skarpt spørgsmål giver et skarpt svar. Afgræns emne, periode og formål.",
        "steps": [
          "Skriv, hvad svaret skal bruges til",
          "Afgræns tid, sted og branche",
          "Bed om kilder i svaret"
        ],
        "exercise": "Omskriv et bredt spørgsmål til tre præcise.",
        "toolIds": [
          "perplexity"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Arbejd ud fra dine egne kilder",
        "minutes": 12,
        "summary": "Når svaret skal bygge på dit eget materiale, så giv AI'en materialet.",
        "steps": [
          "Saml kilderne ét sted",
          "Bed om svar kun ud fra kilderne",
          "Bed om henvisning til, hvor i kilden det står"
        ],
        "exercise": "Læg to rapporter ind, og bed om forskellene.",
        "toolIds": [
          "notebooklm"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Kontrollér og opsummér",
        "minutes": 10,
        "summary": "Åbn kilderne, og tjek de vigtigste påstande, før du bruger dem.",
        "steps": [
          "Åbn mindst to kilder pr. vigtig påstand",
          "Notér, hvad der er usikkert",
          "Opsummer til en travl læser"
        ],
        "exercise": "Brug rapport-prompten på et længere dokument.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "rapport-resume",
          "moedereferat"
        ]
      }
    ]
  },
  {
    "id": "foerste-automatisering",
    "title": "Din første automatisering",
    "level": "Mellem",
    "category": "Automatisering",
    "summary": "Find en gentagen opgave, og lad et flow (en automatisk kæde af trin mellem dine programmer) klare den. Start småt.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Find opgaven",
        "minutes": 10,
        "summary": "De bedste automatiseringer er kedelige, hyppige og ens hver gang.",
        "steps": [
          "List dine tilbagevendende opgaver",
          "Vælg én, der tager under fem minutter og sker ofte",
          "Skriv ned, hvad der er input, og hvad der er resultatet"
        ],
        "exercise": "Skriv tre kandidater, og vælg den mest ensartede.",
        "toolIds": [],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Tegn flowet",
        "minutes": 10,
        "summary": "Tegn trinene på papir, før du åbner værktøjet.",
        "steps": [
          "Start: hvad udløser flowet",
          "Midte: hvad skal der ske, og hvor bruges AI",
          "Slut: hvor lander resultatet"
        ],
        "exercise": "Tegn flowet som tre-fem bokse.",
        "toolIds": [
          "n8n"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Byg og test det første flow",
        "minutes": 25,
        "summary": "Byg det mindst mulige flow, og test med eksempeldata.",
        "steps": [
          "Byg trin for trin, og test hvert trin",
          "Brug testdata uden personoplysninger",
          "Slå flowet fra, hvis noget ser mærkeligt ud"
        ],
        "exercise": "Lav et flow, der sender dig en opsummering af en tekst, du indsætter.",
        "toolIds": [
          "n8n",
          "claude"
        ],
        "promptIds": []
      },
      {
        "id": "m4",
        "title": "Data og drift",
        "minutes": 10,
        "summary": "Hvor sendes data hen, og hvem passer på flowet bagefter?",
        "steps": [
          "Send ikke personoplysninger til et AI-værktøj uden at vide, hvad der sker med dem",
          "Gem nøgler og adgangskoder i værktøjets egen nøgleopbevaring",
          "Beslut, hvem der ejer flowet"
        ],
        "exercise": "Skriv tre linjer om, hvilke data dit flow rører ved.",
        "toolIds": [
          "n8n"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "ai-paa-arbejde-ansvarligt",
    "title": "AI på arbejdet: data og ansvar",
    "level": "Begynder",
    "category": "Ansvarlig brug",
    "summary": "Brug AI uden at lægge noget ind, du ikke måtte. Generel orientering, ikke juridisk rådgivning.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Hvad må du lægge ind?",
        "minutes": 8,
        "summary": "Tjek, hvad der er følsomt: personoplysninger, kundedata, forretningshemmeligheder.",
        "steps": [
          "Del data i grøn, gul og rød",
          "Brug aldrig rød data i et værktøj uden aftale",
          "Anonymisér, før du indsætter"
        ],
        "exercise": "Gennemgå tre dokumenter, du arbejder med, og placér dem.",
        "toolIds": [],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Spørg din arbejdsplads",
        "minutes": 6,
        "summary": "Mange steder findes en politik for AI. Find den, eller spørg om den.",
        "steps": [
          "Spørg, hvilke værktøjer der er godkendt",
          "Spørg, hvem der kan svare på tvivlsspørgsmål"
        ],
        "exercise": "Skriv en kort mail til din leder eller IT med de to spørgsmål.",
        "toolIds": [],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Vær åben og kontrollér",
        "minutes": 8,
        "summary": "Du har ansvaret for det, du leverer, også når AI har hjulpet.",
        "steps": [
          "Læs alt igennem, før du sender det",
          "Fortæl, når AI har været brugt, hvis modtageren bør vide det",
          "Gem de prompts, du brugte, hvis det er vigtigt"
        ],
        "exercise": "Lav en fast tjekliste på fem punkter til dig selv.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "hvad-er-ai",
    "title": "Hvad er AI egentlig?",
    "level": "Begynder",
    "category": "Grundlæggende",
    "summary": "Forstå, hvad en sprogmodel (programmet bag Claude og ChatGPT) kan og ikke kan, så du bruger den fornuftigt fra start.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Sådan fungerer en sprogmodel",
        "minutes": 8,
        "summary": "En sprogmodel gætter det mest sandsynlige næste ord ud fra enorme mængder tekst. Den forstår ikke verden som et menneske.",
        "steps": [
          "Tænk på den som en meget læst assistent, der gætter kvalificeret",
          "Den kan lyde sikker, selv når den tager fejl",
          "Jo mere præcis din besked er, jo bedre bliver gættet"
        ],
        "exercise": "Skriv dette spørgsmål i Claude eller ChatGPT: «Giv mig tre idéer til en weekendtur i Danmark.» Stil det præcis samme spørgsmål én gang til i en ny samtale. Sammenlign: Hvilke idéer går igen? Hvad er forskelligt i valg, rækkefølge og tone? Skriv én sætning om, hvad det fortæller om, at AI'en gætter.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Hvad den er god og dårlig til",
        "minutes": 8,
        "summary": "Brug AI til udkast, omskrivning, overblik og idéer. Vær varsom med fakta, tal og nyheder.",
        "steps": [
          "God til: skrive, forkorte, oversætte, brainstorme, forklare",
          "Dårlig til: nøjagtige tal, aktuelle begivenheder, kilder uden søgning",
          "Spørg altid dig selv: kan jeg tjekke det her?"
        ],
        "exercise": "Lav to lister med tre opgaver, du ville overlade til AI, og tre du ikke ville.",
        "toolIds": [],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Vælg værktøj til opgaven",
        "minutes": 8,
        "summary": "Forskellige værktøjer er gode til forskellige ting. Start med ét, og lær det at kende.",
        "steps": [
          "Chat: Claude, ChatGPT, Gemini",
          "Søgning med kilder: Perplexity",
          "Dine egne dokumenter: NotebookLM"
        ],
        "exercise": "Vælg ét værktøj til en konkret opgave i denne uge, og skriv hvorfor.",
        "toolIds": [
          "claude",
          "chatgpt",
          "gemini",
          "perplexity"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "skriv-bedre-med-ai",
    "title": "Skriv bedre med AI",
    "level": "Begynder",
    "category": "Tekst",
    "summary": "Fra rodet udkast til en klar tekst: mails, svar og korte dokumenter, uden at det lyder som en robot.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Få et første udkast",
        "minutes": 8,
        "summary": "Giv AI'en stikord, og bed om et udkast. Det er hurtigere at rette end at skrive fra bunden.",
        "steps": [
          "Skriv stikord om indhold, modtager og formål",
          "Bed om et udkast med en bestemt længde",
          "Bed om to versioner, hvis du er i tvivl om tonen"
        ],
        "exercise": "Skriv stikord til en mail, du skal sende, og få et udkast.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Ret tonen",
        "minutes": 8,
        "summary": "Samme indhold kan lyde formelt, venligt eller direkte. Fortæl, hvad du vil have.",
        "steps": [
          "Beskriv modtageren (kunde, kollega, ven)",
          "Vælg en tone: formel, uformel, kort og direkte",
          "Bed om, at den ikke bruger floskler"
        ],
        "exercise": "Omskriv samme besked til tre forskellige modtagere.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "anti-robotsprog"
        ]
      },
      {
        "id": "m3",
        "title": "Korrektur og kortere tekst",
        "minutes": 8,
        "summary": "Brug AI til at finde fejl og stryge fyld. Du bestemmer, hvad der bliver.",
        "steps": [
          "Bed om stave- og kommafejl, og se dem markeret",
          "Bed om en kortere version med de samme fakta",
          "Læs den endelige tekst højt for dig selv"
        ],
        "exercise": "Forkort en tekst på 200 ord til 100, og tjek, at tal og navne er rigtige.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      },
      {
        "id": "m4",
        "title": "Tjek før du sender",
        "minutes": 6,
        "summary": "Du underskriver teksten, ikke AI'en. Kontrollér navne, datoer og tal.",
        "steps": [
          "Marker alle tal, navne og datoer",
          "Tjek dem mod originalen",
          "Fjern formuleringer, der ikke lyder som dig"
        ],
        "exercise": "Lav en tjekliste på tre punkter, og brug den på din næste mail.",
        "toolIds": [],
        "promptIds": []
      }
    ]
  },
  {
    "id": "overblik-moeder-dokumenter",
    "title": "Overblik over møder og dokumenter",
    "level": "Begynder",
    "category": "Overblik",
    "summary": "Lav referater, resuméer og handlingslister af lange tekster, og bliv ved med at kunne tjekke, hvad der står i kilden.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Referat fra noter",
        "minutes": 8,
        "summary": "Giv AI'en dine rå mødenoter, og få en struktureret opsummering.",
        "steps": [
          "Indsæt noterne uden personoplysninger, du ikke må dele",
          "Bed om beslutninger, ansvarlige og frister",
          "Tjek, at navne og datoer er rigtige"
        ],
        "exercise": "Brug en gammel mødenote, og lav et referat med handlingsliste.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "moedereferat"
        ]
      },
      {
        "id": "m2",
        "title": "Resumé af et langt dokument",
        "minutes": 10,
        "summary": "Lange rapporter kan koges ned, men du skal stadig vide, hvor det står.",
        "steps": [
          "Bed om et resumé på ti linjer",
          "Bed om sidetal eller afsnit til de vigtigste punkter",
          "Åbn kilden og tjek de vigtigste punkter"
        ],
        "exercise": "Resumér en rapport, og find to punkter i selve dokumentet.",
        "toolIds": [
          "claude",
          "notebooklm"
        ],
        "promptIds": [
          "rapport-resume"
        ]
      },
      {
        "id": "m3",
        "title": "Stil spørgsmål til dine egne dokumenter",
        "minutes": 10,
        "summary": "Når svaret skal bygge på dit eget materiale, så bed om svar kun ud fra det.",
        "steps": [
          "Saml materialet ét sted",
          "Skriv: svar kun ud fra de vedlagte kilder",
          "Bed om, at den siger fra, hvis svaret ikke står der"
        ],
        "exercise": "Stil tre spørgsmål til samme dokument, hvoraf ét ikke kan besvares.",
        "toolIds": [
          "notebooklm"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "billeder-med-ai",
    "title": "Billeder med AI",
    "level": "Begynder",
    "category": "Billeder & video",
    "summary": "Beskriv, hvad du vil se, og få billeder til idéer, moodboards og opslag. Med øje for rettigheder og kvalitet.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Beskriv motivet",
        "minutes": 8,
        "summary": "Et godt billedprompt siger, hvad der er i billedet, hvordan det ser ud, og hvilken stemning det har.",
        "steps": [
          "Motiv: hvad eller hvem er der",
          "Stil: foto, illustration, tegning",
          "Lys og farver: fx blødt dagslys, varme farver"
        ],
        "exercise": "Skriv tre billedprompts til samme motiv i tre forskellige stilarter.",
        "toolIds": [
          "midjourney"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Prøv, justér og gentag",
        "minutes": 10,
        "summary": "Første forsøg er sjældent det bedste. Ændr én ting ad gangen.",
        "steps": [
          "Gem de prompts, der virker",
          "Ret kun én detalje pr. forsøg",
          "Sammenlign og vælg det bedste"
        ],
        "exercise": "Lav fem versioner af samme billede, og skriv, hvad der gjorde forskellen.",
        "toolIds": [
          "midjourney"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Rettigheder og ærlighed",
        "minutes": 8,
        "summary": "Tjek vilkårene, før du bruger billeder kommercielt, og vær åben om, at de er lavet med AI, hvor det betyder noget.",
        "steps": [
          "Læs værktøjets vilkår for kommerciel brug",
          "Brug ikke andre personers ansigt uden samtykke",
          "Mærk billeder, hvor modtageren bør vide det"
        ],
        "exercise": "Skriv tre regler for, hvordan du selv vil bruge AI-billeder.",
        "toolIds": [
          "midjourney"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "lyd-og-stemme-med-ai",
    "title": "Lyd og stemme med AI",
    "level": "Mellem",
    "category": "Lyd & stemme",
    "summary": "Lav voiceover og lydtekster med tekst-til-tale, og brug stemmer ansvarligt.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Skriv til at blive læst op",
        "minutes": 8,
        "summary": "Tekst, der skal høres, skrives anderledes end tekst, der skal læses.",
        "steps": [
          "Korte sætninger",
          "Skriv tal og forkortelser, som de skal siges",
          "Læs teksten højt, før du laver lyd"
        ],
        "exercise": "Skriv 60 ord om et emne, og læs dem højt for dig selv.",
        "toolIds": [
          "elevenlabs"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Lav og tjek lyden",
        "minutes": 10,
        "summary": "Lyt efter udtale af navne, tempo og pauser, og ret teksten.",
        "steps": [
          "Generér lyden, og lyt hele vejen igennem",
          "Ret udtalen af navne ved at stave dem lydret",
          "Juster tempoet, hvis værktøjet kan det"
        ],
        "exercise": "Lav en 30 sekunders voiceover, og noter tre ting, du retter.",
        "toolIds": [
          "elevenlabs"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Samtykke og stemmekloning",
        "minutes": 6,
        "summary": "At efterligne en stemme kræver samtykke fra den, der klones.",
        "steps": [
          "Klon aldrig en stemme uden tilladelse",
          "Fortæl lytterne, når stemmen er syntetisk",
          "Gem tilladelsen skriftligt"
        ],
        "exercise": "Skriv en kort samtykkeerklæring, du ville bede om, før en stemme bruges.",
        "toolIds": [
          "elevenlabs"
        ],
        "promptIds": []
      }
    ]
  },
  {
    "id": "bedre-prompts-videre",
    "title": "Bedre prompts: næste niveau",
    "level": "Mellem",
    "category": "Grundlæggende",
    "summary": "Når de fire dele sidder, kan du styre svaret med trin, eksempler og faste skabeloner.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Bed den tænke i trin",
        "minutes": 8,
        "summary": "Ved sammensatte opgaver giver det bedre svar at bede om trin eller en plan først.",
        "steps": [
          "Bed om en plan, før den løser opgaven",
          "Del store opgaver i små dele",
          "Bed den stille spørgsmål, hvis noget er uklart"
        ],
        "exercise": "Tag en stor opgave, og få en plan, før du beder om resultatet.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Vis et eksempel",
        "minutes": 8,
        "summary": "Et eksempel på det svar, du vil have, er ofte stærkere end en lang forklaring.",
        "steps": [
          "Giv ét eller to eksempler på ønsket format",
          "Skriv tydeligt, hvad der er eksempel, og hvad der er opgaven",
          "Bed om samme format hver gang"
        ],
        "exercise": "Giv to eksempler på en god produkttekst, og bed om en tredje.",
        "toolIds": [
          "claude"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Lav skabeloner og forbedr dem",
        "minutes": 10,
        "summary": "Gem dine bedste prompts med felter i [KLAMMER], og ret dem, hver gang de skuffer.",
        "steps": [
          "Find de prompts, du bruger igen og igen",
          "Skift de variable dele ud med felter",
          "Notér, hvad der gik galt, og ret prompten"
        ],
        "exercise": "Lav en skabelon af din mest brugte prompt, og gem den i biblioteket.",
        "toolIds": [],
        "promptIds": []
      }
    ]
  },
  {
    "id": "byg-din-foerste-side",
    "title": "Byg din første side med AI",
    "level": "Mellem",
    "category": "Kode",
    "summary": "Gå fra idé til en simpel hjemmeside ved at bruge AI-værktøjer til design og kode, og gennemgå resultatet selv.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Skitsér, hvad siden skal kunne",
        "minutes": 10,
        "summary": "Skriv først, hvem siden er til, og hvad besøgende skal gøre.",
        "steps": [
          "Skriv ét mål for siden",
          "List de tre ting, besøgende skal kunne",
          "Beslut sider og sektioner på papir"
        ],
        "exercise": "Skriv en halv side om din side: formål, målgruppe og tre sektioner.",
        "toolIds": [],
        "promptIds": []
      },
      {
        "id": "m2",
        "title": "Få en første prototype",
        "minutes": 15,
        "summary": "Brug et værktøj, der laver et udkast ud fra en beskrivelse, og vurdér det ærligt.",
        "steps": [
          "Giv en klar beskrivelse af sektioner og stil",
          "Se prototypen, og skriv rettelser ned",
          "Gentag i små trin"
        ],
        "exercise": "Lav en prototype af din forside, og skriv fem rettelser.",
        "toolIds": [
          "v0",
          "claude-code"
        ],
        "promptIds": []
      },
      {
        "id": "m3",
        "title": "Gennemgå og test",
        "minutes": 12,
        "summary": "AI-kode skal gennemgås: kør siden, klik rundt, og tjek på mobil.",
        "steps": [
          "Åbn siden på computer og mobil",
          "Test alle knapper og formularer",
          "Bed en anden prompt gennemgå koden for fejl"
        ],
        "exercise": "Brug code-reviewer-prompten på din side.",
        "toolIds": [
          "claude-code"
        ],
        "promptIds": [
          "code-reviewer"
        ]
      }
    ]
  },
  {
    "id": "paalidelig-ai-hverdag",
    "title": "Pålidelig AI i hverdagen",
    "level": "Begynder",
    "category": "Ansvarlig brug",
    "summary": "Få ærlige svar, tjek dem, og brug AI til faste opgaver derhjemme og på arbejde uden at miste overblikket.",
    "source": "udkast",
    "modules": [
      {
        "id": "m1",
        "title": "Få AI'en til at skelne fakta og gæt",
        "minutes": 8,
        "summary": "AI kan lyde sikker, selv når den gætter. Bed den sige, hvad den ved, hvad den antager, og hvad den ikke ved.",
        "steps": [
          "Bed om sikkerhed på vigtige påstande",
          "Bed om at få at vide, når den ikke kan kilde noget",
          "Tjek selv de tre vigtigste punkter"
        ],
        "exercise": "Brug sandhedsprompten på et spørgsmål, du kender svaret på, og se, om den er ærlig.",
        "toolIds": [
          "claude",
          "chatgpt"
        ],
        "promptIds": [
          "sandhedsprompt",
          "ai-svar-tjek"
        ]
      },
      {
        "id": "m2",
        "title": "Få nogen til at modsige dig",
        "minutes": 8,
        "summary": "AI giver ofte ret. Bed den aktivt om modargumenter, før du beslutter noget.",
        "steps": [
          "Beskriv beslutningen kort",
          "Bed om en skeptiker og en praktiker",
          "Notér, hvad du ikke havde tænkt på"
        ],
        "exercise": "Brug rådgiverpanelet på en beslutning, du står med nu.",
        "toolIds": [
          "chatgpt"
        ],
        "promptIds": [
          "raadgiverpanel",
          "beslutning"
        ]
      },
      {
        "id": "m3",
        "title": "Læs det med småt",
        "minutes": 10,
        "summary": "Aftaler og abonnementer kan koges ned, men du skal selv se på de afsnit, der betyder noget.",
        "steps": [
          "Fjern personoplysninger først",
          "Bed om citater fra dokumentet",
          "Spørg en fagperson, hvis det er stort"
        ],
        "exercise": "Gennemgå et abonnement eller en forsikring med dokument-gennemgangen.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "dokument-gennemgang",
          "abonnement-overblik"
        ]
      },
      {
        "id": "m4",
        "title": "Faste opgaver og tryghed",
        "minutes": 8,
        "summary": "Lav faste rutiner, og aftal regler hjemme mod svindel.",
        "steps": [
          "Beskriv opgaven, tidspunkt og hvad AI'en må",
          "Bestem hvor du godkender",
          "Aftal et kodeord i familien mod falske opkald"
        ],
        "exercise": "Planlæg én fast opgave og skriv familiens svindelaftale.",
        "toolIds": [
          "claude"
        ],
        "promptIds": [
          "rutine-opgave",
          "svindel-aftale"
        ]
      }
    ]
  }
];
export const tools = [
  {
    "id": "chatgpt-codex",
    "name": "ChatGPT Codex",
    "vendor": "OpenAI",
    "category": "Kode & udvikling",
    "tagline": "OpenAIs kodeagent, der arbejder på opgaver i dine kodeprojekter.",
    "url": "https://chatgpt.com/codex",
    "about": "Kodeagent fra OpenAI, som du giver en opgave i et projekt. Den læser koden, foreslår ændringer og kan køre tests. Du gennemgår og godkender resultatet.",
    "goodFor": [
      "Små og afgrænsede kodeopgaver",
      "Fejlfinding i et eksisterende projekt",
      "Gennemgang af kode før du bruger den"
    ],
    "strengths": [
      "Arbejder direkte i dit projekt",
      "Du kan se og godkende ændringerne"
    ],
    "watchOut": [
      "Gennemgå altid ændringerne, før du bruger dem",
      "Adgang og grænser afhænger af din ChatGPT-plan"
    ],
    "source": "eksempel"
  },
  {
    "id": "claude-cowork",
    "name": "Claude Cowork",
    "vendor": "Anthropic",
    "category": "Automatisering",
    "tagline": "Claude, der arbejder med dine filer og opgaver på din computer.",
    "url": "https://claude.ai",
    "about": "Et arbejdsmiljø i Claude, hvor du giver en opgave, og Claude udfører den trin for trin med dine filer og dokumenter. Beregnet til arbejde uden kode.",
    "goodFor": [
      "Ordne og sortere filer",
      "Lave udkast og oversigter ud fra dine dokumenter",
      "Gentagne kontoropgaver"
    ],
    "strengths": [
      "Kræver ingen kodeviden",
      "Arbejder med dine egne filer"
    ],
    "watchOut": [
      "Giv kun adgang til de mapper, opgaven kræver",
      "Tjek resultatet, før du sletter eller sender noget",
      "Adgang afhænger af din Claude-plan"
    ],
    "source": "eksempel"
  },
  {
    "id": "openart",
    "name": "OpenArt",
    "vendor": "OpenArt",
    "category": "Billeder & video",
    "tagline": "Lav og rediger billeder med AI ud fra en beskrivelse.",
    "url": "https://openart.ai",
    "about": "Onlinetjeneste til at lave billeder (og kort video) med AI ud fra en tekstbeskrivelse, med flere billedmodeller samlet ét sted.",
    "goodFor": [
      "Idéer og skitser til billeder",
      "Illustrationer til opslag og præsentationer"
    ],
    "strengths": [
      "Flere billedmodeller samlet",
      "Let at komme i gang"
    ],
    "watchOut": [
      "Tjek vilkår og rettigheder, før du bruger billeder kommercielt",
      "Priser og krediter skifter: tjek på siden"
    ],
    "source": "eksempel"
  },
  {
    "id": "stitch",
    "name": "Stitch",
    "vendor": "Google",
    "category": "Kode & udvikling",
    "tagline": "Lav udkast til appdesign ud fra en beskrivelse.",
    "url": "https://stitch.withgoogle.com",
    "about": "Googles værktøj til at lave skærmdesign til apps og hjemmesider ud fra en beskrivelse eller et billede. Bruges til at få et visuelt udkast, før man bygger.",
    "goodFor": [
      "Første udkast til skærme og layout",
      "Prøve forskellige designretninger hurtigt"
    ],
    "strengths": [
      "Hurtigt visuelt udkast",
      "Kan give design, du kan bygge videre på"
    ],
    "watchOut": [
      "Udkast er ikke færdigt design: tjek læsbarhed og tilgængelighed",
      "Funktioner og grænser kan ændre sig"
    ],
    "source": "eksempel"
  },
  {
    "id": "claude",
    "name": "Claude",
    "vendor": "Anthropic",
    "category": "Tekst & chat",
    "tagline": "AI-assistent til skrivning, analyse af lange dokumenter og kode.",
    "url": "https://claude.ai",
    "about": "Samtale-assistent, der er god til at læse og arbejde med lange tekster, skrive i en nøgtern tone og hjælpe med kode.",
    "goodFor": [
      "Skrive og omskrive tekst",
      "Læse og sammenfatte lange dokumenter",
      "Kode og fejlfinding"
    ],
    "strengths": [
      "Håndterer lange dokumenter",
      "Rolig, saglig skrivestil",
      "Stærk til kode"
    ],
    "watchOut": [
      "Kan tage fejl eller opfinde detaljer: tjek vigtige fakta",
      "Gratis brug er begrænset"
    ],
    "source": "eksempel"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "vendor": "OpenAI",
    "category": "Tekst & chat",
    "tagline": "Bredt AI-værktøj med chat, billeder, stemme og egne GPT'er.",
    "url": "https://chatgpt.com",
    "about": "Alt-i-ét assistent, der kan skrive, analysere, lave billeder og tale med stemme. Du kan bygge egne GPT'er til faste opgaver.",
    "goodFor": [
      "Generel hjælp til alt fra mails til analyse",
      "Billeder og stemme i samme app",
      "Genbrugelige GPT'er til faste opgaver"
    ],
    "strengths": [
      "Mange funktioner samlet ét sted",
      "Stort udvalg af tilføjelser og integrationer"
    ],
    "watchOut": [
      "Kan skrive floskelpræget: bed om en tør, direkte tone",
      "Tjek fakta og kilder"
    ],
    "source": "eksempel"
  },
  {
    "id": "gemini",
    "name": "Gemini",
    "vendor": "Google",
    "category": "Tekst & chat",
    "tagline": "Googles AI-assistent, tæt koblet til Gmail, Docs og Drev.",
    "url": "https://gemini.google.com",
    "about": "AI-assistent fra Google. Størst værdi, hvis du allerede bruger Google Workspace, hvor den kan hjælpe i dine dokumenter og mails.",
    "goodFor": [
      "Arbejde i Google Workspace",
      "Søgning kombineret med AI",
      "Multimodale opgaver (tekst, billede, lyd)"
    ],
    "strengths": [
      "Integration med Googles værktøjer"
    ],
    "watchOut": [
      "Funktioner afhænger af dit abonnement",
      "Tjek fakta og kilder"
    ],
    "source": "eksempel"
  },
  {
    "id": "perplexity",
    "name": "Perplexity",
    "vendor": "Perplexity AI",
    "category": "Research",
    "tagline": "Søgemaskine med AI-svar og kildehenvisninger.",
    "url": "https://www.perplexity.ai",
    "about": "Besvarer spørgsmål ved at søge på nettet og viser kilderne. God til hurtig research, hvor du vil kunne tjekke, hvor svaret kommer fra.",
    "goodFor": [
      "Hurtig research med kilder",
      "Markeds- og konkurrentoverblik"
    ],
    "strengths": [
      "Viser kilder til svarene"
    ],
    "watchOut": [
      "Kilderne skal stadig læses: et citat er ikke en garanti"
    ],
    "source": "eksempel"
  },
  {
    "id": "notebooklm",
    "name": "NotebookLM",
    "vendor": "Google",
    "category": "Research",
    "tagline": "Stil spørgsmål til dine egne dokumenter og noter.",
    "url": "https://notebooklm.google.com",
    "about": "Du uploader egne kilder (PDF'er, noter, links), og værktøjet svarer ud fra dem. Godt, når svaret skal bygge på dit eget materiale.",
    "goodFor": [
      "Studere rapporter og artikler",
      "Få overblik over et stort materiale"
    ],
    "strengths": [
      "Svarer ud fra dine egne kilder"
    ],
    "watchOut": [
      "Kun så godt som det materiale, du lægger ind",
      "Tjek følsomme data, før du uploader"
    ],
    "source": "eksempel"
  },
  {
    "id": "midjourney",
    "name": "Midjourney",
    "vendor": "Midjourney",
    "category": "Billeder & video",
    "tagline": "Billedgenerering med stærk æstetik.",
    "url": "https://www.midjourney.com",
    "about": "Genererer billeder ud fra tekstbeskrivelser. Kendt for en markant visuel stil, som er god til koncepter og kampagnebilleder.",
    "goodFor": [
      "Koncepter og stemningsbilleder",
      "Kampagne- og moodboard-visuals"
    ],
    "strengths": [
      "Visuelt stærk stil"
    ],
    "watchOut": [
      "Tekst i billeder er stadig en svaghed",
      "Tjek vilkår for kommerciel brug"
    ],
    "source": "eksempel"
  },
  {
    "id": "elevenlabs",
    "name": "ElevenLabs",
    "vendor": "ElevenLabs",
    "category": "Lyd & stemme",
    "tagline": "Realistisk tekst-til-tale, bl.a. på dansk.",
    "url": "https://elevenlabs.io",
    "about": "Laver naturlig tale ud fra tekst og kan klone stemmer. Bruges til voiceover, podcasts og lydbøger.",
    "goodFor": [
      "Voiceover til video",
      "Lyd til e-learning"
    ],
    "strengths": [
      "Naturlig stemmekvalitet"
    ],
    "watchOut": [
      "Stemmekloning kræver samtykke fra den, der klones",
      "Lyt efter udtale af danske navne"
    ],
    "source": "eksempel"
  },
  {
    "id": "cursor",
    "name": "Cursor",
    "vendor": "Anysphere",
    "category": "Kode & udvikling",
    "tagline": "Kodeeditor med AI bygget ind.",
    "url": "https://cursor.com",
    "about": "En kodeeditor, hvor AI kan skrive, forklare og ændre kode direkte i dit projekt.",
    "goodFor": [
      "Daglig programmering med AI-hjælp",
      "Refaktorering af eksisterende kode"
    ],
    "strengths": [
      "AI direkte i editoren"
    ],
    "watchOut": [
      "Gennemgå altid den genererede kode",
      "Hold hemmeligheder uden for prompts"
    ],
    "source": "eksempel"
  },
  {
    "id": "claude-code",
    "name": "Claude Code",
    "vendor": "Anthropic",
    "category": "Kode & udvikling",
    "tagline": "Kodeagent, der arbejder i din terminal og dit projekt.",
    "url": "https://claude.com/claude-code",
    "about": "Kører i terminalen, læser dit projekt, redigerer filer og kører kommandoer efter dine instrukser.",
    "goodFor": [
      "Opgaver der spænder over flere filer",
      "Automatisering af gentagne kodeopgaver"
    ],
    "strengths": [
      "Forstår hele projektet",
      "Kan køre og teste kode"
    ],
    "watchOut": [
      "Giv kun adgang til det, den skal bruge",
      "Gennemgå ændringer før de bruges"
    ],
    "source": "eksempel"
  },
  {
    "id": "v0",
    "name": "v0",
    "vendor": "Vercel",
    "category": "Kode & udvikling",
    "tagline": "Lav brugerflader og prototyper ud fra en beskrivelse.",
    "url": "https://v0.dev",
    "about": "Genererer React-baserede brugerflader ud fra tekst eller billeder. Godt til hurtige prototyper.",
    "goodFor": [
      "Hurtige UI-prototyper",
      "Idéer til layout"
    ],
    "strengths": [
      "Hurtigt fra idé til synlig prototype"
    ],
    "watchOut": [
      "Produktionskvalitet kræver oprydning og test"
    ],
    "source": "eksempel"
  },
  {
    "id": "n8n",
    "name": "n8n",
    "vendor": "n8n",
    "category": "Automatisering",
    "tagline": "Byg arbejdsgange, der binder dine værktøjer sammen.",
    "url": "https://n8n.io",
    "about": "Visuelt værktøj til at automatisere flows mellem apps og AI. Kan køres selv, hvis data ikke må forlade din egen server.",
    "goodFor": [
      "Automatisere gentagne opgaver",
      "Binde AI sammen med mail, regneark og CRM"
    ],
    "strengths": [
      "Fleksibelt",
      "Kan selv-hostes"
    ],
    "watchOut": [
      "Kræver lidt teknisk forståelse",
      "Selv-hosting betyder selv at have ansvaret for drift og sikkerhed"
    ],
    "source": "eksempel"
  }
];
