import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "tour/create",
        method: "POST",
        data: tourData,
      }),
    }),
  }),
});

export const { useAddTourMutation } = tourApi;
