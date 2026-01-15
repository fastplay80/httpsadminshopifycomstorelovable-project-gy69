import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NutritionTable from './NutritionTable';

interface ProductTabsProps {
  ingredients?: string;
  allergens?: string;
  usage?: string[];
  storage?: string;
}

const ProductTabs = ({ 
  ingredients = 'Frutta (65%), zucchero, succo di limone. Senza coloranti, conservanti o addensanti artificiali.',
  allergens,
  usage = [
    'Perfetto su pane tostato o fette biscottate',
    'Ideale per farcire crostate e dolci',
    'Ottimo abbinato a formaggi stagionati',
    'Da provare con yogurt greco a colazione',
  ],
  storage = 'Conservare in luogo fresco e asciutto, al riparo dalla luce. Dopo l\'apertura conservare in frigorifero e consumare entro 3 settimane.',
}: ProductTabsProps) => {
  return (
    <div className="border-t border-border pt-8">
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none gap-0">
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
            <p>{ingredients}</p>
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
          <NutritionTable />
        </TabsContent>
        
        <TabsContent value="usage" className="mt-6">
          <div className="text-sm text-muted-foreground">
            <p className="mb-4 font-medium text-foreground">Suggerimenti d'uso:</p>
            <ul className="space-y-2">
              {usage.map((suggestion, index) => (
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
            <p>{storage}</p>
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-sm">
              <div>
                <p className="text-xs font-medium text-foreground mb-1">TMC</p>
                <p className="text-xs text-muted-foreground">Vedi data sulla confezione</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">Peso Netto</p>
                <p className="text-xs text-muted-foreground">200g</p>
              </div>
              <div className="h-8 w-px bg-border" />
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
