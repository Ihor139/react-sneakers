import React from "react";

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <img src="./img/logo.png" alt="logo" />
          <p>
            <span>React Sneakers</span>
            <span>Buy the best running shoes</span>
          </p>
        </div>
        <div className={styles.contact}>
          <p className={styles.contact__row}>
            <span>Email:</span>
            <a href="mailto:best-sneakers@gmail.com">best-sneakers@gmail.com</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
