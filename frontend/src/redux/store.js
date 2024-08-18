
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'; 
import eventReducer from './reducers/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events : eventReducer

   
  },
});

export default store;
