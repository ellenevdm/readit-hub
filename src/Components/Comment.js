import React from 'react';

function Comment({comment}) {
    return (
			<div>
				<h4>{comment.author}</h4>
				<div dangerouslySetInnerHTML={{ __html: comment.body_html }} />
				<p>{comment.score}</p>
			</div>
		);
}

export default Comment;