import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getSubredditPosts, getComments, API_ROOT } from "../Api/redditApi";

export const fetchPosts = createAsyncThunk(
  "redditPosts/fetchPosts",
  async (subreddit, { signal, rejectWithValue }) => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const timeOutId = setTimeout(() => controller.abort(), 60000);
        const response = await getSubredditPosts(subreddit, {
          signal: controller.signal,
        });

        clearTimeout(timeOutId);

        if (!response.ok) {
          if (response.error && response.error.includes("RATELIMIT_EXCEEDED")) {
            console.log("Rate limit exceeded. Wait a minute and retry...");
            await new Promise((resolve) => setTimeout(resolve, 60000));
            return fetchData()
          }
          return rejectWithValue;
        }

        const postsWithMetaData = response.map((post) => ({
          ...post,
          showingComments: false,
          comments: [],
          loadingComments: false,
          errorComments: false,
        }));

        return postsWithMetaData;
      } 
      catch (error) {
        console.error("Error fetching posts", error);
        if (error.name === "AbortError") {
          return rejectWithValue("Request timed out");
        } else {
          return rejectWithValue(error);
        }
      }
    };
  }
);

export const fetchComments = createAsyncThunk(
  "redditPosts/fetchComments",
  async ({ index, permalink }) => {
    const comments = await getComments(permalink);
    return { index, comments };
  }
);

export const startPostsLoading = createAction("redditPosts/startPostsLoading");
export const finishPostsLoading = createAction(
  "redditPosts/finishPostsLoading"
);
export const rejectPosts = createAction("redditPosts/rejectPosts");

export const startCommentsLoading = createAction(
  "redditPosts/startCommentsLoading"
);
export const finishCommentsLoading = createAction(
  "redditPosts/finishCommentsLoading"
);
export const rejectComments = createAction("redditPosts/rejectComments");

const redditSlice = createSlice({
  name: "redditPosts",
  initialState: {
    posts: [],
    searchTerm: "",
    selectedSubreddit: "",
    postsLoading: false,
    postsRejected: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      startPostsLoading(state);
      state.postsLoading = true;
      state.postsRejected = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      finishPostsLoading(state);
      state.postsLoading = false;
      state.postsRejected = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      rejectPosts(state);
      state.postsLoading = false;
      state.postsRejected = true;
    });

    builder.addCase(fetchComments.pending, (state, action) => {
      state.posts[action.meta.arg.index].showingComments =
        !state.posts[action.meta.arg.index].showingComments;
      if (!state.posts[action.meta.arg.index].showingComments) {
        return;
      }
      startCommentsLoading(state);
      state.posts[action.meta.arg.index].loadingComments = true;
      state.posts[action.meta.arg.index].errorComments = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      finishCommentsLoading(state);
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].errorComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      rejectComments(state);
      state.posts[action.meta.arg.index].loadingComments = false;
      state.posts[action.meta.arg.index].errorComments = true;
    });
  },
});

export const { setPosts, setSelectedSubreddit, setSearchTerm } =
  redditSlice.actions;

export default redditSlice.reducer;

export const selectPosts = (state) => state.redditPosts.posts;
export const selectSearchTerm = (state) => state.redditPosts.searchTerm;
export const selectSelectedSubreddit = (state) =>
  state.redditPosts.selectedSubreddit;

export const filteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);
