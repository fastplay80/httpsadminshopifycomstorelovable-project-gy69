import { ArrowRight, Award, Truck, Star } from 'lucide-react';

interface HeroProps {
  shippingThreshold?: number;
}

const Hero = ({ shippingThreshold = 59 }: HeroProps) => {
  return (
    <section 
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[hsl(38,35%,88%)] via-[hsl(42,40%,92%)] to-[hsl(30,25%,85%)]"
          aria-hidden="true"
        />
        {/* Decorative elements */}
        <div 
          className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 
              id="hero-heading"
              className="heading-display text-foreground mb-6 text-balance"
            >
              Il Cilento, in vasetto.{' '}
              <span className="block mt-2 text-primary">
                Conserve artigianali premiate.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Dal cuore del Parco Nazionale, confetture, sott'oli e sughi 
              preparati a mano in piccoli lotti. Ingredienti selezionati, 
              ricette della tradizione, gusto autentico.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a 
                href="/collezioni/bestseller" 
                className="btn-primary gap-2 text-base"
              >
                Scopri i bestseller
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/collezioni/box-regalo" 
                className="btn-secondary gap-2 text-base"
              >
                Regali & Box
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
              <div className="badge-award">
                <Award className="w-4 h-4 text-primary" />
                <span>Great Taste Awards</span>
              </div>
              <div className="badge-award">
                <Star className="w-4 h-4 text-primary" />
                <span>WineHunter Award</span>
              </div>
              <div className="badge-award">
                <Truck className="w-4 h-4 text-primary" />
                <span>Gratis da €{shippingThreshold}</span>
              </div>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted shadow-elevated">
              {/* Placeholder for hero image - styled product arrangement */}
              <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-4xl text-primary">M</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    [Immagine prodotto hero]
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-sm shadow-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Prodotto del mese
              </p>
              <p className="font-serif text-lg font-medium">
                Confettura di Fico Bianco
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
