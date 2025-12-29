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
              Minnelea è una visione contemporanea della Dieta Mediterranea,<br />
              costruita su ricette essenziali e ingredienti di altissima qualità.
            </p>
            
            <p className="text-body text-center max-w-2xl mx-auto">
              Ogni vasetto che lascia il nostro laboratorio porta con sé la storia del Cilento. 
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
        </div>
      </div>
    </section>
  );
};

export default PartnershipPhilosophy;
