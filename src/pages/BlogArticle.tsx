import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Link as LinkIcon, Mail, Share2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

// Mock article data - in production this would come from CMS/API
const articleData = {
  slug: "la-tradizione-delle-confetture-cilentane",
  title: "La tradizione delle confetture cilentane",
  subtitle: "Un viaggio attraverso sapori e storia del nostro territorio",
  excerpt: "Scopri i segreti delle nostre ricette tramandate da generazioni nel cuore del Parco Nazionale del Cilento.",
  heroImage: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=1600&h=900&fit=crop",
  category: "Tradizione",
  date: "15 Dicembre 2024",
  readTime: "5 min",
  author: {
    name: "Maria Rossi",
    bio: "Custode delle ricette di famiglia e appassionata narratrice del Cilento.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
  },
  pullQuote: "Ogni confettura racconta una storia, quella della terra e delle mani che l'hanno creata.",
  content: [
    {
      type: "text",
      value: "Nel cuore del Parco Nazionale del Cilento, dove il mare incontra le colline, nasce una tradizione secolare che ancora oggi guida le nostre mani nella preparazione delle confetture. Questa è la storia di come la nostra famiglia ha preservato questi sapori unici, tramandandoli di generazione in generazione."
    },
    {
      type: "heading",
      id: "le-origini",
      value: "Le origini della tradizione"
    },
    {
      type: "text",
      value: "La storia delle confetture cilentane affonda le sue radici nel XVIII secolo, quando le famiglie contadine iniziarono a conservare i frutti abbondanti dell'estate per i mesi più freddi. Non si trattava semplicemente di una tecnica di conservazione, ma di un'arte raffinata che richiedeva conoscenza profonda degli ingredienti e del territorio."
    },
    {
      type: "text",
      value: "I nostri antenati raccoglievano fichi, more e agrumi selvatici dai terrazzamenti che ancora oggi caratterizzano il paesaggio cilentano. La cottura avveniva in grandi caldaie di rame, alimentate dal fuoco di legna d'olivo, che conferiva alle conserve quel caratteristico sapore affumicato appena percettibile."
    },
    {
      type: "heading",
      id: "ingredienti-segreti",
      value: "Gli ingredienti segreti"
    },
    {
      type: "text",
      value: "Ciò che rende uniche le nostre confetture non è solo la qualità eccezionale della frutta, ma anche piccoli segreti tramandati oralmente: un pizzico di sale marino raccolto a Palinuro, scorza di limone sfusato amalfitano, e la pazienza di chi sa aspettare il momento perfetto della maturazione."
    },
    {
      type: "gallery",
      images: [
        { url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop", caption: "Fichi freschi del Cilento" },
        { url: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=400&fit=crop", caption: "La preparazione tradizionale" },
        { url: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop", caption: "Confetture pronte all'assaggio" }
      ]
    },
    {
      type: "heading",
      id: "ricetta-confettura-fichi",
      value: "Ricetta: Confettura di fichi del Cilento"
    },
    {
      type: "recipe",
      data: {
        servings: "6 vasetti da 250g",
        prepTime: "30 min",
        cookTime: "1 ora",
        difficulty: "Media",
        ingredients: [
          "1 kg di fichi maturi del Cilento",
          "400 g di zucchero di canna",
          "Succo di 1 limone sfusato",
          "1 pizzico di sale marino",
          "1 baccello di vaniglia (opzionale)"
        ],
        steps: [
          "Lavate delicatamente i fichi e rimuovete il picciolo. Tagliateli a pezzi grossolani.",
          "In una ciotola capiente, unite i fichi con lo zucchero e il succo di limone. Coprite e lasciate macerare per almeno 2 ore, meglio se tutta la notte.",
          "Trasferite il composto in una pentola dal fondo spesso. Aggiungete il sale e il baccello di vaniglia tagliato a metà.",
          "Portate a ebollizione mescolando costantemente, poi abbassate la fiamma e lasciate sobbollire per circa un'ora, schiumando se necessario.",
          "La confettura è pronta quando, versandone una goccia su un piattino freddo, non scorre. Invasate ancora bollente in vasetti sterilizzati."
        ]
      }
    },
    {
      type: "heading",
      id: "consiglio-minnelea",
      value: "Il nostro consiglio"
    },
    {
      type: "callout",
      value: "Per un abbinamento perfetto, provate la nostra confettura di fichi con un pecorino stagionato del Cilento e qualche gheriglio di noce. Un matrimonio di sapori che racconta tutta l'essenza della nostra terra."
    },
    {
      type: "heading",
      id: "prodotti-correlati",
      value: "Assaggia la tradizione"
    }
  ],
  relatedProducts: [
    {
      id: "1",
      title: "Confettura di Fichi del Cilento",
      price: "8.90",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
      handle: "confettura-fichi-cilento"
    },
    {
      id: "2",
      title: "Marmellata di Limoni Sfusati",
      price: "9.50",
      image: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=400&h=400&fit=crop",
      handle: "marmellata-limoni-sfusati"
    }
  ],
  relatedArticles: [
    {
      slug: "come-abbinare-le-nostre-conserve",
      title: "Come abbinare le nostre conserve ai formaggi",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop",
      category: "Ricette",
      readTime: "4 min"
    },
    {
      slug: "great-taste-awards-2024",
      title: "Great Taste Awards 2024: i nostri premi",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop",
      category: "Premi",
      readTime: "3 min"
    }
  ],
  prevArticle: null,
  nextArticle: {
    slug: "come-abbinare-le-nostre-conserve",
    title: "Come abbinare le nostre conserve ai formaggi"
  }
};

// Extract headings for TOC
const getTableOfContents = () => {
  return articleData.content
    .filter(block => block.type === "heading")
    .map(block => ({
      id: (block as any).id,
      title: block.value as string
    }));
};

const BlogArticle = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);
  const tocItems = getTableOfContents();

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

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    tocItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(articleData.title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <>
      <Helmet>
        <title>{articleData.title} | Minnelea Journal</title>
        <meta name="description" content={articleData.excerpt} />
        <meta property="og:title" content={articleData.title} />
        <meta property="og:description" content={articleData.excerpt} />
        <meta property="og:image" content={articleData.heroImage} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": articleData.title,
            "description": articleData.excerpt,
            "image": articleData.heroImage,
            "author": {
              "@type": "Person",
              "name": articleData.author.name
            },
            "datePublished": "2024-12-15",
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
            <span className="text-foreground">{articleData.category}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Category */}
            <span className="inline-block text-[11px] tracking-[0.4em] uppercase text-accent font-medium">
              {articleData.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] tracking-tight">
              {articleData.title}
            </h1>

            {/* Subtitle */}
            {articleData.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {articleData.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{articleData.author.name}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border hidden md:block" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{articleData.date}</time>
              </div>
              <span className="w-1 h-1 rounded-full bg-border hidden md:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{articleData.readTime} lettura</span>
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
            src={articleData.heroImage}
            alt={articleData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pull Quote */}
        {articleData.pullQuote && (
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl py-12 md:py-16">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-center text-foreground/80 leading-relaxed italic">
              "{articleData.pullQuote}"
            </blockquote>
          </div>
        )}

        {/* Main Content with Sidebar TOC */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Sticky TOC - Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-6">
                  In questo articolo
                </h4>
                <nav className="space-y-3">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm leading-relaxed transition-colors duration-200 ${
                        activeSection === item.id
                          ? "text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Article Body */}
            <div className="lg:col-span-9 max-w-prose">
              {articleData.content.map((block, index) => {
                switch (block.type) {
                  case "text":
                    return (
                      <p key={index} className="text-foreground/85 text-lg leading-[1.85] mb-6">
                        {block.value}
                      </p>
                    );
                  
                  case "heading":
                    return (
                      <h2 
                        key={index} 
                        id={(block as any).id}
                        className="font-serif text-2xl md:text-3xl text-foreground mt-12 mb-6 scroll-mt-24"
                      >
                        {block.value}
                      </h2>
                    );
                  
                  case "gallery":
                    const galleryBlock = block as { type: "gallery"; images: Array<{ url: string; caption: string }> };
                    return (
                      <div key={index} className="my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {galleryBlock.images.map((img, imgIndex) => (
                          <figure key={imgIndex} className="space-y-2">
                            <div className="aspect-[3/2] overflow-hidden">
                              <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <figcaption className="text-xs text-muted-foreground text-center">
                              {img.caption}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    );
                  
                  case "recipe":
                    const recipeBlock = block as { type: "recipe"; data: any };
                    return (
                      <div key={index} className="my-10 bg-secondary/50 border border-border/60 p-6 md:p-8 space-y-6">
                        {/* Recipe Meta */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Porzioni:</span>
                            <span className="font-medium">{recipeBlock.data.servings}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Prep:</span>
                            <span className="font-medium">{recipeBlock.data.prepTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Cottura:</span>
                            <span className="font-medium">{recipeBlock.data.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Difficoltà:</span>
                            <span className="font-medium">{recipeBlock.data.difficulty}</span>
                          </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                          <h4 className="font-serif text-lg mb-3">Ingredienti</h4>
                          <ul className="space-y-2">
                            {recipeBlock.data.ingredients.map((ing: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-foreground/85">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Steps */}
                        <div>
                          <h4 className="font-serif text-lg mb-3">Procedimento</h4>
                          <ol className="space-y-4">
                            {recipeBlock.data.steps.map((step: string, i: number) => (
                              <li key={i} className="flex gap-4 text-foreground/85">
                                <span className="font-serif text-accent text-lg flex-shrink-0">{i + 1}.</span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    );
                  
                  case "callout":
                    return (
                      <div key={index} className="my-10 border-l-2 border-accent bg-secondary/30 p-6 md:p-8">
                        <p className="font-serif text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                          {block.value}
                        </p>
                      </div>
                    );
                  
                  default:
                    return null;
                }
              })}

              {/* Related Products */}
              {articleData.relatedProducts.length > 0 && (
                <div className="mt-16 pt-12 border-t border-border/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {articleData.relatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/prodotti/${product.handle}`}
                        className="group flex gap-4 p-4 border border-border/60 hover:border-border transition-colors"
                      >
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-secondary/30">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-accent font-medium mt-1">€{product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-16 pt-12 border-t border-border/60">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={articleData.author.image}
                      alt={articleData.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">
                      {articleData.author.name}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {articleData.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="bg-secondary/30 py-16 md:py-20 mt-16">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
              Continua a leggere
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articleData.relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group flex gap-6"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium mb-2">
                      {article.category}
                    </span>
                    <h4 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors leading-tight">
                      {article.title}
                    </h4>
                    <span className="text-sm text-muted-foreground mt-2">
                      {article.readTime} lettura
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Prev/Next Navigation */}
        <nav className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between gap-8 border-t border-border/60 pt-12">
            {articleData.prevArticle ? (
              <Link
                to={`/blog/${articleData.prevArticle.slug}`}
                className="group flex items-center gap-4"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Precedente</span>
                  <p className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                    {articleData.prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {articleData.nextArticle && (
              <Link
                to={`/blog/${articleData.nextArticle.slug}`}
                className="group flex items-center gap-4 text-right md:ml-auto"
              >
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Successivo</span>
                  <p className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                    {articleData.nextArticle.title}
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
