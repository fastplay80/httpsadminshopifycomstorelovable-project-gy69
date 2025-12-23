import { Leaf, Timer, MapPin, Award } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Ingredienti italiani selezionati',
    description: 'Materie prime scelte con cura da produttori locali del Cilento e della Campania. Niente compromessi sulla qualità.',
  },
  {
    icon: Timer,
    title: 'Piccoli lotti, lavorazioni delicate',
    description: 'Produciamo in quantità limitate per garantire l\'attenzione artigianale che ogni vasetto merita.',
  },
  {
    icon: MapPin,
    title: 'Identità territoriale',
    description: 'Il Parco Nazionale del Cilento è Patrimonio UNESCO. La Dieta Mediterranea nasce qui. Noi la conserviamo.',
  },
  {
    icon: Award,
    title: 'Qualità premiata',
    description: 'Great Taste Awards, WineHunter Award e altri riconoscimenti internazionali. Packaging curato nei dettagli.',
  },
];

const WhyMinnlea = () => {
  return (
    <section 
      className="section-padding bg-background"
      aria-labelledby="why-minnelea-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            id="why-minnelea-heading"
            className="heading-section text-foreground mb-4"
          >
            Perché Minnelea
          </h2>
          <div className="divider-editorial mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            Non siamo un'industria. Siamo artigiani del gusto che scelgono 
            la qualità come unica via.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="text-center lg:text-left group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 
                            rounded-full bg-primary/10 text-primary mb-5
                            group-hover:bg-primary group-hover:text-primary-foreground
                            transition-colors duration-300">
                <pillar.icon className="w-6 h-6" />
              </div>
              
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-small leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMinnlea;
