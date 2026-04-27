import { cleanupObject } from "../../../utils/commonHelpers";
import {  Verify } from "../userQueriesTypes";
import { userApi } from "./baseSetUp";


export const userEndpoints = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    verifyEmail: builder.query<Verify, unknown>({
      query: () => ({
        url: `/users/code/send?channel=email`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    resetPassword: builder.mutation<unknown, {newPassword: string}>({
      query: (data) => ({
        url: "/api/users/password/update?passwordUpdateType=password-reset",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/api/users/password/update?passwordUpdateType=password-change",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changeProfile: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: "/users/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    deleteProfile: builder.mutation<unknown, void>({
      query: () => ({
        url: "/api/users/profile/delete",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    selectedInterests: builder.mutation<unknown, {interests: string[]}>({
      query: (data) => ({
        url: "/api/users/interests",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    suggestTopics: builder.mutation<
      {data: {suggestions: string[]}},
      {interests: string[]}
    >({
      query: (data) => ({
        url: "/api/users/suggest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    suggestBasedOnInput: builder.mutation<
      {data: {suggestions: string[]}},
      {input: string}
    >({
      query: (data) => ({
        url: "/api/users/suggestBasedOnInput",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    fetchTemplates: builder.query<any, void>({
      query: () => ({
        url: "/api/users/templates",
        method: "GET",
      }),
    }),
    createTemplateProject: builder.mutation<any, {templateId: string}>({
      query: (data) => ({
        url: "/api/users/createVideoProjectFromTemplate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    fetchVideoDataById: builder.query<any, string>({
      query: (id) => ({
        url: `/api/users/videos/${id}`,
        method: "GET",
      }),
    }),
    updateVideoName: builder.mutation<any, {videoId: string; name: string}>({
      query: (data) => ({
        url: "/api/users/videos/updateVideoName",
        method: "PATCH",
        body: cleanupObject(data),
      }),
      invalidatesTags: ["User"],
    }),
    generateVideo: builder.mutation<any, {prompt: string; projectId: string}>({
      query: (data) => ({
        url: "/api/users/generateVideo",
        method: "POST",
        body: cleanupObject(data),
      }),
      invalidatesTags: ["User"],
    }),
    updateVideo: builder.mutation<any, {videoId: string; data: any}>({
      query: (data) => ({
        url: "/api/users/videos/updateVideo",
        method: "PATCH",
        body: cleanupObject(data),
      }),
      invalidatesTags: ["User"],
    }),
    updateAndGenerateVideoManually: builder.mutation<
      any,
      {videoId: string; data: any}
    >({
      query: (data) => ({
        url: "/api/users/videos/updateAndGenerateVideoManually",
        method: "PATCH",
        body: cleanupObject(data),
      }),
      invalidatesTags: ["User"],
    }),
    fetchAllVideoData: builder.query<any, void>({
      query: () => ({
        url: "/api/users/videos",
        method: "GET",
      }),
    }),
    deleteVideo: builder.mutation<any, any>({
      query: (videoIds) => ({
        url: "/api/users/videos/delete",
        method: "PATCH",
        body: {videoIds},
      }),
      invalidatesTags: ["User"],
    }),
      exportVideo: builder.mutation<any, any>({
        query: (data) => ({
          url: "/api/users/videos/export",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),
  }),
  overrideExisting: false,
});

export const {
  useVerifyEmailQuery,
  useResetPasswordMutation,
  useGetUserDataQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useChangeProfileMutation,
  useDeleteProfileMutation,
  useSelectedInterestsMutation,
  useSuggestTopicsMutation,
  useSuggestBasedOnInputMutation,
  useFetchTemplatesQuery,
  useCreateTemplateProjectMutation,
  useFetchVideoDataByIdQuery,
  useUpdateVideoNameMutation,
  useGenerateVideoMutation,
  useUpdateVideoMutation,
  useUpdateAndGenerateVideoManuallyMutation,
  useFetchAllVideoDataQuery,
  useDeleteVideoMutation,
    useExportVideoMutation
} = userEndpoints;
;