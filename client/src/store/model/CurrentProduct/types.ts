import {UUID} from "@/store/types/shared";
import {Product} from "@/store/types/Product";
import {DefaultState} from "@/store/model/Shared";

export interface CurrentProductState extends DefaultState<Product|undefined> {
  currentProductId?: UUID;
}