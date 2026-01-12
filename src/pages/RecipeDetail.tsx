import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RelatedRecipes from '@/components/recipes/RelatedRecipes';
import { getRecipeBySlug, getAllRecipes, getProductById } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const recipe = getRecipeBySlug(slug || '');
  const allRecipes = getAllRecipes();
  
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  // Calculate ingredient quantities based on servings
  const baseServings = recipe?.servings || 1;
  const servingMultiplier = servings / baseServings;

  // Get sponsored products from ingredients
  const sponsoredProducts = useMemo(() => {
    if (!recipe) return [];
    return recipe.ingredients
      .filter(ing => ing.sponsoredProductId)
      .map(ing => ({
        ingredient: ing,
        product: getProductById(ing.sponsoredProductId!),
      }))
      .filter(item => item.product);
  }, [recipe]);

  // Calculate total price of selected products
  const totalPrice = useMemo(() => {
    return sponsoredProducts
      .filter(item => selectedProducts.has(item.product!.id))
      .reduce((sum, item) => sum + (item.product?.price || 0), 0);
  }, [sponsoredProducts, selectedProducts]);

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  if (!recipe) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen section-padding">
          <div className="container-editorial text-center">
            <h1 className="heading-section mb-4">Ricetta non trovata</h1>
            <p className="text-muted-foreground mb-8">
              La ricetta che stai cercando non esiste o è stata rimossa.
            </p>
            <Link to="/ricette" className="btn-primary">
              Torna alle ricette
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;
  const primaryCategory = recipe.categories[0] || 'Ricetta';

  return (
    <>
      <Helmet>
        <title>{recipe.title} | Minnelea Ricette</title>
        <meta name="description" content={recipe.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.description,
            image: recipe.imageUrl,
            prepTime: `PT${recipe.prepTime}M`,
            cookTime: `PT${recipe.cookTime}M`,
            totalTime: `PT${totalTime}M`,
            recipeYield: `${recipe.servings} porzioni`,
            recipeIngredient: recipe.ingredients.map(ing => `${ing.qty} ${ing.unit} ${ing.name}`),
            recipeInstructions: recipe.steps.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: step.text,
            })),
            recipeCuisine: "Italian",
            recipeCategory: primaryCategory,
          })}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen">
        <div className="container-editorial section-padding">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Category */}
              <span className="text-primary font-medium">{primaryCategory}</span>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
                {recipe.title}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {recipe.description}
              </p>

              {/* Add to Cart Button */}
              {sponsoredProducts.length > 0 && (
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gap-2"
                  onClick={() => {
                    // Select all products if none selected
                    if (selectedProducts.size === 0) {
                      setSelectedProducts(new Set(sponsoredProducts.map(p => p.product!.id)));
                    }
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Aggiungi {sponsoredProducts.length} prodott{sponsoredProducts.length === 1 ? 'o' : 'i'} al carrello
                </Button>
              )}

              {/* Details */}
              <div className="border-t border-border pt-6">
                <h2 className="font-medium text-foreground mb-4">Dettagli</h2>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-primary">Difficoltà</dt>
                    <dd className="font-medium capitalize">{recipe.difficulty}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary">Tempo di preparazione</dt>
                    <dd className="font-medium">{recipe.prepTime} minuti</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary">Tempo di cottura</dt>
                    <dd className="font-medium">{recipe.cookTime} minuti</dd>
                  </div>
                  {recipe.suitableFor && recipe.suitableFor.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-primary">Adatto a</dt>
                      <dd className="font-medium text-right">{recipe.suitableFor.join(', ')}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-primary">Origine</dt>
                    <dd className="font-medium">{recipe.region}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-medium text-foreground">Ingredienti</h2>
              
              {/* Servings control */}
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{servings} persone</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-border rounded-full hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-border rounded-full hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-border">
              {recipe.ingredients.map((ingredient) => {
                const product = ingredient.sponsoredProductId 
                  ? getProductById(ingredient.sponsoredProductId) 
                  : null;
                const adjustedQty = Math.round(ingredient.qty * servingMultiplier);

                return (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between py-3 border-b border-border"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {product && (
                        <img
                          src={product.thumbUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <div>
                        {product && (
                          <div className="text-sm font-medium text-foreground">
                            {product.price.toFixed(2)} €
                            <span className="text-muted-foreground font-normal ml-2">1 prodotto</span>
                          </div>
                        )}
                        <span className={product ? 'text-primary text-sm' : 'text-foreground'}>
                          {ingredient.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        {adjustedQty} {ingredient.unit}
                      </span>
                      {product && (
                        <Checkbox
                          checked={selectedProducts.has(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Suggestions Section */}
          {recipe.tips.length > 0 && (
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-medium text-foreground mb-6">Suggerimenti</h2>
              <div className="border-t border-border">
                {recipe.tips.map((tip) => (
                  <div key={tip.id} className="py-3 border-b border-border">
                    <span className="text-primary">{tip.text}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Preparation Section */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">Preparazione</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={step.id} className="flex gap-4 py-3 border-b border-border">
                  <span className="font-medium text-foreground">{index + 1}.</span>
                  <span className="text-primary">{step.text}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Related Recipes */}
          <RelatedRecipes recipes={allRecipes} currentRecipeId={recipe.id} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RecipeDetail;
