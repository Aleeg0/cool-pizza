import {createAsyncThunk} from "@reduxjs/toolkit";
import authApi from "@/store/apis/AuthApi";
import {LoginRequest, RegisterRequest, User} from "@/store/model/User";


export const register = createAsyncThunk<
  User,
  RegisterRequest,
  {
    rejectValue: string;
  }
>(
  "/user/register",
  async (data: RegisterRequest, {rejectWithValue}) => {
    try {
      const response = await authApi.register(data);
      localStorage.setItem("token", response.accessToken);
      return response.user;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const checkAuth = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>(
  "/user/checkAuth",
  async (_, {rejectWithValue}) => {
    try {
      const response = await authApi.refresh();
      localStorage.setItem("token", response.accessToken);
      return response.user;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const login = createAsyncThunk<
  User,
  LoginRequest,
  {
    rejectValue: string;
  }
>(
  "/user/login",
  async (data: LoginRequest, {rejectWithValue}) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem("token", response.accessToken);
      return response.user;
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>(
  "/user/logout",
  async (_, {rejectWithValue}) => {
    try {
      await authApi.logout();
      localStorage.removeItem("token");
    }
    catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);