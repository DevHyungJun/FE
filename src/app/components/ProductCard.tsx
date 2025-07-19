import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import { PostData } from "../../../types/Product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: PostData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const handleRouteProductDetail = (productID: string) =>
    router.push(`products/product-detail/${productID}`);

  return (
    <div
      className="flex flex-col gap-2 w-[250px] min-w-[250px] text-sm text-gray-800 cursor-pointer hover:animate-hover-up hover:shadow-md rounded-md"
      onClick={() => handleRouteProductDetail(product?._id)}
    >
      <Image
        src={product?.product?.thumbnail || product?.detail_images[0]}
        alt={product?.title}
        width={250}
        height={250}
        className="w-[250px] h-[250px] rounded-md object-contain bg-gray-100"
      />
      <div className="p-2">
        <p className="text-xs line-clamp-1 text-ellipsis overflow-hidden">
          {product.title}
        </p>
        <div className="flex justify-between items-center">
          <p className="bold">
            {product?.product?.price
              ? formatPrice(product?.product?.price)
              : "가격정보가 없습니다."}
          </p>
        </div>
        <div className="flex gap-2 text-xs text-gray-400 light h-[16px]">
          {product?.like_count !== 0 && <p>좋아요 {product?.like_count}</p>}
          {product?.comment_list.length !== 0 && (
            <p>상품평 {product?.comment_list.length}</p>
          )}
        </div>
      </div>
    </div>
  );
}
