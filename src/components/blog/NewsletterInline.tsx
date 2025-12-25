import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface NewsletterInlineProps {
  variant?: "default" | "compact";
  className?: string;
}

export const NewsletterInline = ({ variant = "default", className = "" }: NewsletterInlineProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un indirizzo email valido");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with Klaviyo/Shopify integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");
  };

  if (isSuccess) {
    return (
      <div className={`bg-secondary/50 border border-border/60 p-8 md:p-10 text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
          <Check className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-2">
          Grazie per l'iscrizione
        </h3>
        <p className="text-muted-foreground">
          Riceverai presto le nostre storie nella tua casella.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="La tua email"
            className="flex-1 px-4 py-3 bg-secondary/50 border border-border/60 rounded-sm
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-foreground text-background text-sm font-medium
                     rounded-sm hover:bg-foreground/90 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "..." : "Iscriviti"}
          </button>
        </form>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`bg-secondary/50 border border-border/60 p-8 md:p-10 ${className}`}>
      <div className="max-w-lg mx-auto text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4 block">
          Newsletter
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
          Storie nella tua casella
        </h3>
        <p className="text-muted-foreground mb-6">
          Ricette, abbinamenti e storie dal Cilento. Una mail ogni tanto.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-4 py-3 bg-background border border-border/60 rounded-sm
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Indirizzo email"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 
                       bg-foreground text-background text-sm font-medium
                       rounded-sm hover:bg-foreground/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Invio..." : (
                <>
                  Iscriviti
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-sm text-destructive" role="alert">{error}</p>
          )}
          
          <p className="text-xs text-muted-foreground">
            Iscrivendoti accetti la nostra privacy policy. Niente spam, promesso.
          </p>
        </form>
      </div>
    </div>
  );
};
