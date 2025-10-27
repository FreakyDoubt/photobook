import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AlbumPage from "@/components/AlbumPage";
import FloatingSticker from "@/components/FloatingSticker";
import PhotoUpload from "@/components/PhotoUpload";
import stickerHeart from "@/assets/sticker-heart.png";
import stickerStar from "@/assets/sticker-star.png";
import stickerFlower from "@/assets/sticker-flower.png";
import stickerCloud from "@/assets/sticker-cloud.png";
import stickerButterfly from "@/assets/sticker-butterfly.png";
import placeholder1 from "@/assets/placeholder-1.png";
import placeholder2 from "@/assets/placeholder-2.png";
import placeholder3 from "@/assets/placeholder-3.png";

const Index = () => {
  // Load photos from localStorage
  const [albumPages, setAlbumPages] = useState(() => {
    const saved = localStorage.getItem("albumPhotos");
    if (saved) {
      return JSON.parse(saved);
    }
    // Start with empty album
    return [];
  });

  // Save to localStorage whenever albumPages changes
  useEffect(() => {
    localStorage.setItem("albumPhotos", JSON.stringify(albumPages));
  }, [albumPages]);

  const handlePhotosUpload = (newPhotos: { src: string; caption: string }[]) => {
    const updatedPages = [...albumPages];
    let remainingPhotos = [...newPhotos];

    // Check if last page has space (less than 3 photos)
    if (updatedPages.length > 0) {
      const lastPage = updatedPages[updatedPages.length - 1];
      const spaceLeft = 3 - lastPage.photos.length;
      
      if (spaceLeft > 0) {
        // Fill the last page first
        const photosToAdd = remainingPhotos.slice(0, spaceLeft);
        lastPage.photos = [...lastPage.photos, ...photosToAdd];
        remainingPhotos = remainingPhotos.slice(spaceLeft);
      }
    }

    // Group remaining photos into new pages of 3
    for (let i = 0; i < remainingPhotos.length; i += 3) {
      updatedPages.push({
        photos: remainingPhotos.slice(i, i + 3),
      });
    }

    setAlbumPages(updatedPages);
  };

  return (
    <div className="min-h-screen bg-gradient-pastel relative overflow-hidden">
      {/* Floating Stickers */}
      <FloatingSticker
        src={stickerHeart}
        className="top-10 left-10 animate-float"
        size={60}
      />
      <FloatingSticker
        src={stickerStar}
        className="top-20 right-20 animate-float-slow"
        size={70}
        delay={0.5}
      />
      <FloatingSticker
        src={stickerFlower}
        className="bottom-20 left-20 animate-float-slower"
        size={80}
        delay={1}
      />
      <FloatingSticker
        src={stickerCloud}
        className="top-1/3 right-10 animate-float"
        size={65}
        delay={1.5}
      />
      <FloatingSticker
        src={stickerButterfly}
        className="bottom-1/3 right-1/4 animate-float-slow"
        size={55}
        delay={2}
      />
      <FloatingSticker
        src={stickerHeart}
        className="top-2/3 left-1/4 animate-float-slower"
        size={50}
        delay={2.5}
      />

      {/* Header */}
      <div className="text-center pt-12 pb-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-2">
          My Cute Album 🌸
        </h1>
        <p className="text-foreground/70 text-lg">Swipe untuk lihat lebih banyak foto! ✨</p>
      </div>

      {/* Upload Section */}
      <div className="relative z-10">
        <PhotoUpload onPhotosUpload={handlePhotosUpload} />
      </div>

      {/* Album Carousel */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        {albumPages.length > 0 ? (
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              {albumPages.map((page, index) => (
                <CarouselItem key={index}>
                  <AlbumPage photos={page.photos} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="right-4 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-foreground/60">📸 Upload foto pertama untuk mulai album!</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center pb-8 relative z-10">
        <p className="text-sm text-foreground/60">
          💝 Klik panah atau swipe untuk pindah halaman
        </p>
      </div>
    </div>
  );
};

export default Index;
