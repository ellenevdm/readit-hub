import React from "react";
import { render } from "@testing-library/react";
import SubredditsList from "../Features/subreddits/SubredditsList";

test("renders SubredditsList component correctly", () => {
	const subreddits = [
		{
			header_img: "example1.jpg",
			display_name_prefixed: "r/example1",
			header_title: "Example Subreddit 1",
		},
		{
			header_img: "example2.jpg",
			display_name_prefixed: "r/example2",
			header_title: "Example Subreddit 2",
		},
	];

	const { getByText } = render(<SubredditsList subreddits={subreddits} />);

	expect(getByText("Popular Subreddits")).toBeInTheDocument();
	expect(getByText("r/example1")).toBeInTheDocument();
	expect(getByText("Example Subreddit 1")).toBeInTheDocument();
	expect(getByText("r/example2")).toBeInTheDocument();
	expect(getByText("Example Subreddit 2")).toBeInTheDocument();
});
