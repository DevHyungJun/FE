import { useState, useEffect, useRef } from "react";
import {
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
} from "@/constants/postRegister";
import { WARNING_FILE_SIZE_EXCEEDED } from "@/constants/postRegisterForm";

export function useImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onOversize?: (message: string) => void
  ) => {
    const files = e.target.files;
    if (!files) return;
    const validFiles: File[] = [];
    const oversizedFiles: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        oversizedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });
    if (oversizedFiles.length > 0 && onOversize) {
      onOversize(WARNING_FILE_SIZE_EXCEEDED(MAX_IMAGE_SIZE_MB, oversizedFiles));
    }
    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddImagesClick = () => fileInputRef.current?.click();

  return {
    images,
    setImages,
    previews,
    setPreviews,
    fileInputRef,
    handleImageChange,
    handleImageDelete,
    handleAddImagesClick,
  };
}
