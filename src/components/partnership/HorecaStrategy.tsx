import { Wine, ShoppingBag, ArrowRight } from "lucide-react";

const HorecaStrategy = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Il Nostro Modello
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Dall'Esperienza all'Acquisto
            </h2>
            <div className="divider-editorial" />
          </div>
          
          {/* Strategy flow */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-4 items-center mb-16">
            {/* Step 1 - Horeca */}
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Wine className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Formato Horeca</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I nostri vasetti da 600g sono pensati per il servizio: 
                degustazioni, aperitivi, light food.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary/50" />
            </div>
            
            {/* Step 2 - Experience */}
            <div className="text-center p-8 md:col-start-3">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Acquisto Retail</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dopo aver assaggiato, il cliente acquista i vasetti retail 
                per portare l'esperienza a casa.
              </p>
            </div>
          </div>
          
          {/* Key message */}
          <div className="bg-secondary/50 p-8 md:p-12 rounded-sm text-center">
            <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed max-w-3xl mx-auto">
              "I prodotti Minnelea sono pensati per essere prima vissuti, poi acquistati."
            </blockquote>
          </div>
          
          {/* Explanation */}
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-body">
              Questo modello crea un ciclo virtuoso: il ristorante diventa 
              ambasciatore del brand, il cliente scopre il prodotto nel contesto ideale, 
              e l'acquisto retail completa l'esperienza. Un approccio che valorizza 
              sia il partner Horeca che il punto vendita retail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorecaStrategy;
