import React from "react";

import { ReactComponent as OrderArrowIco } from "../../media/svg/orderIco.svg";

import styles from "./Info.module.scss";

import { useStateContext } from "../ContextProvider";

function Info({ title, description, image }) {
  const { setCartOpened } = useStateContext();
  return (
    <>
      <div className={styles.info}>
        <img src={image} alt="image" />
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>

        <div className={styles.actions}>
          <button className={styles.btnBack}>
            <div className={styles.ico}>
              <OrderArrowIco />
            </div>
            <div className={styles.txt} onClick={() => setCartOpened(false)}>
              Вернутся к покупкам
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Info;
