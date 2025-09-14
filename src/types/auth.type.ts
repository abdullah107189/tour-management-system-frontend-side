// send otp
export interface ISendOTP {
  email: string;
}

// verify otp
export interface IVerifyOtp {
  email: string;
  otp: string;
}

// login
export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginResponse {
  statusCodes: number;
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  provider: string;
  providerId: string;
  _id: string;
}
