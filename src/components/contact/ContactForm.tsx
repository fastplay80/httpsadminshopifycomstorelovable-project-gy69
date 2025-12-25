import { useState } from "react";
import { Send, Check } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "ordini",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    } else if (formData.name.length > 100) {
      newErrors.name = "Il nome deve essere inferiore a 100 caratteri";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un indirizzo email valido";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Il messaggio deve essere inferiore a 1000 caratteri";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-secondary/50 border border-border/60 p-10 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
          <Check className="w-7 h-7 text-accent" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
          Messaggio inviato
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Grazie per averci contattato. Ti risponderemo entro 24-48 ore lavorative.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-background border rounded-sm
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring transition-all
                   ${errors.name ? "border-destructive" : "border-border/60"}`}
          placeholder="Il tuo nome"
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-background border rounded-sm
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring transition-all
                   ${errors.email ? "border-destructive" : "border-border/60"}`}
          placeholder="La tua email"
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
          Motivo del contatto
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-border/60 rounded-sm
                   text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                   cursor-pointer transition-all"
        >
          <option value="ordini">Informazioni sugli ordini</option>
          <option value="b2b">Collaborazioni B2B</option>
          <option value="press">Stampa e media</option>
          <option value="altro">Altro</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Messaggio *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-background border rounded-sm
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring transition-all
                   resize-none
                   ${errors.message ? "border-destructive" : "border-border/60"}`}
          placeholder="Come possiamo aiutarti?"
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 w-full md:w-auto
                 px-8 py-4 bg-foreground text-background text-sm font-medium
                 rounded-sm hover:bg-foreground/90 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          "Invio in corso..."
        ) : (
          <>
            Invia messaggio
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
