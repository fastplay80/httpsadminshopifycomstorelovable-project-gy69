import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Cell
} from "recharts";

const distributionData = [
  { name: "Minnelea\nSelettiva", value: 2, fill: "hsl(105 49% 23%)" },
  { name: "Distribuzione\nMassa", value: 25, fill: "hsl(0 0% 80%)" }
];

const partnerDensityData = [
  { name: "Horeca", value: 1, fill: "hsl(40 91% 49%)" },
  { name: "Retail", value: 1, fill: "hsl(105 49% 23%)" }
];

const PartnershipCharts = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              I Numeri
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Distribuzione Controllata
            </h2>
            <div className="divider-editorial" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Distribution Control Chart */}
            <div className="bg-card p-6 md:p-8 rounded-sm border border-border">
              <h3 className="text-lg font-serif font-medium mb-2 text-center">
                Partner per Area
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-8">
                Confronto tra modelli distributivi
              </p>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={distributionData} 
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(75 5% 36%)' }}
                      width={100}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                      barSize={32}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center gap-8 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Minnelea: max 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <span className="text-muted-foreground">Massa: 25+</span>
                </div>
              </div>
            </div>
            
            {/* Partner Density Chart */}
            <div className="bg-card p-6 md:p-8 rounded-sm border border-border">
              <h3 className="text-lg font-serif font-medium mb-2 text-center">
                Densità Partner
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-8">
                Massimo partner per categoria in ogni area
              </p>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={partnerDensityData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(75 5% 36%)' }}
                    />
                    <YAxis 
                      hide 
                      domain={[0, 2]}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                      barSize={60}
                    >
                      {partnerDensityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                1 partner Horeca + 1 partner Retail = Esclusività garantita
              </p>
            </div>
          </div>
          
          {/* Funnel visualization */}
          <div className="mt-12 bg-secondary/30 p-8 md:p-12 rounded-sm">
            <h3 className="text-lg font-serif font-medium mb-8 text-center">
              Il Percorso del Cliente
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {/* Step 1 */}
              <div className="flex-1 max-w-xs text-center">
                <div className="w-full py-4 px-6 bg-accent text-accent-foreground rounded-sm md:rounded-r-none">
                  <span className="font-medium">Assaggia al ristorante</span>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:block w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[16px] border-l-accent" />
              
              {/* Step 2 */}
              <div className="flex-1 max-w-xs text-center">
                <div className="w-full py-4 px-6 bg-primary/80 text-primary-foreground rounded-sm md:rounded-none">
                  <span className="font-medium">Vive l'esperienza</span>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:block w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[16px] border-l-primary/80" />
              
              {/* Step 3 */}
              <div className="flex-1 max-w-xs text-center">
                <div className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-sm md:rounded-l-none">
                  <span className="font-medium">Acquista retail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipCharts;
