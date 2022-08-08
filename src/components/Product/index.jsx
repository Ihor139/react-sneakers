import React from "react";
import axios from "axios";

import { ReactComponent as ProductBuyBtn } from "../../media/svg/product-buy-ico.svg";
import { ReactComponent as ProductBuyBtnActive } from "../../media/svg/bi_check-lg.svg";
import { ReactComponent as ProductFavorite } from "../../media/svg/favorite-ico.svg";
import { ReactComponent as ProductFavoriteActive } from "../../media/svg/favorite-ico-active.svg";

import ContentLoader from "react-content-loader";

import styles from "./Product.module.scss";

import { useStateContext } from "../ContextProvider";

function Product({
  item,
  favorited = false,
  added = false,
  loading = false,
  isOrdered = false,
}) {
  const {
    itemsCart,
    setItemsCart,
    itemsFavorite,
    setItemsFavorite,
    isItemAdded,
  } = useStateContext();

  const [isFavorite, setIsFavorite] = React.useState(favorited);
  // const [isAdded, setIsAdded] = React.useState(added);

  const onAdd = async () => {
    try {
      if (
        itemsCart.find(
          (obj) => Number(obj.productId) === Number(item.productId)
        )
      ) {
        setItemsCart((prev) =>
          prev.filter(
            (prod) => Number(prod.productId) !== Number(item.productId)
          )
        );

        let { data } = await axios.get(
          "https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart"
        );

        data.find((obj) => {
          if (Number(obj.productId) === Number(item.productId)) {
            axios.delete(
              `https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart/${Number(
                obj.id
              )}`
            );
          }
        });

        // setIsAdded(false);
        return;
      }

      // setIsAdded(true);

      const { data } = await axios.post(
        "https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart",
        item
      );
      setItemsCart((prev) => [...prev, data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFavorite = async () => {
    try {
      if (
        itemsFavorite.find(
          (obj) => Number(obj.productId) === Number(item.productId)
        )
      ) {
        let { data } = await axios.get(
          "https://62de29f6ccdf9f7ec2d215df.mockapi.io/favorites"
        );

        data.find((obj) => {
          if (Number(obj.productId) === Number(item.productId)) {
            axios.delete(
              `https://62de29f6ccdf9f7ec2d215df.mockapi.io/favorites/${Number(
                obj.id
              )}`
            );
            setIsFavorite(false);
          }
        });

        setItemsFavorite((prev) =>
          prev.filter(
            (prod) => Number(prod.productId) !== Number(item.productId)
          )
        );

        return;
      }

      setIsFavorite(true);

      const { data } = await axios.post(
        "https://62de29f6ccdf9f7ec2d215df.mockapi.io/favorites",
        item
      );
      setItemsFavorite((prev) => [...prev, data]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <li className={styles.case}>
      <div className={styles.product}>
        <div className={styles.inner}>
          {loading ? (
            <ContentLoader
              speed={2}
              width={210}
              height={209}
              viewBox="0 0 210 197"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="119" y="56" rx="0" ry="0" width="2" height="1" />
              <rect x="0" y="1" rx="10" ry="10" width="155" height="90" />
              <rect x="0" y="106" rx="3" ry="3" width="155" height="15" />
              <rect x="124" y="165" rx="8" ry="8" width="32" height="32" />
              <rect x="0" y="136" rx="4" ry="4" width="90" height="15" />
              <rect x="0" y="171" rx="8" ry="8" width="97" height="24" />
            </ContentLoader>
          ) : (
            <>
              {isOrdered ? (
                ""
              ) : (
                <div className={styles.favorite} onClick={onFavorite}>
                  {!isFavorite ? (
                    <ProductFavorite />
                  ) : (
                    <ProductFavoriteActive />
                  )}
                </div>
              )}
              <div className={styles.img}>
                <img
                  src={item.imageUrl}
                  alt="sneakers"
                  className={`${styles.lazy_img} ${styles.lazyload}`}
                />
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <div className={styles.bottom}>
                <div className={styles.price}>
                  <p>Цена:</p>
                  <b>{item.price} USD</b>
                </div>
                {isOrdered ? (
                  ""
                ) : (
                  <div
                    className={
                      isItemAdded(item) ? `${styles.btn__green}` : styles.btn
                    }
                    onClick={onAdd}
                  >
                    {!isItemAdded(item) ? (
                      <ProductBuyBtn />
                    ) : (
                      <ProductBuyBtnActive />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
