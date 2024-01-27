import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";

import reddit from "../Api/redditApi";
import Header from "../Components/Header";
import PostsList from "../Features/posts/PostsList";
import SubredditsList from "../Features/subreddits/SubredditsList";

const HomePage = () => {
	// const [data, setData] = useState([]);
	// const dispatch = useDispatch();

	// const getData = async () => {
	// 	setData(await reddit.getSubmission("19ej8je").comments.then(console.log));
	// };

	// useEffect(() => {
	// 	getData();
	// }, []);

	// const fetchPostDetails = async (postId) => {
	// 	try {
	// 		const response = await reddit.getSubmission(postId);
	// 		const post = await response.fetch();
	// 		console.log(post);
	// 		const allComments = await response.comments;
	// 		const comments = allComments.splice(0, 10);
	// 		return { comments, post };
	// 	} catch (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}
	// };

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const postId = "1ab5i9m";
	// 		try {
	// 			const result = await fetchPostDetails(postId);
	// 			console.log(result);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);
	// Usage example:

	return (
		<div>
			<Header />
			<h1>HomePage</h1>
			<PostsList />
			<SubredditsList />
		</div>
	);
};

export default HomePage;
