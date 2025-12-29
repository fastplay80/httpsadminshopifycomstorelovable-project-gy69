import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

const businessTypes = [
  { value: "restaurant", label: "Ristorante / Pizzeria" },
  { value: "wineshop", label: "Enoteca / Gastronomia" },
  { value: "bakery", label: "Panificio / Pasticceria" },
  { value: "other", label: "Altro" }
];

const PartnershipForm = forwardRef<HTMLDivElement>((_, ref) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    city: "",
    businessType: "",
    website: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.businessName || !formData.city || !formData.businessType) {
      toast({
        title: "Campi obbligatori",
        description: "Compila tutti i campi richiesti.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Richiesta inviata",
      description: "Ti contatteremo entro 48 ore lavorative."
    });
  };

  if (isSubmitted) {
    return (
      <section ref={ref} className="section-padding bg-background">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="heading-section text-foreground mb-6">
              Grazie per la tua richiesta
            </h2>
            <p className="text-body max-w-lg mx-auto">
              Abbiamo ricevuto la tua candidatura. Il nostro team commerciale 
              la valuterà e ti contatterà entro 48 ore lavorative.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-padding bg-background" id="partnership-form">
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Candidatura
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Richiedi la Partnership
            </h2>
            <p className="text-body">
              Compila il modulo per ricevere il listino dedicato e fissare 
              una call introduttiva con il nostro team.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business name */}
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium">
                Nome Attività <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Es. Enoteca del Centro"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="h-12"
                required
              />
            </div>
            
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                Città / Zona <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Es. Milano - Brera"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="h-12"
                required
              />
            </div>
            
            {/* Business type */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Tipologia Attività <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.businessType}
                onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                className="grid sm:grid-cols-2 gap-3"
              >
                {businessTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label 
                      htmlFor={type.value} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Website / Instagram */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium">
                Sito Web o Instagram
              </Label>
              <Input
                id="website"
                placeholder="www.tuosito.it o @tuoinstagram"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="h-12"
              />
            </div>
            
            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Messaggio
              </Label>
              <Textarea
                id="message"
                placeholder="Raccontaci della tua attività e perché vorresti diventare partner Minnelea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[120px] resize-none"
              />
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              size="lg"
              className="btn-primary w-full py-6 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Invio in corso..."
              ) : (
                <>
                  Richiedi Listino e Call Introduttiva
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            {/* Note */}
            <p className="text-xs text-muted-foreground text-center pt-4">
              Tutte le candidature vengono valutate manualmente dal nostro team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
});

PartnershipForm.displayName = "PartnershipForm";

export default PartnershipForm;
