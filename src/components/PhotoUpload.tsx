import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onPhotosUpload: (photos: { src: string; caption: string }[]) => void;
  onClearAlbum: () => void;
}

const PhotoUpload = ({ onPhotosUpload, onClearAlbum }: PhotoUploadProps) => {
  const { toast } = useToast();

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Resize to max 800px width/height to save space
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.7 quality
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: { src: string; caption: string }[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Error",
            description: `${file.name} bukan file gambar`,
            variant: "destructive",
          });
          continue;
        }

        const compressedSrc = await compressImage(file);
        newPhotos.push({
          src: compressedSrc,
          caption: file.name.split(".")[0],
        });
      }

      if (newPhotos.length > 0) {
        onPhotosUpload(newPhotos);
        toast({
          title: "Berhasil! ✨",
          description: `${newPhotos.length} foto berhasil diupload`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memproses foto",
        variant: "destructive",
      });
    }

    // Reset input
    e.target.value = "";
  };

  return (
    <div className="flex gap-3 justify-center mb-6">
      <Button
        onClick={() => document.getElementById("photo-upload")?.click()}
        className="gap-2 shadow-cute hover:shadow-soft transition-all"
        size="lg"
      >
        <Upload className="w-5 h-5" />
        Upload Foto
      </Button>
      <Button
        onClick={onClearAlbum}
        variant="outline"
        className="gap-2"
        size="lg"
      >
        <Trash2 className="w-5 h-5" />
        Clear Album
      </Button>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
