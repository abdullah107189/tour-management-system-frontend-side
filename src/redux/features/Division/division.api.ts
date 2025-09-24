import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionInfo) => ({
        url: "division/create",
        method: "POST",
        data: divisionInfo,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getAllDivision: builder.query({
      query: () => ({
        url: "division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (res) => res.data,
    }),
  }),
});
export const { useAddDivisionMutation, useGetAllDivisionQuery } = divisionApi;
