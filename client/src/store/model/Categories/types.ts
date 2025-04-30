import {LoadingStatus} from "@/store/lib/enums";
import {Category} from "@/store/types/category";



export interface CategoryState {
  items: Category[];
  status: LoadingStatus;
  error: string | null;
}
