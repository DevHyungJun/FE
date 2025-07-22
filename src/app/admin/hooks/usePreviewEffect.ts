import { useEffect } from "react";

const usePreviewEffect = (
  images: File[],
  setPreviews: (urls: string[]) => void
) => {
  useEffect(() => {
    // 이미지 미리보기 URL 생성
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // 컴포넌트 언마운트 시 URL 해제
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);
};

export default usePreviewEffect;
