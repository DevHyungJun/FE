import useAuthCheck from "@/hooks/useAuthCheck";

const useIsLoggedIn = () => {
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  const isLoggedIn = authCheckIsSuccess && authCheckData?.data?.isLoggedIn;
  const isAdmin = authCheckIsSuccess && authCheckData?.data?.role === "admin";

  return { isLoggedIn, isAdmin };
};

export default useIsLoggedIn;
