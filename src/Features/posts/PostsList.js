import React, { useEffect } from "react";
import {
	fetchPosts,
	selectPosts,
	selectSelectedSubreddit,
} from "../../Store/redditSlice";
import { useDispatch, useSelector } from "react-redux";

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
