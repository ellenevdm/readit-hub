import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import reddit from "../Api/redditApi";

export const fetchSubreddits = createAsyncThunk(
    "subreddits/fetchSubreddits",
    async (_, {dispatch}) => {
        try {
            const subreddits = await reddit.getPopularSubreddits({
                limit: 10,
            });

            return subreddits;
        } catch (error) {
            console.log(error);
        }
    }
);

const subredditsSlice = createSlice({
    name: "subreddits",
    initialState: {
        subreddits: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchSubreddits.pending, (state) => {
                state.status = 'loading'
                state.error = null;
            })
            .addCase(fetchSubreddits.fulfilled, (state, {payload}) => {
                state.status = 'success';
                state.subreddits = payload;
            })
            .addCase(fetchSubreddits.rejected, (state, {payload}) => {
                state.status = 'rejected';
                state.error = payload;
            }),
});


export default subredditsSlice.reducer;

export const selectedSubreddits = (state) => state.subreddits.subreddits;
