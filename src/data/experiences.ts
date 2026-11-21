export type UniverseId = 'data' | 'visuel' | 'viden' | 'spil' | 'kreativ';
export type Status = 'demo' | 'preview';

export interface Universe {
  id: UniverseId;
  name: string;
  tagline: string;
  color: string;
}

export interface Experience {
  id: string;
  nr: number;
  title: string;
  universe: UniverseId;
  short: string;
  concept: string;
  features: string[];
  wow: string;
  status: Status;
}

export const UNIVERSES: Universe[] = [
  { id: 'data', name: 'Data & Fremtid', tagline: 'Styr projekter, simulér scenarier og udforsk verden i tal.', color: 'var(--cyan)' },
  { id: 'visuel', name: 'Visuel Magi', tagline: 'Tegneserier, visuelle noter og produkter set indefra.', color: 'var(--violet)' },
  { id: 'viden', name: 'Viden & Læring', tagline: 'Rejs gennem viden, tid og færdigheder.', color: 'var(--gold)' },
  { id: 'spil', name: 'Spil & Opdagelser', tagline: 'Løs gåder, opklar sager og træf svære valg.', color: 'var(--orange)' },
  { id: 'kreativ', name: 'Kreativitet & Teknologi', tagline: 'Design, neurale netværk og film i ét studie.', color: '#7BE0A6' },
];

export const universeById = (id: UniverseId) => UNIVERSES.find((u) => u.id === id)!;

