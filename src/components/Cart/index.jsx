import React from "react";
import axios from "axios";

import { ReactComponent as ProductBuyBtn } from "../../media/svg/product-buy-ico.svg";
import { ReactComponent as OrderArrowIco } from "../../media/svg/orderIco.svg";

import styles from "./Cart.module.scss";

import { useStateContext } from "../ContextProvider";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart() {
  const { cartOpened, setCartOpened } = useStateContext();

  // custom hook
  const { totalSum, itemsCart, setItemsCart } = useCart();

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://62de29f6ccdf9f7ec2d215df.mockapi.io/orders`,
        { items: itemsCart }
      );

      for (let i = 0; i < itemsCart.length; i++) {
        const item = itemsCart[i];
        await axios.delete(
          `https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart/${item.id}`
        );
        // await delay(200);
      }

      setItemsCart([]);

      setOrderId(data.id);
      setIsOrderComplete(true);
    } catch (error) {
      console.log(error.message);
      alert("Не удалось оформить заказ");
    }
    setIsLoading(false);
  };

  const onRemoveItem = (id) => {
    setItemsCart((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
    axios.delete(`https://62de29f6ccdf9f7ec2d215df.mockapi.io/cart/${id}`);
  };

  // if (!cartOpened) return null;

  return (
    <>
      <div className={`${styles.overlay} ${cartOpened && styles.visible }`}>
        <div className={styles.drawer}>
          <div className={styles.top}>
            <div className={styles.title}>Корзина</div>
            <div className={styles.btn} onClick={() => setCartOpened(false)}>
              <ProductBuyBtn />
            </div>
          </div>
          {itemsCart.length > 0 ? (
            <>
              <div className={styles.items}>
                {itemsCart?.map((item, ind) => (
                  <div key={ind} className={styles.item}>
                    <div
                      className={styles.img}
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    ></div>
                    <div className={styles.price}>
                      <p>{item.title}</p>
                      <b>{item.price}USD</b>
                    </div>
                    <div
                      className={styles.remove}
                      onClick={() => onRemoveItem(Number(item.id))}
                    >
                      <ProductBuyBtn />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.actions}>
                <ul className={styles.total}>
                  <li>
                    <span>Итого: </span>
                    <div></div>
                    <span>
                      <b>{totalSum} USD </b>
                    </span>
                  </li>
                  <li>
                    <span>ПДВ: 5% </span>
                    <div></div>
                    <span>
                      <b>{((totalSum / 100) * 5).toFixed(2)} USD </b>
                    </span>
                  </li>
                </ul>
                <button disabled={isLoading} className={styles.order}>
                  <div className={styles.txt} onClick={onClickOrder}>
                    Оформить заказ
                  </div>
                  <div className={styles.ico}>
                    <OrderArrowIco />
                  </div>
                </button>
              </div>
            </>
          ) : !isOrderComplete ? (
            <Info
              title="Ваша корзина пуста"
              description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              image="./img/box-empty.png"
            />
          ) : (
            <Info
              title="Заказ оформлен!"
              description={`Ваш заказ ${orderId} скоро будет передан курьерской доставке`}
              image="./img/order-sucsses.svg"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
