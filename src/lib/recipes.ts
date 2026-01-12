// Recipe Types and Mock Data

export interface SponsoredProduct {
  id: string;
  name: string;
  thumbUrl: string;
  price: number;
}

export interface Ingredient {
  id: string;
  name: string;
  sponsoredProductId?: string;
  minQtyUnitCount: number;
  qty: number;
  unit: string;
  extraStep: boolean;
}

export interface Step {
  id: string;
  text: string;
}

export interface Tip {
  id: string;
  text: string;
  sponsoredProductId?: string;
}

export interface NutritionFlags {
  lifestyle: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    lactoseFree: boolean;
    nickelFree: boolean;
  };
  allergens: {
    gluten: boolean;
    dairy: boolean;
    eggs: boolean;
    nuts: boolean;
    peanuts: boolean;
    soy: boolean;
    fish: boolean;
    shellfish: boolean;
    celery: boolean;
    mustard: boolean;
    sesame: boolean;
    sulfites: boolean;
    lupin: boolean;
    mollusks: boolean;
  };
}

export interface Macros {
  reference: '100g' | 'porzione';
  kcal: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  saturated: number;
  fiber: number;
  salt: number;
}

export interface RecipeStats {
  visits: number;
  uniqueUsers: number;
  addToCart: number;
  cartsCreated: number;
  cartsPurchased: number;
  totalPurchasedEuro: number;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  servings: number;
  categories: string[];
  difficulty: 'facile' | 'media' | 'difficile';
  published: boolean;
  prepTime: number;
  cookTime: number;
  storageMethod: string;
  country: string;
  region: string;
  videoUrl: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
  tips: Tip[];
  nutritionFlags: NutritionFlags;
  macros: Macros;
  stats: RecipeStats;
  suitableFor?: string[];
}

// Mock products for sponsored selects
export const mockProducts: SponsoredProduct[] = [
  {
    id: 'prod-1',
    name: 'Confettura Extra di Arance e Limoni',
    thumbUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=100&h=100&fit=crop',
    price: 7.90,
  },
  {
    id: 'prod-2',
    name: 'Confettura Extra di Fragole',
    thumbUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
    price: 7.90,
  },
  {
    id: 'prod-3',
    name: 'Miele di Castagno del Cilento',
    thumbUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100&h=100&fit=crop',
    price: 12.50,
  },
  {
    id: 'prod-4',
    name: 'Olio EVO Cilento DOP',
    thumbUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
    price: 18.90,
  },
  {
    id: 'prod-5',
    name: 'Confettura Extra di Fichi',
    thumbUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&h=100&fit=crop',
    price: 8.50,
  },
];

export const availableCategories = [
  'Antipasti',
  'Primi piatti',
  'Secondi',
  'Contorni',
  'Dolci',
  'Colazione',
  'Aperitivo',
  'Vegano',
  'Senza glutine',
];

export const availableUnits = ['g', 'kg', 'ml', 'l', 'pz', 'cucchiaio', 'cucchiaino', 'tazza', 'pizzico', 'qb'];

export const italianRegions = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
  'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto',
];

