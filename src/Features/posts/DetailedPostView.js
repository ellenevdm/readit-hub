import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	fetchPostDetails,
	selectComments,
	selectDetailedPost,
} from "../../store/redditSlice";
import CommentList from "./CommentList";

function DetailedPostView() {
	const dispatch = useDispatch();
	const post = useSelector(selectDetailedPost);
	const allComments = useSelector(selectComments);
	const { postId } = useParams();

	useEffect(() => {
		dispatch(fetchPostDetails(postId));
	}, [dispatch, postId]);

	return (
		<div>
			{post && <h2>{post}</h2>}

			<CommentList comments={comments} />
			{/* </div> */}
		</div>
	);
}

export default DetailedPostView;
