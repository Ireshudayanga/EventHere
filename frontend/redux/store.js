import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"; // Import the event slice
import specialCategoryReducer from "./specialCategorySlice"; // Import the special category slice
import rideShareReducer from "./rideShareSlice"; // Import the ride share slice
import joinEventReducer from "./joinEventSlice"; // Import the join event slice

// Create Redux Store
export const store = configureStore({
  reducer: {
    events: eventReducer, 
    specialCategory: specialCategoryReducer,
    rideShare: rideShareReducer, 
    joinEvent: joinEventReducer,
  },
});

export default store;
