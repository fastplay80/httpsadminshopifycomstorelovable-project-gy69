// Recipe Admin Types and Mock Data

export interface SponsoredProduct {
  id: string;
  name: string;
  thumbUrl: string;
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
}

// Mock products for sponsored selects
export const mockProducts: SponsoredProduct[] = [
  {
    id: 'prod-1',
    name: 'Confettura Extra di Arance e Limoni',
    thumbUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=100&h=100&fit=crop',
  },
  {
    id: 'prod-2',
    name: 'Confettura Extra di Fragole',
    thumbUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
  },
  {
    id: 'prod-3',
    name: 'Miele di Castagno del Cilento',
    thumbUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100&h=100&fit=crop',
  },
  {
    id: 'prod-4',
    name: 'Olio EVO Cilento DOP',
    thumbUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
  },
  {
    id: 'prod-5',
    name: 'Confettura Extra di Fichi',
    thumbUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&h=100&fit=crop',
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

// Mock recipe data
export const mockRecipe: Recipe = {
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
  videoUrl: 'https://youtube.com/watch?v=example',
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
};

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);

// Local storage key
const STORAGE_KEY = 'minnelea_recipes';

// Get recipe from storage or return mock
export const getRecipeById = (id: string): Recipe => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const recipes = JSON.parse(stored) as Record<string, Recipe>;
    if (recipes[id]) return recipes[id];
  }
  return mockRecipe;
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
    return Object.values(recipes);
  }
  return [mockRecipe];
};
