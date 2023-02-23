import React from 'react';
import './css/Comment.css';
import {deleteComment} from './actionCreators';
import {useDispatch} from 'react-redux';


const Comment = ({text, commentId, postId}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteComment(postId, commentId));
    }

    return (
        <div className="Comment">
            <p>{text}</p>
            <p onClick={handleDelete}>❌</p>
        </div>
    )
}

export default Comment;