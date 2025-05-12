import {FC, memo} from 'react';
import BlockContainer from "../BlockContainer/BlockContainer";
import {CartItem} from "@/store/model/Cart";
import {OrderContainer} from "@/components/entities/Order";

interface Props {
  cartItems: CartItem[];
}

const CartBlock: FC<Props> = ({cartItems}) => {
  return (
    <BlockContainer title="1. Корзина">
      <OrderContainer cartItems={cartItems}/>
    </BlockContainer>
  );
};

export default memo(CartBlock);