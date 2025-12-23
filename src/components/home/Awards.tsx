import { ArrowRight, Star, Award, Medal } from 'lucide-react';

const awards = [
  {
    name: 'Great Taste Awards',
    year: '2023',
    description: 'Il riconoscimento più prestigioso nel mondo del food & beverage',
    icon: Award,
  },
  {
    name: 'WineHunter Award',
    year: '2023',
    description: 'Selezionati tra le eccellenze del gusto italiano',
    icon: Star,
  },
  {
    name: 'Merano Wine Festival',
    year: '2022',
    description: 'Premiati per l\'eccellenza delle nostre confetture',
    icon: Medal,
  },
];

const Awards = () => {
  return (
    <section 
      className="section-padding bg-charcoal text-primary-foreground"
      aria-labelledby="awards-heading"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 
              id="awards-heading"
              className="heading-section mb-6"
            >
              Premiati da chi assaggia per mestiere.
            </h2>
            
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              I nostri prodotti sono stati riconosciuti dalle giurie internazionali 
              più esigenti. Non per vantarci, ma per confermare che la qualità 
              che cerchiamo è quella che trovi nel vasetto.
            </p>
            
            <a 
              href="/premi" 
              className="inline-flex items-center gap-2 text-primary-foreground 
                       font-medium hover:text-primary-foreground/80 transition-colors
                       link-underline"
            >
              Vedi tutti i premi
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Awards list */}
          <div className="space-y-6">
            {awards.map((award, index) => (
              <div 
                key={index}
                className="flex gap-5 p-5 rounded-sm bg-primary-foreground/5 
                         hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full 
                              bg-primary-foreground/10 flex items-center justify-center">
                  <award.icon className="w-6 h-6 text-primary-foreground/80" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-xl font-medium">
                      {award.name}
                    </h3>
                    <span className="text-sm text-primary-foreground/60">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-sm text-primary-foreground/70">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
