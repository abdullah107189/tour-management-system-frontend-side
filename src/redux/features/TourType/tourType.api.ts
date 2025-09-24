import { baseApi } from "@/redux/baseApi";

export const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (typeName) => ({
        url: "tour/create-tour-type",
        method: "POST",
        data: typeName,
      }),
    }),
  }),
});
export const { useAddTourTypeMutation } = tourTypeApi;
