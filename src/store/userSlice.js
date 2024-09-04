import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: "",
  userData: {},
  role: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearStatus(state) {
      state.userId = null;
      state.userData = {};
    },
  },
});

export const { setUserId, setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
