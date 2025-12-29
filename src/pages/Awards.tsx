import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const Awards = () => {
  return (
    <>
      <Helmet>
        <title>Premi e Riconoscimenti | Minnelea - Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="I riconoscimenti ottenuti da Minnelea: WineHunter Award e Great Taste Awards. Una conferma del metodo e della qualità delle nostre conserve artigianali." 
        />
        <meta property="og:title" content="Premi e Riconoscimenti | Minnelea" />
        <meta property="og:description" content="Una conferma osservata attraverso l'assaggio." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://minnelea.it/premi" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Premi e Riconoscimenti - Minnelea",
            "description": "I riconoscimenti ottenuti da Minnelea per le sue conserve artigianali",
            "mainEntity": {
              "@type": "Organization",
              "name": "Minnelea",
              "award": [
                "WineHunter Award 2024 - 3 Gold",
                "Great Taste Awards 2025 - 1 Star"
              ]
            }
          })}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl text-center">
            <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-6 block">
              Riconoscimenti
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
              Premi e Riconoscimenti
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic">
              Una conferma osservata attraverso l'assaggio.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I riconoscimenti che Minnelea ha ricevuto nel corso degli anni non rappresentano un obiettivo in sé, 
                ma il risultato naturale di un lavoro coerente, condotto con continuità e rispetto.
              </p>
              <p>
                Ogni premio riflette un metodo: la scelta attenta degli ingredienti, 
                il legame con il territorio del Cilento, e l'impegno costante verso una qualità che non ammette scorciatoie.
              </p>
            </div>
          </div>
        </section>

        {/* WineHunter Award Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <div className="sticky top-28">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-4 block">
                    2024
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
                    WineHunter Award
                  </h2>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-serif text-5xl md:text-6xl text-accent">3</span>
                    <span className="text-xl text-muted-foreground">Gold Award</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Il WineHunter Award è un riconoscimento istituito da Helmuth Köcher, 
                  fondatore del Merano WineFestival, una delle manifestazioni enogastronomiche 
                  più autorevoli del panorama italiano ed europeo.
                </p>
                <p>
                  Il premio viene assegnato a prodotti che si distinguono per qualità, 
                  equilibrio gustativo, identità territoriale e coerenza produttiva. 
                  La valutazione avviene attraverso degustazioni tecniche condotte da panel 
                  di esperti del settore.
                </p>
                <p>
                  Nel 2024, tre prodotti Minnelea hanno ottenuto il Gold Award, 
                  il massimo riconoscimento previsto dal sistema di valutazione. 
                  Un risultato che conferma l'attenzione dedicata a ogni fase della lavorazione, 
                  dalla selezione delle materie prime al confezionamento finale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
          <hr className="border-border/60" />
        </div>

        {/* Great Taste Awards Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <div className="sticky top-28">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-4 block">
                    2025
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
                    Great Taste Awards
                  </h2>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-serif text-5xl md:text-6xl text-accent">1</span>
                    <span className="text-xl text-muted-foreground">Stella</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I Great Taste Awards sono considerati il più importante riconoscimento 
                  internazionale per i prodotti alimentari di qualità. Organizzati dalla 
                  Guild of Fine Food nel Regno Unito, rappresentano uno standard di riferimento 
                  a livello globale.
                </p>
                <p>
                  La valutazione avviene attraverso degustazioni alla cieca, condotte da una 
                  giuria internazionale composta da chef, buyer, giornalisti e critici 
                  gastronomici. I prodotti vengono giudicati esclusivamente sul merito 
                  organolettico, senza conoscerne la provenienza o il produttore.
                </p>
                <p>
                  Nel 2025, Minnelea ha ottenuto una stella, riconoscimento che certifica 
                  la chiarezza e l'equilibrio del profilo gustativo. Un risultato significativo, 
                  soprattutto in un contesto extra-territoriale dove il prodotto viene valutato 
                  senza il sostegno della narrazione di origine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meaning Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4 block">
                Significato
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Il valore dei riconoscimenti
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Per Minnelea, i premi non sono traguardi da celebrare, ma punti di riferimento. 
                Indicatori che confermano una direzione, non che alimentano un'ambizione.
              </p>
              <p>
                Ogni riconoscimento porta con sé una responsabilità: mantenere la coerenza 
                che lo ha generato, continuare a lavorare con lo stesso rigore, rispettare 
                chi sceglie i nostri prodotti affidandosi a questa qualità.
              </p>
              <p>
                Il premio rafforza il cammino intrapreso. Non lo celebra: lo conferma.
              </p>
            </div>
          </div>
        </section>

        {/* Connection to other pages */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                Continua a scoprire Minnelea
              </h2>
              <p className="text-muted-foreground">
                Un racconto che si sviluppa attraverso storia, ingredienti e territorio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/chi-siamo"
                className="group p-8 border border-border rounded-sm hover:border-accent/50 transition-colors"
              >
                <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3 block">
                  Scopri
                </span>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  La Nostra Storia
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Le origini, la famiglia, il territorio del Cilento.
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-foreground group-hover:text-accent transition-colors">
                  Leggi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                to="/ingredienti"
                className="group p-8 border border-border rounded-sm hover:border-accent/50 transition-colors"
              >
                <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3 block">
                  Scopri
                </span>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  Ingredienti
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  La selezione, la provenienza, il rispetto per la materia prima.
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-foreground group-hover:text-accent transition-colors">
                  Leggi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Awards;
