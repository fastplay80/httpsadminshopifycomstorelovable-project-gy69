import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const AffiliateHero = () => {
  const scrollToForm = () => {
    document.getElementById('affiliate-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="container-luxury py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 animate-fade-up opacity-0 stagger-1">
            Programma Affiliate
          </span>
          
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 animate-fade-up opacity-0 stagger-2">
            Diventa Affiliate Minnelea
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic mb-8 animate-fade-up opacity-0 stagger-3">
            Se ami raccontare storie autentiche su cose fatte con cura, 
            potremmo essere fatti l'uno per l'altro.
          </p>
          
          {/* Intro paragraph */}
          <p className="text-body max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 stagger-4">
            Minnelea è un piccolo marchio artigianale che produce in lotti limitati 
            nel cuore del Cilento. Non cerchiamo influencer, cerchiamo persone — 
            con una voce autentica e la passione per raccontare.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 stagger-5">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="group"
            >
              Candidati per Collaborare
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateHero;
