import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

const AffiliateForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    socialLinks: "",
    country: "",
    language: "",
    message: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campi obbligatori mancanti",
        description: "Per favore compila nome, email e messaggio.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Candidatura inviata",
      description: "Grazie! Leggeremo la tua candidatura e ti risponderemo se c'è affinità."
    });
  };

  if (isSubmitted) {
    return (
      <section id="affiliate-form" className="py-20 md:py-28 bg-background">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              Grazie per la tua candidatura
            </h2>
            <p className="text-body">
              Abbiamo ricevuto il tuo messaggio. Leggiamo personalmente ogni candidatura 
              e rispondiamo solo ai profili in linea con i valori del brand.
              Se c'è affinità, ti ricontatteremo presto.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="affiliate-form" className="py-20 md:py-28 bg-background">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Candidatura
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Raccontaci di te
            </h2>
            <p className="text-body">
              Prenditi il tempo che ti serve. Non c'è fretta — 
              vogliamo conoscerti davvero.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Il tuo nome"
                className="bg-card"
              />
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="La tua email"
                className="bg-card"
              />
            </div>
            
            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Sito web / Blog</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://..."
                className="bg-card"
              />
            </div>
            
            {/* Social Links */}
            <div className="space-y-2">
              <Label htmlFor="socialLinks">Profili social</Label>
              <Textarea
                id="socialLinks"
                value={formData.socialLinks}
                onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                placeholder="Link ai tuoi profili Instagram, TikTok, YouTube..."
                className="bg-card min-h-[80px]"
              />
            </div>
            
            {/* Country & Language */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Paese</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Es. Italia"
                  className="bg-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Lingua dei contenuti</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  placeholder="Es. Italiano, Inglese"
                  className="bg-card"
                />
              </div>
            </div>
            
            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Parlaci di te e dei tuoi contenuti *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Cosa crei? Come comunichi? Perché Minnelea ti interessa?"
                className="bg-card min-h-[150px]"
              />
            </div>
            
            {/* Submit */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Invio in corso..."
              ) : (
                <>
                  Invia la tua candidatura
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            {/* Note */}
            <p className="text-sm text-muted-foreground text-center pt-4">
              Tutte le candidature vengono lette manualmente. 
              Rispondiamo solo ai profili in linea con i valori del brand.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AffiliateForm;
