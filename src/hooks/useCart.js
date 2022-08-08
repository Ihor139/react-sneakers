import { useStateContext } from "../components/ContextProvider";

export const useCart = () => {
  const { itemsCart, setItemsCart } = useStateContext();
  const totalSum = itemsCart.reduce((sum, obj) => obj.price + sum, 0);

  return { itemsCart, setItemsCart, totalSum };
};
