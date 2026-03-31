import { useState } from 'react';

interface ImageEdge {
  node: {
    url: string;
    altText: string | null;
  };
}

interface ProductImageGalleryProps {
  images: ImageEdge[];
  title: string;
}

const ProductImageGallery = ({ images, title }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-secondary rounded-sm flex items-center justify-center">
        <span className="font-serif text-6xl text-foreground/20">{title.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image - large */}
      <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
        <img
          src={images[selectedIndex].node.url}
          alt={images[selectedIndex].node.altText || title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Additional images stacked below (like Fratelli Carli) */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3">
          {images.slice(1).map((image, index) => (
            <button
              key={index + 1}
              onClick={() => setSelectedIndex(index + 1)}
              className={`aspect-square bg-secondary rounded-sm overflow-hidden border-2 transition-colors ${
                selectedIndex === index + 1 ? 'border-primary' : 'border-transparent hover:border-border'
              }`}
            >
              <img
                src={image.node.url}
                alt={image.node.altText || `${title} - ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Thumbnail strip on mobile for quick nav */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
                selectedIndex === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image.node.url}
                alt={image.node.altText || `${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
