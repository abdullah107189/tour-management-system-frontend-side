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
    removeTourType: builder.mutation({
      query: (typeId) => ({
        url: `tour/tour-types/${typeId}`,
        method: "DELETE",
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
    getSingleTourType: builder.query({
      query: (id) => ({
        url: `tour/tour-types/${id}`,
        method: "GET",
      }),
      providesTags: ["TOUR-TYPE"],
      transformResponse: (res) => res.data,
    }),
  }),
});
export const {
  useAddTourTypeMutation,
  useGetAllTourTypeQuery,
  useRemoveTourTypeMutation,
  useGetSingleTourTypeQuery,
} = tourTypeApi;
