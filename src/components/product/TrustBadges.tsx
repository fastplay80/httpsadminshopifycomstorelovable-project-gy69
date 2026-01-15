import { Heart, Leaf, ShieldCheck, MapPin } from 'lucide-react';

const badges = [
  { icon: Heart, label: 'Artigianale' },
  { icon: Leaf, label: '100% Naturale' },
  { icon: ShieldCheck, label: 'Senza Conservanti' },
  { icon: MapPin, label: 'Made in Cilento' },
];

const TrustBadges = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
        >
          <badge.icon className="w-3.5 h-3.5 text-accent" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
