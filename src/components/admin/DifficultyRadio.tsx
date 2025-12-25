import { cn } from '@/lib/utils';

type Difficulty = 'facile' | 'media' | 'difficile';

interface DifficultyRadioProps {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
  label?: string;
}

const options: { value: Difficulty; label: string }[] = [
  { value: 'facile', label: 'Facile' },
  { value: 'media', label: 'Media' },
  { value: 'difficile', label: 'Difficile' },
];

export function DifficultyRadio({ value, onChange, label }: DifficultyRadioProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                value === option.value
                  ? 'border-accent'
                  : 'border-border group-hover:border-muted-foreground'
              )}
            >
              {value === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              )}
            </div>
            <input
              type="radio"
              name="difficulty"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className={cn(
              'text-sm transition-colors',
              value === option.value ? 'text-foreground font-medium' : 'text-muted-foreground'
            )}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
