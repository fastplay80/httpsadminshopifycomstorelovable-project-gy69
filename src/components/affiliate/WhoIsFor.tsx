import { Camera, PenLine, Utensils, Heart } from "lucide-react";

const profiles = [
  {
    icon: Utensils,
    title: "Chi cucina con passione",
    description: "Appassionati di cucina che amano sperimentare e condividere ricette autentiche."
  },
  {
    icon: Camera,
    title: "Chi fotografa il bello",
    description: "Fotografi e creator che sanno catturare la bellezza nelle cose semplici."
  },
  {
    icon: PenLine,
    title: "Chi scrive con cura",
    description: "Blogger, newsletter writer, giornalisti food & lifestyle."
  },
  {
    icon: Heart,
    title: "Chi crea con intento",
    description: "UGC creator su Instagram, TikTok, YouTube che puntano sulla qualità."
  }
];

const WhoIsFor = () => {
  return (
    <section className="py-20 md:py-28 bg-section">
      <div className="container-luxury">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Per chi è
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Questo programma non è per tutti
          </h2>
          <p className="text-body">
            Non cerchiamo numeri. Cerchiamo persone che hanno costruito 
            la propria audience sulla fiducia, non sul volume.
          </p>
        </div>
        
        {/* Profiles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {profiles.map((profile, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-sm border border-border text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <profile.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">
                {profile.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Key quote */}
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-xl md:text-2xl italic text-foreground/80">
            "Un pubblico piccolo e fiducioso vale più di uno grande e distratto."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default WhoIsFor;
