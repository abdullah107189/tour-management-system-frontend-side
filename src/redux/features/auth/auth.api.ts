import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginResponse,
  IResponse,
  ISendOTP,
  IVerifyOtp,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation<ILoginResponse, ILogin>({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    sendOtp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userEmail) => ({
        url: "otp/send",
        data: userEmail,
        method: "POST",
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
