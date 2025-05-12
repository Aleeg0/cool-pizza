import styles from "./styles.module.scss";
import Card from "../Card/Card";
import {FC} from "react";
import {CartItem} from "@/store/model/Cart";

interface Props {
  cartItems: CartItem[];
}

const Container: FC<Props> = ({cartItems}) => {
  return (
    <div className={styles.content}>
      <ul className={styles.orderItems}>
        {cartItems.map((item) =>
          <li
            className={styles.orderItem}
            key={item.id}
          >
            <Card
              currency={'руб.'}
              {...item}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Container;