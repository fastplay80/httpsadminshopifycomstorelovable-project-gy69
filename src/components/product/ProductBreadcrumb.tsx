import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbProps {
  productTitle: string;
  category?: string;
}

const ProductBreadcrumb = ({ productTitle, category }: ProductBreadcrumbProps) => {
  // Infer category from product title if not provided
  const inferredCategory = category || inferCategory(productTitle);
  
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link to="/" className="hover:text-foreground transition-colors">
        {inferredCategory}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground font-medium truncate max-w-[200px]">
        {productTitle}
      </span>
    </nav>
  );
};

function inferCategory(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('confettura') || lowerTitle.includes('marmellata')) {
    return 'Confetture e Marmellate';
  }
  if (lowerTitle.includes('sugo')) {
    return 'Sughi';
  }
  if (lowerTitle.includes('crema')) {
    return 'Creme';
  }
  if (lowerTitle.includes('patè') || lowerTitle.includes('pate')) {
    return 'Patè';
  }
  if (lowerTitle.includes('sott\'olio') || lowerTitle.includes('sottolio')) {
    return 'Sott\'olio';
  }
  if (lowerTitle.includes('pomodor')) {
    return 'Pomodori';
  }
  
  return 'Prodotti';
}

export default ProductBreadcrumb;
