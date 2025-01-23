"use client";

import useGetUserImg from "@/hooks/useGetUserImg";
import usePostUserImg from "@/hooks/usePostUserImg";
import useEditUserImg from "@/hooks/useEditUserImg";
import useDeleteUserImg from "@/hooks/userDeleteUserImg";
import { Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface UserImage {
  file: File | null;
  preview: string;
}

export default function UserImage() {
  const [userImg, setUserImg] = useState<UserImage>({
    file: null,
    preview: "",
  });
  const { data: getUserImg, isLoading: getUserImgIsLoading } = useGetUserImg();
  const { mutate: postUserImg, isPending: postUserImgIsPending } =
    usePostUserImg();
  const { mutate: editUserImg, isPending: editUserImgIsPending } =
    useEditUserImg();
  const { mutate: deleteUserImg, isPending: deleteUserImgIsPending } =
    useDeleteUserImg();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (getUserImg) {
      setUserImg({
        file: null,
        preview: getUserImg.data?.image || "",
      });
    }
  }, [getUserImg]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUserImg({
      file,
      preview: imageUrl,
    });
  };

  const handleDelete = () => {
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
            queryClient.refetchQueries({ queryKey: ["userImg"] });
            setUserImg({
              file: null,
              preview: "",
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "프로필 이미지 변경에 실패했습니다.",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    });
  };

  const disabledButton = () => {
    if (userImg.preview === getUserImg?.data?.image) {
      return true;
    } else if (userImg.preview === "" || userImg.file === null) {
      return true;
    }
    return false;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateOfPostOrEdit = getUserImg?.data?.image
      ? editUserImg
      : postUserImg;
    const file = new FormData();
    file.append("image", userImg.file as Blob);
    mutateOfPostOrEdit(file, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["userImg"] });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "프로필 이미지 변경에 실패했습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      {getUserImgIsLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col items-center w-[450px] mx-auto gap-5 border p-3 rounded-md"
          onSubmit={onSubmit}
        >
          <h1 className="text-2xl extra-bold my-5">프로필 이미지 관리</h1>
          <Image
            src={
              userImg.preview || getUserImg?.data?.image || "/basic_profile.png"
            }
            width={100}
            height={100}
            className="bg-gray-50 object-cover rounded-full"
          />
          <div className="flex items-center gap-2 w-full">
            <input
              type="file"
              onChange={handleUpload}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="p-2 text-sm border rounded-md bg-gray-50 hover:bg-gray-300 cursor-pointer w-1/2 text-center bold"
            >
              이미지 선택
            </label>
            <Button
              radius="sm"
              className="w-1/2 text-center bold"
              onClick={handleDelete}
              isLoading={deleteUserImgIsPending}
            >
              기본 이미지로 변경
            </Button>
          </div>
          <Button
            color="primary"
            radius="sm"
            type="submit"
            className="w-full mt-5 bold"
            isLoading={postUserImgIsPending || editUserImgIsPending}
            isDisabled={disabledButton()}
          >
            {disabledButton() ? "변경사항이 없습니다" : "변경사항 저장"}
          </Button>
        </form>
      )}
    </div>
  );
}
