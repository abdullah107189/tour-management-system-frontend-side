export type { ISendOTP, ILoginResponse, ILogin } from "@/types/auth.type";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
