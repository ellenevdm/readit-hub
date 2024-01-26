import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostId, setSelectedPostId } from "../../store/redditSlice";
function PostItem({ post }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedPostId(post.id));
	};

	return (
		<div>
			<h2>{post.title}</h2>
			<b>{post.subreddit_name_prefixed}</b>
			{/* <em>{post.author}</em> */}
			<div dangerouslySetInnerHTML={{ __html: post.selftext_html }} />

			<Link to={`/posts/${post.id}`}>
				<button
					button
					type="button"
					onClick={handleClick}
				>
					View Post
				</button>
			</Link>
		</div>
	);
}
export default PostItem;
