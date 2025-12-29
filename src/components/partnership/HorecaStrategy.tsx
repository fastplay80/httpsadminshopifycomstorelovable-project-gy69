import { Wine, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

const HorecaStrategy = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              The Customer Journey
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Scoprire Minnelea, passo dopo passo
            </h2>
            <div className="divider-editorial" />
          </div>
          
          {/* In Enoteca - Discovery */}
          <div className="bg-secondary/30 p-8 md:p-12 rounded-sm mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Wine className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium">In Enoteca</h3>
            </div>
            
            <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed mb-6">
              Minnelea si scopre nei luoghi giusti.
            </p>
            
            <p className="text-body max-w-3xl">
              Enoteche indipendenti e boutique gourmet dove i prodotti vengono curati, 
              spiegati e rispettati. Qui, la prima interazione non riguarda l'acquisto, 
              ma la scoperta e la fiducia.
            </p>
          </div>

          {/* Capsule Collection */}
          <div className="bg-card p-8 md:p-12 rounded-sm border border-border mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-medium">Capsule Collection Minnelea</h3>
            </div>
            
            <p className="text-body mb-8 max-w-3xl">
              Con partner selezionati — enoteche o ristoranti che condividono i nostri valori — 
              Minnelea sviluppa capsule collection esclusive, progettate insieme.
            </p>
            
            <p className="text-sm text-muted-foreground mb-6">
              Non si tratta di prodotti personalizzati, ma di:
            </p>
            
            <ul className="space-y-3 mb-8 max-w-2xl">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">—</span>
                <span className="text-foreground">Selezioni curate per il pubblico del partner</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">—</span>
                <span className="text-foreground">Abbinamenti pensati per contesto e identità</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">—</span>
                <span className="text-foreground">Edizioni limitate nate da una visione condivisa</span>
              </li>
            </ul>
            
            <p className="font-serif text-lg text-foreground italic">
              Ogni capsule collection nasce dal dialogo.<br />
              Stessi valori. Stesso rispetto per gli ingredienti. Una storia unica.
            </p>
          </div>

          {/* Transition to Retail */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary/30 hidden md:block" />
            </div>
            <div className="text-center md:text-left p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-6">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Verso il Retail</h3>
              <p className="text-body">
                Il cliente assaggia, comprende e costruisce fiducia.<br />
                Solo allora Minnelea passa dal luogo della scoperta alla casa, 
                attraverso la selezione retail.
              </p>
            </div>
          </div>

          {/* Closing statement */}
          <div className="bg-secondary/50 p-8 md:p-12 rounded-sm text-center">
            <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
              Per Minnelea, il valore non si crea spingendo i prodotti,<br />
              ma costruendo un'esperienza coerente, dal luogo al vasetto.
            </p>
          </div>
          
          {/* Order minimums */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-sm border border-border">
                <h4 className="font-serif font-medium text-lg mb-2">Prodotti Horeca</h4>
                <p className="text-sm text-muted-foreground">
                  Micro lotti personalizzati per gusti a scelta.<br />
                  <span className="font-medium text-foreground">Ordine minimo: 30 vasi</span>
                </p>
              </div>
              <div className="bg-card p-6 rounded-sm border border-border">
                <h4 className="font-serif font-medium text-lg mb-2">Prodotti Retail</h4>
                <p className="text-sm text-muted-foreground">
                  Formati classici per la vendita al dettaglio.<br />
                  <span className="font-medium text-foreground">Ordine minimo: 100 pezzi</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorecaStrategy;
