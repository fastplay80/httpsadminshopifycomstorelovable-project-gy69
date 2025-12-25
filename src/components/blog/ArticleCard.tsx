import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/blog";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

export const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  if (variant === "featured") {
    return (
      <article className="group">
        <Link to={`/blog/${article.slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="lg:pl-4 py-4 lg:py-8 space-y-6">
              <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-accent font-medium">
                {article.category}
              </span>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] tracking-tight">
                <span className="link-underline">{article.title}</span>
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span className="font-medium text-foreground/70">{article.author.name}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <time>{article.date}</time>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{article.readingTime} min lettura</span>
              </div>

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
    );
  }

  return (
    <article className="group">
      <Link to={`/blog/${article.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden mb-6">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          
          <div className="absolute top-5 left-5">
            <span className="bg-background/95 backdrop-blur-sm text-foreground text-[10px] tracking-[0.3em] uppercase font-medium px-4 py-2">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-[1.2] tracking-tight">
            <span className="link-underline">{article.title}</span>
          </h3>

          <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">{article.author.name}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <time>{article.date}</time>
            </div>
            <span className="text-xs text-muted-foreground">
              {article.readingTime} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
