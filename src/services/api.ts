import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPhilosophersResponse, IPhilosopher } from "../types/types";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://belka.romakhin.ru/api/v1/filosofem",
  }),
  endpoints: (builder) => ({
    getAllPhilosophers: builder.query<
      IPhilosophersResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => `?page=${page - 1}&page_size=${pageSize}`,
    }),
    getPhilosopherByName: builder.query<
      IPhilosophersResponse,
      { searchTerm: string; page: number; pageSize: number }
    >({
      query: ({ searchTerm, page, pageSize }) =>
        `?page=${
          page - 1
        }&page_size=${pageSize}&search.name=${searchTerm.trim()}`,
    }),
    getPhilosopherById: builder.query<IPhilosopher, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useGetAllPhilosophersQuery = apiService.endpoints.getAllPhilosophers.initiate,
  useGetPhilosopherByNameQuery = apiService.endpoints.getPhilosopherByName
    .initiate,
  useGetPhilosopherByIdQuery = apiService.endpoints.getPhilosopherById.initiate,
} = apiService;
