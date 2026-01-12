import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecipeHero from '@/components/recipes/RecipeHero';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { getAllRecipes } from '@/lib/recipes';

const RecipesIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allRecipes = getAllRecipes();

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      // Only show published recipes
      if (!recipe.published) return false;

      // Filter by category
      if (selectedCategory && !recipe.categories.includes(selectedCategory)) {
        return false;
      }

      // Filter by difficulty
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesDescription = recipe.description.toLowerCase().includes(query);
        const matchesIngredients = recipe.ingredients.some(ing => 
          ing.name.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDescription && !matchesIngredients) {
          return false;
        }
      }

      return true;
    });
  }, [allRecipes, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Ricette | Minnelea - Conserve Artigianali dal Cilento</title>
        <meta 
          name="description" 
          content="Scopri le nostre ricette per utilizzare al meglio le conserve artigianali Minnelea. Antipasti, primi piatti, dolci e molto altro." 
        />
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen">
        <RecipeHero />

        <section className="section-padding">
          <div className="container-editorial">
            {/* Filters */}
            <div className="mb-8">
              <RecipeFilters
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onDifficultyChange={setSelectedDifficulty}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Nessuna ricetta trovata con i filtri selezionati.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RecipesIndex;
