import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogToolbar } from "@/components/blog/BlogToolbar";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { NewsletterInline } from "@/components/blog/NewsletterInline";
import { 
  filterArticles, 
  paginateArticles, 
  getFeaturedArticle,
  type FilterOptions,
  type Article
} from "@/lib/blog";

const ARTICLES_PER_PAGE = 6;

const BlogIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL
  const initialSearch = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "recent";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);
  
  // Articles state
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load articles from Shopify
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const options: FilterOptions = {
          search,
          category,
          sort: sort as "recent" | "reading-time"
        };
        const articles = await filterArticles(options);
        setAllArticles(articles);
        
        const featured = await getFeaturedArticle();
        setFeaturedArticle(featured);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [search, category, sort]);

  // Featured article (only show on first page with no filters)
  const showFeatured = page === 1 && !search && category === "all" && featuredArticle;

  // Exclude featured from grid when showing it separately
  const gridArticles = useMemo(() => {
    if (showFeatured && featuredArticle) {
      return allArticles.filter(a => a.slug !== featuredArticle.slug);
    }
    return allArticles;
  }, [allArticles, showFeatured, featuredArticle]);

  const { articles, totalPages, totalCount } = useMemo(() => {
    return paginateArticles(gridArticles, page, ARTICLES_PER_PAGE);
  }, [gridArticles, page]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category !== "all") params.set("category", category);
    if (sort !== "recent") params.set("sort", sort);
    if (page > 1) params.set("page", page.toString());
    setSearchParams(params, { replace: true });
  }, [search, category, sort, page, setSearchParams]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("recent");
    setPage(1);
  };

  const displayCount = showFeatured ? totalCount + 1 : totalCount;

  return (
    <>
      <Helmet>
        <title>Journal | Minnelea - Storie dal Cilento</title>
        <meta 
          name="description" 
          content="Ricette, tradizioni e racconti dalla nostra terra. Scopri il Journal di Minnelea." 
        />
        <meta property="og:title" content="Journal | Minnelea" />
        <meta property="og:description" content="Ricette, tradizioni e racconti dalla nostra terra." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Journal di Minnelea",
            "description": "Ricette, tradizioni e racconti dalla nostra terra",
            "url": window.location.href,
            "publisher": {
              "@type": "Organization",
              "name": "Minnelea"
            }
          })}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-background">
        <BlogHero />
        
        <BlogToolbar
          search={search}
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          sort={sort}
          onSortChange={handleSortChange}
          resultCount={displayCount}
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl pb-16">
          {/* Loading State */}
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              <p className="text-muted-foreground mt-4">Caricamento articoli...</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {showFeatured && featuredArticle && (
                <div className="mb-16 md:mb-20">
                  <ArticleCard article={featuredArticle} variant="featured" />
                </div>
              )}

              {/* Articles Grid or Empty State */}
              {articles.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12 md:gap-y-16">
                    {articles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="py-20 text-center">
                  <p className="font-serif text-2xl text-foreground mb-4">
                    Nessun articolo trovato
                  </p>
                  <p className="text-muted-foreground mb-8">
                    {allArticles.length === 0 
                      ? "Non ci sono ancora articoli nel blog. Aggiungili da Shopify Admin → Online Store → Blog posts."
                      : "Prova a modificare i filtri di ricerca"}
                  </p>
                  {allArticles.length > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 
                               bg-foreground text-background text-sm font-medium
                               rounded-sm hover:bg-foreground/90 transition-colors"
                    >
                      Mostra tutti gli articoli
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Newsletter Sidebar - Desktop */}
          <aside className="mt-16 md:mt-20">
            <NewsletterInline />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogIndex;
