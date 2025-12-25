// Blog data layer - replace with CMS/API integration

export interface Author {
  name: string;
  bio: string;
  image: string;
}

export interface Recipe {
  name: string;
  description: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
}

export interface ContentBlock {
  type: "text" | "heading" | "gallery" | "recipe" | "callout";
  value?: string;
  id?: string;
  images?: Array<{ url: string; caption: string }>;
  data?: Recipe;
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
  pullQuote?: string;
  content: ContentBlock[];
  recipe?: Recipe;
}

// Calculate reading time from content
export function calculateReadingTime(content: ContentBlock[]): number {
  const wordsPerMinute = 200;
  let wordCount = 0;
  
  content.forEach(block => {
    if (block.type === "text" && block.value) {
      wordCount += block.value.split(/\s+/).length;
    }
  });
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Mock articles data
const articlesData: Article[] = [
  {
    slug: "la-tradizione-delle-confetture-cilentane",
    title: "La tradizione delle confetture cilentane",
    subtitle: "Un viaggio attraverso sapori e storia del nostro territorio",
    excerpt: "Scopri i segreti delle nostre ricette tramandate da generazioni nel cuore del Parco Nazionale del Cilento.",
    coverImage: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=800&h=1000&fit=crop",
    category: "Tradizione",
    tags: ["tradizione", "cilento", "confetture"],
    date: "15 Dicembre 2024",
    dateISO: "2024-12-15",
    readingTime: 5,
    featured: true,
    author: {
      name: "Maria Rossi",
      bio: "Custode delle ricette di famiglia e appassionata narratrice del Cilento.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    },
    pullQuote: "Ogni confettura racconta una storia, quella della terra e delle mani che l'hanno creata.",
    content: [
      { type: "text", value: "Nel cuore del Parco Nazionale del Cilento, dove il mare incontra le colline, nasce una tradizione secolare che ancora oggi guida le nostre mani nella preparazione delle confetture." },
      { type: "heading", id: "le-origini", value: "Le origini della tradizione" },
      { type: "text", value: "La storia delle confetture cilentane affonda le sue radici nel XVIII secolo, quando le famiglie contadine iniziarono a conservare i frutti abbondanti dell'estate per i mesi più freddi." },
      { type: "heading", id: "ingredienti-segreti", value: "Gli ingredienti segreti" },
      { type: "text", value: "Ciò che rende uniche le nostre confetture non è solo la qualità eccezionale della frutta, ma anche piccoli segreti tramandati oralmente." },
      { type: "heading", id: "ricetta-confettura-fichi", value: "Ricetta: Confettura di fichi del Cilento" },
      {
        type: "recipe",
        data: {
          name: "Confettura di Fichi del Cilento",
          description: "La ricetta tradizionale della confettura di fichi cilentani, tramandata da generazioni.",
          servings: "6 vasetti da 250g",
          prepTime: "30 min",
          cookTime: "1 ora",
          difficulty: "Media",
          ingredients: [
            "1 kg di fichi maturi del Cilento",
            "400 g di zucchero di canna",
            "Succo di 1 limone sfusato",
            "1 pizzico di sale marino",
            "1 baccello di vaniglia"
          ],
          steps: [
            "Lavate delicatamente i fichi e rimuovete il picciolo. Tagliateli a pezzi grossolani.",
            "In una ciotola capiente, unite i fichi con lo zucchero e il succo di limone. Coprite e lasciate macerare per almeno 2 ore.",
            "Trasferite il composto in una pentola dal fondo spesso. Aggiungete il sale e il baccello di vaniglia.",
            "Portate a ebollizione mescolando costantemente, poi abbassate la fiamma e lasciate sobbollire per circa un'ora.",
            "La confettura è pronta quando, versandone una goccia su un piattino freddo, non scorre. Invasate ancora bollente."
          ]
        }
      },
      { type: "heading", id: "consiglio-minnelea", value: "Il nostro consiglio" },
      { type: "callout", value: "Per un abbinamento perfetto, provate la nostra confettura di fichi con un pecorino stagionato del Cilento e qualche gheriglio di noce." }
    ],
    recipe: {
      name: "Confettura di Fichi del Cilento",
      description: "La ricetta tradizionale della confettura di fichi cilentani, tramandata da generazioni.",
      servings: "6 vasetti da 250g",
      prepTime: "30 min",
      cookTime: "1 ora",
      difficulty: "Media",
      ingredients: [
        "1 kg di fichi maturi del Cilento",
        "400 g di zucchero di canna",
        "Succo di 1 limone sfusato",
        "1 pizzico di sale marino",
        "1 baccello di vaniglia"
      ],
      steps: [
        "Lavate delicatamente i fichi e rimuovete il picciolo.",
        "Unite i fichi con lo zucchero e il succo di limone. Macerate per 2 ore.",
        "Trasferite in una pentola e aggiungete sale e vaniglia.",
        "Portate a ebollizione e lasciate sobbollire per un'ora.",
        "Invasate ancora bollente in vasetti sterilizzati."
      ]
    }
  },
  {
    slug: "come-abbinare-le-nostre-conserve",
    title: "Come abbinare le nostre conserve ai formaggi",
    subtitle: "Guida agli abbinamenti perfetti",
    excerpt: "Una guida completa agli abbinamenti perfetti tra le nostre confetture artigianali e i migliori formaggi italiani.",
    coverImage: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=1000&fit=crop",
    category: "Ricette",
    tags: ["ricette", "abbinamenti", "formaggi"],
    date: "10 Dicembre 2024",
    dateISO: "2024-12-10",
    readingTime: 4,
    author: {
      name: "Giuseppe Verdi",
      bio: "Chef e sommelier, esperto di abbinamenti gastronomici.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    content: [
      { type: "text", value: "L'arte dell'abbinamento tra confetture e formaggi è una tradizione che in Italia ha radici profonde." },
      { type: "heading", id: "regole-base", value: "Le regole base" },
      { type: "text", value: "Il segreto sta nel bilanciare dolcezza, acidità e sapidità." }
    ]
  },
  {
    slug: "great-taste-awards-2024",
    title: "Great Taste Awards 2024: i nostri premi",
    subtitle: "Un riconoscimento internazionale",
    excerpt: "Celebriamo le nostre confetture premiate ai Great Taste Awards, il riconoscimento più prestigioso nel mondo del food.",
    coverImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=1000&fit=crop",
    category: "Premi",
    tags: ["premi", "great-taste", "riconoscimenti"],
    date: "5 Dicembre 2024",
    dateISO: "2024-12-05",
    readingTime: 3,
    author: {
      name: "Lucia Bianchi",
      bio: "Fondatrice di Minnelea e curatrice della qualità.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    content: [
      { type: "text", value: "Siamo orgogliosi di annunciare che le nostre confetture hanno ricevuto tre stelle ai Great Taste Awards 2024." }
    ]
  },
  {
    slug: "il-fico-bianco-del-cilento-dop",
    title: "Il Fico Bianco del Cilento DOP",
    subtitle: "Un tesoro della nostra terra",
    excerpt: "Storia e caratteristiche del fico bianco cilentano, ingrediente principe delle nostre confetture più amate.",
    coverImage: "https://images.unsplash.com/photo-1601379760883-1bb497c558b9?w=800&h=1000&fit=crop",
    category: "Ingredienti",
    tags: ["ingredienti", "dop", "fichi", "cilento"],
    date: "28 Novembre 2024",
    dateISO: "2024-11-28",
    readingTime: 6,
    author: {
      name: "Maria Rossi",
      bio: "Custode delle ricette di famiglia e appassionata narratrice del Cilento.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    },
    content: [
      { type: "text", value: "Il Fico Bianco del Cilento DOP è una delle eccellenze gastronomiche italiane." }
    ]
  },
  {
    slug: "conservare-le-confetture-artigianali",
    title: "Come conservare le confetture artigianali",
    subtitle: "Consigli pratici per mantenere intatta la qualità",
    excerpt: "Tutti i consigli per conservare al meglio le vostre confetture Minnelea e goderne il sapore più a lungo.",
    coverImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=1000&fit=crop",
    category: "Guide",
    tags: ["guide", "conservazione", "consigli"],
    date: "20 Novembre 2024",
    dateISO: "2024-11-20",
    readingTime: 3,
    author: {
      name: "Giuseppe Verdi",
      bio: "Chef e sommelier, esperto di abbinamenti gastronomici.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    content: [
      { type: "text", value: "Una corretta conservazione è fondamentale per mantenere intatte le qualità organolettiche delle nostre confetture." }
    ]
  },
  {
    slug: "la-dieta-mediterranea-e-le-conserve",
    title: "La Dieta Mediterranea e le conserve",
    subtitle: "Un patrimonio UNESCO nella tua dispensa",
    excerpt: "Come le nostre conserve si inseriscono perfettamente nella tradizione della dieta mediterranea.",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=1000&fit=crop",
    category: "Tradizione",
    tags: ["tradizione", "dieta-mediterranea", "salute"],
    date: "15 Novembre 2024",
    dateISO: "2024-11-15",
    readingTime: 5,
    author: {
      name: "Lucia Bianchi",
      bio: "Fondatrice di Minnelea e curatrice della qualità.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    content: [
      { type: "text", value: "La dieta mediterranea, riconosciuta patrimonio UNESCO, valorizza i prodotti della terra conservati secondo tradizione." }
    ]
  }
];

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(articlesData.map(a => a.category));
  return Array.from(categories);
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set(articlesData.flatMap(a => a.tags));
  return Array.from(tags);
}

// Get all articles
export function getAllArticles(): Article[] {
  return articlesData;
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.find(a => a.slug === slug);
}

// Get featured article
export function getFeaturedArticle(): Article {
  return articlesData.find(a => a.featured) || articlesData[0];
}

// Get related articles
export function getRelatedArticles(currentSlug: string, limit = 2): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articlesData.slice(0, limit);
  
  return articlesData
    .filter(a => a.slug !== currentSlug)
    .filter(a => a.category === current.category || a.tags.some(t => current.tags.includes(t)))
    .slice(0, limit);
}

// Get adjacent articles (prev/next)
export function getAdjacentArticles(slug: string): { prev: Article | null; next: Article | null } {
  const index = articlesData.findIndex(a => a.slug === slug);
  return {
    prev: index > 0 ? articlesData[index - 1] : null,
    next: index < articlesData.length - 1 ? articlesData[index + 1] : null
  };
}

// Filter and sort articles
export interface FilterOptions {
  search?: string;
  category?: string;
  tag?: string;
  sort?: "recent" | "reading-time";
}

export function filterArticles(options: FilterOptions): Article[] {
  let results = [...articlesData];
  
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
