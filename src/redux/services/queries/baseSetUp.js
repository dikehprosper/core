import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetAccessToken } from "../auth";
const baseUrl = import.meta.env.VITE_API_URL;

const baseQueryWithInterceptor = (baseOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      let token = localStorage.getItem("Tkn");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    ...baseOptions,
  });

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      try {
        const token = localStorage.getItem("Tkn");
        const newToken = await resetAccessToken(token);

        if (newToken) {
          // Retry the original request with new token
          const retryArgs = typeof args === 'string'
            ? { url: args, headers: { Authorization: `Bearer ${newToken}` } }
            : { ...args, headers: { ...args.headers, Authorization: `Bearer ${newToken}` } };

          // Retry request with new token
          result = await baseQuery(retryArgs, api, extraOptions);
        }
      } catch (error) {
        localStorage.removeItem("Tkn");
        const { clearClientData } = await import("../../features/client");
        api.dispatch(clearClientData());


        window.location.href = `${window.location.origin}/auth`;
      }
    }

    return result;
  };
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithInterceptor(),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
