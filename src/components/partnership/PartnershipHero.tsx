import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PartnershipHeroProps {
  onApplyClick: () => void;
}

const PartnershipHero = ({ onApplyClick }: PartnershipHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-transparent" />
      
      <div className="container-editorial relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-6 animate-fade-up opacity-0">
            Partnership B2B
          </p>
          
          {/* Main Headline */}
          <h1 className="heading-display text-foreground mb-6 animate-fade-up opacity-0 stagger-1">
            Diventa Partner Minnelea
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-serif text-foreground/80 mb-8 animate-fade-up opacity-0 stagger-2">
            Non cerchiamo clienti. Costruiamo partnership durature.
          </p>
          
          {/* Descriptive paragraph */}
          <p className="text-body max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 stagger-3">
            Minnelea è un marchio artigianale di eccellenza dal Cilento. 
            Produciamo in piccoli lotti, con ingredienti selezionati e cottura in vuoto. 
            La nostra distribuzione è esclusiva: scegliamo con cura i partner che condividono 
            la nostra visione di qualità e autenticità.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-up opacity-0 stagger-4">
            <Button 
              size="lg" 
              className="btn-primary text-base px-8 py-6 group"
              onClick={onApplyClick}
            >
              Richiedi la Partnership
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default PartnershipHero;
