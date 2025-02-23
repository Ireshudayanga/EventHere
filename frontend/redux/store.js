import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"; // Import the event slice

// Create Redux Store
export const store = configureStore({
  reducer: {
    events: eventReducer, // Add event reducer to the store
  },
});

export default store;
