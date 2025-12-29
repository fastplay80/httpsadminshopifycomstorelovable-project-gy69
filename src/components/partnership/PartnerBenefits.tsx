import { 
  FileText, 
  Camera, 
  Share2, 
  UserCheck, 
  Handshake 
} from "lucide-react";

const benefits = [
  {
    icon: FileText,
    title: "Listino Dedicato",
    description: "Prezzi wholesale riservati ai partner, con margini studiati per la redditività del tuo business."
  },
  {
    icon: Camera,
    title: "Materiale Marketing",
    description: "Foto professionali, storytelling, contenuti social pronti all'uso per la tua comunicazione."
  },
  {
    icon: Share2,
    title: "Supporto Social",
    description: "Condivisione dei tuoi post, tag, stories. Cresciamo insieme anche online."
  },
  {
    icon: UserCheck,
    title: "Contatto Diretto",
    description: "Un referente commerciale dedicato, non risponditori automatici. Parliamo di persona."
  }
];

const PartnerBenefits = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-editorial">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Cosa Ricevi
            </p>
            <h2 className="heading-section text-foreground mb-6">
              Supporto Completo per i Partner
            </h2>
            <div className="divider-editorial" />
          </div>
          
          {/* Benefits grid */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-card p-8 rounded-sm border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-medium mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Partnership philosophy teaser */}
          <div className="bg-accent text-accent-foreground p-8 md:p-12 rounded-sm text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Handshake className="w-8 h-8" />
            </div>
            <p className="font-serif text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              "Cresciamo insieme. Non spediamo semplicemente prodotti."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefits;
