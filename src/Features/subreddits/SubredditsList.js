import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectSelectedSubreddit,
	setSelectedSubreddit,
} from "../../store/redditSlice";
import {
	fetchSubreddits,
	selectedSubreddits,
} from "../../store/subredditsSlice";
import Subreddit from "./Subreddit";
import { useNavigate } from "react-router";
function SubredditsList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectedSubreddits);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const navigate = useNavigate();

    const handleSubredditClick = (subredditName) => {
        dispatch(setSelectedSubreddit(subredditName));
        navigate('/');
    }

	useEffect(() => {
		dispatch(fetchSubreddits());
	}, [dispatch]);

	return (
		<div>
			<h3>Popular Subreddits</h3>
			<ul>
				{subreddits.map((subreddit, index) => (
					<Subreddit
						key={index}
						subreddit={subreddit}
						onClick={() =>
							handleSubredditClick(subreddit.display_name)
						}
					/>
				))}
			</ul>
		</div>
	);
}

export default SubredditsList;
