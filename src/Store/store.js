import { configureStore } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import subredditReducer from "./subredditsSlice";

export default configureStore({
	reducer: {
		reddit: redditReducer,
		subreddits: subredditReducer,
	},
});
