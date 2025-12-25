import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function Stepper({ value, onChange, min = 1, max = 20, label }: StepperProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-border hover:bg-secondary"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="min-w-[3rem] text-center text-xl font-semibold text-foreground">
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-border hover:bg-secondary"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
