import { useRouter } from "next/navigation";

const useSignupMypage = () => {
  const router = useRouter();

  const handleSignupMypage = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/mypage");
  };

  return { handleSignupMypage };
};

export default useSignupMypage;
