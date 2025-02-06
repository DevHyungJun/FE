import { logout } from "@/api/logout";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["authCheck"], { isLoggedIn: false });
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: `로그아웃에 실패했습니다. ${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}
