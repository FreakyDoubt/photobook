interface PhotoFrameProps {
  src: string;
  rotation?: number;
  caption?: string;
}

const PhotoFrame = ({ src, rotation = 0, caption }: PhotoFrameProps) => {
  return (
    <div
      className="bg-card p-4 shadow-cute hover:shadow-xl transition-all duration-300 hover:scale-105"
      style={{
        transform: `rotate(${rotation}deg)`,
        borderRadius: "8px",
      }}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
        <img
          src={src}
          alt={caption || "Memory"}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm font-medium text-foreground/80 font-handwriting">
          {caption}
        </p>
      )}
    </div>
  );
};

export default PhotoFrame;
