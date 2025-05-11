import {UserState} from "./types";
import {LoadingStatus} from "@/store/types/shared";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {handleFulfilled, handlePending, handleRejected} from "@/store/model/Shared";
import {checkAuth, login, logout, register} from "./thunk";
import {isPending, isRejected} from "@reduxjs/toolkit";


const initialState: UserState = {
  data: null,
  status: LoadingStatus.IDLE,
  error: undefined
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        handleFulfilled(state, () => {
          state.data = null;
        })
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = LoadingStatus.IDLE;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, checkAuth.fulfilled),
        (state, action) => {
          handleFulfilled(state, () => {
            state.data = action.payload;
          });
        }
      )
      .addMatcher(isPending(register, login, logout, checkAuth), handlePending)
      .addMatcher(isRejected(register, login, logout), handleRejected);
  }
});

export default UserSlice.reducer;