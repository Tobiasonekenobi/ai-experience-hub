import type { Question } from '../components/Quiz';
import type { UniverseId } from './experiences';

// AI Learning Hub: ét spor pr. univers. Hvert modul = Lær → Se → Prøv → Tjek.

export interface Module {
  id: string;
  title: string;
  minutes: number;
  lesson: string;
  points: string[];
  demo: string; // id på en oplevelse
  demoWhy: string;
  task: string; // praktisk opgave i brugerens egne AI-værktøjer
  prompt: string; // færdig prompt der kan kopieres
  quiz: Question[];
}

export interface Track { universe: UniverseId; title: string; intro: string; modules: Module[] }

export const TRACKS: Track[] = [
  {
    universe: 'viden', title: 'Forstå AI', intro: 'Hvad der foregår inde i en sprogmodel – og hvordan du taler med den. Start her.',
    modules: [
      {
        id: 'sprogmodel', title: 'Hvad er en sprogmodel?', minutes: 8,
        lesson: 'Claude, ChatGPT og Gemini er sprogmodeller. De er trænet på enorme mængder tekst og har lært mønstre i sproget. Når du skriver noget, beregner modellen, hvilket stykke tekst der sandsynligvis skal komme næst – igen og igen, til svaret er færdigt. Den slår ikke svar op i en database; den genererer dem.',
        points: ['Modellen forudsiger tekst ud fra mønstre, den har lært.', 'Den har ingen indbygget fakta-database – den kan tage fejl.', 'Der er tilfældighed med i ordvalget, så to svar på samme spørgsmål kan variere.'],
        demo: 'ai-brain', demoWhy: 'Se et lille neuralt netværk lære et mønster fra eksempler. Sprogmodeller lærer på samme grundprincip – bare i en helt anden størrelse.',
        task: 'Stil det samme spørgsmål til to forskellige AI’er (fx Claude og ChatGPT) og sammenlign svarene. Stil derefter spørgsmålet igen i en ny chat og se, om svaret ændrer sig.',
        prompt: 'Forklar mig som om jeg var 12 år, hvordan du som sprogmodel finder på dit svar. Fortæl også ærligt, hvad du er dårlig til.',
        quiz: [
          { q: 'Hvad gør en sprogmodel grundlæggende, når den svarer?', opts: ['Slår svaret op i en database', 'Forudsiger sandsynlig tekst ud fra lærte mønstre', 'Søger altid på internettet'], a: 1, why: 'Den genererer tekst bid for bid ud fra mønstre fra træningen.' },
          { q: 'Hvorfor kan du få to forskellige svar på samme spørgsmål?', opts: ['Fordi der er tilfældighed i ordvalget', 'Fordi modellen er gået i stykker', 'Det kan man ikke'], a: 0, why: 'Modellen vælger blandt sandsynlige ord, og der er bevidst lidt variation.' },
        ],
      },
      {
        id: 'prompt', title: 'Den gode prompt', minutes: 10,
        lesson: 'En prompt er din besked til AI’en. Jo tydeligere du er, jo bedre bliver svaret. En god prompt fortæller AI’en hvem den skal være, hvad målet er, hvilken baggrund den skal kende, og hvordan svaret skal se ud. Eksempler på det du vil have er ofte det allerstærkeste værktøj.',
        points: ['Rolle: «Du er en erfaren …»', 'Mål og kontekst: hvad skal løses, og hvad skal AI’en vide?', 'Format: liste, tabel, længde, tone.', 'Eksempler: vis det, du vil have, i stedet for kun at beskrive det.'],
        demo: 'design-playground', demoWhy: 'Ligesom hvert valg her ændrer designet med det samme, ændrer hver del af din prompt svaret.',
        task: 'Tag en prompt, du har brugt for nylig. Omskriv den med rolle, mål, kontekst og format, og sammenlign de to svar.',
        prompt: 'Du er en erfaren [rolle]. Mit mål er [mål]. Baggrund: [det AI’en skal vide]. Giv mig svaret som [format, fx 5 punkter]. Stil mig gerne spørgsmål først, hvis noget er uklart.',
        quiz: [
          { q: 'Hvilken prompt giver typisk det bedste svar?', opts: ['«Skriv en mail»', '«Skriv en kort, venlig mail til min chef om fri fredag. Max 5 linjer.»', '«Mail. Fri.»'], a: 1, why: 'Den har mål, modtager, tone og længde.' },
          { q: 'Hvad er ofte den stærkeste måde at få det format, du vil have?', opts: ['At skrive i store bogstaver', 'At vise et eksempel', 'At skrive «vær god»'], a: 1, why: 'Eksempler viser præcist, hvad du mener.' },
        ],
      },
      {
        id: 'kontekst', title: 'Tokens og hukommelse', minutes: 7,
        lesson: 'AI’en læser tekst som «tokens» – små stykker af ord. Den kan kun tage højde for en begrænset mængde tekst ad gangen: kontekstvinduet. I meget lange samtaler kan tidlige detaljer blive overset. Derfor er det ofte bedre at starte en ny samtale med en god opsummering end at fortsætte i det uendelige.',
        points: ['Tokens = ordstykker; både din tekst og svaret tæller.', 'Kontekstvinduet er AI’ens «arbejdshukommelse».', 'Lange chats: opsummér og start forfra.'],
        demo: 'skilltree', demoWhy: 'Ligesom færdighedstræet bygger viden ovenpå viden, skal AI’en have den vigtige kontekst med for at bygge videre.',
        task: 'Find en lang samtale med en AI. Bed den om en opsummering og start en ny chat med opsummeringen som første besked.',
        prompt: 'Opsummér vores samtale indtil nu i maks. 10 punkter: mål, beslutninger vi har truffet, og hvad der mangler. Skriv det, så jeg kan sætte det ind i en ny chat.',
        quiz: [
          { q: 'Hvad er et kontekstvindue?', opts: ['Den tekstmængde AI’en kan tage højde for på én gang', 'Et vindue i browseren', 'AI’ens adgangskode'], a: 0, why: 'Det er grænsen for, hvor meget modellen kan «se» ad gangen.' },
          { q: 'Samtalen er blevet meget lang, og AI’en glemmer ting. Hvad gør du?', opts: ['Skriver det hele igen med store bogstaver', 'Laver en opsummering og starter en ny samtale', 'Giver op'], a: 1, why: 'En frisk samtale med det vigtigste giver AI’en overblik igen.' },
        ],
      },
      {
        id: 'hallucination', title: 'Når AI finder på', minutes: 8,
        lesson: 'Fordi AI’en genererer sandsynlig tekst, kan den finde på ting, der lyder rigtige, men er forkerte: tal, citater, kilder eller links. Det kaldes ofte hallucinationer. Det sker oftest ved nicheviden, præcise tal og nyere begivenheder. Løsningen er ikke at stoppe med AI, men at tjekke det vigtige.',
        points: ['AI kan være selvsikker og forkert på samme tid.', 'Risikoen er størst ved tal, kilder, navne og nyheder.', 'Bed om kilder – og tjek dem selv. Brug websøgning ved aktuelle emner.'],
        demo: 'detective', demoWhy: 'En god detektiv stoler ikke på én forklaring, men forbinder beviser. Brug samme metode på AI-svar.',
        task: 'Spørg en AI om noget, du selv ved meget om. Find mindst én detalje, der er upræcis eller forkert.',
        prompt: 'Svar på mit spørgsmål, og markér bagefter hver påstand med [sikker], [usikker] eller [tjek selv]. Mit spørgsmål: …',
        quiz: [
          { q: 'Hvornår er risikoen for opfundne svar typisk størst?', opts: ['Ved simple hverdagsord', 'Ved præcise tal, kilder og nyere begivenheder', 'Aldrig'], a: 1, why: 'Det er detaljer, modellen let kan gætte forkert på.' },
          { q: 'AI’en giver dig et link som kilde. Hvad gør du?', opts: ['Bruger det uden at klikke', 'Åbner det og tjekker, at det findes og siger det samme', 'Sletter det'], a: 1, why: 'Kilder kan være opfundne – tjek dem.' },
        ],
      },
    ],
  },
  {
    universe: 'spil', title: 'AI der tænker og handler', intro: 'Ræsonnering, agenter og hvordan du bruger dem sikkert.',
    modules: [
      {
        id: 'trin', title: 'Tænk trin for trin', minutes: 7,
        lesson: 'Svære opgaver løses bedre, når AI’en deler dem op. Bed den om først at lave en plan, så løse ét trin ad gangen og til sidst tjekke resultatet. Mange nyere modeller «tænker» selv, før de svarer, men du styrer stadig kvaliteten ved at bede om plan og kontrol.',
        points: ['Bed om en plan før løsningen.', 'Ét trin ad gangen giver færre fejl.', 'Bed AI’en tjekke sit eget svar til sidst.'],
        demo: 'escape-ai', demoWhy: 'Escape-rummet løses kun ved at tage sporene i den rigtige rækkefølge – præcis som trin-for-trin-tænkning.',
        task: 'Giv en AI en opgave med flere dele (fx planlæg en uges aftensmad til en fast pris). Bed først om planen og godkend den, før den laver resten.',
        prompt: 'Før du svarer: lav en kort plan i punkter og spørg mig, om den er OK. Når jeg har godkendt den, løser du ét punkt ad gangen og tjekker til sidst dit eget resultat.',
        quiz: [
          { q: 'Hvorfor bede AI’en om en plan først?', opts: ['Det gør svaret længere', 'Du kan rette retningen, før den bruger kræfter forkert', 'Det er påkrævet'], a: 1, why: 'Fejl er billigst at rette i planen.' },
          { q: 'Hvad er et godt sidste trin?', opts: ['At AI’en tjekker sit eget resultat', 'At slette chatten', 'At skifte emne'], a: 0, why: 'Selvkontrol fanger mange fejl.' },
        ],
      },
      {
        id: 'agenter', title: 'Hvad er en agent?', minutes: 9,
        lesson: 'En chatbot svarer. En agent handler: den bruger værktøjer i en løkke – planlægger, udfører en handling, ser resultatet og vælger næste skridt. Claude Code er en agent: den læser filer, kører kommandoer og retter fejl. Agenter er stærke, men har brug for klare mål og grænser.',
        points: ['Agent = AI + værktøjer + en løkke af handlinger.', 'Eksempler: Claude Code, AI der søger på nettet, planlagte AI-opgaver.', 'Giv klare mål, og bestem hvad den må gøre uden at spørge.'],
        demo: 'decision-lab', demoWhy: 'Hver beslutning her får konsekvenser for næste runde – sådan arbejder en agent også: handling, resultat, ny beslutning.',
        task: 'Giv Claude Code en lille opgave, men bed den om først at beskrive, hvilke skridt og værktøjer den vil bruge.',
        prompt: 'Opgave: [beskriv]. Før du gør noget: list de skridt og værktøjer, du vil bruge, og hvad der kunne gå galt. Vent på mit OK.',
        quiz: [
          { q: 'Hvad adskiller en agent fra en almindelig chatbot?', opts: ['Den skriver pænere', 'Den kan bruge værktøjer og handle i flere trin', 'Den er altid gratis'], a: 1, why: 'Agenter udfører handlinger, ikke kun tekst.' },
          { q: 'Hvad er vigtigst, når du giver en agent en opgave?', opts: ['Klart mål og klare grænser', 'At skrive meget hurtigt', 'At give den alle dine passwords'], a: 0, why: 'Mål og grænser holder agenten på sporet og sikker.' },
        ],
      },
      {
        id: 'sikkerhed', title: 'Brug AI sikkert', minutes: 8,
        lesson: 'Del aldrig passwords, CPR-numre eller API-nøgler med en AI. Vær også opmærksom på «prompt injection»: tekst, som AI’en læser – en mail, en webside, et dokument – kan indeholde skjulte instruktioner. En agent der læser din mail, skal derfor ikke blindt gøre, hvad mailen siger.',
        points: ['Hemmeligheder (passwords, nøgler, CPR) hører ikke hjemme i en prompt.', 'Prompt injection: skjulte instruktioner i tekst, AI’en læser.', 'Lad AI foreslå – og godkend selv handlinger som at sende, betale eller slette.'],
        demo: 'detective', demoWhy: 'I sagen er ikke alle udsagn til at stole på. Det samme gælder tekst, din AI læser.',
        task: 'Gennemgå dine AI-chats: har du delt noget, der burde være privat? Slet det, og lav en huskeregel for, hvad du ikke deler.',
        prompt: 'Lav en kort tjekliste til mig: hvad bør jeg aldrig dele med en AI-chat, og hvad skal jeg altid selv godkende, når en AI-agent arbejder for mig?',
        quiz: [
          { q: 'Hvad er prompt injection?', opts: ['En hurtig måde at skrive prompts på', 'Skjulte instruktioner i tekst, som AI’en læser', 'En slags virus i din computer'], a: 1, why: 'Fx en mail der prøver at få AI’en til at gøre noget, du ikke har bedt om.' },
          { q: 'Hvilken handling bør du selv godkende?', opts: ['At AI’en opsummerer en tekst', 'At AI’en sender en mail på dine vegne', 'At AI’en retter stavefejl'], a: 1, why: 'Handlinger der ikke kan fortrydes, skal godkendes af dig.' },
        ],
      },
    ],
  },
  {
    universe: 'visuel', title: 'AI og billeder', intro: 'Lav billeder med AI, og lad AI se og forklare billeder for dig.',
    modules: [
      {
        id: 'billedprompt', title: 'Billeder fra tekst', minutes: 8,
        lesson: 'Billed-AI’er laver billeder ud fra en beskrivelse. Det hjælper at beskrive motiv, stil, lys, komposition og format – og at forbedre billedet i små skridt i stedet for at starte forfra. Billedgenerering koster ofte credits, så en god prompt sparer penge.',
        points: ['Motiv: hvad og hvem er på billedet?', 'Stil og lys: fx «filmisk, blåt nattelys, 3D-render».', 'Format: kvadrat, 16:9, plakat.', 'Ret ét element ad gangen.'],
        demo: 'comic-world', demoWhy: 'Hvert tegneseriepanel har motiv, stemning og farver – de samme ting, du beskriver i en billedprompt.',
        task: 'Lav et billede i Gemini eller ChatGPT med skabelonen herunder. Ret derefter kun lyset og se forskellen.',
        prompt: 'Motiv: [hvad]. Stil: [fx digital maleri / 3D-render / foto]. Lys og farver: [fx varmt solnedgangslys, orange og lilla]. Komposition: [fx tæt på, motivet i venstre tredjedel]. Format: [16:9].',
        quiz: [
          { q: 'Hvad giver typisk det bedste billede?', opts: ['Ét ord', 'En beskrivelse af motiv, stil, lys og format', 'Meget lange lister af tilfældige ord'], a: 1, why: 'Konkrete, ordnede detaljer styrer resultatet.' },
          { q: 'Billedet er næsten rigtigt. Hvad gør du?', opts: ['Starter helt forfra', 'Retter én ting ad gangen', 'Opgiver'], a: 1, why: 'Små rettelser holder fast i det, der virker.' },
        ],
      },
      {
        id: 'ai-ser', title: 'AI der kan se', minutes: 7,
        lesson: 'Mange AI’er er multimodale: de kan læse billeder, skærmbilleder, kvitteringer og diagrammer. Tag et billede af en fejlbesked, en opskrift eller et skilt på et fremmed sprog, og bed AI’en forklare, oversætte eller trække tallene ud.',
        points: ['Skærmbillede af en fejl → forklaring og løsning.', 'Foto af kvittering → tabel med beløb.', 'Tjek tal, AI’en har aflæst – den kan læse forkert.'],
        demo: 'visual-notes', demoWhy: 'Visuelle noter viser, hvor meget information et billede kan rumme – AI kan nu læse det.',
        task: 'Tag et skærmbillede af noget på din computer, du ikke forstår, og bed en AI forklare det.',
        prompt: 'Her er et billede. Forklar kort hvad det viser, træk de vigtigste tal eller tekster ud i en tabel, og sig hvis der er noget, du ikke kan læse sikkert.',
        quiz: [
          { q: 'Hvad betyder multimodal?', opts: ['At AI’en kan forstå flere typer input, fx tekst og billeder', 'At den har flere farver', 'At den er dyr'], a: 0, why: 'Multimodale modeller håndterer flere slags data.' },
          { q: 'AI’en har aflæst beløb fra en kvittering. Hvad gør du?', opts: ['Stoler blindt på dem', 'Tjekker de vigtige tal', 'Sletter kvitteringen'], a: 1, why: 'Aflæsning kan fejle – især ved dårlige billeder.' },
        ],
      },
      {
        id: 'visualiser', title: 'Visualisér viden', minutes: 6,
        lesson: 'AI kan omsætte tekst til strukturer, der er lettere at forstå: mindmaps, tabeller, tidslinjer og diagrammer. Når noget er indviklet, så bed om det som et visuelt overblik i stedet for mere tekst.',
        points: ['Bed om en tabel ved sammenligninger.', 'Bed om et mindmap ved nye emner.', 'Bed om en tidslinje ved forløb og planer.'],
        demo: 'exploded-lab', demoWhy: 'Ligesom produktet bliver forståeligt, når det skilles ad i lag, bliver viden lettere, når den deles op visuelt.',
        task: 'Vælg et emne, du er ved at lære. Bed en AI lave et mindmap over det som indrykket liste.',
        prompt: 'Lav et mindmap over emnet [emne] som indrykket liste med maks. 5 hovedgrene og 3 punkter under hver. Afslut med de 3 vigtigste ting at forstå først.',
        quiz: [
          { q: 'Du skal sammenligne tre værktøjer. Hvad beder du om?', opts: ['En tabel', 'Et digt', 'Et billede af en kat'], a: 0, why: 'Tabeller er bedst til sammenligninger.' },
          { q: 'Hvorfor er et visuelt overblik ofte nyttigt?', opts: ['Det ser sødt ud', 'Det viser sammenhænge hurtigere end lang tekst', 'Det er påkrævet'], a: 1, why: 'Struktur gør det lettere at se helheden.' },
        ],
      },
    ],
  },
  {
    universe: 'data', title: 'AI og data', intro: 'Lad AI hjælpe med tal, regneark og «hvad nu hvis»-spørgsmål.',
    modules: [
      {
        id: 'analyse', title: 'AI som dataanalytiker', minutes: 9,
        lesson: 'Du kan give AI’en et regneark eller en CSV-fil og stille spørgsmål til dataene. Mange AI’er kan køre kode for at regne rigtigt i stedet for at gætte. Bed altid om at se beregningen, så du kan tjekke den.',
        points: ['Upload filen og stil konkrete spørgsmål.', 'Bed om at se beregningen eller koden.', 'Store tal og summer skal tjekkes.'],
        demo: 'mission-control', demoWhy: 'Et dashboard er data gjort forståeligt – det samme kan AI hjælpe dig med.',
        task: 'Eksportér et lille regneark (fx dit budget eller arbejdstimer) og bed en AI finde tre mønstre i det.',
        prompt: 'Her er mine data. Find de 3 vigtigste mønstre, vis hvordan du har regnet, og lav en kort tabel med totaler pr. [kategori/måned].',
        quiz: [
          { q: 'Hvorfor bede AI’en vise beregningen?', opts: ['For at kunne tjekke, at tallene er rigtige', 'For at gøre svaret længere', 'Det er ikke nødvendigt'], a: 0, why: 'Så kan du se, om den har regnet eller gættet.' },
          { q: 'Hvad bør du altid dobbelttjekke?', opts: ['Store summer og vigtige tal', 'Skrifttypen', 'Ingenting'], a: 0, why: 'Fejl i nøgletal kan give forkerte beslutninger.' },
        ],
      },
      {
        id: 'scenarier', title: 'Hvad nu hvis?', minutes: 7,
        lesson: 'AI er god til at opstille scenarier: hvad sker der, hvis prisen stiger, hvis jeg sparer 500 kr. om måneden, eller hvis projektet bliver forsinket? Resultatet er aldrig bedre end antagelserne – bed derfor AI’en skrive antagelserne tydeligt.',
        points: ['Bed om 3 scenarier: forsigtigt, middel, optimistisk.', 'Få antagelserne skrevet ud.', 'Skift én antagelse ad gangen og se effekten.'],
        demo: 'future-simulator', demoWhy: 'Her kan du selv skrue på antagelserne og se, hvordan fremtiden ændrer sig.',
        task: 'Opstil et privat scenarie (fx opsparing til et mål) med en AI og skift én antagelse.',
        prompt: 'Opstil 3 scenarier (forsigtigt, middel, optimistisk) for [situation] over [periode]. Skriv alle antagelser tydeligt, og vis resultatet i en tabel.',
        quiz: [
          { q: 'Hvad bestemmer kvaliteten af et scenarie?', opts: ['Antagelserne', 'Farverne i grafen', 'Hvor hurtigt AI’en svarer'], a: 0, why: 'Forkerte antagelser giver forkerte resultater.' },
          { q: 'Hvordan ser du bedst effekten af en ændring?', opts: ['Skift mange ting på én gang', 'Skift én antagelse ad gangen', 'Spørg en anden AI'], a: 1, why: 'Så ved du, hvad der gjorde forskellen.' },
        ],
      },
      {
        id: 'privatliv', title: 'Data og privatliv', minutes: 6,
        lesson: 'Når du uploader data til en AI-tjeneste, sender du dem til en virksomheds servere. Fjern navne, CPR-numre og andre personoplysninger, før du deler. Arbejdsdata kan være omfattet af regler hos din arbejdsgiver – spørg, hvis du er i tvivl.',
        points: ['Anonymisér: fjern navne og personoplysninger.', 'Tjek indstillinger for, om dine data bruges til træning.', 'Arbejdsdata: følg arbejdspladsens regler.'],
        demo: 'world-data', demoWhy: 'Data kan vises uden at afsløre enkeltpersoner – som her, hvor kun samlede tal vises.',
        task: 'Gennemgå privatlivsindstillingerne i den AI-tjeneste, du bruger mest.',
        prompt: 'Her er nogle data. Erstat alle navne, adresser, telefonnumre og andre personoplysninger med pladsholdere som [PERSON 1], og vis mig resultatet.',
        quiz: [
          { q: 'Hvad gør du før du uploader et regneark med kundenavne?', opts: ['Fjerner eller erstatter personoplysninger', 'Ingenting', 'Gør skriften større'], a: 0, why: 'Personoplysninger bør ikke deles unødigt.' },
          { q: 'Hvor havner data, du uploader til en AI-tjeneste?', opts: ['Kun på din egen computer', 'Hos tjenestens servere', 'Ingen steder'], a: 1, why: 'Derfor skal du tænke over, hvad du deler.' },
        ],
      },
    ],
  },
  {
    universe: 'kreativ', title: 'Byg med AI', intro: 'Fra idé til app: beskriv, byg, test og læg online.',
    modules: [
      {
        id: 'spec', title: 'Beskriv din app', minutes: 10,
        lesson: 'AI bygger bedst, når den ved præcis hvad der skal bygges. Beskriv hvem appen er til, hvilket problem den løser, hvilke skærme der skal være, hvilke data den gemmer, og hvordan den skal se ud. Et skærmbillede eller en skitse er guld værd.',
        points: ['Hvem og hvorfor: målgruppe og problem.', 'Skærme og funktioner: hvad kan man gøre?', 'Data: hvad gemmes, og hvor?', 'Udseende: farver, stil, eksempler.'],
        demo: 'design-playground', demoWhy: 'Hvert valg her – farver, skrift, layout – er en del af en god app-beskrivelse.',
        task: 'Skriv en beskrivelse af en lille app, du selv kunne bruge, med skabelonen. Bed AI’en stille spørgsmål til den, før der bygges.',
        prompt: 'Jeg vil bygge en app. Til: [hvem]. Problem: [hvad løser den]. Skærme: [liste]. Data der gemmes: [liste]. Stil: [farver/eksempler]. Stil mig de 5 vigtigste spørgsmål, før du bygger noget.',
        quiz: [
          { q: 'Hvad er det første, AI’en skal vide om din app?', opts: ['Hvem den er til, og hvilket problem den løser', 'Hvilken skrifttype logoet har', 'Hvad den skal koste'], a: 0, why: 'Formålet styrer alle andre valg.' },
          { q: 'Hvorfor lade AI’en stille spørgsmål først?', opts: ['Den finder huller i beskrivelsen, før den bygger forkert', 'For at bruge mere tid', 'Det er bare høflighed'], a: 0, why: 'Uklarheder er billigere at løse før koden skrives.' },
        ],
      },
      {
        id: 'iterer', title: 'Små skridt og fejlbeskeder', minutes: 8,
        lesson: 'Byg i små skridt: én funktion ad gangen, test den, og gå så videre. Når noget fejler, så giv AI’en den præcise fejlbesked og hvad du gjorde – ikke bare «det virker ikke». Et skærmbillede af fejlen hjælper også.',
        points: ['Én ændring ad gangen – så ved du, hvad der gik galt.', 'Kopiér den præcise fejlbesked.', 'Beskriv: hvad gjorde du, hvad forventede du, hvad skete der?'],
        demo: 'ai-brain', demoWhy: 'Netværket bliver bedre i mange små justeringer – sådan bliver en app også god.',
        task: 'Næste gang noget ikke virker, så skriv fejlrapporten med de tre punkter herunder.',
        prompt: 'Det virker ikke. Det gjorde jeg: [skridt]. Jeg forventede: [forventet]. Det skete: [faktisk]. Fejlbesked: [indsæt præcist]. Find årsagen, før du retter noget.',
        quiz: [
          { q: 'Hvad er den bedste fejlrapport til en AI?', opts: ['«Det virker ikke»', 'Hvad du gjorde, hvad du forventede, hvad der skete + fejlbeskeden', 'Et smiley'], a: 1, why: 'Præcise oplysninger giver præcise løsninger.' },
          { q: 'Hvorfor bygge én funktion ad gangen?', opts: ['Så du ved, hvilken ændring der skabte en fejl', 'Fordi AI kun kan én ting', 'Det er langsommere'], a: 0, why: 'Små skridt gør fejl lette at finde.' },
        ],
      },
      {
        id: 'online', title: 'Fra idé til online', minutes: 9,
        lesson: 'Når appen virker, skal den gemmes og lægges ud. Git gemmer versioner, så du altid kan gå tilbage. GitHub opbevarer koden online, og en tjeneste som GitHub Pages kan vise en statisk side gratis. Hemmeligheder som API-nøgler må aldrig ligge i koden på GitHub.',
        points: ['Git = versioner («commits») du kan vende tilbage til.', 'GitHub = koden online; GitHub Pages = gratis hjemmeside.', 'API-nøgler skal holdes ude af koden.'],
        demo: 'storyboard', demoWhy: 'Ligesom en film klippes, før den udgives, gemmer og tester du versioner, før appen går live.',
        task: 'Kig på dette projekt på GitHub og find listen over commits. Hvad har hver version ændret?',
        prompt: 'Forklar mig git og GitHub med en hverdagsmetafor. Hvad er en commit, en branch og en push – og hvordan undgår jeg at lægge hemmelige nøgler online?',
        quiz: [
          { q: 'Hvad er en commit?', opts: ['En gemt version af dit projekt', 'En fejl', 'En betalingsform'], a: 0, why: 'Commits er punkter i historikken, du kan gå tilbage til.' },
          { q: 'Hvor må en API-nøgle IKKE ligge?', opts: ['I koden på et offentligt GitHub-repo', 'I en lokal, ignoreret konfigurationsfil', 'I en password-manager'], a: 0, why: 'Offentlig kode kan læses af alle – også nøglen.' },
        ],
      },
    ],
  },
];

export const ALL_MODULES = TRACKS.flatMap((t) => t.modules.map((m) => ({ ...m, track: t.universe })));
export const XP_PER_MODULE = 100;
export const LEVELS = ['Nysgerrig', 'Udforsker', 'Prompter', 'Bygger', 'AI-mester'];
