import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/axiosConfig";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
    // Using userId passed in as an argument
    const response = await apiClient.get(`${BASE_URL}/users/${userId}`);
    return response.data.user;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserError: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setUser, removeUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