export const EXPERIENCES: Experience[] = [
  {
    id: 'mission-control', nr: 1, title: 'Mission Control', universe: 'data', status: 'demo',
    short: 'Styr tre teknologiprojekter fra et futuristisk kontrolcenter.',
    concept: 'Et operationsdashboard for de fiktive projekter Nova, Atlas og Pulse.',
    features: ['Vælg projekt', 'Markér opgaver', 'Filtrér status', 'Justér ressourcer', 'Live budget og prognose', 'Skift uge/måned', 'Milepæle', 'KPI-forklaringer', 'Nulstil demo'],
    wow: 'Flere diagrammer opdateres samtidigt, når du ændrer noget.',
  },
  {
    id: 'future-simulator', nr: 2, title: 'Future Simulator', universe: 'data', status: 'demo',
    short: 'Skru på fire parametre og se fremtidsscenarier ændre sig live.',
    concept: 'Et scenarielaboratorium med tre forenklede regnemodeller.',
    features: ['Tre scenarier', 'Fire parametre', 'Live grafer', 'Sammenlign to scenarier', 'Antagelser vist åbent', 'Forklaring af ændringer', 'Nulstil'],
    wow: 'Grafer og resultater opdateres mens du trækker i sliderne.',
  },
  {
    id: 'world-data', nr: 3, title: 'World Data Explorer', universe: 'data', status: 'demo',
    short: 'Et lysende verdenskort med datalag om befolkning, energi og teknologi.',
    concept: 'Interaktivt kort, hvor udtrykket skifter med datalaget. Alle konstruerede tal mærkes som demo.',
    features: ['Vælg land', 'Faktapanel', 'Skift kategori', 'Sammenlign to lande', 'Vælg år', 'Kort/graf', 'Zoom og panorér', 'Definitioner'],
    wow: 'Kortets udtryk ændres med datalaget.',
  },
  {
    id: 'comic-world', nr: 4, title: 'Comic World', universe: 'visuel', status: 'demo',
    short: 'Tre originale tegneserier, hvor dine valg ændrer næste scene.',
    concept: 'Neon City, The Missing Signal og One Small Choice med illustrerede paneler.',
    features: ['Vælg historie', 'Bladre og kapitler', 'Træf valg', 'Alternative forløb', 'Gem læseposition', 'Rolig læsetilstand'],
    wow: 'Valg ændrer den næste illustrerede scene.',
  },
  {
    id: 'visual-notes', nr: 5, title: 'Visual Notes Studio', universe: 'visuel', status: 'demo',
    short: 'Sketchnotes og mindmaps om AI, hjernen, vaner og teknologi.',
    concept: 'Et bibliotek af håndtegnede, farvekodede vidensbilleder.',
    features: ['Vælg emne', 'Mindmap/infografik', 'Zoom', 'Klik på begreber', 'Fremhæv forbindelser', 'Opsummering'],
    wow: 'Grenene folder sig animeret ud.',
  },
  {
    id: 'exploded-lab', nr: 6, title: '3D Exploded Lab', universe: 'visuel', status: 'demo',
    short: 'Skil en gaming-pc, et kamera eller en motor ad – lag for lag.',
    concept: 'Et mørkt produktstudie med svævende komponenter.',
    features: ['Vælg produkt', 'Rotér og zoom', 'Eksploderet visning', 'Justér adskillelse', 'Vælg del', 'Saml igen'],
    wow: 'Lagvis adskillelse af produktet.',
  },
  {
    id: 'knowledge-galaxy', nr: 7, title: 'Knowledge Galaxy', universe: 'viden', status: 'demo',
    short: 'Fem planeter fulde af viden, quizzer og XP.',
    concept: 'En stjernehimmel, hvor hver planet er et emne: AI, universet, hjernen, teknologi og historie.',
    features: ['Vælg planet', 'Læringsmoduler', 'Visuelle forklaringer', 'Quizzer', 'XP og progression', 'Relaterede emner', 'Gemmes lokalt'],
    wow: 'Hver planet har sin egen overgang og identitet.',
  },
  {
    id: 'time-machine', nr: 8, title: 'Time Machine', universe: 'viden', status: 'demo',
    short: 'Træk dig gennem historien fra oldtiden til internettet.',
    concept: 'En stor tidslinje, hvor miljøet skifter med perioden.',
    features: ['Træk i tidslinjen', 'Vælg periode', 'Åbn begivenhed', 'Sammenlign perioder', 'Emnefiltre', 'Favoritter'],
    wow: 'Det visuelle miljø skifter med tidsperioden.',
  },
  {
    id: 'skilltree', nr: 9, title: 'SkillTree Academy', universe: 'viden', status: 'demo',
    short: 'Lås færdigheder op i AI, problemløsning og digital kreativitet.',
    concept: 'Et RPG-inspireret færdighedstræ med korte missioner.',
    features: ['Vælg område', 'Kort lektion', 'Praktisk udfordring', 'Quiz og XP', 'Lås næste node op', 'Niveauoversigt'],
    wow: 'Forbindelserne lyser op, når du gennemfører.',
  },
  {
    id: 'detective', nr: 10, title: 'Detective Mode', universe: 'spil', status: 'demo',
    short: 'Opklar "The Vanishing Prototype" på et filmisk bevisbræt.',
    concept: 'En original kriminalgåde om et forsvundet teknologiprodukt.',
    features: ['Sagsmappe', 'Undersøg beviser', 'Afhøringer', 'Forbind spor', 'Tidslinje', 'Fremsæt teori'],
    wow: 'Nye forbindelser afsløres, når du finder de rigtige spor.',
  },
  {
    id: 'escape-ai', nr: 11, title: 'Escape AI', universe: 'spil', status: 'demo',
    short: 'Slip ud af "Laboratory 07" ved at løse tre gåder.',
    concept: 'Et logisk digitalt escape room med låste døre og kontrolpaneler.',
    features: ['Undersøg rum', 'Find spor', 'Indtast koder', 'Kombinér oplysninger', 'Valgfrie hints', 'Genstart'],
    wow: 'Miljøet ændrer sig, når en gåde løses.',
  },
  {
    id: 'decision-lab', nr: 12, title: 'Decision Lab', universe: 'spil', status: 'demo',
    short: 'Red virksomheden gennem budgetkrise, forsinkelser og nye muligheder.',
    concept: 'En beslutningssimulation med konsekvenskæder og live status.',
    features: ['Beslutningskort', 'Konsekvenser', 'Budget og tilfredshed', 'Risici', 'Flere runder', 'Slutresultat'],
    wow: 'Et visuelt beslutningstræ med forskellige udfald.',
  },
  {
    id: 'design-playground', nr: 13, title: 'Design Playground', universe: 'kreativ', status: 'demo',
    short: 'Byg et gamingværelse, en brandidentitet eller en mobilforside.',
    concept: 'Et kreativt studie med stort live-preview og stilkort.',
    features: ['Vælg designområde', 'Farver og fonte', 'Stil og layout', 'Live-preview', 'Side-om-side', 'Gem favorit'],
    wow: 'Preview ændrer sig straks ved hvert stilvalg.',
  },
  {
    id: 'ai-brain', nr: 14, title: 'AI Brain Explorer', universe: 'kreativ', status: 'demo',
    short: 'Se et lille neuralt netværk lære at sortere punkter.',
    concept: 'En forenklet model med lysende neuroner, datapunkter og fejlkurve.',
    features: ['Vis arkitektur', 'Ændr træningsdata', 'Start simulation', 'Fejlkurve', 'Læringshastighed', 'Før/efter'],
    wow: 'Klassifikationsområderne ændrer sig mens netværket lærer.',
  },
  {
    id: 'storyboard', nr: 15, title: 'Storyboard Cinema', universe: 'kreativ', status: 'demo',
    short: 'Klip sci-fi-historien "Signal From Tomorrow" i et filmstudie.',
    concept: 'Et klipperum med storyboard, kameravinkler og tidslinje.',
    features: ['Vælg scene', 'Skift kameravinkel', 'Nær/total', 'Omarrangér scener', 'Alternative forløb', 'Sceneoversigt'],
    wow: 'Preview skifter ved vinkel eller scenerækkefølge.',
  },
];

export const expById = (id: string) => EXPERIENCES.find((e) => e.id === id);
