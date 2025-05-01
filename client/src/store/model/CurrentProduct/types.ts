import {DefaultState, UUID} from "@/store/types/shared";
import {Product} from "@/store/types/Product";

export interface CurrentProductState extends DefaultState<Product|undefined> {
  currentProductId?: UUID;
}