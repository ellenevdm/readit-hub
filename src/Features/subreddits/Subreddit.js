import React from "react";
import {Col, Row} from "react-bootstrap";
import DefaultImage from "./reddit.svg"
import {formatFollowersNumber} from "../../Utilities/formatNumber";


function Subreddit({subreddit}) {
    const defaultImgSrc = DefaultImage
    return (

        <Row>
            <Col md="auto">
                <img
                    src={subreddit.icon_img || defaultImgSrc}
                    alt="Subreddit header image"
                    className="rounded-circle"
                    width="40"
                    height="40"
                />

            </Col>
            <Col>


                <b>{subreddit.display_name_prefixed}</b> <br/>
                <small>{formatFollowersNumber(subreddit.subscribers)}</small>


            </Col>
        </Row>

    );
}

export default Subreddit;
