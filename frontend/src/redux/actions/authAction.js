import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

const API_URL = 'http://localhost:5050/api/users';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Login error:', error.response.data.message);
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/register`, { username, email, password });
    // Optionally log in the user after registration
    // dispatch(login(email, password));
    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    console.error('Registration error:', error.response.data.message);
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
