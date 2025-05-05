import {GroupedProduct} from "@/store/types/Product";
import {Filters, UUID} from "@/store/types/shared";
import {DefaultState} from "@/store/model/Shared";

export interface ProductsState extends DefaultState<GroupedProduct[]> {
  filters: Filters,
  sortBy: string;
  currentCategoryId?: UUID
}