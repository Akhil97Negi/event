// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'; // Import the auth slice
// import eventReduce from './reducers/eventSlice'
import eventReducer from './reducers/eventSlice';
// Create a store with reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    events : eventReducer

    // other reducers can be added here
  },
  // Optional: middleware can be customized here, though `redux-thunk` is included by default
});

export default store;
