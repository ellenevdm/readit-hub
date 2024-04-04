import {combineReducers, configureStore} from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import subredditReducer from "./subredditsSlice";

const rootReducer = combineReducers({
    reddit: redditReducer,
    subreddits: subredditReducer
})
export default configureStore({

    reducer: rootReducer
});
