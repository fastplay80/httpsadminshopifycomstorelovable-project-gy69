import { toast } from 'sonner';

// Shopify API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'minnelea2.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '4a524555b0ee7feed6e4c7ea71191cb5';

// TypeScript interfaces
export interface ProductMetafield {
  key: string;
  value: string;
  type: string;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    // Metafields for product details
    metafields?: Array<ProductMetafield | null>;
  };
}

// Parsed product metadata from Shopify metafields
export interface ProductMetadata {
  ingredients?: string;
  allergens?: string;
  usage?: string[];
  storage?: string;
  weightGrams?: number;
  nutrition?: {
    energia?: string;
    grassi?: string;
    grassiSaturi?: string;
    carboidrati?: string;
    zuccheri?: string;
    proteine?: string;
    sale?: string;
    fibre?: string;
  };
}

// GraphQL Queries
const STOREFRONT_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const STOREFRONT_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
      metafields(identifiers: [
        { namespace: "custom", key: "ingredients" },
        { namespace: "custom", key: "allergens" },
        { namespace: "custom", key: "usage_suggestions" },
        { namespace: "custom", key: "storage" },
        { namespace: "custom", key: "weight_grams" },
        { namespace: "custom", key: "nutrition_energia" },
        { namespace: "custom", key: "nutrition_grassi" },
        { namespace: "custom", key: "nutrition_grassi_saturi" },
        { namespace: "custom", key: "nutrition_carboidrati" },
        { namespace: "custom", key: "nutrition_zuccheri" },
        { namespace: "custom", key: "nutrition_proteine" },
        { namespace: "custom", key: "nutrition_sale" },
        { namespace: "custom", key: "nutrition_fibre" }
      ]) {
        key
        value
        type
      }
    }
  }
`;

// Blog articles query
const STOREFRONT_BLOG_ARTICLES_QUERY = `
  query GetBlogArticles($first: Int!, $blogHandle: String!) {
    blog(handle: $blogHandle) {
      id
      title
      handle
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            publishedAt
            image {
              url
              altText
            }
            author {
              name
            }
            content
            contentHtml
            tags
          }
        }
      }
    }
  }
`;

const STOREFRONT_ARTICLE_BY_HANDLE_QUERY = `
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        excerpt
        publishedAt
        image {
          url
          altText
        }
        author {
          name
        }
        content
        contentHtml
        tags
      }
    }
  }
`;

const STOREFRONT_BLOGS_QUERY = `
  query GetBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront API helper function
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch all products
export async function fetchProducts(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query });
    if (!data) return [];
    return data.data.products.edges;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string) {
  try {
    const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!data) return null;
    return data.data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Parse metafields into structured product metadata
export function parseProductMetadata(metafields: Array<ProductMetafield | null> | undefined): ProductMetadata {
  if (!metafields) return {};
  
  const getMetafield = (key: string): string | undefined => {
    const field = metafields.find(m => m?.key === key);
    return field?.value;
  };
  
  const usageSuggestions = getMetafield('usage_suggestions');
  
  return {
    ingredients: getMetafield('ingredients'),
    allergens: getMetafield('allergens'),
    usage: usageSuggestions ? usageSuggestions.split('\n').filter(Boolean) : undefined,
    storage: getMetafield('storage'),
    weightGrams: getMetafield('weight_grams') ? parseInt(getMetafield('weight_grams')!, 10) : undefined,
    nutrition: {
      energia: getMetafield('nutrition_energia'),
      grassi: getMetafield('nutrition_grassi'),
      grassiSaturi: getMetafield('nutrition_grassi_saturi'),
      carboidrati: getMetafield('nutrition_carboidrati'),
      zuccheri: getMetafield('nutrition_zuccheri'),
      proteine: getMetafield('nutrition_proteine'),
      sale: getMetafield('nutrition_sale'),
      fibre: getMetafield('nutrition_fibre'),
    },
  };
}

// Create checkout from cart items
export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
    });

    if (!cartData) {
      throw new Error('Failed to create cart');
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

// Blog Types
export interface ShopifyArticle {
  id: string;
  title: string;
  handle: string;
  excerpt: string | null;
  publishedAt: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  author: {
    name: string;
  } | null;
  content: string;
  contentHtml: string;
  tags: string[];
}

export interface ShopifyBlog {
  id: string;
  title: string;
  handle: string;
}

// Default blog handle - change this to match your Shopify blog handle
const DEFAULT_BLOG_HANDLE = 'news';

// Fetch all blogs
export async function fetchBlogs(first: number = 10): Promise<ShopifyBlog[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_BLOGS_QUERY, { first });
    if (!data) return [];
    return data.data.blogs.edges.map((edge: { node: ShopifyBlog }) => edge.node);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Fetch all articles from a blog
export async function fetchBlogArticles(first: number = 50, blogHandle: string = DEFAULT_BLOG_HANDLE): Promise<ShopifyArticle[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_BLOG_ARTICLES_QUERY, { first, blogHandle });
    if (!data || !data.data.blog) return [];
    return data.data.blog.articles.edges.map((edge: { node: ShopifyArticle }) => edge.node);
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return [];
  }
}

// Fetch single article by handle
export async function fetchArticleByHandle(articleHandle: string, blogHandle: string = DEFAULT_BLOG_HANDLE): Promise<ShopifyArticle | null> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_ARTICLE_BY_HANDLE_QUERY, { blogHandle, articleHandle });
    if (!data || !data.data.blog) return null;
    return data.data.blog.articleByHandle;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Calculate reading time from content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Format date for display
export function formatArticleDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
