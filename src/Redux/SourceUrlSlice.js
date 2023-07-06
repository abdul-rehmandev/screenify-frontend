import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentSourceUrl: "",
}

export const SourceUrlSlice = createSlice({
    name: "sourceUrl",
    initialState,
    reducers: {
        handleCurrentSourceUrl: (state, action) => {
            state.currentSourceUrl = action.payload;
        },
    }
});

export const { handleCurrentSourceUrl } = SourceUrlSlice.actions;

export default SourceUrlSlice.reducer;