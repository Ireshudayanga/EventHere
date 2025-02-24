import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"; // Import the event slice
import specialCategoryReducer from "./specialCategorySlice"; // Import the special category slice
// Create Redux Store
export const store = configureStore({
  reducer: {
    events: eventReducer, 
    specialCategory: specialCategoryReducer,
  },
});

export default store;
