import { cn } from '@/lib/utils';

interface ChipGroupProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
}

export function ChipGroup({ options, selected, onChange, label }: ChipGroupProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border focus:outline-none focus:ring-2 focus:ring-accent/50',
                isSelected
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/50'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
