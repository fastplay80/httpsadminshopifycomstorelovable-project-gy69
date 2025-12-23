import { Plus, Eye } from 'lucide-react';
import { ShopifyProduct, CartItem } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url;
  const imageAlt = node.images.edges[0]?.node.altText || node.title;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
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
      description: node.title,
      position: 'top-center'
    });
  };

  return (
    <article className="group card-editorial flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center">
              <span className="font-serif text-3xl text-foreground/20">
                {node.title.charAt(0)}
              </span>
            </div>
          </div>
        )}
        
        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 
                      transition-all duration-300 flex items-center justify-center opacity-0 
                      group-hover:opacity-100">
          <a
            href={`/prodotti/${node.handle}`}
            className="btn-secondary bg-background/95 backdrop-blur-sm gap-2 text-sm"
            aria-label={`Scopri ${node.title}`}
          >
            <Eye className="w-4 h-4" />
            Scopri
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-serif text-lg font-medium text-foreground mb-1 
                     group-hover:text-primary transition-colors line-clamp-2">
          <a href={`/prodotti/${node.handle}`}>
            {node.title}
          </a>
        </h3>
        
        {/* Description */}
        {node.description && (
          <p className="text-small mb-4 flex-1 line-clamp-2">
            {node.description}
          </p>
        )}
        
        {/* Price and action row */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-border mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-foreground">
              €{price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center w-10 h-10 
                     bg-primary text-primary-foreground rounded-sm
                     hover:bg-primary/90 active:scale-95 transition-all"
            aria-label={`Aggiungi ${node.title} al carrello`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ShopifyProductCard;
