import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const About = () => {
  return (
    <>
      <Helmet>
        <title>La Nostra Storia | Minnelea - Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="Scopri la storia di Minnelea: tradizione, passione e sapori autentici dal cuore del Parco Nazionale del Cilento." 
        />
        <meta property="og:title" content="La Nostra Storia | Minnelea" />
        <meta property="og:description" content="Tradizione, passione e sapori autentici dal Cilento." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "La Nostra Storia - Minnelea",
            "description": "La storia di Minnelea e delle sue conserve artigianali",
            "mainEntity": {
              "@type": "Organization",
              "name": "Minnelea",
              "description": "Conserve artigianali dal Cilento",
              "foundingDate": "2018",
              "foundingLocation": {
                "@type": "Place",
                "name": "Cilento, Campania, Italia"
              }
            }
          })}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop"
              alt="Paesaggio del Cilento"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-20">
            <div className="max-w-2xl">
              <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-6 block">
                La nostra storia
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-8">
                Dal Cilento,<br />
                <span className="text-accent">con amore.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Una storia di famiglia, tradizione e passione per i sapori autentici della nostra terra.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl text-center">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic">
              "Crediamo che ogni vasetto debba raccontare una storia: quella della terra, del sole e delle mani che lo hanno creato."
            </blockquote>
            <cite className="block mt-8 text-muted-foreground not-italic">
              — La famiglia Minnelea
            </cite>
          </div>
        </section>

        {/* Story Section 1 */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-4 block">
                  Le origini
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Tutto è iniziato in una cucina di famiglia
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Nel 2018, nel cuore del Parco Nazionale del Cilento, abbiamo deciso di dare nuova vita alle ricette che le nostre nonne ci avevano tramandato. Ricette scritte a mano su quaderni ingialliti, profumate di fichi maturi e limoni appena colti.
                  </p>
                  <p>
                    Non volevamo semplicemente produrre conserve. Volevamo catturare l'essenza del Cilento in ogni vasetto: il profumo delle colline al tramonto, il sapore della frutta baciata dal sole mediterraneo, la cura paziente di chi conosce i ritmi della natura.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&h=1000&fit=crop"
                    alt="Preparazione artigianale delle confetture"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4 block">
                I nostri valori
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Cosa ci guida ogni giorno
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Value 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/10">
                  <span className="font-serif text-3xl text-accent">01</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                  Autenticità
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizziamo solo ingredienti del territorio, selezionati da agricoltori locali che condividono la nostra passione per la qualità.
                </p>
              </div>

              {/* Value 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/10">
                  <span className="font-serif text-3xl text-accent">02</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                  Tradizione
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le nostre ricette sono tramandate da generazioni. Le preserviamo con rispetto, innovando solo dove serve per esaltarle.
                </p>
              </div>

              {/* Value 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/10">
                  <span className="font-serif text-3xl text-accent">03</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                  Sostenibilità
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rispettiamo i cicli naturali, evitiamo sprechi e utilizziamo packaging riciclabile. La nostra terra merita cura.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 2 */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=1000&fit=crop"
                    alt="Fichi del Cilento"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-4 block">
                  Il territorio
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Il Cilento, patrimonio UNESCO
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Il Parco Nazionale del Cilento, patrimonio UNESCO, è molto più di un luogo: è un ecosistema unico dove la dieta mediterranea è nata e continua a vivere.
                  </p>
                  <p>
                    I nostri fichi, i nostri limoni, i nostri pomodori crescono su terrazzamenti antichi, accarezzati dalla brezza marina e nutriti da un terreno ricco di storia. Ogni ingrediente porta con sé secoli di sapienza contadina.
                  </p>
                  <p>
                    Quando apri un vasetto Minnelea, non stai solo gustando una confettura: stai assaporando il Cilento stesso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 md:py-28 bg-foreground text-background">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-background/60 font-medium mb-4 block">
                Riconoscimenti
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background">
                Premi e riconoscimenti
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 border border-background/20 rounded-sm">
                <div className="font-serif text-5xl md:text-6xl text-primary mb-4">★★★</div>
                <h3 className="text-xl font-medium mb-2">Great Taste Awards</h3>
                <p className="text-background/60">2024 - Confettura di Fichi</p>
              </div>
              <div className="p-8 border border-background/20 rounded-sm">
                <div className="font-serif text-5xl md:text-6xl text-primary mb-4">★★</div>
                <h3 className="text-xl font-medium mb-2">Great Taste Awards</h3>
                <p className="text-background/60">2023 - Marmellata di Limoni</p>
              </div>
              <div className="p-8 border border-background/20 rounded-sm">
                <div className="font-serif text-5xl md:text-6xl text-primary mb-4">🏅</div>
                <h3 className="text-xl font-medium mb-2">Slow Food</h3>
                <p className="text-background/60">Presidio del gusto</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team/Family Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium mb-4 block">
                  La famiglia
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Dietro ogni vasetto, c'è una famiglia
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Minnelea non è un'azienda: è una famiglia che ha scelto di condividere con il mondo i sapori della propria infanzia.
                  </p>
                  <p>
                    Ogni confettura è preparata con la stessa cura con cui la prepareremmo per i nostri figli. Perché crediamo che il cibo buono sia un atto d'amore.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-border/60">
                  <Link
                    to="/contatti"
                    className="group inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <span className="font-medium">Vieni a trovarci</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=800&fit=crop"
                    alt="La famiglia Minnelea"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Assaggia la nostra storia
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Scopri le nostre confetture artigianali e porta sulla tua tavola i sapori autentici del Cilento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collezioni/confetture"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 
                         bg-foreground text-background text-sm font-medium
                         rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Scopri i prodotti
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 
                         bg-transparent text-foreground text-sm font-medium
                         border border-foreground/20 rounded-sm
                         hover:bg-foreground/5 transition-colors"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
