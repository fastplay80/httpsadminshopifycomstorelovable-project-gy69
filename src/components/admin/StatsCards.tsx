import { RecipeStats } from '@/lib/recipes';
import { Eye, Users, ShoppingCart, TrendingUp, Package, Euro } from 'lucide-react';

interface StatsCardsProps {
  stats: RecipeStats;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
}

function StatCard({ icon, label, value, suffix }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-secondary rounded-lg text-accent">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground">
        {typeof value === 'number' ? value.toLocaleString('it-IT') : value}
        {suffix && <span className="text-lg font-normal text-muted-foreground ml-1">{suffix}</span>}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export function StatsCards({ stats }: StatsCardsProps) {
  const addToCartRate = stats.visits > 0 
    ? ((stats.addToCart / stats.visits) * 100).toFixed(1) 
    : '0';
  
  const avgVisitsPerUser = stats.uniqueUsers > 0 
    ? (stats.visits / stats.uniqueUsers).toFixed(1) 
    : '0';
  
  const purchaseConversionRate = stats.cartsCreated > 0 
    ? ((stats.cartsPurchased / stats.cartsCreated) * 100).toFixed(1) 
    : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        icon={<Eye className="h-5 w-5" />}
        label="Totale visite"
        value={stats.visits}
      />
      <StatCard
        icon={<Users className="h-5 w-5" />}
        label="Totale utenti unici"
        value={stats.uniqueUsers}
      />
      <StatCard
        icon={<ShoppingCart className="h-5 w-5" />}
        label="Totale aggiunte al carrello"
        value={stats.addToCart}
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5" />}
        label="Tasso di conversione aggiunta a carrello"
        value={addToCartRate}
        suffix="%"
      />
      <StatCard
        icon={<Eye className="h-5 w-5" />}
        label="Media visite per utente"
        value={avgVisitsPerUser}
      />
      <StatCard
        icon={<Package className="h-5 w-5" />}
        label="Totale carrelli creati"
        value={stats.cartsCreated}
      />
      <StatCard
        icon={<Package className="h-5 w-5" />}
        label="Totale carrelli acquistati"
        value={stats.cartsPurchased}
      />
      <StatCard
        icon={<Euro className="h-5 w-5" />}
        label="Totale acquistato"
        value={stats.totalPurchasedEuro.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
        suffix="€"
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5" />}
        label="Tasso di conversione acquisto carrello"
        value={purchaseConversionRate}
        suffix="%"
      />
    </div>
  );
}
