import { useState } from 'react';
import { ShoppingCart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { CartItem, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import BoughtTogether from './BoughtTogether';

interface ProductInfoProps {
  product: ShopifyProduct['node'];
  metadata: {
    ingredients?: string;
    allergens?: string;
    usage?: string[];
    storage?: string;
    weightGrams?: number;
    nutrition?: any;
  };
  weightGrams: number;
}

const ProductInfo = ({ product, metadata, weightGrams }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale;
  const pricePerKg = (price / weightGrams) * 1000;

  // Variant options (like format/size selectors)
  const hasVariants = product.variants.edges.length > 1;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;

  const handleAddToCart = () => {
    if (!product || !selectedVariant || !selectedVariant.availableForSale) {
      toast.error('Prodotto non disponibile');
      return;
    }

    const cartItem: CartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      selectedOptions: selectedVariant.selectedOptions || [],
      quantity
    };

    addItem(cartItem);
    toast.success('Aggiunto al carrello', {
      description: `${quantity}x ${product.title}`,
      position: 'top-center'
    });
  };

  const displayPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : price;

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Title */}
      <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-foreground leading-tight mb-4">
        {product.title}
      </h1>

      {/* Description */}
      {product.description && (
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
          {product.description}
        </p>
      )}

      {/* Variant selectors */}
      {hasVariants && product.options && product.options.length > 0 && (
        <div className="space-y-5 mb-8">
          {product.options.map((option) => (
            <div key={option.name}>
              <p className="text-xs font-semibold tracking-wider uppercase text-foreground mb-3">
                {option.name === 'Title' ? 'Formato' : option.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map((variant, vIndex) => {
                  const optionValue = variant.node.selectedOptions?.find(
                    o => o.name === option.name
                  )?.value;
                  if (!optionValue || optionValue === 'Default Title') return null;

                  return (
                    <button
                      key={vIndex}
                      onClick={() => setSelectedVariantIndex(vIndex)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                        selectedVariantIndex === vIndex
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-background text-foreground border-border hover:border-foreground'
                      }`}
                    >
                      {optionValue}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <div className="mb-6">
        <p className="text-3xl font-medium text-foreground">
          € {displayPrice.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          (€{pricePerKg.toFixed(2)}/kg)
        </p>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="p-3 hover:bg-secondary transition-colors"
            aria-label="Diminuisci quantità"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="p-3 hover:bg-secondary transition-colors"
            aria-label="Aumenta quantità"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!isAvailable}
        className="w-full py-4 bg-accent text-accent-foreground font-medium text-base rounded-sm
                   hover:bg-accent/90 active:scale-[0.99] transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        {isAvailable ? 'Aggiungi al carrello' : 'Non disponibile'}
      </button>

      {/* Trust row */}
      <div className="flex flex-wrap items-center gap-6 mt-6 py-4 border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-accent" />
          <span>Spedizione gratuita da €49</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-accent" />
          <span>Reso gratuito</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <span>Pagamenti sicuri</span>
        </div>
      </div>

      {/* Bought Together */}
      <BoughtTogether currentProduct={product} />
    </div>
  );
};

export default ProductInfo;
