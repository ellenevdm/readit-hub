import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPostDetails,
	selectComments,
	selectDetailedPost,
} from "../../store/redditSlice";

import { useParams } from "react-router";

function DetailedPostView() {
	const dispatch = useDispatch();
	const post = useSelector(selectDetailedPost);
	const comments = useSelector(selectComments);
	const { postId } = useParams();

	useEffect(() => {
		dispatch(fetchPostDetails(postId));
	}, [dispatch, postId]);

	return (
		<div className="card">
			{post && <h2>{post.title}</h2>}
			{post.subreddit_name_prefixed}
			<p>{post.selftext}</p>
			<em>{post.score}</em>
			{/* {JSON.stringify(post.preview.images)} */}

			{post.preview &&
				post.preview.images &&
				post.preview.images.length > 0 && (
					<img
						style={{ maxWidth: "400px" }}
						className="card"
						src={post.preview.images[0]}
					/>
				)}

			<div className="">
				{comments.map((comment) => (
					<div key={comment.id}>
						<p>{comment.body}</p>
						<p>{comment.score}</p>
					</div>
				))}
			</div>
			{/* </div> */}
		</div>
	);
}

export default DetailedPostView;
