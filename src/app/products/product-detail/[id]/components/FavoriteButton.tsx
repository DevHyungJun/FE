import useAuthCheck from "@/hooks/useAuthCheck";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import useFavoritePost from "@/hooks/useFavoritePost";
import { PostData } from "@/types/Product";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Swal from "sweetalert2";

interface FavoriteButtonProps {
  id: string;
  data: { data: PostData };
}

const FavoriteButton = ({ id, data }: FavoriteButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: favoritePostMutate } = useFavoritePost();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const { data: authCheckData } = useAuthCheck();
  const isLoggedIn = authCheckData?.data?.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) return;
    if (data?.data?.like_user_list.includes(authCheckData?.data?.userId)) {
      setIsFavorite(true);
    }
  }, [data]);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "좋아요",
        text: "로그인이 필요한 서비스입니다.",
      });
      router.push("/login");
      return;
    }
    if (isFavorite) {
      favoriteDeleteMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allProducts"] });
          queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
          setIsFavorite(false);
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "좋아요",
            text: "상품을 좋아요 목록에서 삭제하지 못했습니다.",
          });
        },
      });
    } else {
      favoritePostMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allProducts"] });
          queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
          setIsFavorite(true);
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "좋아요",
            text: "상품을 좋아요 목록에 추가하지 못했습니다.",
          });
        },
      });
    }
  };

  return (
    <button className="text-3xl text-red-500 mt-2" onClick={handleFavorite}>
      {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
    </button>
  );
};

export default FavoriteButton;
