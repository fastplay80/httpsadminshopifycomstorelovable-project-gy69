import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
import BlogIndex from "./pages/BlogIndex";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partnership from "./pages/Partnership";
import NotFound from "./pages/NotFound";
import EditRecipe from "./pages/admin/EditRecipe";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prodotti/:handle" element={<ProductDetail />} />
            <Route path="/collezioni/:slug" element={<Collection />} />
            <Route path="/chi-siamo" element={<About />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/admin/recipes/:id/edit" element={<EditRecipe />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
