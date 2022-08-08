import React from "react";

import Search from "../Search";
import Product from "../Product/index";

import styles from "./Catalog.module.scss";

import { useStateContext } from "../ContextProvider";

function Catalog() {
  const {
    items,
    searchValue,
    itemsCart,
    itemsFavorite,
    isLoading,
  } = useStateContext();


  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, ind) => (
      <Product
        key={ind}
        item={item}
        favorited={itemsFavorite.some(
          (obj) => obj.productId === item.productId
        )}
        loading={isLoading}
      />
    ));
  };

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.top}>
          <h1 className={styles.title}>
            {searchValue ? `Поиск: ${searchValue}` : "Все кроссовки"}
          </h1>
          <Search />
        </div>
        <div className={styles.container}>
          <div className={styles.body}>
            <ul className={styles.list}>{renderItems()}</ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalog;
