import styles from './styles.module.scss';
import Container from '../Container/Container';
import {ShortArrow} from "@/components/icons";
import {FC, useMemo, useState} from "react";
import {cn, timeParse} from "@/utils";
import {UUID} from "@/store/types/shared";
import {CartItem} from "@/store/model/Cart";

interface Props {
  id: UUID,
  totalAmount: number;
  pizzaCartLines: CartItem[],
  goodsCartLines: CartItem[],
  orderedAt: string,
  index: number;
}

const Widget: FC<Props> = ({
  totalAmount,
  orderedAt,
  pizzaCartLines,
  goodsCartLines,
  index
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const displayCartItems = useMemo(() => [
    ...goodsCartLines,
    ...pizzaCartLines
  ], [goodsCartLines, pizzaCartLines]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_leftPart}>
          <div className={styles.orderNumber}>
            Заказ #{index}
          </div>
          <div className={styles.orderTime}>
            {timeParse(orderedAt)}
          </div>
        </div>
        <div className={styles.header_rightPart}>
          <button
            onClick={() => setIsOpen(!isOpen)}
          >
            <ShortArrow
              className={cn(
                styles.transitionIcon,
                isOpen && styles.transitionIconDown
              )}
            />
          </button>
        </div>
      </div>
      {isOpen &&
        <>
          <div className={styles.orderItems}>
            <Container cartItems={displayCartItems}/>
          </div>
          <div className={styles.footer}>
            <div className={styles.price}>
              <p>Итого: <b>{totalAmount} руб.</b></p>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Widget;