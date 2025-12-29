import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import minneleaLogo from '@/assets/minnelea-logo.png';
import CartDrawer from '@/components/cart/CartDrawer';

const shopCategories = [
  { name: 'Tutti i Prodotti', href: '/collezioni/tutti' },
  { name: 'Marmellate', href: '/collezioni/marmellate' },
  { name: 'Creme Salate', href: '/collezioni/creme-salate' },
  { name: 'Sott\'olio', href: '/collezioni/sottoli' },
  { name: 'Sughi Pronti', href: '/collezioni/sughi' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/collezioni/tutti', hasDropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Contatti', href: '/contatti' },
  { name: 'Ricette', href: '/ricette' },
  { name: 'Premi', href: '/premi' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-subtle border-b border-border/50' 
          : 'bg-background'
      )}
      role="banner"
    >
      <nav className="container-editorial" aria-label="Navigazione principale">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-sm transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0"
            aria-label="Minnelea - Torna alla homepage"
          >
            <img 
              src={minneleaLogo} 
              alt="Minnelea" 
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground 
                             transition-colors"
                    aria-expanded={isShopDropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isShopDropdownOpen && "rotate-180"
                    )} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {isShopDropdownOpen && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div className="bg-background border border-border rounded-sm shadow-lg py-2 min-w-[180px]">
                        {shopCategories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            onClick={() => setIsShopDropdownOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground 
                           transition-colors link-underline"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-muted rounded-sm transition-colors"
              aria-label="Cerca prodotti"
              aria-expanded={isSearchOpen}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account - hidden on mobile for simplicity */}
            <Link
              to="/account"
              className="hidden md:flex p-2 hover:bg-muted rounded-sm transition-colors"
              aria-label="Il mio account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <CartDrawer />
          </div>
        </div>

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full bg-background border-b border-border p-4 animate-fade-in">
            <div className="container-editorial">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="search"
                  placeholder="Cerca confetture, sughi, box regalo..."
                  className="w-full px-4 py-3 pl-12 bg-muted border-0 rounded-sm 
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden fixed inset-0 top-16 z-50 bg-background transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="container-editorial py-6">
          <ul className="space-y-1">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <li key={item.name}>
                  <button
                    onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                    className="flex items-center justify-between w-full py-3 px-2 text-lg font-serif font-medium text-foreground
                             hover:bg-muted rounded-sm transition-colors"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      isMobileShopOpen && "rotate-180"
                    )} />
                  </button>
                  {isMobileShopOpen && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                      {shopCategories.map((category) => (
                        <li key={category.name}>
                          <Link
                            to={category.href}
                            className="block py-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileShopOpen(false);
                            }}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block py-3 px-2 text-lg font-serif font-medium text-foreground
                             hover:bg-muted rounded-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
          
          <div className="mt-8 pt-8 border-t border-border">
            <Link
              to="/account"
              className="flex items-center gap-3 py-3 px-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Il mio account</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
