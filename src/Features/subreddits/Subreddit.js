import React from "react";

function Subreddit({ subreddit, onClick }) {
	return (
		<li>
			<button
				type="button"
				onClick={onClick}
			></button>
		</li>
	);
}

export default Subreddit;
