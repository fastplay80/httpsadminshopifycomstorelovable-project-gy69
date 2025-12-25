interface ContactHeroProps {
  title?: string;
  subtitle?: string;
}

export const ContactHero = ({ 
  title = "Parliamo.", 
  subtitle = "Siamo qui per rispondere alle tue domande"
}: ContactHeroProps) => {
  return (
    <header className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-4 block">
          Contatti
        </span>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
          {subtitle}
        </p>
      </div>
    </header>
  );
};
