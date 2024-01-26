import React from "react";
import { render } from "@testing-library/react";
import Subreddit from "../Subreddit";

test("renders Subreddit component correctly", () => {
	const subreddit = {
		header_img: "example.jpg",
		display_name_prefixed: "r/example",
		header_title: "Example Subreddit",
	};

	const { getByAltText, getByText } = render(
		<Subreddit subreddit={subreddit} />
	);

	expect(getByAltText("Subreddit Header")).toBeInTheDocument();
	expect(getByText("r/example")).toBeInTheDocument();
	expect(getByText("Example Subreddit")).toBeInTheDocument();
});
