import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPhilosophersResponse, IPhilosopher } from "../types/types";

export const api = createApi({
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
  useGetAllPhilosophersQuery: getAllPhilosophersQuery = api.endpoints
    .getAllPhilosophers.initiate,
  useGetPhilosopherByNameQuery: getPhilosopherByNameQuery = api.endpoints
    .getPhilosopherByName.initiate,
  useGetPhilosopherByIdQuery: getPhilosopherByIdQuery = api.endpoints
    .getPhilosopherById.initiate,
} = api;
