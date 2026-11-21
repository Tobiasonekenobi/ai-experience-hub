// Salgsindhold: hvad hver oplevelse kunne blive til for en virksomhed, og hvad der tilbydes.
// Ingen opfundne priser, kunder eller udtalelser.

/** Udfyld for at vise kontaktknap. Tom e-mail = knappen viser «kontakt kommer snart». */
export const CONTACT = {
  name: '',
  email: '',
};

export const USE_CASES: Record<string, { title: string; text: string }> = {
  'mission-control': { title: 'Projekt-dashboard', text: 'Et live overblik over jeres projekter: opgaver, budget og deadlines på én skærm, der opdaterer sig selv.' },
  'future-simulator': { title: 'Scenarie-beregner', text: 'Lad kunder eller ledelse skrue på tallene og se konsekvenserne – fx en prisberegner eller en besparelsesberegner.' },
  'world-data': { title: 'Interaktivt datakort', text: 'Vis jeres data på et kort: butikker, kunder, leverancer eller salg fordelt på områder.' },
  'comic-world': { title: 'Historiefortælling med valg', text: 'En kampagne eller et onboarding-forløb, hvor brugeren selv vælger vejen – mere engagerende end en PDF.' },
  'visual-notes': { title: 'Visuel videnbank', text: 'Gør interne processer, produkter eller kurser til klikbare mindmaps, som nye medarbejdere forstår hurtigt.' },
  'exploded-lab': { title: 'Produktvisning i lag', text: 'Vis hvad der er inde i jeres produkt – til webshop, messer eller salgsmøder.' },
  'knowledge-galaxy': { title: 'Læringsunivers', text: 'Et e-læringsforløb med moduler, quizzer og point, så medarbejdere eller kunder faktisk gennemfører.' },
  'time-machine': { title: 'Interaktiv tidslinje', text: 'Fortæl virksomhedens historie, en produktudvikling eller en køreplan som en tidslinje man kan trække i.' },
  skilltree: { title: 'Kompetencetræ', text: 'Onboarding eller efteruddannelse, hvor man låser nye færdigheder op trin for trin.' },
  detective: { title: 'Gamificeret træning', text: 'Træn fx sikkerhed, kvalitet eller kundeservice gennem en sag, der skal opklares.' },
  'escape-ai': { title: 'Digitalt escape room', text: 'Teambuilding, messe-aktivitet eller kampagnespil – med jeres egne gåder og budskaber.' },
  'decision-lab': { title: 'Beslutningssimulator', text: 'Ledertræning eller salgstræning, hvor valg har konsekvenser, man kan se med det samme.' },
  'design-playground': { title: 'Produktkonfigurator', text: 'Lad kunderne vælge farver, materialer og varianter og se resultatet live, før de køber.' },
  'ai-brain': { title: 'Forklar teknologien', text: 'Gør et komplekst produkt eller en tjeneste forståelig med en interaktiv forklaring i stedet for tekst.' },
  storyboard: { title: 'Interaktiv præsentation', text: 'Pitch, kampagne eller produktlancering som en klikbar historie med scener og valg.' },
};

export const SERVICES = [
  { icon: '📊', title: 'Dashboards og værktøjer', text: 'Overblik over projekter, salg eller data – bygget til netop jeres arbejdsgang.', ex: ['mission-control', 'future-simulator', 'world-data'] },
  { icon: '🎓', title: 'Læring og onboarding', text: 'Kurser, quizzer og forløb med point og progression, som folk gennemfører.', ex: ['knowledge-galaxy', 'skilltree', 'visual-notes'] },
  { icon: '🎮', title: 'Kampagner og spil', text: 'Interaktive oplevelser til markedsføring, messer og teambuilding.', ex: ['escape-ai', 'detective', 'comic-world'] },
  { icon: '🧩', title: 'Produktvisning', text: 'Konfiguratorer og visninger, der lader kunden udforske produktet selv.', ex: ['design-playground', 'exploded-lab', 'storyboard'] },
];

export const STEPS = [
  { title: 'Kort snak', text: 'Du fortæller, hvad du gerne vil opnå. Vi finder ud af, om en af oplevelserne her ligner det, du har brug for.' },
  { title: 'Første udkast', text: 'Du får en klikbar prototype at se, så du kan mærke idéen, før vi bygger færdigt.' },
  { title: 'Tilpasning og lancering', text: 'Vi justerer indhold, farver og tekst til jeres brand og lægger det online.' },
];

export const FAQ = [
  { q: 'Hvad koster det?', a: 'Det afhænger af omfanget. Efter en kort snak får du et konkret bud, før noget sættes i gang.' },
  { q: 'Kan det bruge vores egne data?', a: 'Ja. Oplevelserne her bruger demodata, men de kan kobles på jeres egne tal, produkter eller indhold.' },
  { q: 'Virker det på mobil?', a: 'Ja. Alt her er bygget mobil-først og virker også på computer og tablet.' },
  { q: 'Hvordan er det bygget?', a: 'Med moderne webteknologi og AI-værktøjer som hjælp i udviklingen. Det gør det hurtigt at gå fra idé til noget, man kan klikke på.' },
];
