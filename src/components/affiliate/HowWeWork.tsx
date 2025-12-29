const steps = [
  {
    number: "01",
    title: "Ti presenti",
    description: "Compili il form raccontandoci chi sei, cosa fai e come comunichi."
  },
  {
    number: "02",
    title: "Verifichiamo l'affinità",
    description: "Leggiamo la tua candidatura e valutiamo se c'è sintonia con il brand."
  },
  {
    number: "03",
    title: "Decidiamo insieme come collaborare",
    description: "Ricette, UGC, articoli, guide — troviamo il formato giusto per te."
  },
  {
    number: "04",
    title: "Attiviamo il tracking",
    description: "Ti forniamo link e codici personali per tracciare le vendite."
  },
  {
    number: "05",
    title: "Cresciamo insieme",
    description: "Se funziona per entrambi, la collaborazione diventa continuativa."
  }
];

const HowWeWork = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Il processo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Come funziona la collaborazione
            </h2>
            <p className="text-body">
              Niente fretta, niente pressione. Il nostro approccio è trasparente 
              e costruito sulla fiducia reciproca.
            </p>
          </div>
          
          {/* Right column - steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex gap-6 pb-8 border-b border-border last:border-b-0 last:pb-0"
              >
                <span className="font-serif text-3xl text-primary/40 font-medium">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
