import axios from 'axios';
import {GET_POST, ADD_POST, DELETE_COMMENT, GET_TITLES, ADD_COMMENT, DELETE_POST, UPDATE_POST, UPDATE_VOTE} from './reducers/reducerKeywords';


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export function fetchBlogTitles() {
    return async function (dispatch) {
        const {data} = await axios.get(`${BASE_URL}/posts`);
        dispatch(gotBlogTitles(data))
    }
}

export function gotBlogTitles(titles) {
    let output = {}
    titles.map(t => output[t.id] = {...t})
    return {
        type: GET_TITLES,
        payload: output
    }
}

export function fetchSinglePost(id) {
    return async function (dispatch) {
        const {data} = await axios.get(`${BASE_URL}/posts/${id}`);
        dispatch(gotSinglePost(data, id));
    }
}

export function gotSinglePost(post, postId) {
    const output = {
        [postId] : {...post}
    }
    return {
        type: GET_POST,
        payload: output
    }
}

export function createNewPost(formData) {
    const {title, description, body} = formData;
    return async function (dispatch) {
        const {data} = await axios.post(`${BASE_URL}/posts`, {
            title,
            description,
            body
        });
        dispatch(createdPost(data));
    }
}

export function createdPost(post) {
    const output = {
        [post.id] : {...post, comments: []}
    }
    return {
        type: ADD_POST,
        payload: output
    }
}

export function deleteComment(postId, commentId) {
    return async function (dispatch) {
        await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`)
        dispatch(deletedComment(postId, commentId))
    }
}

export function deletedComment(postId, commentId) {
    return {
        type: DELETE_COMMENT,
        payload: {commentId, postId}
    }
}

export function postNewComment(id, formData){
    return async function (dispatch) {
        let {data} = await axios.post(`${BASE_URL}/posts/${id}/comments`, formData)
        dispatch(newComment(data, id))
    }
}

export function newComment(comment, postId) {
    let output = {
        comment,
        postId
    }
    return {
        type: ADD_COMMENT,
        payload: output
    }
}

export function deletePost(postId) {
    return async function (dispatch) {
        await axios.delete(`${BASE_URL}/posts/${postId}`);
        dispatch(clearPostData(postId))
    }
}

export function clearPostData(postId) {
    return {
        type: DELETE_POST,
        payload: {postId}
    }
}

export function updatePost(postId, formData) {
    return async function (dispatch) {
        let {data} = await axios.put(`${BASE_URL}/posts/${postId}`, formData);
        dispatch(updatedPost(data, postId))
    }
}

export function updatedPost(data, postId) {
    const output = {
        [postId] : {...data}
    }
    return {
        type: UPDATE_POST,
        payload: output
    }
}

export function updateVote(direction, postId, type) {
    return async function (dispatch) {
        let {data} = await axios.post(`${BASE_URL}/posts/${postId}/vote/${direction}`);
        dispatch(doVote(data, type, postId));
    }
}

export function doVote(data, type, postId) {
    return {
        type,
        payload: {
            postId,
            count: data.votes
        }
    }
}