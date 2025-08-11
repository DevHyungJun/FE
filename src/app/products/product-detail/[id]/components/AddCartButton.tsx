import useAddCart from "@/hooks/useAddCart";
import { PostData } from "@/types/Product";
import { useQueryClient } from "@tanstack/react-query";
import { FaCartPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

interface AddCartButtonProps {
  data: { data: PostData };
  quantity: number;
}

const AddCartButton = ({ data, quantity }: AddCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate: addCartMutate } = useAddCart();

  const handleAddCart = () => {
    const article = { article: data?.data?._id, quantity };
    addCartMutate(article, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "장바구니",
          text: "상품을 장바구니에 추가했습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  return (
    <button className="text-3xl mt-2" onClick={handleAddCart}>
      <FaCartPlus className="text-gray-500" />
    </button>
  );
};

export default AddCartButton;
