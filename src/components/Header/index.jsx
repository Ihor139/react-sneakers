import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as FavoriteIco } from "../../media/svg/favorite-ico.svg";
import { ReactComponent as BasketIco } from "../../media/svg/basket-ico.svg";
import { ReactComponent as UserIco } from "../../media/svg/user-ico.svg";

import styles from "./Header.module.scss";

import { useStateContext } from "../ContextProvider";
import { useCart } from "../../hooks/useCart";

function Header() {
  const { setCartOpened } = useStateContext();
  // custom hook
  const { totalSum } = useCart();

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.link}>
          <div className={styles.logo}>
            <img src="./img/logo.png" alt="logo" />
            <p>
              <span>React Sneakers</span>
              <span>Buy the best running shoes</span>
            </p>
          </div>
        </Link>
        <div className={styles.action}>
          <ul className={styles.list}>
            <li className={styles.case} onClick={() => setCartOpened(true)}>
              <span className={styles.ico}>
                <BasketIco />
              </span>
              <span className={styles.txt}>{totalSum} USD</span>
            </li>
            <li className={styles.case}>
              <Link to="/favorites" className={styles.ico}>
                <FavoriteIco />
              </Link>
            </li>
            <li className={styles.case}>
              <Link to="/orders" className={styles.ico}>
                <UserIco />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
