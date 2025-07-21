import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import { PostData } from "../../../types/Product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: PostData;
  mode?: "fixed" | "fluid";
}

export default function ProductCard({
  product,
  mode = "fixed",
}: ProductCardProps) {
  const router = useRouter();
  const handleRouteProductDetail = (productID: string) =>
    router.push(`products/product-detail/${productID}`);

  const isFixed = mode === "fixed";
  return (
    <div
      className={
        isFixed
          ? "flex flex-col gap-2 w-[250px] min-w-[250px] text-sm text-gray-800 cursor-pointer hover:animate-hover-up hover:shadow-md rounded-md"
          : "flex flex-col gap-2 max-w-[200px] md:max-w-[300px] text-sm text-gray-800 cursor-pointer mx-auto hover:animate-hover-up hover:shadow-md rounded-md"
      }
      onClick={() => handleRouteProductDetail(product?._id)}
    >
      <Image
        src={product?.product?.thumbnail || product?.detail_images?.[0]}
        alt={product?.title}
        width={isFixed ? 250 : 300}
        height={isFixed ? 250 : 300}
        className={
          isFixed
            ? "w-[250px] h-[250px] rounded-md object-contain bg-gray-100"
            : "w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-md object-contain bg-gray-100"
        }
      />
      <div className={isFixed ? "p-2" : "px-2 pb-2"}>
        <p
          className={
            isFixed
              ? "text-xs line-clamp-1 text-ellipsis overflow-hidden"
              : "text-xs sm:text-sm line-clamp-1"
          }
        >
          {product.title}
        </p>
        <div className="flex justify-between items-center">
          <p className={isFixed ? "bold" : "bold text-xs sm:text-sm"}>
            {product?.product?.price
              ? formatPrice(product?.product?.price)
              : "가격정보가 없습니다."}
          </p>
        </div>
        <div
          className={
            isFixed
              ? "flex gap-2 text-xs text-gray-400 light h-[16px]"
              : "flex gap-2 text-xs text-gray-400 light h-[16px]"
          }
        >
          {product?.like_count !== 0 && <p>좋아요 {product?.like_count}</p>}
          {product?.comment_list.length !== 0 && (
            <p>상품평 {product?.comment_list.length}</p>
          )}
        </div>
      </div>
    </div>
  );
}
