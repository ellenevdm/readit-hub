import { useDispatch } from "react-redux";

import { Button, Col, Row, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { FaRegCommentAlt } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { formatScoreNumber } from "../../Utilities/formatNumber";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { useNavigate } from "react-router";
import { clearPostDetails } from "../../Store/redditSlice";

function PostItem({ post }) {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOverflow = () => {
      const container = containerRef.current;
      if (container) {
        setShowButton(container.scrollHeight > container.offsetHeight);
      }
    };

    window.addEventListener("resize", handleOverflow);
    handleOverflow();

    return () => {
      window.removeEventListener("resize", handleOverflow);
    };
  }, []);

  function openPage(s) {
    dispatch(clearPostDetails());
    navigate(s);
  }

  return (
    <Card
      className="m-2"
      style={{}}
      onClick={() => openPage(`/posts/${post.id}`)}
    >
      <Row style={{ marginLeft: 0 }}>
        <Col
          style={{
            borderRight: "1px solid #ccc",
            textAlign: "center",
            maxWidth: "min-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="d-flex align-items-center"
            style={{ marginTop: "5px" }}
          >
            <Stack gap={0}>
              <div>
                <ImArrowUp />
              </div>
              <div>{formatScoreNumber(post.score)}</div>
              <div>
                <ImArrowDown />
              </div>
            </Stack>
          </div>
        </Col>
        <Col style={{ marginTop: "0px", flex: "1" }}>
          <Card.Header>
            <Card.Subtitle>{post.subreddit_name_prefixed}</Card.Subtitle>
          </Card.Header>

          <Card.Body
            ref={containerRef}
            style={{
              maxHeight: "30rem",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Card.Title>
              <h4>{post.title}</h4>
            </Card.Title>

            {/* <em>{post.author}</em> */}
            {post.preview && (
              <Card.Img
                className="mr-3"
                src={post.preview.images[0].source.url}
              />
            )}

            {showButton && (
              <div
                className="fade-effect"
                style={{
                  position: "absolute",
                  top: "75%",
                  left: 0,
                  width: "100%",
                  height: "25%", // Adjust as needed
                  background: "linear-gradient(rgba(255, 255, 255, 0), white)",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <LinkContainer to={`/posts/${post.id}`}>
                  <Button variant="primary" type="button" className=" p-2">
                    View more ...
                  </Button>
                </LinkContainer>
              </div>
            )}
          </Card.Body>

          <Card.Footer>
            <Stack direction="horizontal" gap={3}>
              <FaRegCommentAlt /> {post.num_comments} Comments
            </Stack>
          </Card.Footer>
        </Col>
      </Row>
    </Card>
  );
}

export default PostItem;
