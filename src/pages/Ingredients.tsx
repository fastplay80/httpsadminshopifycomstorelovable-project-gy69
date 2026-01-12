import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, ShieldCheck, MapPin, Heart } from "lucide-react";

const ingredients = [
  {
    name: "Fichi del Cilento",
    certification: "DOP",
    description: "Raccolti a mano nei mesi di agosto e settembre sulle colline del Cilento. Dolcezza naturale e polpa morbida, perfetti per le nostre confetture.",
    season: "Agosto – Settembre",
    image: "https://images.unsplash.com/photo-1601379760883-1bb497c558f0?w=600&q=80"
  },
  {
    name: "Limoni della Costa d'Amalfi",
    certification: "IGP",
    description: "Agrumi profumati dalla buccia spessa e aromatica, coltivati sui terrazzamenti a picco sul mare. Note fresche e vivaci.",
    season: "Febbraio – Ottobre",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80"
  },
  {
    name: "Pomodori San Marzano",
    certification: "DOP",
    description: "Il re dei pomodori italiani. Polpa densa, bassa acidità e sapore equilibrato. Base dei nostri sughi pronti.",
    season: "Luglio – Settembre",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80"
  },
  {
    name: "Olio EVO del Cilento",
    certification: "DOP",
    description: "Spremuto a freddo da olive autoctone. Fruttato leggero con note di mandorla, fondamentale in ogni nostra preparazione.",
    season: "Ottobre – Dicembre",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80"
  },
  {
    name: "Carciofi di Paestum",
    certification: "IGP",
    description: "Teneri e privi di spine, con cuore carnoso e sapore delicato. Protagonisti dei nostri sott'olio più pregiati.",
    season: "Febbraio – Maggio",
    image: "https://images.unsplash.com/photo-1580294647332-87d8abeb05a4?w=600&q=80"
  },
  {
    name: "Peperoncino del Cilento",
    certification: "Presidio Slow Food",
    description: "Piccante ma aromatico, essiccato al sole secondo tradizione. Aggiunge carattere senza sovrastare.",
    season: "Agosto – Ottobre",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80"
  }
];

const noCompromises = [
  "Conservanti artificiali",
  "Coloranti sintetici",
  "Aromi artificiali",
  "OGM",
  "Zuccheri raffinati aggiunti",
  "Addensanti industriali"
];

const Ingredients = () => {
  return (
    <>
      <Helmet>
        <title>I Nostri Ingredienti | Minnelea – Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="Ingredienti DOP e IGP selezionati dal Parco Nazionale del Cilento. Fichi, limoni, pomodori e olio EVO: la qualità alla base delle nostre conserve artigianali." 
        />
        <link rel="canonical" href="https://minnelea.com/ingredienti" />
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container max-w-4xl text-center">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              La Nostra Filosofia
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-foreground">
              Ingredienti scelti,<br />mai casuali
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ogni vasetto Minnelea inizia da qui: dalla selezione rigorosa di materie prime 
              certificate, raccolte nel momento perfetto di maturazione.
            </p>
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container max-w-3xl">
            <blockquote className="text-center">
              <p className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed mb-6">
                "Non cerchiamo ingredienti per le nostre ricette. 
                Creiamo ricette per valorizzare i nostri ingredienti."
              </p>
              <cite className="text-sm tracking-wide text-muted-foreground not-italic">
                — Filosofia Minnelea
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Ingredients Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Materie Prime
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
                I protagonisti delle nostre conserve
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ingredients.map((ingredient, index) => (
                <article 
                  key={index}
                  className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-xl text-foreground">
                        {ingredient.name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-0.5 bg-accent/10 text-accent rounded">
                        {ingredient.certification}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {ingredient.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Raccolta:</span> {ingredient.season}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Territory Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Il Territorio
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">
                  Parco Nazionale del Cilento
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Patrimonio UNESCO e culla della Dieta Mediterranea. Qui, tra colline, 
                  uliveti e costa, nascono ingredienti unici al mondo.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Il microclima, la biodiversità e le tradizioni agricole millenarie 
                  creano condizioni irripetibili. Ogni prodotto porta con sé 
                  l'identità di questo territorio straordinario.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>Patrimonio UNESCO</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Leaf className="h-4 w-4 text-accent" />
                    <span>Dieta Mediterranea</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-accent" />
                    <span>Biodiversità unica</span>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80"
                  alt="Paesaggio del Cilento con uliveti e colline"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Producers Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-3xl text-center">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Filiera Corta
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">
              I nostri produttori
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lavoriamo con una rete selezionata di agricoltori locali, 
              molti dei quali custodiscono tradizioni familiari da generazioni.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Conosciamo ogni campo, ogni albero, ogni mano che raccoglie. 
              Questa vicinanza ci permette di garantire qualità costante 
              e tracciabilità completa, dal seme al vasetto.
            </p>
          </div>
        </section>

        {/* No Compromises Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  I Nostri Standard
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                  Niente compromessi
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Ciò che non troverai mai nelle nostre conserve:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {noCompromises.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border"
                  >
                    <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-2xl text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4">
              Scopri il risultato
            </h2>
            <p className="text-muted-foreground mb-8">
              Ingredienti eccezionali, lavorati con cura artigianale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/collezioni/tutti-i-prodotti">Scopri i Prodotti</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/chi-siamo">La Nostra Storia</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Ingredients;
