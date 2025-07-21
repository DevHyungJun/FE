import { useState, useEffect, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useGetUserInfo from "@/hooks/useGetUserInfo";
import usePostUserImg from "@/hooks/usePostUserImg";
import useEditUserImg from "@/hooks/useEditUserImg";
import useDeleteUserImg from "@/hooks/userDeleteUserImg";

interface UserImageState {
  file: File | null;
  preview: string;
}

const useUserImageManager = () => {
  const [userImage, setUserImage] = useState<UserImageState>({
    file: null,
    preview: "",
  });

  const queryClient = useQueryClient();
  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();
  const { mutate: postUserImg, isPending: isPosting } = usePostUserImg();
  const { mutate: editUserImg, isPending: isEditing } = useEditUserImg();
  const { mutate: deleteUserImg, isPending: isDeleting } = useDeleteUserImg();

  useEffect(() => {
    if (userInfo?.data?.profile_image) {
      setUserImage({
        file: null,
        preview: userInfo.data.profile_image,
      });
    }
  }, [userInfo?.data?.profile_image]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUserImage({
      file,
      preview: imageUrl,
    });
  }, []);

  const showSuccessAlert = (title: string) => {
    Swal.fire({
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showErrorAlert = (title: string) => {
    Swal.fire({
      icon: "error",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = useCallback(() => {
    Swal.fire({
      title: "정말로 기본 이미지로 변경하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserImg(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] });
            setUserImage({ file: null, preview: "" });
            showSuccessAlert("프로필 이미지가 변경되었습니다.");
          },
          onError: () => {
            showErrorAlert("프로필 이미지 변경에 실패했습니다.");
          },
        });
      }
    });
  }, [deleteUserImg, queryClient]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userImage.file) return;

      const formData = new FormData();
      formData.append("image", userImage.file);

      const isEditingImage =
        userInfo?.data?.profile_image &&
        userImage.preview !== userInfo.data.profile_image;

      const mutation = isEditingImage ? postUserImg : editUserImg;

      mutation(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userInfo"] });
          showSuccessAlert("프로필 이미지가 저장되었습니다.");
        },
        onError: () => {
          showErrorAlert("프로필 이미지 저장에 실패했습니다.");
        },
      });
    },
    [
      userImage.file,
      userImage.preview,
      userInfo?.data?.profile_image,
      editUserImg,
      postUserImg,
      queryClient,
    ]
  );

  const isSubmitDisabled = useMemo(() => {
    return (
      userImage.preview === userInfo?.data?.profile_image || !userImage.file
    );
  }, [userImage.preview, userInfo?.data?.profile_image, userImage.file]);

  const isDeleteDisabled = useMemo(() => {
    return userInfo?.data?.profile_image === null;
  }, [userInfo?.data?.profile_image]);

  const currentImagePreview = useMemo(() => {
    return userImage.preview || "/basic_profile.png";
  }, [userImage.preview]);

  return {
    isUserInfoLoading,
    isSubmitting: isPosting || isEditing,
    isDeleting,
    isSubmitDisabled,
    isDeleteDisabled,
    currentImagePreview,
    handleUpload,
    handleDelete,
    handleSubmit,
  };
};

export default useUserImageManager;
