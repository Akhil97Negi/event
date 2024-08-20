import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://event-backend-wbiy.onrender.com/api/users/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const userRegister = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://event-backend-wbiy.onrender.com/api/users/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || 'user',
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      state.user = null;
      state.token = null;
      state.role = 'user';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.user.role);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.status = 'succeeded';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
