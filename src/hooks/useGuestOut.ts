"use client";

import { useEffect } from "react";
import useAuthCheck from "./useAuthCheck";
import { useRouter } from "next/navigation";

const useGuestOut = (admin = false) => {
  const router = useRouter();
  const { data, isLoading, isError } = useAuthCheck();
  const isAdmin = data?.data?.role === "admin";

  useEffect(() => {
    if (isLoading) return;
    if (isError || !data?.data?.isLoggedIn || (admin && !isAdmin)) {
      router.push("/");
    }
  }, [data, isLoading, isError]);
};

export default useGuestOut;
