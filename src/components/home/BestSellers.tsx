import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import ShopifyProductCard from './ShopifyProductCard';

const BestSellers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts(6);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-sm">
            <p className="text-lg text-muted-foreground mb-2">Nessun prodotto disponibile</p>
            <p className="text-sm text-muted-foreground">
              Crea i tuoi prodotti scrivendomi cosa vuoi vendere e il prezzo!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
