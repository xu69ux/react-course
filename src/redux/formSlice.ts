import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledFormData: {},
    hookFormData: {},
  },
  reducers: {
    setUncontrolledFormData: (state, action) => {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData: (state, action) => {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
