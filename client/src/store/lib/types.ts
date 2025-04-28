import {LoadingStatus} from "./enums";

export interface ItemsState<T> {
  items: T[];
  status: LoadingStatus;
  error: string | null;
}