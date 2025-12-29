import { Quote } from "lucide-react";

const principles = [
  "Scegliamo i nostri partner con cura",
  "Qualità prima della quantità",
  "Relazioni di lungo periodo",
  "Coerenza del brand su ogni territorio"
];

const PartnershipPhilosophy = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              La Nostra Filosofia
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Costruire, Non Vendere
            </h2>
            <div className="divider-editorial" />
          </div>
          
          {/* Manifesto */}
          <div className="bg-card p-8 md:p-12 rounded-sm border border-border mb-12">
            <div className="flex justify-center mb-8">
              <Quote className="w-12 h-12 text-primary/30" />
            </div>
            
            <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed text-center mb-8">
              Minnelea non è un prodotto da distribuire. 
              È un brand da rappresentare.
            </p>
            
            <p className="text-body text-center max-w-2xl mx-auto">
              Ogni vasetto che lascia il nostro laboratorio porta con sé 
              la storia del Cilento, la dedizione dei nostri artigiani, 
              e la promessa di un'eccellenza senza compromessi. 
              Per questo scegliamo con attenzione chi condivide questo viaggio con noi.
            </p>
          </div>
          
          {/* Principles */}
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-6 bg-card rounded-sm border border-border"
              >
                <span className="text-2xl font-serif text-primary font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-foreground font-medium">
                  {principle}
                </span>
              </div>
            ))}
          </div>
          
          {/* Closing statement */}
          <div className="mt-16 text-center">
            <p className="font-serif text-lg md:text-xl text-foreground italic">
              "Minnelea è prima di tutto un brand. Poi, un prodotto."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophy;
