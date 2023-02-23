import React from 'react';
import {Link} from 'react-router-dom';
import { UPDATE_TITLE_VOTE, UPDATE_VOTE } from './reducers/reducerKeywords';
import { updateVote } from './actionCreators';
import { useDispatch } from 'react-redux';
import './css/BlogPreview.css';

const BlogPreview = ({id, title, description, votes}) => {
    const dispatch = useDispatch();
    
    const handleUpvote = () => {
        dispatch(updateVote('up', id, UPDATE_TITLE_VOTE));
        dispatch({
            type: UPDATE_VOTE,
            payload: {
                postId: id,
                count: votes+1
            }
        })
    }
    const handleDownvote = () => {
        dispatch(updateVote('down', id, UPDATE_TITLE_VOTE));
        dispatch({
            type: UPDATE_VOTE,
            payload: {
                postId: id,
                count: votes-1
            }
        })
    }

    return (
        <div className="BlogPreview">
            <div>
            <p className="BlogPreview-title"><Link to={ `/${id}` }>{title}</Link></p>
            <p className="BlogPreview-description">{description}</p>
            <div className="BlogPreview-votes">
                <p style={{display: 'inline-block', paddingRight: '10px'}}>{votes} votes </p>
                <button onClick={handleUpvote}>👍</button>
                <button onClick={handleDownvote}>👎</button>
            </div>
            </div>
        </div>
    )
}

export default BlogPreview;