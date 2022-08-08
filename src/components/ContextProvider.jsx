import axios from "axios";
import React from "react";

const StateContext = React.createContext();

export default function ContextProvider({ children }) {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [itemsCart, setItemsCart] = React.useState([]);
  const [itemsFavorite, setItemsFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      async function fetchItems() {
        setIsLoading(true);

        const cartResp = await axios.get("https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart");
        const favoritesResp = await axios.get("https://62de29f6ccdf9f7ec2d215df.mockapi.io/favorites");
        const itemsResp = await axios.get("https://62de29f6ccdf9f7ec2d215df.mockapi.io/items");

        setIsLoading(false);

        setItemsCart(cartResp.data);
        setItemsFavorite(favoritesResp.data);
        setItems(itemsResp.data);
      }
      fetchItems();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const isItemAdded = (item) =>
    itemsCart.some((obj) => obj.productId === item.productId);

  return (
    <StateContext.Provider
      value={{
        cartOpened,
        setCartOpened,
        items,
        setItems,
        itemsCart,
        setItemsCart,
        searchValue,
        setSearchValue,
        itemsFavorite,
        setItemsFavorite,
        isLoading,
        setIsLoading,
        isItemAdded,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => React.useContext(StateContext);
