import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useLanguage } from '@/hooks/use-language';
import ShopifyProductCard from './ShopifyProductCard';

const BestSellers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const language = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts(20);
      // Filter only available products
      const availableProducts = fetchedProducts.filter(
        (product) => product.node.variants.edges.some(
          (variant) => variant.node.availableForSale
        )
      );
      // Sort: kits first, then others
      const sorted = availableProducts.sort((a, b) => {
        const aIsKit = a.node.productType?.toLowerCase().includes('kit') || a.node.title.toLowerCase().includes('kit');
        const bIsKit = b.node.productType?.toLowerCase().includes('kit') || b.node.title.toLowerCase().includes('kit');
        if (aIsKit && !bIsKit) return -1;
        if (!aIsKit && bIsKit) return 1;
        return 0;
      });
      // Show only 3
      setProducts(sorted.slice(0, 3));
      setIsLoading(false);
    };
    loadProducts();
  }, [language]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate progress: 0 when section enters viewport, 1 when it leaves
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollY(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-muted/50 overflow-hidden"
      aria-labelledby="bestsellers-heading"
    >
      <div className="container-editorial">
        {/* Section header with parallax */}
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12"
          style={{
            transform: `translateY(${(1 - scrollY) * 30}px)`,
            opacity: Math.min(1, scrollY * 2),
            transition: 'opacity 0.1s ease-out',
          }}
        >
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

        {/* Products grid with staggered parallax */}
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
            {products.map((product, index) => (
              <div
                key={product.node.id}
                style={{
                  transform: `translateY(${(1 - scrollY) * (40 + index * 20)}px)`,
                  opacity: Math.min(1, scrollY * 2.5 - index * 0.2),
                  transition: 'opacity 0.1s ease-out',
                }}
              >
                <ShopifyProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
