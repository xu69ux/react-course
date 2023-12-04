import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types';
import { COUNTRIES } from '../constants';

type FormState = {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  countries: string[];
  lastUpdatedForm: string | null;
  submitTime?: string;
  history: FormData[];
};

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledFormData: {
      name: '',
      age: null,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      terms: false,
      picture: null,
      submitTime: '',
    },
    hookFormData: {
      name: '',
      age: null,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      terms: false,
      picture: null,
      submitTime: '',
    },
    countries: [...COUNTRIES],
    lastUpdatedForm: null,
    history: [],
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
    setToHistory: (state, action: PayloadAction<FormData>) => {
      state.history.push(action.payload);
    },
  },
});

export const {
  setUncontrolledFormData,
  setHookFormData,
  setCountries,
  setToHistory,
} = formSlice.actions;

export default formSlice.reducer;
