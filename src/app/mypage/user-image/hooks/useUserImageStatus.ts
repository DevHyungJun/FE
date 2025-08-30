import { useMemo } from "react";

const useUserImageStatus = (
  file: File | null,
  preview: string,
  userProfileImage?: string | null
) => {
  const isSubmitDisabled = useMemo(
    () => preview === userProfileImage || !file,
    [preview, userProfileImage, file]
  );

  const isDeleteDisabled = useMemo(
    () => userProfileImage === null,
    [userProfileImage]
  );

  const currentImagePreview = useMemo(
    () => preview || "/basic_profile.png",
    [preview]
  );

  return { isSubmitDisabled, isDeleteDisabled, currentImagePreview };
};

export default useUserImageStatus;
