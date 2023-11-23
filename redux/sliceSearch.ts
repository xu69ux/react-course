// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  page: number;
  limit: number;
  searchValue: string;
  results?: any[];
}

const initialState: SearchState = {
  page: 1,
  limit: 10,
  searchValue: '',
  results: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setPage, setLimit, setSearchValue, setResults } = searchSlice.actions;

export const selectPage = (state: { search: SearchState }) => state.search.page;
export const selectLimit = (state: { search: SearchState }) => state.search.limit;
export const selectSearchValue = (state: { search: SearchState }) => state.search.searchValue;
export const selectResults = (state: { search: SearchState }) => state.search.results;

export default searchSlice.reducer;