import { X, Truck } from 'lucide-react';
import { useState } from 'react';

interface AnnouncementBarProps {
  message?: string;
  shippingThreshold?: number;
  showCloseButton?: boolean;
}

const AnnouncementBar = ({ 
  message,
  shippingThreshold = 59,
  showCloseButton = true 
}: AnnouncementBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const defaultMessage = "Spedizione gratuita: Italia da €29 · Europa da €49";

  return (
    <div 
      className="bg-primary text-primary-foreground text-center py-2.5 px-4 relative"
      role="banner"
      aria-label="Annuncio"
    >
      <div className="container-editorial flex items-center justify-center gap-2">
        <Truck className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium tracking-wide">
          {message || defaultMessage}
        </p>
      </div>
      
      {showCloseButton && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 
                     hover:bg-primary-foreground/10 rounded-sm transition-colors"
          aria-label="Chiudi annuncio"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AnnouncementBar;
