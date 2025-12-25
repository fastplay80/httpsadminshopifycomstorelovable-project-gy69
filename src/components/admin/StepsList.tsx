import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step, generateId } from '@/lib/recipes';

interface StepsListProps {
  steps: Step[];
  onChange: (steps: Step[]) => void;
}

export function StepsList({ steps, onChange }: StepsListProps) {
  const addStep = () => {
    onChange([...steps, { id: generateId(), text: '' }]);
  };

  const removeStep = (id: string) => {
    onChange(steps.filter((s) => s.id !== id));
  };

  const updateStep = (id: string, text: string) => {
    onChange(steps.map((s) => (s.id === id ? { ...s, text } : s)));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onChange(newSteps);
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-wide min-w-[60px]">
            STEP {index + 1}
          </span>
          <Input
            value={step.text}
            onChange={(e) => updateStep(step.id, e.target.value)}
            placeholder="Descrivi questo passaggio..."
            className="flex-1 border-border"
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => moveStep(index, 'up')}
              disabled={index === 0}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => moveStep(index, 'down')}
              disabled={index === steps.length - 1}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeStep(step.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addStep}
        className="w-full border-dashed border-border hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Aggiungi step
      </Button>
    </div>
  );
}
