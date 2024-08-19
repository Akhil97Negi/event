
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'; 
import eventReducer from './reducers/eventSlice';
import participantsReducer from './reducers/participantslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events : eventReducer,
    participants : participantsReducer

   
  },
});

export default store;
