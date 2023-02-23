import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useDispatch} from 'react-redux';
import { postNewComment } from './actionCreators';

const CommentForm = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const INITIAL_STATE = {
        text : ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postNewComment(id, formData))
        setFormData(INITIAL_STATE);
    }

    return (
        <div>
            <input 
                type="text"
                name="text"
                placeholder="leave a nice comment..."
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CommentForm;