import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "la-tradizione-delle-confetture-cilentane",
    title: "La tradizione delle confetture cilentane",
    excerpt: "Scopri i segreti delle nostre ricette tramandate da generazioni nel cuore del Parco Nazionale del Cilento.",
    image: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=400&fit=crop",
    category: "Tradizione",
    date: "15 Dicembre 2024",
    readTime: "5 min"
  },
  {
    id: 2,
    slug: "come-abbinare-le-nostre-conserve",
    title: "Come abbinare le nostre conserve ai formaggi",
    excerpt: "Una guida completa agli abbinamenti perfetti tra le nostre confetture artigianali e i migliori formaggi italiani.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop",
    category: "Ricette",
    date: "10 Dicembre 2024",
    readTime: "4 min"
  },
  {
    id: 3,
    slug: "great-taste-awards-2024",
    title: "Great Taste Awards 2024: i nostri premi",
    excerpt: "Celebriamo le nostre confetture premiate ai Great Taste Awards, il riconoscimento più prestigioso nel mondo del food.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop",
    category: "Premi",
    date: "5 Dicembre 2024",
    readTime: "3 min"
  }
];

export const BlogSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
              Dal nostro journal
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Storie dal Cilento
            </h2>
          </div>
          <Link 
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm tracking-wide text-foreground hover:text-primary transition-colors"
          >
            Tutti gli articoli
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm text-foreground text-xs tracking-wider uppercase px-3 py-1.5">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>{post.date}</time>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>{post.readTime} lettura</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-2 text-sm text-foreground group-hover:text-primary transition-colors pt-2">
                    Leggi di più
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
