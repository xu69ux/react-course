import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchResponse } from "../../types/types";

interface SearchState {
  searchTerm: string;
  searchResponse?: ISearchResponse;
  pageSize: number;
  loadingResults: boolean;
  loadingDetails: boolean;
  currentPage: number;
  isSideBarOpen: boolean;
  viewMode: string;
}

const initialState: SearchState = {
  searchTerm: "",
  pageSize: 10,
  loadingResults: false,
  loadingDetails: false,
  currentPage: 1,
  isSideBarOpen: false,
  viewMode: "100%",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchResponse: (state, action: PayloadAction<ISearchResponse>) => {
      state.searchResponse = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setLoadingResults: (state, action: PayloadAction<boolean>) => {
      state.loadingResults = action.payload;
    },
    setLoadingDetails: (state, action: PayloadAction<boolean>) => {
      state.loadingDetails = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
    setViewMode: (state, action: PayloadAction<string>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { actions, reducer } = searchSlice;
