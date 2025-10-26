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
    // Default sample data
    return [
      {
        photos: [
          { src: placeholder1, caption: "Moment 1" },
          { src: placeholder2, caption: "Moment 2" },
          { src: placeholder3, caption: "Moment 3" },
        ],
      },
      {
        photos: [
          { src: placeholder2, caption: "Memory 1" },
          { src: placeholder3, caption: "Memory 2" },
          { src: placeholder1, caption: "Memory 3" },
        ],
      },
      {
        photos: [
          { src: placeholder3, caption: "Happy Day 1" },
          { src: placeholder1, caption: "Happy Day 2" },
          { src: placeholder2, caption: "Happy Day 3" },
        ],
      },
    ];
  });

  // Save to localStorage whenever albumPages changes
  useEffect(() => {
    localStorage.setItem("albumPhotos", JSON.stringify(albumPages));
  }, [albumPages]);

  const handlePhotosUpload = (newPhotos: { src: string; caption: string }[]) => {
    // Group photos into pages of 3
    const newPages = [];
    for (let i = 0; i < newPhotos.length; i += 3) {
      newPages.push({
        photos: newPhotos.slice(i, i + 3),
      });
    }
    setAlbumPages([...albumPages, ...newPages]);
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
