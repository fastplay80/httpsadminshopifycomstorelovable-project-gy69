import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactDetails = () => {
  const whatsappNumber = "393401234567"; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Ciao! Vorrei informazioni sui prodotti Minnelea.");
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-6">
          Contattaci direttamente
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Preferisci parlare con noi? Siamo disponibili via email o WhatsApp 
          per rispondere a tutte le tue domande.
        </p>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 flex-shrink-0">
            <Mail className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Email</h3>
            <a 
              href="mailto:ciao@minnelea.it" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              ciao@minnelea.it
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 flex-shrink-0">
            <Phone className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">WhatsApp</h3>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              +39 340 123 4567
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              Risposta rapida garantita
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 flex-shrink-0">
            <Clock className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Orari</h3>
            <p className="text-muted-foreground text-sm">
              Lun - Ven: 9:00 - 18:00<br />
              Sab: 9:00 - 13:00
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 flex-shrink-0">
            <MapPin className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Dove siamo</h3>
            <p className="text-muted-foreground text-sm">
              Parco Nazionale del Cilento<br />
              Campania, Italia
            </p>
          </div>
        </div>
      </div>

      {/* Quick action */}
      <div className="pt-4">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 
                   bg-accent text-accent-foreground text-sm font-medium
                   rounded-sm hover:bg-accent/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Scrivici su WhatsApp
        </a>
      </div>
    </div>
  );
};
