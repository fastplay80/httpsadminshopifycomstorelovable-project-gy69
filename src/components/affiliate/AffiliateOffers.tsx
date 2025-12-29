import { Percent, Package, Image, Share2, MessageCircle } from "lucide-react";

const offers = [
  {
    icon: Percent,
    title: "Commissioni sulle vendite",
    description: "Ricevi una percentuale su ogni ordine tracciato attraverso il tuo link personale."
  },
  {
    icon: Package,
    title: "Kit prodotti",
    description: "Inviamo prodotti selezionati in base al tuo profilo e al tipo di contenuti che crei."
  },
  {
    icon: Image,
    title: "Asset ufficiali del brand",
    description: "Accesso a foto, loghi e materiali grafici quando servono per i tuoi contenuti."
  },
  {
    icon: Share2,
    title: "Visibilità e repost",
    description: "Condividiamo i contenuti migliori sui nostri canali, con credito e tag."
  },
  {
    icon: MessageCircle,
    title: "Contatto diretto e umano",
    description: "Niente piattaforme fredde. Parliamo con te, non con un algoritmo."
  }
];

const AffiliateOffers = () => {
  return (
    <section className="py-20 md:py-28 bg-section">
      <div className="container-luxury">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Cosa offriamo
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Quello che ricevi come affiliate
          </h2>
          <p className="text-body">
            Preferiamo poche collaborazioni fatte bene, 
            piuttosto che centinaia fatte male.
          </p>
        </div>
        
        {/* Offers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-sm border border-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <offer.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AffiliateOffers;
