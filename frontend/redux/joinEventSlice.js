import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const joinEvent = createAsyncThunk(
    "events/joinRide",
    async (eventData, { rejectWithValue }) => {
      try {
        // ✅ Get token from localStorage
        const token = localStorage.getItem("access-token");
  
        // Optional: warn if token is missing
        if (!token) {
          return rejectWithValue("No access token found. Please log in.");
        }
  
        const response = await axios.post(
          "http://localhost:5000/events/join-event",
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  
const joinEventSlice = createSlice({
    name: "joinEvent",
    initialState: {
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(joinEvent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(joinEvent.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(joinEvent.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default joinEventSlice.reducer;