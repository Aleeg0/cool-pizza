import {LoadingStatus} from "@/store/types/shared";
import {PayloadAction} from "@reduxjs/toolkit";
import {DefaultState} from "@/store/model/Shared/types";

export const handlePending = (state: DefaultState<unknown>) => {
  if (state.status === LoadingStatus.IDLE || state.status === LoadingStatus.SUCCEEDED) {
    state.status = LoadingStatus.PENDING;
  }
};

export const handleFulfilled = (state: DefaultState<unknown>, callback: () => void) => {
  if (state.status === LoadingStatus.PENDING) {
    state.status = LoadingStatus.SUCCEEDED;
    callback();
  }
};

export const handleRejected = (state: DefaultState<unknown>, action: PayloadAction<unknown>) => {
  if (state.status === LoadingStatus.PENDING) {
    state.status = LoadingStatus.FAILED;
    state.error = action.payload as string;
  }
};