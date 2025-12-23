import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section 
      className="section-padding bg-primary text-primary-foreground"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-narrow text-center">
        <Mail className="w-10 h-10 mx-auto mb-6 opacity-80" aria-hidden="true" />
        
        <h2 
          id="newsletter-heading"
          className="font-serif text-3xl md:text-4xl font-medium mb-4"
        >
          Ricette dal Cilento
        </h2>
        
        <p className="text-lg text-primary-foreground/85 max-w-xl mx-auto mb-8">
          Una volta a settimana: ricette autentiche, abbinamenti gourmet 
          e storie dal nostro laboratorio. Niente spam, solo gusto.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary-foreground/10 rounded-sm">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Benvenuto nella famiglia Minnelea!</p>
              <p className="text-sm text-primary-foreground/80">
                Controlla la tua casella email.
              </p>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Indirizzo email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  required
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 
                           rounded-sm text-primary-foreground placeholder:text-primary-foreground/50
                           focus:outline-none focus:border-primary-foreground/40 focus:bg-primary-foreground/15
                           transition-colors"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 
                         bg-primary-foreground text-primary font-medium rounded-sm
                         hover:bg-primary-foreground/90 active:scale-[0.98]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         transition-all"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <>
                    Iscriviti
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-primary-foreground/60 mt-4">
              Iscrivendoti accetti la nostra{' '}
              <a href="/privacy" className="underline hover:text-primary-foreground/80">
                Privacy Policy
              </a>
              . Puoi disiscriverti in qualsiasi momento.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailCapture;
