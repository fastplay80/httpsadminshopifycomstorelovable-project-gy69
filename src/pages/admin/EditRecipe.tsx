import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Save,
  ChevronRight,
  LayoutList,
  Info,
  UtensilsCrossed,
  ChefHat,
  Lightbulb,
  Apple,
  PieChart,
  BarChart3,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Stepper } from '@/components/admin/Stepper';
import { ChipGroup } from '@/components/admin/ChipGroup';
import { DifficultyRadio } from '@/components/admin/DifficultyRadio';
import { StepsList } from '@/components/admin/StepsList';
import { IngredientsTable } from '@/components/admin/IngredientsTable';
import { TipsTable } from '@/components/admin/TipsTable';
import { NutritionBadges } from '@/components/admin/NutritionBadges';
import { MacrosChart } from '@/components/admin/MacrosChart';
import { StatsCards } from '@/components/admin/StatsCards';

import {
  Recipe,
  getRecipeById,
  saveRecipe,
  mockProducts,
  availableCategories,
  italianRegions,
} from '@/lib/recipes';
import { cn } from '@/lib/utils';

const recipeSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  prepTime: z.number().min(0, 'Deve essere >= 0'),
  cookTime: z.number().min(0, 'Deve essere >= 0'),
  storageMethod: z.string(),
  country: z.string(),
  region: z.string(),
  videoUrl: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof recipeSchema>;

const tabs = [
  { id: 'info', label: 'Informazioni generali', icon: Info },
  { id: 'ingredients', label: 'Ingredienti', icon: UtensilsCrossed },
  { id: 'steps', label: 'Preparazione', icon: ChefHat },
  { id: 'tips', label: 'Suggerimenti', icon: Lightbulb },
  { id: 'nutrition', label: 'Analisi nutrizionale', icon: Apple },
  { id: 'macros', label: 'Macronutrienti', icon: PieChart },
  { id: 'stats', label: 'Statistiche', icon: BarChart3 },
];

