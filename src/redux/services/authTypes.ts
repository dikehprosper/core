export interface LoginPayload  {
  email: string;
  password: string
}

export interface LoginResponse {
  accessToken: string;
  data: any
}

export interface SignupResponse {
  accessToken: string;
}

export interface ForgotPasswordResponse {
  timeLeft: number;
}

export interface ForgotPasswordVerifyOTPResponse {
  accessToken: string;
}

export interface LoginWithGoogleResponse {
  accessToken: string;
}

export interface LoginWithGooglePayload {
  email: string;
  emailVerified: boolean;
  firstName: string;
  picture: string;
  googleId: any;
}

export interface ForgotPasswordPayload {
  code: string;
  email: string;
}