import { Image } from "@nextui-org/react";
import { MdCancel } from "react-icons/md";

export interface ImagePreviewListItem {
  url: string;
  id: string | number;
  file?: File;
}

interface ImagePreviewListProps {
  images: ImagePreviewListItem[];
  onDelete: (id: string | number) => void;
  title?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const ImagePreviewList = ({
  images,
  onDelete,
  title = "이미지 미리보기",
  containerClassName = "flex flex-col gap-2 mt-2 bg-gray-50 p-2 rounded-md",
  imageClassName = "object-cover w-full rounded-md",
}: ImagePreviewListProps) => {
  if (!images.length) return null;
  return (
    <div className={containerClassName}>
      {title && <h2 className="text-lg bold">{title}</h2>}
      {images.map((image) => (
        <div key={image.id} className="flex justify-center relative mx-auto">
          <Image
            src={image.url}
            alt="Preview image"
            className={imageClassName}
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
    </div>
  );
};

export default ImagePreviewList;
