import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { fetchProducts, ShopifyProduct, CartItem } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface RelatedProductsProps {
  currentProductHandle: string;
}

const RelatedProducts = ({ currentProductHandle }: RelatedProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const allProducts = await fetchProducts(8);
      // Filter out the current product
      const relatedProducts = allProducts.filter(
        p => p.node.handle !== currentProductHandle
      ).slice(0, 4);
      setProducts(relatedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, [currentProductHandle]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant || !firstVariant.availableForSale) {
      toast.error('Prodotto non disponibile');
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Aggiunto al carrello', {
      description: product.node.title,
      position: 'top-center'
    });
  };

  if (isLoading) {
    return (
      <section className="py-12 border-t border-border">
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
          Prodotti correlati
        </h2>
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-border">
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
        Prodotti correlati
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
          const image = product.node.images.edges[0]?.node;
          const isAvailable = product.node.variants.edges[0]?.node?.availableForSale;

          return (
            <Link
              key={product.node.id}
              to={`/prodotti/${product.node.handle}`}
              className="group"
            >
              <div className="card-editorial">
                {/* Image */}
                <div className="aspect-square bg-secondary/30 overflow-hidden relative">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                      <span className="font-serif text-4xl text-foreground/20">
                        {product.node.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Quick add button */}
                  {isAvailable && (
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-primary/90"
                      aria-label="Aggiungi al carrello"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.node.title}
                  </h3>
                  <p className="text-primary font-medium">
                    €{price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
