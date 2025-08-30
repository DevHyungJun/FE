import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useEffect, useState } from "react";

const useUserImageState = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();

  useEffect(() => {
    if (userInfo?.data?.profile_image) {
      setFile(null);
      setPreview(userInfo.data.profile_image);
    }
  }, [userInfo?.data?.profile_image]);

  return { file, setFile, preview, setPreview, userInfo, isUserInfoLoading };
};

export default useUserImageState;
