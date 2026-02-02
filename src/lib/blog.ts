// Blog data layer - Connected to Shopify Blog API

import { 
  fetchBlogArticles, 
  fetchArticleByHandle, 
  calculateReadingTime, 
  formatArticleDate,
  type ShopifyArticle 
} from './shopify';

export interface Author {
  name: string;
  bio?: string;
  image?: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  date: string;
  dateISO: string;
  readingTime: number;
  author: Author;
  featured?: boolean;
  content: string;
  contentHtml: string;
}

// Transform Shopify article to our Article format
function transformShopifyArticle(shopifyArticle: ShopifyArticle, index: number = 0): Article {
  const category = shopifyArticle.tags.length > 0 ? shopifyArticle.tags[0] : 'Articoli';
  
  return {
    slug: shopifyArticle.handle,
    title: shopifyArticle.title,
    excerpt: shopifyArticle.excerpt || shopifyArticle.content.substring(0, 150) + '...',
    coverImage: shopifyArticle.image?.url || 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=800&h=1000&fit=crop',
    category: category.charAt(0).toUpperCase() + category.slice(1),
    tags: shopifyArticle.tags,
    date: formatArticleDate(shopifyArticle.publishedAt),
    dateISO: shopifyArticle.publishedAt,
    readingTime: calculateReadingTime(shopifyArticle.content),
    author: {
      name: shopifyArticle.author?.name || 'Minnelea',
    },
    featured: index === 0, // First article is featured
    content: shopifyArticle.content,
    contentHtml: shopifyArticle.contentHtml,
  };
}

// Cache for articles
let articlesCache: Article[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch and cache all articles
export async function getAllArticles(): Promise<Article[]> {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (articlesCache.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return articlesCache;
  }

  try {
    const shopifyArticles = await fetchBlogArticles(50);
    articlesCache = shopifyArticles.map((article, index) => transformShopifyArticle(article, index));
    lastFetchTime = now;
    return articlesCache;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return articlesCache; // Return cached data on error
  }
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const categories = new Set(articles.map(a => a.category));
  return Array.from(categories);
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles();
  const tags = new Set(articles.flatMap(a => a.tags));
  return Array.from(tags);
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  // First check cache
  const cached = articlesCache.find(a => a.slug === slug);
  if (cached) return cached;

  // Fetch from API
  try {
    const shopifyArticle = await fetchArticleByHandle(slug);
    if (!shopifyArticle) return undefined;
    return transformShopifyArticle(shopifyArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    return undefined;
  }
}

// Get featured article
export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(a => a.featured) || articles[0] || null;
}

// Get related articles
export async function getRelatedArticles(currentSlug: string, limit = 2): Promise<Article[]> {
  const articles = await getAllArticles();
  const current = articles.find(a => a.slug === currentSlug);
  if (!current) return articles.slice(0, limit);
  
  return articles
    .filter(a => a.slug !== currentSlug)
    .filter(a => a.category === current.category || a.tags.some(t => current.tags.includes(t)))
    .slice(0, limit);
}

// Get adjacent articles (prev/next)
export async function getAdjacentArticles(slug: string): Promise<{ prev: Article | null; next: Article | null }> {
  const articles = await getAllArticles();
  const index = articles.findIndex(a => a.slug === slug);
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null
  };
}

// Filter and sort articles
export interface FilterOptions {
  search?: string;
  category?: string;
  tag?: string;
  sort?: "recent" | "reading-time";
}

export async function filterArticles(options: FilterOptions): Promise<Article[]> {
  let results = await getAllArticles();
  
  // Search filter
  if (options.search) {
    const query = options.search.toLowerCase();
    results = results.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  
  // Category filter
  if (options.category && options.category !== "all") {
    results = results.filter(a => a.category === options.category);
  }
  
  // Tag filter
  if (options.tag) {
    results = results.filter(a => a.tags.includes(options.tag));
  }
  
  // Sort
  if (options.sort === "reading-time") {
    results.sort((a, b) => a.readingTime - b.readingTime);
  } else {
    // Default: recent
    results.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }
  
  return results;
}

// Paginate results
export function paginateArticles(articles: Article[], page: number, perPage = 6): {
  articles: Article[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
} {
  const start = (page - 1) * perPage;
  const paginatedArticles = articles.slice(start, start + perPage);
  
  return {
    articles: paginatedArticles,
    totalPages: Math.ceil(articles.length / perPage),
    currentPage: page,
    totalCount: articles.length
  };
}
