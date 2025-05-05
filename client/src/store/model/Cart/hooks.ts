import {useAppDispatch} from "@/store/lib/hooks";
import {
  getCartTotalAmount,
  removeCartGoods,
  removeCartPizza,
  updateCartGoods,
  updateCartPizza
} from "@/store/model/Cart/thunk";
import {UUID} from "@/store/types/shared";


export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const updatePizzaQuantity = (id: UUID, quantity: number) => {
    if (quantity > 0)
      dispatch(updateCartPizza({id: id, quantity: quantity}));
    else
      dispatch(removeCartPizza(id))
  }

  const updateGoodsQuantity = (id: UUID, quantity: number) => {
    if (quantity > 0)
      dispatch(updateCartGoods({id: id, quantity: quantity}));
    else
      dispatch(removeCartGoods(id));
  }

  const updateTotalAmount = () =>
    dispatch(getCartTotalAmount());

  return { updatePizzaQuantity, updateGoodsQuantity, updateTotalAmount };
};