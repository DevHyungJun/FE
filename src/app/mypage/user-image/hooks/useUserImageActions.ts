import useEditUserImg from "@/hooks/useEditUserImg";
import usePostUserImg from "@/hooks/usePostUserImg";
import useDeleteUserImg from "@/hooks/userDeleteUserImg";
import { useQueryClient } from "@tanstack/react-query";
import showAlert from "../utills/showAlert";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { UserProfile } from "@/types/userInfo";

interface ImageState {
  file: File | null;
  preview: string;
  setFile: (file: File | null) => void;
  setPreview: (preview: string) => void;
  userInfo: UserProfile;
}

const useUserImageAction = (imageState: ImageState) => {
  const { file, preview, setFile, setPreview, userInfo } = imageState;
  const queryClient = useQueryClient();
  const { mutate: postUserImg, isPending: isPosting } = usePostUserImg();
  const { mutate: editUserImg, isPending: isEditing } = useEditUserImg();
  const { mutate: deleteUserImg, isPending: isDeleting } = useDeleteUserImg();
  console.log(userInfo);
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
    [setFile, setPreview]
  );

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
            setFile(null);
            setPreview("");
            showAlert("success", "프로필 이미지가 변경되었습니다.");
          },
          onError: () =>
            showAlert("error", "프로필 이미지 변경에 실패했습니다."),
        });
      }
    });
  }, [deleteUserImg, queryClient, setFile, setPreview]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const isEditingImage =
        userInfo?.data?.profile_image &&
        preview !== userInfo.data.profile_image;

      const mutation = isEditingImage ? postUserImg : editUserImg;

      mutation(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userInfo"] });
          showAlert("success", "프로필 이미지가 저장되었습니다.");
        },
        onError: () => showAlert("error", "프로필 이미지 저장에 실패했습니다."),
      });
    },
    [
      file,
      preview,
      userInfo?.data?.profile_image,
      postUserImg,
      editUserImg,
      queryClient,
    ]
  );

  return {
    handleUpload,
    handleDelete,
    handleSubmit,
    isSubmitting: isPosting || isEditing,
    isDeleting,
  };
};

export default useUserImageAction;