// Mock recipe data - multiple recipes
export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Crostini con fontina, marmellata di arance e limoni e prosciutto crudo',
    slug: 'crostini-fontina-marmellata-arance-limoni-prosciutto',
    servings: 4,
    categories: ['Antipasti', 'Aperitivo'],
    difficulty: 'facile',
    published: true,
    prepTime: 15,
    cookTime: 10,
    storageMethod: 'Consumare subito, non adatto alla conservazione',
    country: 'Italia',
    region: 'Campania',
    videoUrl: '',
    description: 'Un antipasto raffinato che unisce la cremosità della fontina con il dolce-amaro della nostra confettura di arance e limoni del Cilento. Il prosciutto crudo aggiunge una nota sapida che bilancia perfettamente i sapori.',
    imageUrl: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=600&fit=crop',
    ingredients: [
      { id: 'ing-1', name: 'Pane rustico a fette', sponsoredProductId: undefined, minQtyUnitCount: 8, qty: 8, unit: 'pz', extraStep: false },
      { id: 'ing-2', name: 'Fontina valdostana', sponsoredProductId: undefined, minQtyUnitCount: 200, qty: 200, unit: 'g', extraStep: false },
      { id: 'ing-3', name: 'Confettura di arance e limoni', sponsoredProductId: 'prod-1', minQtyUnitCount: 1, qty: 80, unit: 'g', extraStep: false },
      { id: 'ing-4', name: 'Prosciutto crudo', sponsoredProductId: undefined, minQtyUnitCount: 100, qty: 100, unit: 'g', extraStep: false },
      { id: 'ing-5', name: 'Rosmarino fresco', sponsoredProductId: undefined, minQtyUnitCount: 1, qty: 1, unit: 'cucchiaino', extraStep: true },
    ],
    steps: [
      { id: 'step-1', text: 'Preriscalda il forno a 180°C in modalità statica.' },
      { id: 'step-2', text: 'Disponi le fette di pane su una teglia rivestita con carta forno.' },
      { id: 'step-3', text: 'Taglia la fontina a fettine sottili e disponila sulle fette di pane.' },
      { id: 'step-4', text: 'Inforna per 5-7 minuti, fino a quando la fontina inizia a sciogliersi.' },
      { id: 'step-5', text: 'Sforna i crostini e aggiungi un cucchiaino di confettura di arance e limoni su ciascuno.' },
      { id: 'step-6', text: 'Completa con una fetta di prosciutto crudo arrotolata e qualche ago di rosmarino.' },
      { id: 'step-7', text: 'Servi immediatamente mentre i crostini sono ancora caldi.' },
    ],
    tips: [
      { id: 'tip-1', text: 'Per una versione più leggera, sostituisci la fontina con la robiola.', sponsoredProductId: undefined },
      { id: 'tip-2', text: 'Prova anche con la nostra confettura extra di fichi per un sapore più autunnale.', sponsoredProductId: 'prod-5' },
      { id: 'tip-3', text: 'Il pane tostato leggermente prima di aggiungere la fontina renderà i crostini più croccanti.', sponsoredProductId: undefined },
    ],
    nutritionFlags: {
      lifestyle: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        lactoseFree: false,
        nickelFree: true,
      },
      allergens: {
        gluten: true,
        dairy: true,
        eggs: false,
        nuts: false,
        peanuts: false,
        soy: false,
        fish: false,
        shellfish: false,
        celery: false,
        mustard: false,
        sesame: false,
        sulfites: false,
        lupin: false,
        mollusks: false,
      },
    },
    macros: {
      reference: '100g',
      kcal: 285,
      protein: 14,
      carbs: 28,
      sugar: 8,
      fat: 12,
      saturated: 6,
      fiber: 2,
      salt: 1.8,
    },
    stats: {
      visits: 12450,
      uniqueUsers: 8920,
      addToCart: 1245,
      cartsCreated: 892,
      cartsPurchased: 234,
      totalPurchasedEuro: 8976.50,
    },
    suitableFor: ['Vegetariani', 'diete senza nichel', 'pescetariani'],
  },
  {
    id: 'recipe-2',
    title: 'Pane tostato con formaggio e confettura di fragole',
    slug: 'pane-tostato-formaggio-confettura-fragole',
    servings: 2,
    categories: ['Antipasti', 'Colazione'],
    difficulty: 'facile',
    published: true,
    prepTime: 5,
    cookTime: 15,
    storageMethod: 'Consumare subito',
    country: 'Italia',
    region: 'Campania',
    videoUrl: '',
    description: 'Una merenda dolce-salata semplice e irresistibile, pronta in pochi minuti: fette di pane casereccio tostate, con formaggio sciolto e confettura di fragole.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop',
    ingredients: [
      { id: 'ing-1', name: 'Fette di pane casereccio', sponsoredProductId: undefined, minQtyUnitCount: 4, qty: 4, unit: 'unità', extraStep: false },
      { id: 'ing-2', name: 'Confettura extra di fragole artigianale - senza conservanti', sponsoredProductId: 'prod-2', minQtyUnitCount: 4, qty: 4, unit: 'cucchiai', extraStep: false },
      { id: 'ing-3', name: 'Formaggio fresco a pasta molle', sponsoredProductId: undefined, minQtyUnitCount: 80, qty: 80, unit: 'g', extraStep: false },
    ],
    steps: [
      { id: 'step-1', text: 'Tosta il pane: disponi le fette di pane su una teglia e tostale in forno con l\'opzione grill per circa 15 minuti, finché sono ben dorate.' },
      { id: 'step-2', text: 'Aggiungi il formaggio e rimetti le fette di pane in forno per qualche minuto, il tempo di far sciogliere il formaggio.' },
      { id: 'step-3', text: 'Completa con la confettura extra di fragole: fuori dal forno, distribuiscila su ogni fetta.' },
      { id: 'step-4', text: 'Servi: gusta tutto tiepido, quando formaggio e marmellata si fondono alla perfezione.' },
    ],
    tips: [
      { id: 'tip-1', text: 'Forno con funzione grill', sponsoredProductId: undefined },
      { id: 'tip-2', text: 'Teglia', sponsoredProductId: undefined },
      { id: 'tip-3', text: 'Spatola o coltello per spalmare', sponsoredProductId: undefined },
    ],
    nutritionFlags: {
      lifestyle: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        lactoseFree: false,
        nickelFree: true,
      },
      allergens: {
        gluten: true,
        dairy: true,
        eggs: false,
        nuts: false,
        peanuts: false,
        soy: false,
        fish: false,
        shellfish: false,
        celery: false,
        mustard: false,
        sesame: false,
        sulfites: false,
        lupin: false,
        mollusks: false,
      },
    },
    macros: {
      reference: 'porzione',
      kcal: 320,
      protein: 12,
      carbs: 42,
      sugar: 18,
      fat: 10,
      saturated: 5,
      fiber: 3,
      salt: 1.2,
    },
    stats: {
      visits: 8920,
      uniqueUsers: 6450,
      addToCart: 980,
      cartsCreated: 650,
      cartsPurchased: 180,
      totalPurchasedEuro: 4560.00,
    },
    suitableFor: ['Vegetariani', 'diete senza nichel', 'pescetariani'],
  },
  {
    id: 'recipe-3',
    title: 'Risotto gorgonzola e confettura extra di fichi',
    slug: 'risotto-gorgonzola-confettura-fichi',
    servings: 4,
    categories: ['Primi piatti'],
    difficulty: 'facile',
    published: true,
    prepTime: 10,
    cookTime: 18,
    storageMethod: 'Conservare in frigo per max 24 ore',
    country: 'Italia',
    region: 'Lombardia',
    videoUrl: 'https://youtube.com/watch?v=example',
    description: 'Un primo piatto cremoso e ricco di sapore, dove la dolcezza dei fichi incontra il carattere deciso del gorgonzola. Un connubio perfetto per stupire i vostri ospiti.',
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    ingredients: [
      { id: 'ing-1', name: 'Riso Carnaroli', sponsoredProductId: undefined, minQtyUnitCount: 320, qty: 320, unit: 'g', extraStep: false },
      { id: 'ing-2', name: 'Gorgonzola dolce', sponsoredProductId: undefined, minQtyUnitCount: 150, qty: 150, unit: 'g', extraStep: false },
      { id: 'ing-3', name: 'Confettura extra di fichi', sponsoredProductId: 'prod-5', minQtyUnitCount: 60, qty: 60, unit: 'g', extraStep: false },
      { id: 'ing-4', name: 'Brodo vegetale', sponsoredProductId: undefined, minQtyUnitCount: 1, qty: 1, unit: 'l', extraStep: false },
      { id: 'ing-5', name: 'Cipolla', sponsoredProductId: undefined, minQtyUnitCount: 1, qty: 1, unit: 'pz', extraStep: false },
      { id: 'ing-6', name: 'Burro', sponsoredProductId: undefined, minQtyUnitCount: 50, qty: 50, unit: 'g', extraStep: false },
      { id: 'ing-7', name: 'Vino bianco secco', sponsoredProductId: undefined, minQtyUnitCount: 100, qty: 100, unit: 'ml', extraStep: false },
    ],
    steps: [
      { id: 'step-1', text: 'Trita finemente la cipolla e falla appassire in una casseruola con metà del burro.' },
      { id: 'step-2', text: 'Aggiungi il riso e tostalo per 2-3 minuti mescolando continuamente.' },
      { id: 'step-3', text: 'Sfuma con il vino bianco e lascia evaporare completamente.' },
      { id: 'step-4', text: 'Aggiungi il brodo caldo un mestolo alla volta, mescolando spesso.' },
      { id: 'step-5', text: 'A cottura quasi ultimata, aggiungi il gorgonzola a pezzetti e mescola fino a farlo sciogliere.' },
      { id: 'step-6', text: 'Manteca con il burro rimanente e servi decorando con cucchiaini di confettura di fichi.' },
    ],
    tips: [
      { id: 'tip-1', text: 'Per un sapore più intenso, usa gorgonzola piccante invece del dolce.', sponsoredProductId: undefined },
      { id: 'tip-2', text: 'Aggiungi noci tritate per una nota croccante.', sponsoredProductId: undefined },
    ],
    nutritionFlags: {
      lifestyle: {
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        lactoseFree: false,
        nickelFree: false,
      },
      allergens: {
        gluten: false,
        dairy: true,
        eggs: false,
        nuts: false,
        peanuts: false,
        soy: false,
        fish: false,
        shellfish: false,
        celery: false,
        mustard: false,
        sesame: false,
        sulfites: true,
        lupin: false,
        mollusks: false,
      },
    },
    macros: {
      reference: 'porzione',
      kcal: 520,
      protein: 16,
      carbs: 68,
      sugar: 12,
      fat: 18,
      saturated: 11,
      fiber: 2,
      salt: 2.1,
    },
    stats: {
      visits: 15600,
      uniqueUsers: 11200,
      addToCart: 1890,
      cartsCreated: 1200,
      cartsPurchased: 380,
      totalPurchasedEuro: 12450.00,
    },
    suitableFor: ['Vegetariani', 'Senza glutine'],
  },
  {
    id: 'recipe-4',
    title: 'Girelle di pasta sfoglia',
    slug: 'girelle-pasta-sfoglia',
    servings: 6,
    categories: ['Dolci', 'Colazione'],
    difficulty: 'facile',
    published: true,
    prepTime: 15,
    cookTime: 13,
    storageMethod: 'Conservare in contenitore ermetico per 2-3 giorni',
    country: 'Italia',
    region: 'Campania',
    videoUrl: '',
    description: 'Dolcetti sfogliati e golosi, perfetti per la colazione o una merenda speciale. La confettura di fragole si sposa perfettamente con la croccantezza della pasta sfoglia.',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&h=600&fit=crop',
    ingredients: [
      { id: 'ing-1', name: 'Pasta sfoglia rettangolare', sponsoredProductId: undefined, minQtyUnitCount: 1, qty: 1, unit: 'rotolo', extraStep: false },
      { id: 'ing-2', name: 'Confettura extra di fragole', sponsoredProductId: 'prod-2', minQtyUnitCount: 100, qty: 100, unit: 'g', extraStep: false },
      { id: 'ing-3', name: 'Zucchero a velo', sponsoredProductId: undefined, minQtyUnitCount: 2, qty: 2, unit: 'cucchiai', extraStep: false },
      { id: 'ing-4', name: 'Tuorlo d\'uovo', sponsoredProductId: undefined, minQtyUnitCount: 1, qty: 1, unit: 'pz', extraStep: false },
    ],
    steps: [
      { id: 'step-1', text: 'Stendi la pasta sfoglia e spalmala uniformemente con la confettura di fragole.' },
      { id: 'step-2', text: 'Arrotola la pasta su se stessa formando un cilindro stretto.' },
      { id: 'step-3', text: 'Taglia il rotolo in fette di circa 2 cm di spessore.' },
      { id: 'step-4', text: 'Disponi le girelle su una teglia rivestita con carta forno.' },
      { id: 'step-5', text: 'Spennella con il tuorlo sbattuto.' },
      { id: 'step-6', text: 'Cuoci in forno preriscaldato a 200°C per 12-15 minuti.' },
      { id: 'step-7', text: 'Sforna e spolvera con zucchero a velo una volta fredde.' },
    ],
    tips: [
      { id: 'tip-1', text: 'Prova anche con altre confetture come arance e limoni.', sponsoredProductId: 'prod-1' },
      { id: 'tip-2', text: 'Per una versione più golosa, aggiungi gocce di cioccolato.', sponsoredProductId: undefined },
    ],
    nutritionFlags: {
      lifestyle: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        lactoseFree: true,
        nickelFree: true,
      },
      allergens: {
        gluten: true,
        dairy: false,
        eggs: true,
        nuts: false,
        peanuts: false,
        soy: false,
        fish: false,
        shellfish: false,
        celery: false,
        mustard: false,
        sesame: false,
        sulfites: false,
        lupin: false,
        mollusks: false,
      },
    },
    macros: {
      reference: 'porzione',
      kcal: 280,
      protein: 4,
      carbs: 32,
      sugar: 14,
      fat: 15,
      saturated: 7,
      fiber: 1,
      salt: 0.4,
    },
    stats: {
      visits: 9800,
      uniqueUsers: 7200,
      addToCart: 1120,
      cartsCreated: 780,
      cartsPurchased: 210,
      totalPurchasedEuro: 5670.00,
    },
    suitableFor: ['Vegetariani'],
  },
];

