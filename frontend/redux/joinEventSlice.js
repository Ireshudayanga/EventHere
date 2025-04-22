import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../src/hooks/useAxiosPublic";


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
  
        const response = await axiosPublic.post(
          "/events/join-event",
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

  export const fetchJoinedEvents = createAsyncThunk(
    "events/fetchJoinedEvents",
    async (email, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) return rejectWithValue("Not authorized");
  
        const response = await axiosPublic.post(
          "/events/joined",
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        return response.data; // Should be an array of joined events
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  

  export const fetchParticipantsByEventId = createAsyncThunk(
    "events/fetchParticipantsByEventId",
    async (eventid, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("access-token");
        const response = await axiosPublic.post(
          `/events/participants/${eventid}`,
          { eventid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { eventid, participants: response.data };
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
      joinedEvents: [],
      participantsByEventId: {}, 
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
        })
        .addCase(fetchJoinedEvents.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchJoinedEvents.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.joinedEvents = action.payload;
        })
        .addCase(fetchJoinedEvents.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(fetchParticipantsByEventId.fulfilled, (state, action) => {
          const { eventid, participants } = action.payload;
          state.participantsByEventId[eventid] = participants.length;
        })
        ;
    },
  });
  

export default joinEventSlice.reducer;