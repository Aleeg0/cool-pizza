import {LoadingStatus} from "@/store/types/shared";

export interface DefaultState<T> {
  data: T;
  status: LoadingStatus;
  error?: string;
}