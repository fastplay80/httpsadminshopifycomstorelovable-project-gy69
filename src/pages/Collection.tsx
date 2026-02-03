import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShopifyProductCard from '@/components/home/ShopifyProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useLanguage } from '@/hooks/use-language';

const collectionTitles: Record<string, string> = {
  'confetture': 'Confetture',
  'sottoli': "Sott'oli",
  'creme-salate': 'Creme Salate',
  'sughi': 'Sughi',
  'box-regalo': 'Box Regalo',
};

const collectionDescriptions: Record<string, string> = {
  'confetture': 'Le nostre confetture artigianali, preparate con frutta fresca di stagione.',
  'sottoli': 'Conserve sott\'olio preparate con olio extra vergine d\'oliva.',
  'creme-salate': 'Creme salate perfette per antipasti e bruschette.',
  'sughi': 'Sughi pronti per condire pasta e piatti tradizionali.',
  'box-regalo': 'Confezioni regalo perfette per ogni occasione.',
};

const Collection = () => {
  const { slug } = useParams<{ slug: string }>();
  const language = useLanguage();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', slug, language],
    queryFn: async () => {
      const allProducts = await fetchProducts(50);
      // Filter available products
      return allProducts.filter(product => product.node.variants.edges.some(v => v.node.availableForSale));
    },
  });

  const title = slug ? collectionTitles[slug] || 'Collezione' : 'Collezione';
  const description = slug ? collectionDescriptions[slug] || '' : '';

  return (
    <>
      <Helmet>
        <title>{title} | Minnelea - Conserve Artigianali</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="container-editorial py-4 border-b border-border">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>
        </div>

        {/* Collection Header */}
        <section className="container-editorial py-12 md:py-16">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </section>

        {/* Products Grid */}
        <section className="container-editorial pb-16 md:pb-24">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                Nessun prodotto disponibile in questa collezione.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna alla home
              </Link>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Collection;