// Keep mockRecipe for backward compatibility
export const mockRecipe = mockRecipes[0];

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);

// Local storage key
const STORAGE_KEY = 'minnelea_recipes';

// Get recipe from storage or return mock
export const getRecipeById = (id: string): Recipe | undefined => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const recipes = JSON.parse(stored) as Record<string, Recipe>;
    if (recipes[id]) return recipes[id];
  }
  return mockRecipes.find(r => r.id === id);
};

// Get recipe by slug
export const getRecipeBySlug = (slug: string): Recipe | undefined => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const recipes = JSON.parse(stored) as Record<string, Recipe>;
    const found = Object.values(recipes).find(r => r.slug === slug);
    if (found) return found;
  }
  return mockRecipes.find(r => r.slug === slug);
};

// Save recipe to storage
export const saveRecipe = (recipe: Recipe): void => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const recipes = stored ? JSON.parse(stored) : {};
  recipes[recipe.id] = recipe;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// Get all recipes
export const getAllRecipes = (): Recipe[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const recipes = JSON.parse(stored) as Record<string, Recipe>;
    const storedRecipes = Object.values(recipes);
    if (storedRecipes.length > 0) return storedRecipes;
  }
  return mockRecipes;
};

// Get product by ID
export const getProductById = (productId: string): SponsoredProduct | undefined => {
  return mockProducts.find(p => p.id === productId);
};
