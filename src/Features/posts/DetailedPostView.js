import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPostDetails,
	selectComments,
	selectDetailedPost,
} from "../../store/redditSlice";

import { useParams } from "react-router";
import CommentList from "../../Components/CommentList";

function DetailedPostView() {
	const dispatch = useDispatch();
	const post = useSelector(selectDetailedPost);
	const comments = useSelector(selectComments);
	const { postId } = useParams();

	useEffect(() => {
		dispatch(fetchPostDetails(postId));
	}, [dispatch, postId]);

	return (
		<>
			{post && <h2>{post.title}</h2>}
			{post && post.subreddit_name_prefixed}
			<h5>{post && post.author}</h5>
			<p>{post && post.selftext}</p>
			<em>{post && post.score}</em>
			{/* {JSON.stringify(post.preview.images)} */}

			{post &&
				post.preview &&
				post.preview.images &&
				post.preview.images.length > 0 && (
					<img
						style={{ maxWidth: "400px" }}
						className="card"
						src={post.preview.images[0]}
					/>
				)}

			{comments && <CommentList comments={comments} />}

			{/* </div> */}
		</>
	);
}

export default DetailedPostView;
