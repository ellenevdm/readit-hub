import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import reddit from "../Api/redditApi";

export const fetchPosts = createAsyncThunk(
	"reddit/fetchPosts",
	async (subreddit) => {
		try {
			const posts = await reddit.getHot(subreddit, { limit: 10 });
			return posts;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchPostDetails = createAsyncThunk(
	"reddit/fetchPostDetails",
	async (postId) => {
		try {
			const post = await reddit.getSubmission(postId);
			const allComments = await post.comments;
			const comments = allComments.splice(0, 10);
			return { post, comments };
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

const redditSlice = createSlice({
	name: "redditPosts",
	initialState: {
		selectedSubreddit: "popular",
		searchTerm: "",
		selectedPostId: null,
		posts: [],
		postDetails: {
			post: null,
			comments: [],
		},
		status: "idle",
		error: null,
	},
	reducers: {
		setSelectedSubreddit: (state, { payload }) => {
			state.selectedSubreddit = payload;
		},
		setSearchTerm: (state, { payload }) => {
			state.searchTerm = payload;
		},
		setDetailedPost: (state, { payload }) => {
			state.postDetails.post = payload;
		},
		setComments: (state, { payload }) => {
			state.postDetails.comments = payload;
		},
		setSelectedPostId: (state, { payload }) => {
			state.selectedPostId = payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, { payload }) => {
				state.status = "success";
				state.posts = payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.error = action.error;
				state.status = "rejected";
			})
			.addCase(fetchPostDetails.pending, (state, { payload }) => {
				state.status = "loading";
				console.log("Loading...");
			})
			.addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
				state.status = "success";
				state.postDetails.post = payload.post;
				state.postDetails.comments = payload.comments;
			})
			.addCase(fetchPostDetails.rejected, (state, action) => {
				state.error = action.error;
				state.status = "rejected";
			}),
});

export default redditSlice.reducer;
export const {
	setSearchTerm,
	setSelectedSubreddit,
	setDetailedPost,
	setSelectedPostId,
	setComments,
} = redditSlice.actions;

export const selectSelectedSubreddit = (state) =>
	state.reddit.selectedSubreddit; //
export const selectPosts = (state) => state.reddit.posts; //
export const selectDetailedPost = (state) => state.reddit.postDetails.post;
export const selectComments = (state) => state.reddit.postDetails.comments; //
export const selectPostId = (state) => state.reddit.selectedPostId;
export const selectSearchTerm = (state) => state.reddit.searchTerm;

export const selectSearchedPosts = createSelector(
	[selectSearchTerm, selectPosts],
	(searchTerm, posts) => {
		if (searchTerm.length > 0) {
			posts = posts.filter((post) =>
				post.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		return posts;
	}
);
