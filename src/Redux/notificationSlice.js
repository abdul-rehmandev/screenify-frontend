import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notification: "",
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        handleNotification: (state, action) => {
            state.notification = action.payload;
        },
    }
});

export const { handleNotification } = notificationSlice.actions;

export default notificationSlice.reducer;