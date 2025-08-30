import useGetUserInfo from "@/hooks/useGetUserInfo";

const useGetProfileImage = () => {
  const { data } = useGetUserInfo();
  const profileImage = data?.data?.profile_image;

  return { profileImage };
};

export default useGetProfileImage;
