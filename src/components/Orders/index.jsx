import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as NavBack } from "../../media/svg/nav-back.svg";

import styles from "./Orders.module.scss";
import { useStateContext } from "../ContextProvider";
import Product from "../Product";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { isLoading } = useStateContext();

  React.useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          "https://62de29f6ccdf9f7ec2d215df.mockapi.io/orders"
        );

        // console.log(data.map((obj) => obj.items).flat());
        // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));

        setOrders(data.map((obj) => obj.items).flat());
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.top}>
          <Link to="/">
            <div className={styles.backBnt}>
              <NavBack />
            </div>
          </Link>
          <h1 className={styles.title}>Мои заказы</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.body}>
            <ul className={styles.list}>
              {(isLoading ? [...Array(8)] : orders).map((item, ind) => (
                <Product key={ind} item={item} loading={isLoading} isOrdered />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
