import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Plus, Minus, ShoppingCart, Loader2 } from 'lucide-react';
import { fetchProductByHandle, CartItem, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RelatedProducts from '@/components/product/RelatedProducts';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      const fetchedProduct = await fetchProductByHandle(handle);
      setProduct(fetchedProduct);
      setIsLoading(false);
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant || !firstVariant.availableForSale) {
      toast.error('Prodotto non disponibile');
      return;
    }

    const cartItem: CartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Aggiunto al carrello', {
      description: `${quantity}x ${product.title}`,
      position: 'top-center'
    });
  };

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
          <Link to="/" className="btn-primary">
            Torna alla home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const images = product.images.edges;
  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale;

  return (
    <>
      <Helmet>
        <title>{product.title} | Minnelea</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container-editorial py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna ai prodotti
          </Link>
        </div>

        {/* Product section */}
        <section className="container-editorial pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                {images[selectedImageIndex] ? (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={images[selectedImageIndex].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                    <span className="font-serif text-6xl text-foreground/20">
                      {product.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} - immagine ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                {product.title}
              </h1>
              
              <p className="text-2xl font-medium text-primary mb-6">
                €{price.toFixed(2)}
              </p>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">Quantità:</span>
                <div className="flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                    aria-label="Diminuisci quantità"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                    aria-label="Aumenta quantità"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="btn-primary w-full sm:w-auto gap-2 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isAvailable ? 'Aggiungi al carrello' : 'Non disponibile'}
              </button>

              {/* Description */}
              <div className="border-t border-border pt-8">
                <h2 className="font-serif text-xl font-medium mb-4">Descrizione</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
