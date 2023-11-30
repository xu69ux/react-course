import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../constants';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledFormData: {},
    hookFormData: {},
    countries: [...COUNTRIES],
    submissionTime: null,
  },
  reducers: {
    setUncontrolledFormData: (state, action) => {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData: (state, action) => {
      state.hookFormData = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSubmissionTime: (state, action) => {
      state.submissionTime = action.payload;
    },
  },
});

export const {
  setUncontrolledFormData,
  setHookFormData,
  setCountries,
  setSubmissionTime,
} = formSlice.actions;

export default formSlice.reducer;
