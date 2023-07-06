import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    userStatus: 0
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        handleUserStatus: (state, action) => {
            state.userStatus = action.payload
        },
        logoutCurrentUser: (state) => {
            state.currentUser = null
            state.userStatus = 0
        }
    }
});

export const { handleCurrentUser, handleUserStatus, logoutCurrentUser } = userSlice.actions;

export default userSlice.reducer;