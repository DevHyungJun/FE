import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

const useLoginLogout = () => {
  const router = useRouter();
  const { mutate: logout } = useLogout();

  const handleLoginLogout = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    logout();
  };

  return { handleLoginLogout };
};

export default useLoginLogout;
