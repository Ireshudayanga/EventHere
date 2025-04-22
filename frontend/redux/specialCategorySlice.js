import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../src/hooks/useAxiosPublic";

// Async thunk to fetch the special category from API
export const fetchSpecialCategory = createAsyncThunk(
  "specialCategory/fetchSpecialCategory",
  async () => {
    const response = await axiosPublic.get("/api/special-category/active");
    return response.data.category; // Assuming response has { category: "some-category" }
  }
);

// Create Redux slice
const specialCategorySlice = createSlice({
  name: "specialCategory",
  initialState: {
    category: null, // ✅ Ensure category is defined initially
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecialCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload || null; // ✅ Prevent undefined values
      })
      .addCase(fetchSpecialCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default specialCategorySlice.reducer;
