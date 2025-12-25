import { cn } from '@/lib/utils';
import { NutritionFlags } from '@/lib/recipes';

interface NutritionBadgesProps {
  flags: NutritionFlags;
  onChange: (flags: NutritionFlags) => void;
}

const lifestyleLabels: Record<keyof NutritionFlags['lifestyle'], { positive: string; negative: string }> = {
  vegetarian: { positive: 'Adatto ai vegetariani', negative: 'Non adatto ai vegetariani' },
  vegan: { positive: 'Adatto ai vegani', negative: 'Non adatto ai vegani' },
  glutenFree: { positive: 'Senza glutine', negative: 'Contiene glutine' },
  lactoseFree: { positive: 'Senza lattosio', negative: 'Contiene lattosio' },
  nickelFree: { positive: 'Senza nichel', negative: 'Contiene nichel' },
};

const allergenLabels: Record<keyof NutritionFlags['allergens'], string> = {
  gluten: 'Glutine',
  dairy: 'Latticini',
  eggs: 'Uova',
  nuts: 'Frutta a guscio',
  peanuts: 'Arachidi',
  soy: 'Soia',
  fish: 'Pesce',
  shellfish: 'Crostacei',
  celery: 'Sedano',
  mustard: 'Senape',
  sesame: 'Sesamo',
  sulfites: 'Solfiti',
  lupin: 'Lupini',
  mollusks: 'Molluschi',
};

export function NutritionBadges({ flags, onChange }: NutritionBadgesProps) {
  const toggleLifestyle = (key: keyof NutritionFlags['lifestyle']) => {
    onChange({
      ...flags,
      lifestyle: {
        ...flags.lifestyle,
        [key]: !flags.lifestyle[key],
      },
    });
  };

  const toggleAllergen = (key: keyof NutritionFlags['allergens']) => {
    onChange({
      ...flags,
      allergens: {
        ...flags.allergens,
        [key]: !flags.allergens[key],
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Stili di vita */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Stili di vita</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(flags.lifestyle) as Array<keyof NutritionFlags['lifestyle']>).map((key) => {
            const isPositive = flags.lifestyle[key];
            const label = isPositive ? lifestyleLabels[key].positive : lifestyleLabels[key].negative;
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleLifestyle(key)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  'border focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isPositive
                    ? 'border-accent bg-accent/10 text-accent focus:ring-accent/50'
                    : 'border-destructive/50 bg-destructive/10 text-destructive focus:ring-destructive/50'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intolleranze e allergie */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Intolleranze e allergie</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(flags.allergens) as Array<keyof NutritionFlags['allergens']>).map((key) => {
            const isPresent = flags.allergens[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleAllergen(key)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  'border focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isPresent
                    ? 'border-destructive/50 bg-destructive/10 text-destructive focus:ring-destructive/50'
                    : 'border-accent bg-accent/10 text-accent focus:ring-accent/50'
                )}
              >
                {isPresent ? `Contiene ${allergenLabels[key].toLowerCase()}` : `Senza ${allergenLabels[key].toLowerCase()}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-sm text-muted-foreground">
        Clicca sui badge per alternare tra "contiene" e "senza". I valori verranno ricalcolati in base agli ingredienti.
      </p>
    </div>
  );
}
