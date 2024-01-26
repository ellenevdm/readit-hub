import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import reddit from "../Api/redditApi";
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
	return (
		<div>
			<h1>HomePage</h1>

			<PostsList />
			<SubredditsList />
		</div>
	);
};

export default HomePage;
