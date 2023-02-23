import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSinglePost, deletePost, updateVote} from './actionCreators';
import {UPDATE_VOTE} from './reducers/reducerKeywords';
import BlogForm from './BlogForm';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './css/Blog.css';

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(state=> state.posts);
    
    const [editMode, setEditMode] = useState(false);
    const {id} = useParams();

    const post = posts[id] || dispatch(fetchSinglePost(id))
    const {title, description, comments, body, votes} = post

    useEffect(()=>{
        if(!JSON.stringify(posts).includes(id)){
           dispatch(fetchSinglePost(id)) 
        }
    },[dispatch])

    const showForm = () => {
       setEditMode(!editMode);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePost(id));
        navigate('/home', {replace: true})
    }

    const handleUpvote = () => {
        dispatch(updateVote('up', id, UPDATE_VOTE));
    }
    const handleDownvote = () => {
        dispatch(updateVote('down', id, UPDATE_VOTE));
    }

    return (
        <div className="Blog">
            <div className="Blog-content">
                <h2>{title}</h2>
                <p style={{fontStyle: 'italic'}}>{description}</p>
                <p>{body}</p>
                <div>
                    <button onClick={handleDelete}>❌</button>
                    <button onClick={showForm}>📝</button>
                    <div className="Blog-votes">
                        <p style={{display: 'inline-block', paddingRight: '10px'}}>{votes} votes </p>
                            <button onClick={handleUpvote}>👍</button>
                            <button onClick={handleDownvote}>👎</button>
                     </div>
                </div>
            </div>
            <div className="Blog-comments">
                <p>Comments</p>
                <CommentForm />
                {comments && comments.map(c => <Comment text={c.text} key={c.id} postId={id} commentId={c.id}/>)}
            </div>
           
            {editMode && <div className="Blog-edit-form"><BlogForm key={id} id={id} title={title} body={body} description={description} /></div>}
        </div>
    )
}

export default Blog;