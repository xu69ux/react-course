import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "../services/api";
import { reducer as searchReducer } from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    api: apiService.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
