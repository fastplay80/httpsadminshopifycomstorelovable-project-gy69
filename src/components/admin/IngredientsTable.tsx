import { Copy, Trash2, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ingredient, SponsoredProduct, availableUnits, generateId } from '@/lib/recipes';

interface IngredientsTableProps {
  ingredients: Ingredient[];
  products: SponsoredProduct[];
  onChange: (ingredients: Ingredient[]) => void;
}

export function IngredientsTable({ ingredients, products, onChange }: IngredientsTableProps) {
  const addIngredient = () => {
    onChange([
      ...ingredients,
      {
        id: generateId(),
        name: '',
        sponsoredProductId: undefined,
        minQtyUnitCount: 1,
        qty: 0,
        unit: 'g',
        extraStep: false,
      },
    ]);
  };

  const removeIngredient = (id: string) => {
    onChange(ingredients.filter((i) => i.id !== id));
  };

  const duplicateIngredient = (ingredient: Ingredient) => {
    const newIngredient = { ...ingredient, id: generateId() };
    const index = ingredients.findIndex((i) => i.id === ingredient.id);
    const newIngredients = [...ingredients];
    newIngredients.splice(index + 1, 0, newIngredient);
    onChange(newIngredients);
  };

  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    onChange(ingredients.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const getProductById = (id?: string) => products.find((p) => p.id === id);

  return (
    <div className="space-y-4">
      {/* Info box */}
      <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-lg">
        <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Prodotti sponsorizzati</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Per quantità minima si intende la quantità minima (in unità) di prodotto sponsorizzato necessaria per la ricetta.</li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ingrediente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sponsorizzato</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Qtà min</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Quantità</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-28">Unità</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Step extra?</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => {
                const product = getProductById(ingredient.sponsoredProductId);
                return (
                  <tr key={ingredient.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, { name: e.target.value })}
                        placeholder="Nome ingrediente"
                        className="border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={ingredient.sponsoredProductId || 'none'}
                        onValueChange={(value) =>
                          updateIngredient(ingredient.id, {
                            sponsoredProductId: value === 'none' ? undefined : value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full border-border">
                          <SelectValue>
                            {product ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src={product.thumbUrl}
                                  alt={product.name}
                                  className="w-6 h-6 rounded object-cover"
                                />
                                <span className="truncate text-sm">{product.name}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Nessuno</span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="none">Nessuno</SelectItem>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              <div className="flex items-center gap-2">
                                <img
                                  src={p.thumbUrl}
                                  alt={p.name}
                                  className="w-6 h-6 rounded object-cover"
                                />
                                <span>{p.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        value={ingredient.minQtyUnitCount}
                        onChange={(e) =>
                          updateIngredient(ingredient.id, { minQtyUnitCount: Number(e.target.value) })
                        }
                        min={0}
                        className="border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        value={ingredient.qty}
                        onChange={(e) =>
                          updateIngredient(ingredient.id, { qty: Number(e.target.value) })
                        }
                        min={0}
                        className="border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => updateIngredient(ingredient.id, { unit: value })}
                      >
                        <SelectTrigger className="border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          {availableUnits.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Switch
                        checked={ingredient.extraStep}
                        onCheckedChange={(checked) =>
                          updateIngredient(ingredient.id, { extraStep: checked })
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => duplicateIngredient(ingredient)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeIngredient(ingredient.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addIngredient}
        className="w-full border-dashed border-border hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Aggiungi ingrediente
      </Button>
    </div>
  );
}
