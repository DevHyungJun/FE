import Image from "next/image";
import { Product } from "@/types/Product";

interface ProductPreviewProps {
  product?: Product;
  alt: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductPreview({
  product,
  alt,
  fileInputRef,
  onImageChange,
}: ProductPreviewProps) {
  if (!product) return null;
  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
      <div className="flex flex-col items-center gap-2 sm:flex-row text-gray-500 light text-[12px] sm:text-medium">
        <p>
          <span className="regular text-gray-800 line-clamp-1 overflow-hidden text-ellipsis">
            {product.product_name}
          </span>
        </p>
        <p className="light text-[12px] sm:text-medium text-nowrap">
          미리보기 이미지
        </p>
      </div>
      <Image
        src={product.thumbnail}
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
