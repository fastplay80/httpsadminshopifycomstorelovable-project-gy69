import { Shield, MapPin, Store, CheckCircle2 } from "lucide-react";

const ExclusivityPolicy = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Distribuzione Esclusiva
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Un Partner, Un Territorio
            </h2>
            <div className="divider-editorial" />
          </div>
          
          {/* Policy cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Large cities policy */}
            <div className="bg-card p-8 rounded-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-medium">Grandi Città</h3>
              </div>
              <p className="text-body mb-4">
                Un solo partner per quartiere. Proteggiamo l'esclusività del marchio 
                garantendo che ogni partner operi in una zona distinta.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Roma, Milano, Parigi, Monaco...
              </p>
            </div>
            
            {/* Small cities policy */}
            <div className="bg-card p-8 rounded-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-medium">Città &lt; 100.000 abitanti</h3>
              </div>
              <p className="text-body mb-4">
                Esclusiva completa sulla città. Un unico partner Minnelea 
                per l'intero territorio comunale.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Esclusiva territoriale garantita
              </p>
            </div>
          </div>
          
          {/* Category limit */}
          <div className="bg-card p-8 md:p-12 rounded-sm border border-border">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Store className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium mb-4">
                  Massimo Due Categorie per Area
                </h3>
                <p className="text-body mb-6">
                  Nella stessa zona collaboriamo con un massimo di due tipologie di partner:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-medium">Ristoranti / Pizzerie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-medium">Enoteche / Gastronomie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key principles */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8">
              <span className="text-sm font-medium tracking-wide text-muted-foreground">
                Protezione del brand
              </span>
              <span className="text-muted-foreground/30">•</span>
              <span className="text-sm font-medium tracking-wide text-muted-foreground">
                Nessuna concorrenza interna
              </span>
              <span className="text-muted-foreground/30">•</span>
              <span className="text-sm font-medium tracking-wide text-muted-foreground">
                Integrità dei prezzi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusivityPolicy;
