import { createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    foodCategories: [
      "Fruit",
      "Meat",
      "Nuts",
      "Fish",
      "Grain",
      "Dairy",
      "Snack",
      "Vegetable",
    ],
  },
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    addFood: (state, action) => {
      state.foods.push(action.payload);
    },
    removeFood: (state, action) => {
      state.foods = state.foods.filter((food) => food.id !== action.payload.id);
    },
    editFood: (state, action) => {
      const index = state.foods.findIndex(food => food.id === action.payload.id);
      if (index !== -1) {
        state.foods[index] = { ...state.foods[index], ...action.payload };
      }
    },
  },
});

export const { addFood, removeFood, editFood } = foodSlice.actions;

export default foodSlice.reducer;
