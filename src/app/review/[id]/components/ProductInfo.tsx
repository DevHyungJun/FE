import { PostData } from "@/types/Product";
import { Image } from "@nextui-org/react";
import Link from "next/link";

interface ProductInfoProps {
  item: PostData | undefined;
}

const ProductInfo = ({ item }: ProductInfoProps) => {
  if (!item) return null;

  return (
    <div className="flex-grow p-3 border-2 mb-5 rounded-lg">
      <div className="flex gap-3">
        <Link href={`/products/product-detail/${item?._id}`}>
          <Image
            width={100}
            alt="product image"
            src={item?.product?.thumbnail}
            className="rounded-md object-contain bg-gray-100"
          />
        </Link>
        <Link
          href={`/products/product-detail/${item?._id}`}
          className="flex items-center hover:font-semibold"
        >
          <p className="text-xs md:text-sm">{item?.product?.product_name}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;
