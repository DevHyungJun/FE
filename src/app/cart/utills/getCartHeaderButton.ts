const getCartHeaderButton = (
  buttonType: "cart" | "favorite",
  cartOrFavorite: string
) => {
  const baseStyle =
    "w-1/2 flex justify-center items-center gap-1 text-medium md:text-xl extra-bold text-gray-900 border-b-2 p-2 hover:opacity-100";
  const activeStyle = "border-gray-900";
  const inactiveStyle = "opacity-30 border-gray-300";

  return `${baseStyle} ${
    cartOrFavorite === buttonType ? activeStyle : inactiveStyle
  }`;
};

export default getCartHeaderButton;
