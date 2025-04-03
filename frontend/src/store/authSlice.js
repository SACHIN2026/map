import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, credentials);
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.username;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
