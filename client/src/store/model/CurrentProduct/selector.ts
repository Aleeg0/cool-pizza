import {RootState} from "@/store/rootReducer";

export const selectCurrentProduct = (state: RootState) => state.currentProduct.data;