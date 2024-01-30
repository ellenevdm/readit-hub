import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Provider, useDispatch } from "react-redux";

import reddit from "../Api/redditApi";
import Header from "../Components/Header";
import PostsList from "../Features/posts/PostsList";
import SubredditsList from "../Features/subreddits/SubredditsList";

const HomePage = () => {
	return (
		<div>
			<Container>
				<Header />

				<Container>
					<Row>
						<Col>
							<PostsList />
						</Col>
						<Col>
							<SubredditsList />
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
};

export default HomePage;
