import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reddit from "../Api/redditApi";

export const fetchPosts = createAsyncThunk(
	"reddit/fetchPosts",
	async ({ subreddit, searchQuery }) => {
		try {
			let allPosts;
			if (searchQuery) {
				allPosts = await reddit.search({
					query: searchQuery,
					sort: "relevance",
					time: "all",
					limit: 10,
				});
			} else {
				allPosts = await reddit.getHot(subreddit, { limit: 10 });
			}
			// const posts = allPosts.map((post) => (
			// 	const mappedPost = {
			// 	id: post.id,
			// 	title: post.title,
			//     subreddit_name_prefixed: post.subreddit_name_prefixed,
			//     selftext_html: post.selftext_html,
			// 	}
			// 	if (post.preview &&)
			// ))
			const posts = allPosts.map((post) => {
				const simplifiedPost = {
					id: post.id,
					author: post.author,
					title: post.title,
					subreddit_name_prefixed: post.subreddit_name_prefixed,
					selftext: post.selftext,
					score: post.score,
				};
				if (post.preview && post.preview.images.length > 0) {
					simplifiedPost.preview = {
						images: post.preview.images[0].source.url,
					};
				}
				return simplifiedPost;
			});

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
			const post = await reddit.getSubmission(postId).fetch();

			const allComments = await reddit.getSubmission(postId).comments;

			// Extract only the serializable information from the post
			let serializablePost = {
				id: post.id,
				title: post.title,
				author: post.author.name,
				subreddit_name_prefixed: post.subreddit_name_prefixed,
				selftext: post.selftext,
				selftext_html: post.selftext_html,
				score: post.score,
			};

			if (post.preview && post.preview.images) {
				serializablePost.preview = {
					images: post.preview.images.map((image) => image.source.url),
				};
			}

			// Take the first 10 comments
			let slicedComments = allComments.slice(0, 10);
			const simplifiedComments = slicedComments.map((comment) => {
				const simplifiedComment = {
					id: comment.id,
					author: comment.author.name,
					body: comment.body,
					score: comment.score,
				};
				return simplifiedComment;
			});

			// let comments = allComments.slice(0, 10);
			// comments = comments.map((comment) => ({
			// 	id: comment.id,
			// 	author: comment.author,
			// 	body: comment.body,
			// 	score: comment.score,
			// 	// Include only necessary properties, adjust as needed
			// }));

			return { post: serializablePost, comments: simplifiedComments };
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
		searchQuery: "",
		selectedPostId: null,
		posts: [],
		postDetails: {
			post: {
				id: "",
				title: "",
				author: "",
				subreddit_name_prefixed: "",
				selftext: "",
				selftext_html: "",

				score: 0,
				preview: {
					images: [],
				},
			},
			comments: [],
		},
		status: "idle",
		error: null,
	},
	reducers: {
		setSelectedSubreddit: (state, { payload }) => {
			state.selectedSubreddit = payload;
		},
		setSearchQuery: (state, { payload }) => {
			state.searchQuery = payload;
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
	setSearchQuery,
	setSelectedSubreddit,

	setSelectedPostId,
} = redditSlice.actions;

export const selectSelectedSubreddit = (state) =>
	state.reddit.selectedSubreddit; //
export const selectPosts = (state) => state.reddit.posts; //
export const selectDetailedPost = (state) => state.reddit.postDetails.post;
export const selectComments = (state) => state.reddit.postDetails.comments; //
export const selectPostId = (state) => state.reddit.selectedPostId;
export const selectSearchQuery = (state) => state.reddit.searchQuery;
