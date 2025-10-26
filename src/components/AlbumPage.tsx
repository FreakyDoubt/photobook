import PhotoFrame from "./PhotoFrame";

interface Photo {
  src: string;
  caption?: string;
}

interface AlbumPageProps {
  photos: Photo[];
}

const AlbumPage = ({ photos }: AlbumPageProps) => {
  // Ensure we have exactly 3 photos per page
  const displayPhotos = [...photos, ...Array(3 - photos.length).fill({ src: "" })].slice(0, 3);

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="transform md:-rotate-2">
          {displayPhotos[0]?.src && (
            <PhotoFrame
              src={displayPhotos[0].src}
              caption={displayPhotos[0].caption}
              rotation={-2}
            />
          )}
        </div>
        <div className="transform md:rotate-1">
          {displayPhotos[1]?.src && (
            <PhotoFrame
              src={displayPhotos[1].src}
              caption={displayPhotos[1].caption}
              rotation={1}
            />
          )}
        </div>
        <div className="transform md:-rotate-1">
          {displayPhotos[2]?.src && (
            <PhotoFrame
              src={displayPhotos[2].src}
              caption={displayPhotos[2].caption}
              rotation={-1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
