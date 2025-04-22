import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../src/hooks/useAxiosPublic";

export const addRide = createAsyncThunk("rides/addRide", async (rideData) => {
    const response = await axiosPublic.post("/rides/set-ride", rideData);
    console.log("🚀 Backend Response in addRide:", response.data);
    return response.data;
});

const rideShareSlice = createSlice({
    name: "rideShare",
    initialState: {
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addRide.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addRide.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(addRide.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default rideShareSlice.reducer;