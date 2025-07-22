export interface PostRegisterFormState {
  selectedProduct: string;
  selectedCategory: string;
  images: File[];
  previews: string[];
  categoryShow: boolean;
  categoryName: string;
}

export interface PostRegisterFormHandlers {
  handleSubmit: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  handleAddImagesClick: () => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePostCategory: () => void;
}
