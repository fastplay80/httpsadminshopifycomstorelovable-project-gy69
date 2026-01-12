import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Recipe } from '@/lib/recipes';
import RecipeCard from './RecipeCard';

interface RelatedRecipesProps {
  recipes: Recipe[];
  currentRecipeId: string;
}

const RelatedRecipes = ({ recipes, currentRecipeId }: RelatedRecipesProps) => {
  const relatedRecipes = recipes
    .filter(r => r.id !== currentRecipeId && r.published)
    .slice(0, 4);

  if (relatedRecipes.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
          Le nostre ricette
        </h2>
        <Link
          to="/ricette"
          className="btn-primary gap-2"
        >
          Esplora
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;
