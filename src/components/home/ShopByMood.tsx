import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'colazione',
    title: 'Colazione & Crostate',
    description: 'Confetture artigianali per iniziare la giornata con dolcezza.',
    href: '/collezioni/confetture',
    image: null, // Placeholder
    accent: 'bg-[hsl(38,50%,92%)]',
  },
  {
    id: 'aperitivo',
    title: 'Aperitivo Gourmet',
    description: 'Sott\'oli e creme salate per i tuoi momenti conviviali.',
    href: '/collezioni/sottoli-creme',
    image: null,
    accent: 'bg-[hsl(85,20%,90%)]',
  },
  {
    id: 'primi',
    title: 'Primi Pronti',
    description: 'Sughi tradizionali per un pranzo autentico in pochi minuti.',
    href: '/collezioni/sughi',
    image: null,
    accent: 'bg-[hsl(18,30%,90%)]',
  },
  {
    id: 'regali',
    title: 'Box Degustazione',
    description: 'Confezioni regalo curate per ogni occasione speciale.',
    href: '/collezioni/box-regalo',
    image: null,
    accent: 'bg-[hsl(30,25%,92%)]',
  },
];

const ShopByMood = () => {
  return (
    <section 
      className="section-padding bg-background"
      aria-labelledby="shop-by-mood-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            id="shop-by-mood-heading"
            className="heading-section text-foreground mb-4"
          >
            Trova il tuo gusto
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Conserve per ogni momento della giornata. Dalla colazione all'aperitivo, 
            ogni vasetto racconta il Cilento.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              className="group card-editorial flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image placeholder */}
              <div className={`aspect-[4/3] ${category.accent} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
                    <span className="font-serif text-2xl text-foreground/30">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="heading-card text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-small flex-1 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Esplora</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByMood;
