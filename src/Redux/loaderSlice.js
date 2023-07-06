import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loader: false,
}

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        handleLoader: (state, action) => {
            state.loader = action.payload;
        },
    }
});

export const { handleLoader } = loaderSlice.actions;

export default loaderSlice.reducer;