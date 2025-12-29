import { MapPin, Sun, Palette } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Un territorio da raccontare",
    description: "Il Cilento, il Sud Italia, la tradizione — ogni vasetto ha una storia che si racconta da sola."
  },
  {
    icon: Sun,
    title: "Prodotti che entrano nella quotidianità",
    description: "Le nostre conserve si inseriscono naturalmente nei momenti della giornata: colazione, aperitivo, cena."
  },
  {
    icon: Palette,
    title: "Un'estetica che ispira",
    description: "Packaging pulito, fotografia editoriale — contenuti che valorizzano il tuo feed."
  }
];

const WhyMinnlea = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - content */}
          <div>
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Perché Minnelea
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              È facile parlare di Minnelea
            </h2>
            <p className="text-body mb-8">
              Non devi inventare una storia. Basta condividere quello che fai 
              davvero con i nostri prodotti — una ricetta, un momento, un'idea.
            </p>
            
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-section rounded-full flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - quote */}
          <div className="bg-section p-10 md:p-14 rounded-sm">
            <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6">
              "Non devi inventare una storia. Devi solo condividere quello che fai davvero con i nostri prodotti."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMinnlea;
