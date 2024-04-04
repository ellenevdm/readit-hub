import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostDetails, selectComments, selectDetailedPost,} from "../../store/redditSlice";

import {useParams} from "react-router";
import CommentList from "./DetailedPost/CommentList";
import {Container} from "react-bootstrap";
import DetailedPost from "./DetailedPost/DetailedPost";

function DetailedPostView() {
    const dispatch = useDispatch();
    const post = useSelector(selectDetailedPost);
    const comments = useSelector(selectComments);
    const {postId} = useParams();

    useEffect(() => {
        dispatch(fetchPostDetails(postId));
    }, [dispatch, postId]);

    return (
        <Container>


            <DetailedPost post={post}/>


            {comments && <CommentList comments={comments}/>}


        </Container>
    );
}

export default DetailedPostView;
