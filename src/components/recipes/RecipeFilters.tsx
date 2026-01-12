import { Search, X } from 'lucide-react';
import { availableCategories } from '@/lib/recipes';

interface RecipeFiltersProps {
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  onDifficultyChange: (difficulty: string | null) => void;
  onSearchChange: (query: string) => void;
}

const difficulties = ['facile', 'media', 'difficile'];

const RecipeFilters = ({
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}: RecipeFiltersProps) => {
  const hasActiveFilters = selectedCategory || selectedDifficulty || searchQuery;

  const clearFilters = () => {
    onCategoryChange(null);
    onDifficultyChange(null);
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca ricette..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-sm text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            !selectedCategory
              ? 'bg-accent text-accent-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Tutte
        </button>
        {availableCategories.slice(0, 6).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Difficulty filters */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => onDifficultyChange(selectedDifficulty === difficulty ? null : difficulty)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors capitalize ${
              selectedDifficulty === difficulty
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          Cancella filtri
        </button>
      )}
    </div>
  );
};

export default RecipeFilters;
