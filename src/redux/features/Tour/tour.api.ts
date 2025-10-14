import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOURS"],
    }),
    getAllTour: builder.query({
      query: () => ({
        url: "tour",
        method: "GET",
      }),
      providesTags: ["TOURS"],
      transformResponse: (res) => res.data,
    }),
    getSingleTour: builder.query({
      query: (slug) => ({
        url: `tour/${slug}`,
        method: "GET",
      }),
      providesTags: ["TOURS"],
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useAddTourMutation, useGetAllTourQuery, useGetSingleTourQuery } =
  tourApi;
