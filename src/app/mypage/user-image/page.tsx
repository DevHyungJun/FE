"use client";

import useGuestOut from "@/hooks/useGuestOut";
import useUserImageManager from "./hooks/useUserImageManager";
import { Image, Button } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function UserImagePage() {
  useGuestOut();

  const {
    isUserInfoLoading,
    isSubmitting,
    isDeleting,
    isSubmitDisabled,
    isDeleteDisabled,
    currentImagePreview,
    handleUpload,
    handleDelete,
    handleSubmit,
  } = useUserImageManager();

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      {isUserInfoLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col items-center w-[450px] mx-auto gap-5 border p-3 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl extra-bold my-5">프로필 이미지 관리</h1>
          <Image
            src={currentImagePreview}
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
              accept="image/*"
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
              isLoading={isDeleting}
              isDisabled={isDeleteDisabled}
            >
              {isDeleteDisabled ? "현재 기본 이미지" : "기본 이미지로 변경"}
            </Button>
          </div>
          <Button
            color="primary"
            radius="sm"
            type="submit"
            className="w-full mt-5 bold"
            isLoading={isSubmitting}
            isDisabled={isSubmitDisabled}
          >
            {isSubmitDisabled ? "변경사항이 없습니다" : "변경사항 저장"}
          </Button>
        </form>
      )}
    </div>
  );
}
