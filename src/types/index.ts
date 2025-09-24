import type { ComponentType } from "react";

export type {
  ISendOTP,
  IVerifyOtp,
  ILoginResponse,
  ILogin,
} from "@/types/auth.type";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface IDivision {
  _id?: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}
