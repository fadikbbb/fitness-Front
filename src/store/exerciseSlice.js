// store/exerciseSlice.js
import { createSlice } from "@reduxjs/toolkit";
const exerciseSlice = createSlice({
    name: "exercises",
    initialState: {
        exercises: [],
    },
    reducers: {
        setExercises: (state, action) => {
            state.exercises = action.payload;
        },
        addExercise: (state, action) => {
            state.exercises.push(action.payload);
        },
        updateExercise: (state, action) => {
            const index = state.exercises.findIndex(ex => ex._id === action.payload._id);
            if (index !== -1) {
                state.exercises[index] = action.payload;
            }
        },
        removeExercise: (state, action) => {
            state.exercises = state.exercises.filter(ex => ex._id !== action.payload);
        }
    },
});

export const { setExercises, addExercise, updateExercise, removeExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
