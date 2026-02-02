import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Link as LinkIcon, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { 
  getArticleBySlug, 
  getRelatedArticles, 
  getAdjacentArticles,
  type Article 
} from "@/lib/blog";

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [adjacentArticles, setAdjacentArticles] = useState<{ prev: Article | null; next: Article | null }>({ prev: null, next: null });
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Load article data
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const [articleData, related, adjacent] = await Promise.all([
          getArticleBySlug(slug),
          getRelatedArticles(slug, 2),
          getAdjacentArticles(slug)
        ]);
        
        setArticle(articleData || null);
        setRelatedArticles(related);
        setAdjacentArticles(adjacent);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const element = articleRef.current;
      const totalHeight = element.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareEmail = () => {
    if (article) {
      window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`;
    }
  };

  if (isLoading) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
            <p className="text-muted-foreground mt-4">Caricamento articolo...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Articolo non trovato</h1>
            <p className="text-muted-foreground mb-8">L'articolo che stai cercando non esiste.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 
                       bg-foreground text-background text-sm font-medium
                       rounded-sm hover:bg-foreground/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al Journal
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Minnelea Journal</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverImage} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.coverImage,
            "author": {
              "@type": "Person",
              "name": article.author.name
            },
            "datePublished": article.dateISO,
            "publisher": {
              "@type": "Organization",
              "name": "Minnelea"
            }
          })}
        </script>
      </Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border/30">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <AnnouncementBar />
      <Header />

      <article ref={articleRef} className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl pt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Category */}
            <span className="inline-block text-[11px] tracking-[0.4em] uppercase text-accent font-medium">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {article.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border hidden md:block" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{article.date}</time>
              </div>
              <span className="w-1 h-1 rounded-full bg-border hidden md:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readingTime} min lettura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button 
                onClick={copyLink}
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                aria-label="Copia link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={shareEmail}
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                aria-label="Condividi via email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl py-12 md:py-16">
          {/* Article Content - HTML from Shopify */}
          <div 
            className="prose prose-lg max-w-none
                     prose-headings:font-serif prose-headings:text-foreground
                     prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6
                     prose-p:text-foreground/85 prose-p:leading-[1.85]
                     prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-sm
                     prose-blockquote:border-l-accent prose-blockquote:bg-secondary/30 prose-blockquote:py-4 prose-blockquote:px-6
                     prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-xl"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Author Bio */}
          <div className="mt-16 pt-12 border-t border-border/60">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-serif text-xl text-foreground mb-2">
                  {article.author.name}
                </h4>
                {article.author.bio && (
                  <p className="text-muted-foreground leading-relaxed">
                    {article.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="px-3 py-1 text-xs bg-secondary/50 border border-border/60 rounded-sm
                           text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-secondary/30 py-16 md:py-20 mt-16">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
                Continua a leggere
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    to={`/blog/${relatedArticle.slug}`}
                    className="group flex gap-6"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">
                      <img
                        src={relatedArticle.coverImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium mb-2">
                        {relatedArticle.category}
                      </span>
                      <h4 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors leading-tight">
                        {relatedArticle.title}
                      </h4>
                      <span className="text-sm text-muted-foreground mt-2">
                        {relatedArticle.readingTime} min lettura
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Prev/Next Navigation */}
        <nav className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between gap-8 border-t border-border/60 pt-12">
            {adjacentArticles.prev ? (
              <Link
                to={`/blog/${adjacentArticles.prev.slug}`}
                className="group flex items-center gap-4"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Precedente</span>
                  <p className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                    {adjacentArticles.prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {adjacentArticles.next && (
              <Link
                to={`/blog/${adjacentArticles.next.slug}`}
                className="group flex items-center gap-4 text-right md:ml-auto"
              >
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Successivo</span>
                  <p className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                    {adjacentArticles.next.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            )}
          </div>
        </nav>

        {/* Back to Blog */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl pb-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al Journal
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
};

export default BlogArticle;
