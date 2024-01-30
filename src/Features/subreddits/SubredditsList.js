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

import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

function SubredditsList() {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectedSubreddits);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);

	const handleSubredditClick = (subredditName) => {
		dispatch(setSelectedSubreddit(subredditName));
	};

	useEffect(() => {
		dispatch(fetchSubreddits());
	}, [dispatch]);

	return (
		<div>
			<h3>Popular Subreddits</h3>
			<ListGroup>
				{subreddits.map((subreddit, index) => (
					<ListGroup.Item
						action
						onClick={() => handleSubredditClick(subreddit.display_name)}
						key={index}
					>
						{subreddit.icon_img && (
							<Image
								src={subreddit.icon_img}
								alt="Subreddit header image"
								roundedCircle
								width={50}
								height={50}
							/>
						)}
						<b>{subreddit.display_name_prefixed}</b>
						{subreddit.public_description && (
							<p>{subreddit.public_description}</p>
						)}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
}

export default SubredditsList;
