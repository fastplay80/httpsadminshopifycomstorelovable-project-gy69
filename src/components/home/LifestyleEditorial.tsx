import { ArrowRight } from 'lucide-react';

const LifestyleEditorial = () => {
  return (
    <section 
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      aria-labelledby="story-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(38,30%,85%)] via-[hsl(30,25%,88%)] to-[hsl(42,35%,82%)]" />
        {/* Decorative texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted shadow-elevated">
              <div className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary/80 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-sm text-muted-foreground">
                    [Immagine lifestyle: produzione artigianale / paesaggio Cilento]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              La nostra storia
            </p>
            
            <h2 
              id="story-heading"
              className="heading-section text-foreground mb-6 text-balance"
            >
              Dove il mare incontra la montagna, nasce il gusto.
            </h2>
            
            <div className="space-y-4 text-body max-w-lg mx-auto lg:mx-0 mb-8">
              <p>
                Nel cuore del Parco Nazionale del Cilento, tra uliveti centenari 
                e orti familiari, abbiamo scelto di fare le cose come una volta. 
                Lentamente. Con rispetto.
              </p>
              <p>
                Ogni vasetto porta con sé il sole della Campania, la brezza 
                del Tirreno, le mani di chi ancora crede che il gusto 
                autentico meriti tempo e dedizione.
              </p>
            </div>
            
            <a 
              href="/chi-siamo" 
              className="btn-primary gap-2"
            >
              Scopri la nostra storia
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleEditorial;
