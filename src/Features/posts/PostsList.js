import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPosts,
	selectPosts,
	selectSelectedSubreddit,
} from "../../store/redditSlice";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PostItem from "./PostItem";

function PostsList() {
	const posts = useSelector(selectPosts);
	const selectedSubreddit = useSelector(selectSelectedSubreddit);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts({ subreddit: selectedSubreddit }));
	}, [dispatch, selectedSubreddit]);

	return (
		<div>
			{posts.map((post) => (
				<PostItem
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}

export default PostsList;
