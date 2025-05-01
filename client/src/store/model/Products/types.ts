import {GroupedProduct} from "@/store/types/Product";
import {DefaultState, Filters} from "@/store/types/shared";

export interface ProductsState extends DefaultState<GroupedProduct[]> {
  filters: Filters,
  sortBy: string;
}