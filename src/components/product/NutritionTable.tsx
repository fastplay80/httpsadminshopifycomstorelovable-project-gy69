interface NutritionData {
  energia: string;
  grassi: string;
  grassiSaturi: string;
  carboidrati: string;
  zuccheri: string;
  proteine: string;
  sale: string;
  fibre?: string;
}

interface NutritionTableProps {
  data?: Partial<NutritionData>;
}

const defaultNutrition: NutritionData = {
  energia: '1046 kJ / 247 kcal',
  grassi: '0.3 g',
  grassiSaturi: '0.1 g',
  carboidrati: '60.0 g',
  zuccheri: '55.0 g',
  proteine: '0.4 g',
  sale: '0.02 g',
};

const NutritionTable = ({ data }: NutritionTableProps) => {
  const nutrition = { ...defaultNutrition, ...data };

  const rows = [
    { label: 'Energia', value: nutrition.energia },
    { label: 'Grassi', value: nutrition.grassi },
    { label: 'di cui acidi grassi saturi', value: nutrition.grassiSaturi, indent: true },
    { label: 'Carboidrati', value: nutrition.carboidrati },
    { label: 'di cui zuccheri', value: nutrition.zuccheri, indent: true },
    { label: 'Fibre', value: nutrition.fibre, hidden: !nutrition.fibre },
    { label: 'Proteine', value: nutrition.proteine },
    { label: 'Sale', value: nutrition.sale },
  ].filter(row => !row.hidden);

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="bg-secondary px-4 py-2">
        <span className="text-sm font-medium">Valori Nutrizionali per 100g</span>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr 
              key={row.label} 
              className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
            >
              <td className={`px-4 py-2 ${row.indent ? 'pl-8 text-muted-foreground' : ''}`}>
                {row.label}
              </td>
              <td className="px-4 py-2 text-right font-medium">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
