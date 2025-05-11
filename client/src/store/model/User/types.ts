import {DefaultState} from "@/store/model/Shared";

export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export type UserState = DefaultState<User | null>

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
}