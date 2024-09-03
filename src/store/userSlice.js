// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    userProfile: null,
    userSettings: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },

        setUserProfile(state, action) {
            state.userProfile = action.payload;
        },

        setUserSettings(state, action) {
            state.userSettings = action.payload;
        },

        clearUserState(state) {
            state.userId = null;
            state.userProfile = null;
            state.userSettings = null;
        },
    },
});

export const { setUserId, setUserProfile, setUserSettings, clearUserState } = userSlice.actions;
export default userSlice.reducer;
