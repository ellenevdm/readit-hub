import {Col, Container, Row} from "react-bootstrap";
import PostsList from "../Features/posts/PostsList";
import SubredditsList from "../Features/subreddits/SubredditsList";

const HomePage = () => {
    return (
        <>

            {/*<Header/>*/}

            <Container>
                <Row>
                    <Col sm={3}>
                        <SubredditsList/>
                    </Col>
                    <Col sm={8}>
                        <PostsList/>
                    </Col>

                </Row>
            </Container>

        </>
    );
};

export default HomePage;
