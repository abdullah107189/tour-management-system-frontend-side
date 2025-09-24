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
  }),
});
