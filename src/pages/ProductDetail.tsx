import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Loader2, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { fetchProductByHandle, CartItem, ShopifyProduct, parseProductMetadata } from '@/lib/shopify';
import { useLanguage } from '@/hooks/use-language';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import ProductRecipes from '@/components/product/ProductRecipes';
import Footer from '@/components/layout/Footer';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductInfo from '@/components/product/ProductInfo';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import BoughtTogether from '@/components/product/BoughtTogether';
import ProductTabs from '@/components/product/ProductTabs';
import ProductFAQ from '@/components/product/ProductFAQ';
import RelatedProducts from '@/components/product/RelatedProducts';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const language = useLanguage();

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      const fetchedProduct = await fetchProductByHandle(handle);
      setProduct(fetchedProduct);
      setIsLoading(false);
    };
    loadProduct();
  }, [handle, language]);

  const metadata = useMemo(() => parseProductMetadata(product?.metafields), [product?.metafields]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="heading-section">Prodotto non trovato</h1>
          <Link to="/" className="btn-primary">Torna alla home</Link>
        </main>
        <Footer />
      </>
    );
  }

  const weightGrams = metadata.weightGrams || 200;

  return (
    <>
      <Helmet>
        <title>{product.title} | Minnelea</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProductBreadcrumb productTitle={product.title} />
        </div>

        {/* Hero split layout */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Left: Image gallery - scrolling */}
            <ProductImageGallery images={product.images.edges} title={product.title} />

            {/* Right: Product info - sticky */}
            <ProductInfo product={product} metadata={metadata} weightGrams={weightGrams} />
          </div>
        </section>

        {/* Product Tabs */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ProductTabs
            ingredients={metadata.ingredients}
            allergens={metadata.allergens}
            usage={metadata.usage}
            storage={metadata.storage}
            weightGrams={weightGrams}
            nutrition={metadata.nutrition}
          />
        </section>

        {/* FAQ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ProductFAQ />
        </section>

        {/* Related Products */}
        <section className="container-editorial pb-16">
          <RelatedProducts currentProductHandle={handle || ''} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;
