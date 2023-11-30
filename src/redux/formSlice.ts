import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../constants';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledFormData: {},
    hookFormData: {},
    countries: [...COUNTRIES],
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
  },
});

export const { setUncontrolledFormData, setHookFormData, setCountries } =
  formSlice.actions;

export default formSlice.reducer;
