import React from "react";
import Comment from "../../Components/Comment";

function CommentList({ comments }) {
	return (
		<div>
			{comments.map((comment, index) => {
				<li key={index}>
					<Comment comment={comment} />
				</li>
			})}
		</div>
	);
}

export default CommentList;
