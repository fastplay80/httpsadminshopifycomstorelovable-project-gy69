import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Macros } from '@/lib/recipes';

interface MacrosChartProps {
  macros: Macros;
  onChange: (macros: Macros) => void;
}

const COLORS = {
  protein: 'hsl(105, 49%, 45%)',
  carbs: 'hsl(40, 91%, 55%)',
  fat: 'hsl(0, 84%, 60%)',
  fiber: 'hsl(177, 36%, 50%)',
};

export function MacrosChart({ macros, onChange }: MacrosChartProps) {
  const updateMacro = (key: keyof Macros, value: number | string) => {
    onChange({ ...macros, [key]: value });
  };

  const total = macros.protein + macros.carbs + macros.fat + macros.fiber;
  
  const chartData = [
    { name: 'Proteine', value: macros.protein, color: COLORS.protein },
    { name: 'Carboidrati', value: macros.carbs, color: COLORS.carbs },
    { name: 'Grassi', value: macros.fat, color: COLORS.fat },
    { name: 'Fibre', value: macros.fiber, color: COLORS.fiber },
  ];

  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Valori di riferimento per</Label>
          <Select
            value={macros.reference}
            onValueChange={(value) => updateMacro('reference', value as Macros['reference'])}
          >
            <SelectTrigger className="mt-1.5 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="100g">Per 100g</SelectItem>
              <SelectItem value="porzione">Per porzione</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Energia (kcal)</Label>
            <Input
              type="number"
              value={macros.kcal}
              onChange={(e) => updateMacro('kcal', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Proteine (g)</Label>
            <Input
              type="number"
              value={macros.protein}
              onChange={(e) => updateMacro('protein', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Carboidrati (g)</Label>
            <Input
              type="number"
              value={macros.carbs}
              onChange={(e) => updateMacro('carbs', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">di cui Zuccheri (g)</Label>
            <Input
              type="number"
              value={macros.sugar}
              onChange={(e) => updateMacro('sugar', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Grassi (g)</Label>
            <Input
              type="number"
              value={macros.fat}
              onChange={(e) => updateMacro('fat', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">di cui Saturi (g)</Label>
            <Input
              type="number"
              value={macros.saturated}
              onChange={(e) => updateMacro('saturated', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Fibre (g)</Label>
            <Input
              type="number"
              value={macros.fiber}
              onChange={(e) => updateMacro('fiber', Number(e.target.value))}
              min={0}
              className="mt-1.5 border-border"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Sale (g)</Label>
            <Input
              type="number"
              value={macros.salt}
              onChange={(e) => updateMacro('salt', Number(e.target.value))}
              min={0}
              step={0.1}
              className="mt-1.5 border-border"
            />
          </div>
        </div>
      </div>

      {/* Donut chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
          Informazioni nutrizionali
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => (
                  <span className="text-sm text-foreground">
                    {value} ({getPercentage(entry.payload.value)}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Totale: {macros.kcal} kcal
        </div>
      </div>
    </div>
  );
}
