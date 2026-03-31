import { Link } from 'react-router-dom';
import { Clock, ChefHat, ArrowRight } from 'lucide-react';
import { getAllRecipes, mockProducts, Recipe } from '@/lib/recipes';

interface ProductRecipesProps {
  productTitle: string;
}

const ProductRecipes = ({ productTitle }: ProductRecipesProps) => {
  // Find matching sponsored product by fuzzy title match
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-zàèéìòù0-9]/g, '');
  const normTitle = normalise(productTitle);

  const matchedProduct = mockProducts.find(p => {
    const normName = normalise(p.name);
    // Check if either contains the other, or significant overlap
    return normTitle.includes(normName) || normName.includes(normTitle) ||
      normTitle.split(' ').filter(w => w.length > 3 && normName.includes(w)).length >= 2;
  });

  if (!matchedProduct) return null;

  const allRecipes = getAllRecipes();
  // Filter recipes that use this product as ingredient or mention it in tips
  const recipes = allRecipes.filter(r => {
    if (!r.published) return false;
    const inIngredients = r.ingredients.some(i => i.sponsoredProductId === matchedProduct.id);
    const inTips = r.tips.some(t => t.sponsoredProductId === matchedProduct.id);
    return inIngredients || inTips;
  }).slice(0, 3);

  if (recipes.length === 0) return null;

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-2">
            Lasciati ispirare
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Ricette con questo prodotto
          </h2>
        </div>
        <Link
          to="/ricette"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          Tutte le ricette
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCardCompact key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <Link
        to="/ricette"
        className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-accent hover:underline"
      >
        Tutte le ricette
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

const RecipeCardCompact = ({ recipe }: { recipe: Recipe }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link
      to={`/ricette/${recipe.slug}`}
      className="group block rounded-sm overflow-hidden border border-border hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalTime} min
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5" />
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductRecipes;
