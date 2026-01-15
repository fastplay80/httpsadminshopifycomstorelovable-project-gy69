import { Check } from 'lucide-react';

interface KeyBenefitsProps {
  benefits?: string[];
}

const defaultBenefits = [
  'Prodotto artigianalmente nel Cilento',
  'Ingredienti 100% italiani',
  'Senza olio di palma',
  'Ideale per colazione e aperitivo',
];

const KeyBenefits = ({ benefits = defaultBenefits }: KeyBenefitsProps) => {
  return (
    <ul className="space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  );
};

export default KeyBenefits;
