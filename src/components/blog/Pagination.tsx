import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav 
      className="flex items-center justify-center gap-2 py-12"
      aria-label="Paginazione"
    >
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground 
                 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed 
                 transition-colors"
        aria-label="Pagina precedente"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden md:inline">Precedente</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`min-w-[40px] h-10 text-sm rounded-sm transition-all duration-200 ${
                currentPage === page
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground 
                 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed 
                 transition-colors"
        aria-label="Pagina successiva"
      >
        <span className="hidden md:inline">Successivo</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
