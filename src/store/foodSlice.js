import { createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foods: [],
  },
  reducers: {
    addFood: (state, action) => {
      state.foods.push(action.payload);
    },
  },
});

export const { addFood } = foodSlice.actions;

export default foodSlice.reducer;
