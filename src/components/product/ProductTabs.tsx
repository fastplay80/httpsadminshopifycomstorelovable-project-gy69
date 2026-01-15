import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NutritionTable from './NutritionTable';

interface NutritionData {
  energia?: string;
  grassi?: string;
  grassiSaturi?: string;
  carboidrati?: string;
  zuccheri?: string;
  proteine?: string;
  sale?: string;
  fibre?: string;
}

interface ProductTabsProps {
  ingredients?: string;
  allergens?: string;
  usage?: string[];
  storage?: string;
  weightGrams?: number;
  nutrition?: NutritionData;
}

const defaultIngredients = 'Frutta (65%), zucchero, succo di limone. Senza coloranti, conservanti o addensanti artificiali.';
const defaultUsage = [
  'Perfetto su pane tostato o fette biscottate',
  'Ideale per farcire crostate e dolci',
  'Ottimo abbinato a formaggi stagionati',
  'Da provare con yogurt greco a colazione',
];
const defaultStorage = 'Conservare in luogo fresco e asciutto, al riparo dalla luce. Dopo l\'apertura conservare in frigorifero e consumare entro 3 settimane.';

const ProductTabs = ({ 
  ingredients,
  allergens,
  usage,
  storage,
  weightGrams = 200,
  nutrition,
}: ProductTabsProps) => {
  const displayIngredients = ingredients || defaultIngredients;
  const displayUsage = usage?.length ? usage : defaultUsage;
  const displayStorage = storage || defaultStorage;
  
  // Check if we have any real nutrition data
  const hasNutritionData = nutrition && Object.values(nutrition).some(v => v);

  return (
    <div className="border-t border-border pt-8">
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none gap-0 flex-wrap">
          <TabsTrigger 
            value="ingredients" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
          >
            Ingredienti
          </TabsTrigger>
          <TabsTrigger 
            value="nutrition" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
          >
            Valori Nutrizionali
          </TabsTrigger>
          <TabsTrigger 
            value="usage" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
          >
            Come Usarlo
          </TabsTrigger>
          <TabsTrigger 
            value="storage" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
          >
            Conservazione
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ingredients" className="mt-6">
          <div className="text-sm text-muted-foreground space-y-3">
            <p>{displayIngredients}</p>
            {allergens && (
              <p className="mt-4">
                <span className="font-medium text-foreground">Allergeni: </span>
                <span className="font-semibold">{allergens}</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground/70 mt-4">
              Può contenere tracce di frutta a guscio. Prodotto in uno stabilimento che lavora anche latte e derivati.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition" className="mt-6">
          <NutritionTable data={hasNutritionData ? nutrition : undefined} />
        </TabsContent>
        
        <TabsContent value="usage" className="mt-6">
          <div className="text-sm text-muted-foreground">
            <p className="mb-4 font-medium text-foreground">Suggerimenti d'uso:</p>
            <ul className="space-y-2">
              {displayUsage.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="storage" className="mt-6">
          <div className="text-sm text-muted-foreground space-y-4">
            <p>{displayStorage}</p>
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-sm flex-wrap">
              <div>
                <p className="text-xs font-medium text-foreground mb-1">TMC</p>
                <p className="text-xs text-muted-foreground">Vedi data sulla confezione</p>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">Peso Netto</p>
                <p className="text-xs text-muted-foreground">{weightGrams}g</p>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">Origine</p>
                <p className="text-xs text-muted-foreground">Cilento, Italia</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
