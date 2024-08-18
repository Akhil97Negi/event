
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  loginMessage: '',
  registerMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.loginMessage = 'You have successfully logged in!';
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.registerMessage = 'You have successfully registered!';
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loginMessage = ''; 
    },
    clearLoginMessage: (state) => {
      state.loginMessage = '';
    },
    clearRegisterMessage: (state) => {
      state.registerMessage = '';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.loginMessage = ''; 
      state.registerMessage = ''; 
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerSuccess,
  clearLoginMessage,
  clearRegisterMessage,
  logout,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('https://event-backend-wbiy.onrender.com/api/users/login', credentials); 
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('https://event-backend-wbiy.onrender.com/api/users/register', userData); 
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
