import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { getAllCategories } from "@/lib/blog";

interface BlogToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  resultCount: number;
}

export const BlogToolbar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  resultCount
}: BlogToolbarProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-8 md:py-10">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca articoli..."
            className="w-full px-4 py-3 pl-12 bg-secondary/50 border border-border/60 rounded-sm 
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                     transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cancella ricerca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange("all")}
              className={`px-4 py-2 text-sm rounded-sm border transition-all duration-200 ${
                category === "all"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground/70 border-border/60 hover:border-foreground/40"
              }`}
            >
              Tutti
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 text-sm rounded-sm border transition-all duration-200 ${
                  category === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/70 border-border/60 hover:border-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:block">Ordina:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 text-sm bg-transparent border border-border/60 rounded-sm
                       text-foreground focus:outline-none focus:ring-2 focus:ring-ring
                       cursor-pointer"
            >
              <option value="recent">Più recenti</option>
              <option value="reading-time">Tempo di lettura</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? "articolo" : "articoli"} 
          {(search || category !== "all") && " trovati"}
        </div>
      </div>
    </div>
  );
};
