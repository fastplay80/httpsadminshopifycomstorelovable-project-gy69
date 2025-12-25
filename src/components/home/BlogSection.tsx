import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "la-tradizione-delle-confetture-cilentane",
    title: "La tradizione delle confetture cilentane",
    excerpt: "Scopri i segreti delle nostre ricette tramandate da generazioni nel cuore del Parco Nazionale del Cilento.",
    image: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=800&h=1000&fit=crop",
    category: "Tradizione",
    date: "15 Dicembre 2024",
    readTime: "5 min",
    author: "Maria Rossi"
  },
  {
    id: 2,
    slug: "come-abbinare-le-nostre-conserve",
    title: "Come abbinare le nostre conserve ai formaggi",
    excerpt: "Una guida completa agli abbinamenti perfetti tra le nostre confetture artigianali e i migliori formaggi italiani.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=1000&fit=crop",
    category: "Ricette",
    date: "10 Dicembre 2024",
    readTime: "4 min",
    author: "Giuseppe Verdi"
  },
  {
    id: 3,
    slug: "great-taste-awards-2024",
    title: "Great Taste Awards 2024: i nostri premi",
    excerpt: "Celebriamo le nostre confetture premiate ai Great Taste Awards, il riconoscimento più prestigioso nel mondo del food.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=1000&fit=crop",
    category: "Premi",
    date: "5 Dicembre 2024",
    readTime: "3 min",
    author: "Lucia Bianchi"
  }
];

export const BlogSection = () => {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Editorial Header */}
        <header className="mb-16 md:mb-20 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground font-medium">
                Journal
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight">
                Storie dal Cilento
              </h2>
              <p className="text-muted-foreground max-w-md text-base md:text-lg leading-relaxed">
                Ricette, tradizioni e racconti dalla nostra terra
              </p>
            </div>
            <Link 
              to="/blog"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <span className="link-underline">Esplora tutti gli articoli</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Subtle divider */}
          <div className="mt-10 md:mt-12 h-px bg-border/60 w-full" />
        </header>

        {/* Featured Article - Large Editorial Card */}
        <article className="group mb-16 md:mb-20">
          <Link to={`/blog/${featuredPost.slug}`} className="block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="lg:pl-4 py-4 lg:py-8 space-y-6">
                {/* Category */}
                <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-accent font-medium">
                  {featuredPost.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] tracking-tight">
                  <span className="link-underline">{featuredPost.title}</span>
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg">
                  {featuredPost.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <span className="font-medium text-foreground/70">{featuredPost.author}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <time>{featuredPost.date}</time>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{featuredPost.readTime} lettura</span>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <span className="inline-flex items-center gap-3 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                    Leggi l'articolo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16">
          {otherPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                  
                  {/* Category Badge - Refined */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-background/95 backdrop-blur-sm text-foreground text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-2">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title */}
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-[1.2] tracking-tight">
                    <span className="link-underline">{post.title}</span>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/70">{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <time>{post.date}</time>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA - Mobile */}
        <div className="mt-16 md:mt-20 text-center md:hidden">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-3 text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            <span className="link-underline">Tutti gli articoli</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
