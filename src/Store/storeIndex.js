import { configureStore, combineReducers } from "@reduxjs/toolkit";
import subredditReducer from "./subredditSlice";
import redditReducer from "./redditSlice"

 const rootReducer = combineReducers({
        redditPosts: redditReducer,
        subreddits: subredditReducer  
 })

 const store = configureStore({
    reducer: rootReducer,
 })

 export default store