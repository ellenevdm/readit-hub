import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reddit from "../Api/redditApi";

export const fetchPosts = createAsyncThunk(
  "reddit/fetchPosts",
  async ({ subreddit, searchQuery }) => {
    try {
      let posts;
      if (searchQuery) {
        posts = await reddit.search({
          query: searchQuery,
          sort: "relevance",
          time: "all",
          limit: 10,
        });
      } else {
        posts = await reddit.getHot(subreddit, { limit: 10 });
      }

      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPostDetails = createAsyncThunk(
  "reddit/fetchPostDetails",
  async (postId, { dispatch }) => {
    dispatch(clearPostDetails());
    try {
      const post = await reddit.getSubmission(postId).fetch();

      const allComments = post.comments;

      // Extract only the serializable information from the post
      let serializablePost = {
        id: post.id,
        title: post.title,
        author: post.author.name,
        subreddit_name_prefixed: post.subreddit_name_prefixed,
        selftext: post.selftext,
        selftext_html: post.selftext_html,
        score: post.score,
        num_comments: post.num_comments,
      };

      if (post.media && post.media.reddit_video) {
        serializablePost.media = {
          reddit_video: post.media.reddit_video.fallback_url,
        };
      } else if (!post.media && post.preview && post.preview.images) {
        serializablePost.preview = {
          images: post.preview.images.map((image) => image.source.url),
        };
      }

      // Take the first 10 comments
      let slicedComments = allComments.slice(0, 10);

      const simplifiedComments = [];
      for (const comment of slicedComments) {
        // const commentDetails = await reddit.getComment(comment.id).fetch();
        simplifiedComments.push({
          id: comment.id,
          body: comment.body,
          body_html: comment.body_html,
          score: comment.score,
          author: comment.author.name,
        });
      }

      return { post: serializablePost, comments: simplifiedComments };
    } catch (error) {
      console.log(error);
    }
  }
);

const redditSlice = createSlice({
  name: "redditPosts",
  initialState: {
    selectedSubreddit: "",
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
        num_comments: 0,
        media: {
          reddit_video: "",
        },
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
    clearPostDetails: (state) => {
      state.postDetails = {
        post: {
          id: "",
          title: "",
          author: "",
          subreddit_name_prefixed: "",
          selftext: "",
          selftext_html: "",
          num_comments: 0,
          media: {
            reddit_video: "",
          },
          score: 0,
          preview: {
            images: [],
          },
        },
        comments: [],
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        console.log("Fetching posts...");
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.posts = payload;
        console.log("Fetched posts successfully");
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = "rejected";
        console.log("Error fetching posts");
      })
      .addCase(fetchPostDetails.pending, (state) => {
        state.status = "loading";
        console.log("Fetching post details...");
      })
      .addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.postDetails.post = payload.post;
        state.postDetails.comments = payload.comments;
        console.log("Fetched post details and comments successfully");
      })
      .addCase(fetchPostDetails.rejected, (state, { payload }) => {
        state.error = payload;
        state.status = "rejected";
        console.log("Error fetching post comments and details");
      }),
});

export default redditSlice.reducer;
export const {
  setSearchQuery,
  setSelectedSubreddit,

  setSelectedPostId,
  clearPostDetails,
} = redditSlice.actions;

export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit; //
export const selectPosts = (state) => state.reddit.posts; //
export const selectDetailedPost = (state) => state.reddit.postDetails.post;
export const selectComments = (state) => state.reddit.postDetails.comments; //
export const selectPostId = (state) => state.reddit.selectedPostId;
export const selectSearchQuery = (state) => state.reddit.searchQuery;
