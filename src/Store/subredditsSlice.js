import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reddit from "../Api/redditApi";

export const fetchSubreddits = createAsyncThunk(
	"subreddits/fetchSubreddits",
	async (_, { dispatch }) => {
		try {
			const subreddits = await reddit.getDefaultSubreddits({
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
		subredditsLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchSubreddits.pending, (state) => {
				state.subredditsLoading = true;
				state.error = null;
			})
			.addCase(fetchSubreddits.fulfilled, (state, { payload }) => {
				state.subredditsLoading = false;
				state.subreddits = payload;
			})
			.addCase(fetchSubreddits.rejected, (state, { payload }) => {
				state.subredditsLoading = false;
				state.error = payload;
			}),
});

export const {
	startLoadingSubreddits,
	finishLoadingSubreddits,
	rejectSubreddits,
} = subredditsSlice.actions;

export default subredditsSlice.reducer;

export const selectedSubreddits = (state) => state.subreddits.subreddits;
