interface FloatingStickerProps {
  src: string;
  className?: string;
  size?: number;
  delay?: number;
}

const FloatingSticker = ({ src, className = "", size = 80, delay = 0 }: FloatingStickerProps) => {
  return (
    <img
      src={src}
      alt="cute sticker"
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default FloatingSticker;
