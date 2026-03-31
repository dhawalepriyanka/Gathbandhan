import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const PhotoGallery = ({ photos = [], mainImage = null, onMainImageChange = null, editable = false, onAddPhoto = null, onRemovePhoto = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validPhotos = photos.filter(p => p && (typeof p === 'string' || p.url));
  const displayPhotos = validPhotos.length > 0 ? validPhotos : [mainImage].filter(Boolean);

  if (displayPhotos.length === 0) {
    return (
      <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg h-80 flex items-center justify-center border border-border">
        <div className="text-center">
          <p className="text-muted-foreground mb-3">No photos uploaded yet</p>
          {editable && (
            <button
              onClick={onAddPhoto}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Photo
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentPhoto = typeof displayPhotos[currentIndex] === 'string' ? displayPhotos[currentIndex] : displayPhotos[currentIndex]?.url;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % displayPhotos.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    if (onMainImageChange) {
      const photo = typeof displayPhotos[index] === 'string' ? displayPhotos[index] : displayPhotos[index]?.url;
      onMainImageChange(photo);
    }
  };

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden aspect-square md:aspect-video">
        <img
          src={currentPhoto}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {displayPhotos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Photo Counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {displayPhotos.length}
        </div>
      </div>

      {/* Thumbnails */}
      {displayPhotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayPhotos.map((photo, index) => {
            const photoUrl = typeof photo === 'string' ? photo : photo?.url;
            return (
              <div
                key={index}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg cursor-pointer border-2 transition-all ${
                  index === currentIndex ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={photoUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                {editable && index > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePhoto && onRemovePhoto(index);
                    }}
                    className="absolute -top-2 -right-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground p-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          })}
          {editable && (
            <button
              onClick={onAddPhoto}
              className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <span className="text-2xl">+</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;