import { Image } from "@nextui-org/react";
import { MdCancel } from "react-icons/md";

interface ImageFile {
  file: File;
  url: string;
  id: number;
}

interface ImagePreviewProps {
  images: ImageFile[];
  onDelete: (id: number) => void;
}

const ImagePreview = ({ images, onDelete }: ImagePreviewProps) => {
  return (
    <>
      {images.map((image) => (
        <div key={image.id} className="flex justify-center relative mx-auto">
          <Image
            src={image.url}
            alt="Preview image"
            className="object-cover"
            width={500}
            height={500}
          />
          <button
            type="button"
            onClick={() => onDelete(image.id)}
            className="absolute top-1 right-1 p-[1px] bg-white rounded-full z-10 text-2xl text-red-500 hover:text-red-700"
          >
            <MdCancel />
          </button>
        </div>
      ))}
    </>
  );
};

export default ImagePreview;
