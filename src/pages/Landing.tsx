import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingSticker from "@/components/FloatingSticker";
import stickerHeart from "@/assets/sticker-heart.png";
import stickerStar from "@/assets/sticker-star.png";
import stickerFlower from "@/assets/sticker-flower.png";
import stickerCloud from "@/assets/sticker-cloud.png";
import stickerButterfly from "@/assets/sticker-butterfly.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-pastel relative overflow-hidden flex items-center justify-center">
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

      {/* Hero Content */}
      <div className="text-center px-4 relative z-10 max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6 animate-fade-in">
          My Cute Album 🌸
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-4 animate-fade-in [animation-delay:0.2s]">
          Koleksi moment-moment berharga dalam album foto digital yang cute banget! ✨
        </p>
        <p className="text-lg text-foreground/60 mb-12 animate-fade-in [animation-delay:0.4s]">
          Swipe, lihat, dan nikmati kenangan indah dalam tampilan polaroid yang aesthetic 💝
        </p>
        
        <Button
          size="lg"
          onClick={() => navigate("/album")}
          className="text-lg px-8 py-6 rounded-full shadow-cute hover:shadow-soft transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:0.6s]"
        >
          Buka Album 📸
        </Button>
      </div>
    </div>
  );
};

export default Landing;
