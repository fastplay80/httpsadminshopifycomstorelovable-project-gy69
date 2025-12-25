import { Copy, Trash2, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tip, SponsoredProduct, generateId } from '@/lib/recipes';

interface TipsTableProps {
  tips: Tip[];
  products: SponsoredProduct[];
  onChange: (tips: Tip[]) => void;
}

export function TipsTable({ tips, products, onChange }: TipsTableProps) {
  const addTip = () => {
    onChange([...tips, { id: generateId(), text: '', sponsoredProductId: undefined }]);
  };

  const removeTip = (id: string) => {
    onChange(tips.filter((t) => t.id !== id));
  };

  const duplicateTip = (tip: Tip) => {
    const newTip = { ...tip, id: generateId() };
    const index = tips.findIndex((t) => t.id === tip.id);
    const newTips = [...tips];
    newTips.splice(index + 1, 0, newTip);
    onChange(newTips);
  };

  const updateTip = (id: string, updates: Partial<Tip>) => {
    onChange(tips.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const getProductById = (id?: string) => products.find((p) => p.id === id);

  return (
    <div className="space-y-4">
      {/* Info box */}
      <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-lg">
        <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Suggerimenti</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Aggiungi consigli utili per migliorare la ricetta o varianti interessanti.</li>
            <li>Puoi collegare prodotti sponsorizzati ai suggerimenti.</li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggerimento</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-64">Sponsorizzato</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => {
                const product = getProductById(tip.sponsoredProductId);
                return (
                  <tr key={tip.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <Input
                        value={tip.text}
                        onChange={(e) => updateTip(tip.id, { text: e.target.value })}
                        placeholder="Scrivi un suggerimento..."
                        className="border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={tip.sponsoredProductId || 'none'}
                        onValueChange={(value) =>
                          updateTip(tip.id, {
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
                      <div className="flex justify-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => duplicateTip(tip)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeTip(tip.id)}
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
        onClick={addTip}
        className="w-full border-dashed border-border hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Aggiungi suggerimento
      </Button>
    </div>
  );
}
