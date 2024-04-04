import {ListGroup} from "react-bootstrap";
import {PiArrowFatDown, PiArrowFatUp} from "react-icons/pi";
import React from "react";

export default function CommentList({comments}) {
    return (
        <ListGroup>
            {comments.map((comment, index) => (
                <ListGroup.Item
                    key={index}

                    
                >
                    <div>
                        <div className="fw-bold">{comment.author}</div>
                        <div dangerouslySetInnerHTML={{__html: comment.body_html}}></div>
                    </div>
                    <div>

                        <PiArrowFatUp/>

                        {comment.score}

                        <PiArrowFatDown/>
                    </div>

                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
