import Image from "next/image";
import { MdCancel } from "react-icons/md";

interface PostImagePreviewProps {
  previews: string[];
  onDelete: (index: number) => void;
}

export default function PostImagePreview({
  previews,
  onDelete,
}: PostImagePreviewProps) {
  if (previews.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 mt-2 bg-gray-50 p-2 rounded-md">
      <h2 className="text-lg bold">상세 이미지</h2>
      {previews.map((preview, index) => (
        <div key={index} className="relative mx-auto">
          <Image
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-full object-contain rounded-md bg-white"
            width={500}
            height={500}
          />
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="absolute top-1 right-1 p-[1px] bg-white rounded-full"
          >
            <MdCancel className="text-2xl" />
          </button>
        </div>
      ))}
    </div>
  );
}
