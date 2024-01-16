import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubreddits } from "../Api/redditApi";

export const fetchSubreddits = createAsyncThunk(
    'subreddits/fetchSubreddits', async () => {
        const subReddits = await getSubreddits();
        return subReddits
    })

    export const startSubredditsLoading = createAction('subreddits/startSubredditsLoading')
    export const finishSubredditsLoading = createAction('subreddits/finishSubredditsLoading')
    export const rejectSubreddits = createAction('subreddits/rejectSubreddits')

 const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoading: false,
        error: false
    },
    reducers: {
        setSubreddits: (state, action) => {
            state.subreddits = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchSubreddits.pending, (state, action) => {
            startSubredditsLoading(state)
            state.isLoading = true;
            state.error = false
            console.log('Loading...')
        })

        builder.addCase(fetchSubreddits.fulfilled, (state, action) => {
            finishSubredditsLoading(state)
            state.isLoading = false;
            state.error = false
            state.subreddits = action.payload
        })

        builder.addCase(fetchSubreddits.rejected, (state, action) => {
            rejectSubreddits(state)
            state.isLoading = false;
            state.error = true
            console.log('Error')
        })

    }
})

export default subredditsSlice.reducer

export const selectSubreddits = (state) => state.subreddits.subreddits