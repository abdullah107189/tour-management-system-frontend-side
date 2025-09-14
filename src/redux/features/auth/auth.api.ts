import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILoginResponse, IResponse, ISendOTP } from "@/types";

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

    sendOtp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userEmail) => ({
        url: "otp/send",
        data: userEmail,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } =
  authApi;
