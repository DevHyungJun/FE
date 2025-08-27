import getCartHeaderButton from "../utills/getCartHeaderButton";

interface CartHeaderProps {
  cartOrFavorite: string;
  setCartOrFavorite: (value: "cart" | "favorite") => void;
}

const CartHeader = ({ cartOrFavorite, setCartOrFavorite }: CartHeaderProps) => {
  return (
    <div className="flex w-full">
      <button
        className={getCartHeaderButton("cart", cartOrFavorite)}
        onClick={() => setCartOrFavorite("cart")}
      >
        장바구니
      </button>
      <button
        className={getCartHeaderButton("favorite", cartOrFavorite)}
        onClick={() => setCartOrFavorite("favorite")}
      >
        좋아요한 상품
      </button>
    </div>
  );
};

export default CartHeader;
