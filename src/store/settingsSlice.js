// src/settingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Create async thunk to fetch individual settings
export const fetchHeroSettings = createAsyncThunk('settings/fetchHero', async () => {
    const response = await axios.get(`${BASE_URL}/settings/hero`);
    return response.data.hero;
});

export const fetchSocialMediaSettings = createAsyncThunk('settings/fetchSocialMedia', async () => {
    const response = await axios.get(`${BASE_URL}/settings/social-media`);
    return response.data.socialMedia;
});

export const fetchAboutSettings = createAsyncThunk('settings/fetchAbout', async () => {
    const response = await axios.get(`${BASE_URL}/settings/about`);
    return response.data.about;
});

export const fetchServicesSettings = createAsyncThunk('settings/fetchServices', async () => {
    const response = await axios.get(`${BASE_URL}/settings/services`);
    return response.data.data;
});

export const fetchTrainerSettings = createAsyncThunk('settings/fetchTrainer', async () => {
    const response = await axios.get(`${BASE_URL}/settings/trainer`);
    return response.data.trainer;
});

export const fetchAllSettings = createAsyncThunk('settings/fetchAll', async () => {
   console.log("Fetching all settings...");
    const responses = await Promise.all([
        axios.get(`${BASE_URL}/settings/hero`),
        axios.get(`${BASE_URL}/settings/social-media`),
        axios.get(`${BASE_URL}/settings/about`),
        axios.get(`${BASE_URL}/settings/services`),
        axios.get(`${BASE_URL}/settings/trainer`),
    ]);
    return {
        hero: responses[0].data.hero,
        socialMedia: responses[1].data.socialMedia,
        about: responses[2].data.about,
        services: responses[3].data.data,
        trainers: responses[4].data.trainer,
    };
});

// Create a slice with action creators for updating settings
const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        hero: [],
        socialMedia: null,
        about: [],
        services: [],
        trainers: [],
        loading: false,
        error: null,
    },
    reducers: {
        setHero: (state, action) => {
            state.hero = action.payload;
        },
        setSocialMedia: (state, action) => {
            state.socialMedia = action.payload;
        },
        setAbout: (state, action) => {
            state.about = action.payload;
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setTrainer: (state, action) => {
            state.trainers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.hero = action.payload.hero;
                state.socialMedia = action.payload.socialMedia;
                state.about = action.payload.about;
                state.services = action.payload.services;
                state.trainers = action.payload.trainers;
            })
            .addCase(fetchAllSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchHeroSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHeroSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.hero = action.payload;
            })
            .addCase(fetchHeroSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSocialMediaSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSocialMediaSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.socialMedia = action.payload;
            })
            .addCase(fetchSocialMediaSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAboutSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAboutSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.about = action.payload;
            })
            .addCase(fetchAboutSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchServicesSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServicesSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServicesSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTrainerSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.trainers = action.payload;
            })
            .addCase(fetchTrainerSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the action creators
export const { setHero, setSocialMedia, setAbout, setServices, setTrainer } = settingsSlice.actions;

export default settingsSlice.reducer;
