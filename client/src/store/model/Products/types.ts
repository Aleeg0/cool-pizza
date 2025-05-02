import {GroupedProduct} from "@/store/types/Product";
import {DefaultState, Filters, UUID} from "@/store/types/shared";

export interface ProductsState extends DefaultState<GroupedProduct[]> {
  filters: Filters,
  sortBy: string;
  currentCategoryId?: UUID
}