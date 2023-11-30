import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types';
import { COUNTRIES } from '../constants';

type FormState = {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  countries: string[];
  lastUpdatedForm: string | null;
};

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledFormData: {},
    hookFormData: {},
    countries: [...COUNTRIES],
    lastUpdatedForm: null,
  } as FormState,
  reducers: {
    setUncontrolledFormData: (
      state,
      action: PayloadAction<{ data: FormData; formName: string }>
    ) => {
      state.uncontrolledFormData = action.payload.data;
      state.lastUpdatedForm = action.payload.formName;
    },
    setHookFormData: (
      state,
      action: PayloadAction<{ data: FormData; formName: string }>
    ) => {
      state.hookFormData = action.payload.data;
      state.lastUpdatedForm = action.payload.formName;
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData, setCountries } =
  formSlice.actions;

export default formSlice.reducer;
