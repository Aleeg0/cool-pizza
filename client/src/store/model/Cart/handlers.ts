import {UUID} from "@/store/types/shared";

// для добавления элементов в корзину
export const upsertItem = <T extends { id: UUID }>(array: T[], newItem: T) => {
  const index = array.findIndex(item => item.id === newItem.id);
  if (index !== -1) {
    array[index] = newItem;
  } else {
    array.push(newItem);
  }
};

// для обновления количества элеметнов корзины
export const updateQuantity = <T extends { id: UUID; quantity: number }>(
  array: T[],
  itemId: UUID,
  newQuantity: number
) => {
  const item = array.find(i => i.id === itemId);
  if (item) item.quantity = newQuantity;
};

export const deleteItem = <T extends { id: UUID}>(array: T[], itemId: UUID) => {
  const index = array.findIndex(item => item.id === itemId);

  if (index !== -1) {
    array.splice(index, 1);
  }
}