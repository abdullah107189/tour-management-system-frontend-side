import { baseApi } from "@/redux/baseApi";

export const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (typeName) => ({
        url: "tour/create-tour-type",
        method: "POST",
        data: typeName,
      }),
      invalidatesTags: ["TOUR-TYPE"],
    }),
    getAllTourType: builder.query({
      query: () => ({
        url: "tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR-TYPE"],
      transformResponse: (res) => res.data,
    }),
  }),
});
export const { useAddTourTypeMutation, useGetAllTourTypeQuery } = tourTypeApi;
