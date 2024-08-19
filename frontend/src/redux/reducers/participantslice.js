import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch participants
export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async (eventId) => {
  const response = await axios.get(`https://country-deploy.onrender.com/events/${eventId}/participants`);
  return response.data;
});

const participantsSlice = createSlice({
  name: 'participants',
  initialState: {
    participants: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default participantsSlice.reducer;
