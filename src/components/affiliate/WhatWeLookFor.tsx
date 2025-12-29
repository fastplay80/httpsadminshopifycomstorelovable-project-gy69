import { Check } from "lucide-react";

const values = [
  "Selezioni con cura cosa promuovere",
  "Non parli di tutto, ma di quello che conta",
  "Dai valore alla qualità e alla coerenza",
  "Preferisci relazioni a lungo termine",
  "Credi nell'autenticità più che nei numeri"
];

const WhatWeLookFor = () => {
  return (
    <section className="py-20 md:py-28 bg-section">
      <div className="container-luxury">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              I nostri valori
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Cosa cerchiamo in un affiliate
            </h2>
          </div>
          
          {/* Values list */}
          <div className="bg-card p-8 md:p-12 rounded-sm border border-border mb-12">
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-body">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Key quote */}
          <div className="text-center">
            <blockquote className="font-serif text-xl md:text-2xl italic text-foreground/80 mb-4">
              "Se consigli solo cose in cui credi davvero, 
              Minnelea potrebbe essere giusta per te."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeLookFor;
