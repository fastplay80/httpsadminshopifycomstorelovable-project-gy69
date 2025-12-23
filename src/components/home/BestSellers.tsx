import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Placeholder products data
const products = [
  {
    id: 'confettura-fico-bianco',
    title: 'Confettura Extra di Fico Bianco del Cilento DOP',
    price: 8.90,
    weight: '220g',
    benefit: 'Great Taste Award',
    perfectFor: 'colazione, crostate, formaggi stagionati',
    badge: 'Bestseller',
  },
  {
    id: 'crema-carciofi',
    title: 'Crema di Carciofi alla Mediterranea',
    price: 7.50,
    weight: '180g',
    benefit: 'Senza conservanti',
    perfectFor: 'bruschette, pasta, aperitivi gourmet',
  },
  {
    id: 'sugo-pomodorini',
    title: 'Sugo di Pomodorini del Piennolo',
    price: 6.90,
    weight: '280g',
    benefit: 'Pomodori campani',
    perfectFor: 'pasta, pizza, bruschette',
  },
  {
    id: 'sottoli-melanzane',
    title: 'Melanzane a Filetti in Olio EVO',
    price: 9.50,
    weight: '280g',
    benefit: 'Olio extravergine',
    perfectFor: 'antipasti, taglieri, panini gourmet',
  },
  {
    id: 'confettura-limone',
    title: 'Marmellata di Limoni di Amalfi IGP',
    price: 8.50,
    weight: '220g',
    benefit: 'Agrumi costiera',
    perfectFor: 'dolci, crostate, abbinamento pesce',
  },
  {
    id: 'box-degustazione',
    title: 'Box Degustazione Cilento',
    price: 39.90,
    compareAtPrice: 45.00,
    weight: '4 vasetti',
    benefit: 'Idea regalo',
    perfectFor: 'regali, scoprire il brand, occasioni speciali',
    badge: 'Offerta',
  },
];

const BestSellers = () => {
  return (
    <section 
      className="section-padding bg-muted/50"
      aria-labelledby="bestsellers-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <h2 
              id="bestsellers-heading"
              className="heading-section text-foreground mb-3"
            >
              I più amati
            </h2>
            <p className="text-body max-w-xl">
              Le conserve più scelte dai nostri clienti. Gusti autentici del Cilento, 
              premiati e apprezzati in tutta Italia.
            </p>
          </div>
          
          <a 
            href="/collezioni/tutti-i-prodotti" 
            className="btn-ghost gap-2 flex-shrink-0"
          >
            Vedi tutti i prodotti
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
