import { createSlice } from "@reduxjs/toolkit";
import { updateLikes } from "../actions/likesAction";

const initialState = {
    likes: 0,
    posts: {},
    loading: false,
    error : null
}
export const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        increment: (state) => {
            state.likes += 1
    },
    decrement: (state) => {
        state.likes -= 1
    },
    },
    extraReducers: (builder) => {

        builder.addCase(updateLikes.pending, (state,action) => {
            state.loading = true ;
            console.log("likes slice action add case", action.payload)})

        builder.addCase(updateLikes.fulfilled, (state, action)=> {
            console.log("likes slice action", action)
            state.loading = false;
        state.posts = action.payload})
        builder.addCase(updateLikes.rejected, (state, action) => {state.loading = false;
            console.log("likes slice action reject payload", action.payload)
        state.error = "error"})
    }
})

export const { increment, decrement} = likesSlice.actions
export default likesSlice.reducer