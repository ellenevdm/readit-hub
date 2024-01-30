import { Badge, ListGroup } from "react-bootstrap";

export default function CommentList({ comments }) {
	return (
		<ListGroup as="ol">
			{comments.map((comment, index) => (
				<ListGroup.Item
					key={index}
					as="li"
					className="d-flex justify-content-between align-items-start"
				>
					<div className="ms-2 me-auto">
						<div className="fw-bold">{comment.author.name}</div>
						<p>{comment.body}</p>
					</div>
					<Badge
						bg="primary"
						pill
					>
						{" "}
						{comment.score}
					</Badge>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
