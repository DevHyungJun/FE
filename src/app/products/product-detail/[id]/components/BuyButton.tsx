import useOrder from "@/hooks/useOrder";
import { PostData } from "@/types/Product";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface BuyButtonProps {
  data: { data: PostData };
  quantity: number;
}

const BuyButton = ({ data, quantity }: BuyButtonProps) => {
  const router = useRouter();
  const { mutate: orderMutate, isPending: orderIsPending } = useOrder();

  const handleRouteOrder = () => {
    const articleId = data?.data?._id;
    const product = data?.data?.product?._id;
    if (!articleId && !product) return;
    orderMutate([{ articleId, product, quantity }], {
      onSuccess: (data) => {
        if (data?.data?._id) {
          router.push(`/order/${data?.data?._id}`);
        }
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          text: "로그인 후 이용해주세요",
        });
      },
    });
  };

  return (
    <Button
      color="primary"
      className="w-[300px] text-xs md:text-medium mt-2 bold"
      onClick={handleRouteOrder}
      isLoading={orderIsPending}
    >
      구매하기
    </Button>
  );
};

export default BuyButton;
