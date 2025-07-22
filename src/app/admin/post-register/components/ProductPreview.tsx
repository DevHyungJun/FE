import Image from "next/image";

interface ThumbnailUploadPreviewProps {
  imageUrl?: string;
  label?: string;
  alt?: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ThumbnailUploadPreview({
  imageUrl,
  label = "미리보기 이미지",
  alt = "thumbnail",
  fileInputRef,
  onImageChange,
}: ThumbnailUploadPreviewProps) {
  if (!imageUrl) return null;
  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
      <div className="flex flex-col items-center gap-2 sm:flex-row text-gray-500 light text-[12px] sm:text-medium">
        <p>
          <span className="regular text-gray-800 line-clamp-1 overflow-hidden text-ellipsis">
            {label}
          </span>
        </p>
      </div>
      <Image
        src={imageUrl}
        alt={alt}
        width={100}
        height={100}
        className="bg-white rounded-md object-contain"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
