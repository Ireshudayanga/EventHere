import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch events from API
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get("http://localhost:5000/events"); // API call
  return response.data; // Return fetched data
});

// Create a Redux Slice
const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, 
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload; // Store fetched events
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
