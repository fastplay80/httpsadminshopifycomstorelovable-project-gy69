interface BlogHeroProps {
  title?: string;
  subtitle?: string;
  showImage?: boolean;
  imageUrl?: string;
}

export const BlogHero = ({ 
  title = "Journal", 
  subtitle = "Ricette, tradizioni e racconti dalla nostra terra",
  showImage = false,
  imageUrl
}: BlogHeroProps) => {
  return (
    <header className="relative">
      {showImage && imageUrl && (
        <div className="absolute inset-0 -z-10">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-4 block">
            Il Journal di Minnelea
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <div className="h-px bg-border/60 w-full" />
      </div>
    </header>
  );
};
