import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { axiosAuth } from "../../Config/axios";
// TypeScript types removed for JS conversion
const baseUrl = process.env.REACT_APP_API_URL;

export const resetAccessToken = async (accessToken) => {
    const data = await axiosAuth().post(`/token/verify`, {accessToken})
    const newToken = data?.data?.accessToken;
    localStorage.setItem('Tkn', newToken);

    return newToken
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      let token = localStorage.getItem("Tkn");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "api/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginWithGoogle: builder.mutation({
      query: (data) => ({
        url: "/api/auth/google/callback",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordAddEmail: builder.mutation({
      query: (data) => ({
        url: "/api/auth/password/generate/code",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/auth/password/generate/token",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordResendOtp: builder.mutation({
      query: (data) => ({
        url: "/api/auth/password/generate/code",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useSignupMutation,
  useForgotPasswordAddEmailMutation,
  useForgotPasswordVerifyOtpMutation,
  useForgotPasswordResendOtpMutation,
} = authApi;