import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as NavBack } from "../../media/svg/nav-back.svg";

import Search from "../Search";
import Product from "../Product/index";

import styles from "./Favorites.module.scss";

import { useStateContext } from "../ContextProvider";

function Favorites() {
  const { searchValue, itemsFavorite, setItemsFavorite, itemsCart } =
    useStateContext();

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.top}>
          <Link to="/">
            <div className={styles.backBnt}>
              <NavBack />
            </div>
          </Link>
          <h1 className={styles.title}>Избранное</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.body}>
            <ul className={styles.list}>
              {itemsFavorite
                .filter((item) =>
                  item.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item, ind) => (
                  <Product
                    key={ind}
                    item={item}
                    favorited={true}
                    added={itemsCart.some(
                      (obj) => obj.productId === item.productId
                    )}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
