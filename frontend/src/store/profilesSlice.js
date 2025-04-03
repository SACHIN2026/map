import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);
    return data;
  }
);

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: { profiles: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profilesSlice.reducer;
