import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Loader2, Check, Plus } from 'lucide-react';
import { fetchProducts, ShopifyProduct, CartItem } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface BoughtTogetherProps {
  currentProduct: ShopifyProduct['node'];
}

const BUNDLE_DISCOUNT_PERCENT = 10; // 10% discount on bundle

const BoughtTogether = ({ currentProduct }: BoughtTogetherProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const allProducts = await fetchProducts(6);
      // Filter out current product and get 2 complementary products
      const complementary = allProducts
        .filter(p => p.node.handle !== currentProduct.handle)
        .slice(0, 2);
      setProducts(complementary);
      
      // Pre-select all products including current
      const initialSelected = new Set<string>([currentProduct.id]);
      complementary.forEach(p => initialSelected.add(p.node.id));
      setSelectedProducts(initialSelected);
      
      setIsLoading(false);
    };
    loadProducts();
  }, [currentProduct.handle, currentProduct.id]);

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const getProductPrice = (product: ShopifyProduct['node']) => {
    return parseFloat(product.priceRange.minVariantPrice.amount);
  };

  // Calculate totals
  const allBundleProducts = [{ node: currentProduct }, ...products];
  const selectedBundleProducts = allBundleProducts.filter(p => selectedProducts.has(p.node.id));
  
  const originalTotal = selectedBundleProducts.reduce(
    (sum, p) => sum + getProductPrice(p.node), 
    0
  );
  
  const hasBundle = selectedBundleProducts.length >= 2;
  const discountAmount = hasBundle ? (originalTotal * BUNDLE_DISCOUNT_PERCENT) / 100 : 0;
  const bundleTotal = originalTotal - discountAmount;

  const handleAddBundle = () => {
    selectedBundleProducts.forEach(product => {
      const firstVariant = product.node.variants.edges[0]?.node;
      if (!firstVariant || !firstVariant.availableForSale) return;

      const cartItem: CartItem = {
        product: product as ShopifyProduct,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price,
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions || []
      };
      
      addItem(cartItem);
    });

    toast.success('Bundle aggiunto al carrello', {
      description: `${selectedBundleProducts.length} prodotti con ${BUNDLE_DISCOUNT_PERCENT}% di sconto`,
      position: 'top-center'
    });
  };

  if (isLoading) {
    return (
      <section className="py-8 border-t border-border">
        <h2 className="font-serif text-xl font-medium text-foreground mb-6">
          Comprati insieme
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
    <section className="py-8 border-t border-border">
      <h2 className="font-serif text-xl font-medium text-foreground mb-6">
        Comprati insieme
      </h2>
      
      <div className="bg-secondary/30 rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Current Product */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={selectedProducts.has(currentProduct.id)}
              onCheckedChange={() => toggleProduct(currentProduct.id)}
              className="mt-1"
            />
            <Link 
              to={`/prodotti/${currentProduct.handle}`}
              className="group flex items-center gap-3"
            >
              <div className="w-20 h-20 bg-card rounded-md overflow-hidden flex-shrink-0">
                {currentProduct.images.edges[0] ? (
                  <img
                    src={currentProduct.images.edges[0].node.url}
                    alt={currentProduct.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="font-serif text-lg text-muted-foreground">
                      {currentProduct.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {currentProduct.title}
                </p>
                <p className="text-sm text-primary font-medium">
                  €{getProductPrice(currentProduct).toFixed(2)}
                </p>
              </div>
            </Link>
          </div>

          {/* Plus signs and other products */}
          {products.map((product, index) => (
            <div key={product.node.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedProducts.has(product.node.id)}
                  onCheckedChange={() => toggleProduct(product.node.id)}
                  className="mt-1"
                />
                <Link 
                  to={`/prodotti/${product.node.handle}`}
                  className="group flex items-center gap-3"
                >
                  <div className="w-20 h-20 bg-card rounded-md overflow-hidden flex-shrink-0">
                    {product.node.images.edges[0] ? (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="font-serif text-lg text-muted-foreground">
                          {product.node.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.node.title}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      €{getProductPrice(product.node).toFixed(2)}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
          <div>
            <div className="flex items-baseline gap-2">
              {hasBundle && (
                <span className="text-sm text-muted-foreground line-through">
                  €{originalTotal.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-medium text-foreground">
                €{bundleTotal.toFixed(2)}
              </span>
              {hasBundle && (
                <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                  -{BUNDLE_DISCOUNT_PERCENT}%
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedBundleProducts.length} prodott{selectedBundleProducts.length === 1 ? 'o' : 'i'} selezionat{selectedBundleProducts.length === 1 ? 'o' : 'i'}
              {hasBundle && ` • Risparmi €${discountAmount.toFixed(2)}`}
            </p>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={selectedBundleProducts.length === 0}
            className="btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoughtTogether;
