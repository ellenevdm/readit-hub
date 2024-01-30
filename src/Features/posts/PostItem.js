import { useDispatch, useSelector } from "react-redux";
import { selectPostId, setSelectedPostId } from "../../store/redditSlice";

import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function PostItem({ post }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedPostId(post.id));
	};

	return (
		<Card className="m-2">
			{post.preview && (
				<Card.Img
					variant="top"
					src={post.preview.images}
				/>
			)}
			<Card.Body>
				<Card.Title>{post.title}</Card.Title>
				<Card.Subtitle>{post.subreddit_name_prefixed}</Card.Subtitle>
				{/* <em>{post.author}</em> */}
				<Card.Text
					style={{
						maxHeight: "300px",
						textOverflow: "ellipsis",
						overflow: "hidden",
						whiteSpace: "preserve",
					}}
				>
					{post.selftext}
				</Card.Text>
				<LinkContainer to={`/posts/${post.id}`}>
					<Button
						variant="primary"
						type="button"
					>
						View Post
					</Button>
				</LinkContainer>
			</Card.Body>
		</Card>
	);
}
export default PostItem;