export default function EditRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
  });

  useEffect(() => {
    if (id) {
      const loadedRecipe = getRecipeById(id);
      setRecipe(loadedRecipe);
      reset({
        title: loadedRecipe.title,
        prepTime: loadedRecipe.prepTime,
        cookTime: loadedRecipe.cookTime,
        storageMethod: loadedRecipe.storageMethod,
        country: loadedRecipe.country,
        region: loadedRecipe.region,
        videoUrl: loadedRecipe.videoUrl,
        description: loadedRecipe.description,
      });
    }
  }, [id, reset]);

  const onSubmit = (data: FormData) => {
    if (!recipe) return;
    const updatedRecipe: Recipe = {
      ...recipe,
      ...data,
    };
    saveRecipe(updatedRecipe);
    setRecipe(updatedRecipe);
    toast.success('Ricetta salvata con successo!');
  };

  const updateRecipeField = <K extends keyof Recipe>(key: K, value: Recipe[K]) => {
    if (!recipe) return;
    const updated = { ...recipe, [key]: value };
    setRecipe(updated);
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Link to="/admin/recipes" className="hover:text-foreground transition-colors">
                Ricette
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Modifica ricetta</span>
            </nav>

            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-4xl font-sans">
                {recipe.title}
              </h1>
              
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Pubblicata</span>
                  <Switch
                    checked={recipe.published}
                    onCheckedChange={(checked) => updateRecipeField('published', checked)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground"
                >
                  <LayoutList className="h-5 w-5" />
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  Salva
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero content - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left - Image */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </div>

            {/* Right - Controls */}
            <div className="space-y-6">
              <Stepper
                label="Numero persone"
                value={recipe.servings}
                onChange={(value) => updateRecipeField('servings', value)}
                min={1}
                max={20}
              />

              <ChipGroup
                label="Categoria"
                options={availableCategories}
                selected={recipe.categories}
                onChange={(categories) => updateRecipeField('categories', categories)}
              />

              <DifficultyRadio
                label="Difficoltà"
                value={recipe.difficulty}
                onChange={(difficulty) => updateRecipeField('difficulty', difficulty)}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border mb-6 overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 gap-0 w-max min-w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        'flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent',
                        'data-[state=active]:border-accent data-[state=active]:text-accent',
                        'data-[state=inactive]:text-muted-foreground',
                        'hover:text-foreground transition-colors bg-transparent'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab: Informazioni generali */}
            <TabsContent value="info" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Titolo</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      className={cn('mt-1.5 border-border', errors.title && 'border-destructive')}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="prepTime">Tempo di preparazione (min)</Label>
                    <Input
                      id="prepTime"
                      type="number"
                      {...register('prepTime', { valueAsNumber: true })}
                      min={0}
                      className="mt-1.5 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cookTime">Durata di cottura (min)</Label>
                    <Input
                      id="cookTime"
                      type="number"
                      {...register('cookTime', { valueAsNumber: true })}
                      min={0}
                      className="mt-1.5 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="storageMethod">Modalità di conservazione</Label>
                    <Input
                      id="storageMethod"
                      {...register('storageMethod')}
                      placeholder="es: Conservare in frigo"
                      className="mt-1.5 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Nazione della ricetta</Label>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="mt-1.5 border-border">
                            <SelectValue placeholder="Seleziona nazione" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            <SelectItem value="Italia">Italia</SelectItem>
                            <SelectItem value="Francia">Francia</SelectItem>
                            <SelectItem value="Spagna">Spagna</SelectItem>
                            <SelectItem value="Grecia">Grecia</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div>
                    <Label htmlFor="region">Regione italiana</Label>
                    <Controller
                      control={control}
                      name="region"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="mt-1.5 border-border">
                            <SelectValue placeholder="Seleziona regione" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50 max-h-60">
                            {italianRegions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="videoUrl">Link a video della ricetta</Label>
                    <Input
                      id="videoUrl"
                      {...register('videoUrl')}
                      placeholder="https://youtube.com/watch?v=..."
                      className="mt-1.5 border-border"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrizione della ricetta</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      rows={5}
                      className="mt-1.5 border-border resize-none"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab: Ingredienti */}
            <TabsContent value="ingredients" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <IngredientsTable
                  ingredients={recipe.ingredients}
                  products={mockProducts}
                  onChange={(ingredients) => updateRecipeField('ingredients', ingredients)}
                />
              </div>
            </TabsContent>

            {/* Tab: Preparazione */}
            <TabsContent value="steps" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <StepsList
                  steps={recipe.steps}
                  onChange={(steps) => updateRecipeField('steps', steps)}
                />
              </div>
            </TabsContent>

            {/* Tab: Suggerimenti */}
            <TabsContent value="tips" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <TipsTable
                  tips={recipe.tips}
                  products={mockProducts}
                  onChange={(tips) => updateRecipeField('tips', tips)}
                />
              </div>
            </TabsContent>

            {/* Tab: Analisi nutrizionale */}
            <TabsContent value="nutrition" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <NutritionBadges
                  flags={recipe.nutritionFlags}
                  onChange={(flags) => updateRecipeField('nutritionFlags', flags)}
                />
                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <Button
                    type="button"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => toast.info('Ricalcolo in corso... (simulato)')}
                  >
                    Salva ricetta e ricalcola
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Tab: Macronutrienti */}
            <TabsContent value="macros" className="mt-0">
              <div className="bg-card border border-border rounded-xl p-6">
                <MacrosChart
                  macros={recipe.macros}
                  onChange={(macros) => updateRecipeField('macros', macros)}
                />
              </div>
            </TabsContent>

            {/* Tab: Statistiche */}
            <TabsContent value="stats" className="mt-0">
              <StatsCards stats={recipe.stats} />
            </TabsContent>
          </Tabs>
        </main>
      </form>
    </div>
  );
}
