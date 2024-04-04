import React from "react";
import {CardFooter, CardHeader, CardImg, CardText, Carousel, Col, Row, Stack} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {FaRegCommentAlt} from "react-icons/fa";
import {ImArrowDown, ImArrowUp} from "react-icons/im";
import {formatScoreNumber} from "../../../Utilities/formatNumber";

const DetailedPost = ({post}) => {

    return (
        <>
            <Card>
                <Row>
                    <Col md={1} style={{borderRight: "1px solid #ccc", textAlign: "center"}}>
                        <div className="d-flex align-items-center" style={{marginTop: "5px"}}>
                            <Stack gap={0}>
                                <div>
                                    <ImArrowUp/>
                                </div>
                                <div>{formatScoreNumber(post.score)}</div>
                                <div>
                                    <ImArrowDown/>
                                </div>
                            </Stack>
                        </div>
                    </Col>


                    <Col md={11} style={{marginTop: "0px"}}>

                        <CardHeader>
                            <b>{post.subreddit_name_prefixed}</b> posted by {post.author}

                        </CardHeader>

                        <Card.Body>


                            <Card.Title>{post.title}</Card.Title>
                            <CardText>
                                <div dangerouslySetInnerHTML={{__html: post.selftext_html}}/>

                            </CardText>
                            <div>
                                {post.media && (
                                    <div className="embed-responsive embed-responsive-16by9">
                                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                                        <iframe className="embed-responsive-item" src={post.media.reddit_video}
                                                width="720"
                                                height="720"
                                        ></iframe>
                                    </div>
                                )

                                }

                                {
                                    post.preview
                                    && (

                                        <Carousel>
                                            {post.preview.images.map((image, index) => (
                                                <Carousel.Item key={index}>
                                                    <CardImg

                                                        className="d-block w-100"
                                                        src={image}
                                                    />

                                                </Carousel.Item>
                                            ))}
                                        </Carousel>


                                    )}
                            </div>

                        </Card.Body>

                        <CardFooter>

                            <FaRegCommentAlt/> {post.num_comments} Comments
                        </CardFooter>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default DetailedPost;


// <h2>{post.title}</h2>
//             {post.subreddit_name_prefixed}
//             {post && post.author}
//             <div dangerouslySetInnerHTML={{__html: post.selftext_html}}/>
//             {post && post.score}
//             {/* {JSON.stringify(post.preview.images)} */}
//

//
