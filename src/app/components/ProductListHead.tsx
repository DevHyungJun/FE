import { InfiniteProductPostResponse } from "@/types/allProducts";
import { CiShoppingTag } from "react-icons/ci";

interface ProductListHeadProps {
  isLoading: boolean;
  data: InfiniteProductPostResponse | undefined;
}

const ProductListHead = ({ isLoading, data }: ProductListHeadProps) => {
  return (
    <div className="flex items-center gap-2 text-medium sm:text-xl extra-bold m-1">
      {!isLoading && (
        <>
          <CiShoppingTag />
          {data?.pages[0]?.data?.counts + "개의 상품 목록"}
        </>
      )}
    </div>
  );
};

export default ProductListHead;
