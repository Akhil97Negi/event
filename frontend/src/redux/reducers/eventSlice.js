import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const response = await axios.get('https://event-backend-wbiy.onrender.com/events');
    return response.data; 
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
});

export const createEvent = createAsyncThunk('events/createEvent', async (event) => {
  try {
    const response = await axios.post('https://event-backend-wbiy.onrender.com/events', event);
    return response.data; 
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, updates, token }) => {
  try {
    const response = await axios.put(`https://event-backend-wbiy.onrender.com/events/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the headers
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
});

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async ({ id, token }) => {
//   try {
//     if (!id || !token) {
//       throw new Error('ID or token is missing');
//     }
    
//     await axios.delete(`https://event-backend-wbiy.onrender.com/events/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return id;
//   } catch (error) {
//     console.error('Error deleting event:', error);
//     throw error;
//   }
// });

export const deleteEvent = createAsyncThunk('events/deleteEvent', async ({ id, token }) => {
  try {
    if (!id || !token) {
      throw new Error('ID or token is missing');
    }

    console.log('Deleting event with ID:', id); // Debugging line
    console.log('Using token:', token); // Debugging line
    
    const response = await axios.delete(`https://event-backend-wbiy.onrender.com/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the headers
      }
    });
    return id;
  } catch (error) {
    console.error('Error deleting event:', error.response?.data || error.message);
    throw error;
  }
});




const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
