import { Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    weight: string;
    perfectFor: string;
    benefit: string;
    image?: string;
    badge?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <article className="group card-editorial flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {/* Placeholder image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
          <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center">
            <span className="font-serif text-3xl text-foreground/20">
              {product.title.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-sm">
            {product.badge}
          </div>
        )}
        
        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-sm">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 
                      transition-all duration-300 flex items-center justify-center opacity-0 
                      group-hover:opacity-100">
          <a
            href={`/prodotti/${product.id}`}
            className="btn-secondary bg-background/95 backdrop-blur-sm gap-2 text-sm"
            aria-label={`Scopri ${product.title}`}
          >
            <Eye className="w-4 h-4" />
            Scopri
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Benefit line */}
        <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
          {product.benefit}
        </p>
        
        {/* Title */}
        <h3 className="font-serif text-lg font-medium text-foreground mb-1 
                     group-hover:text-primary transition-colors line-clamp-2">
          <a href={`/prodotti/${product.id}`}>
            {product.title}
          </a>
        </h3>
        
        {/* Weight */}
        <p className="text-xs text-muted-foreground mb-2">
          {product.weight}
        </p>
        
        {/* Perfect for */}
        <p className="text-small mb-4 flex-1">
          Perfetto per: {product.perfectFor}
        </p>
        
        {/* Price and action row */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-foreground">
              €{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.compareAtPrice?.toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            className="inline-flex items-center justify-center w-10 h-10 
                     bg-primary text-primary-foreground rounded-sm
                     hover:bg-primary/90 active:scale-95 transition-all"
            aria-label={`Aggiungi ${product.title} al carrello`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
