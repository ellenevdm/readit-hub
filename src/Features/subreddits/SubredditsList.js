import React, { useEffect } from "react";
import {
	fetchPosts,
	selectSelectedSubreddit,
	setSelectedSubreddit,
} from "../../Store/redditSlice";
import {
	fetchSubreddits,
	selectedSubreddits,
} from "../../Store/subredditsSlice";
import { useDispatch, useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Subreddit from "./Subreddit";

function SubredditsList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectedSubreddits);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);

	const handleSubredditClick = (subredditName) => {
		dispatch(setSelectedSubreddit(subredditName));
		dispatch(fetchPosts({ subreddit: subredditName }));
	};

	useEffect(() => {
		dispatch(fetchSubreddits());
	}, [dispatch]);

	const isSelectedSubredditInList = subreddits.some(
		(subreddit) => subreddit.display_name === selectedSubreddit
	);

	return (
		<Card className="m-2">
			<h3>Popular Subreddits</h3>
			<ListGroup>
				{subreddits.map((subreddit, index) => (
					<ListGroup.Item
						key={index}
						action
						variant="primary"
						onClick={() => handleSubredditClick(subreddit.display_name)}
						active={
							isSelectedSubredditInList
								? selectedSubreddit === subreddit.display_name
								: false
						}
					>
						<Subreddit subreddit={subreddit} />
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
	);
}

export default SubredditsList;
