import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Recipe } from '@/lib/recipes';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const hasVideo = !!recipe.videoUrl;
  const primaryCategory = recipe.categories[0] || 'Ricetta';

  return (
    <Link
      to={`/ricette/${recipe.slug}`}
      className="group block relative aspect-[4/5] rounded-lg overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Title at top */}
        <h3 className="font-serif text-lg md:text-xl font-medium text-white leading-tight line-clamp-3">
          {recipe.title}
        </h3>
        
        {/* Bottom section */}
        <div className="space-y-3">
          {/* Video badge if available */}
          {hasVideo && (
            <div className="flex items-center gap-1.5 text-white/90 text-sm">
              <Play className="w-4 h-4" />
              <span>Video</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {primaryCategory}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
              {recipe.difficulty}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {totalTime} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
