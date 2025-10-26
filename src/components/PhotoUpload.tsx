import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onPhotosUpload: (photos: { src: string; caption: string }[]) => void;
}

const PhotoUpload = ({ onPhotosUpload }: PhotoUploadProps) => {
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: { src: string; caption: string }[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: `${file.name} bukan file gambar`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push({
            src: event.target.result as string,
            caption: file.name.split(".")[0],
          });
          processedCount++;

          if (processedCount === files.length) {
            onPhotosUpload(newPhotos);
            toast({
              title: "Berhasil! ✨",
              description: `${newPhotos.length} foto berhasil diupload`,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
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
