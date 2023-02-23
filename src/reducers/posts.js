import {GET_POST, ADD_POST, DELETE_COMMENT, ADD_COMMENT, DELETE_POST, UPDATE_POST, UPDATE_VOTE} from './reducerKeywords';
import _ from 'lodash';

const INITIAL_STATE = {};

export default function posts(state=INITIAL_STATE, action) {
    let payload = action.payload;
    switch (action.type) {
        case GET_POST:
            return {...state, ...payload}
        case ADD_COMMENT:
            let copy = {...state}
            let addCommentPostId = payload.postId;
            copy[addCommentPostId].comments.push(payload.comment);
            return {...copy};
        case DELETE_COMMENT:
            const {postId, commentId} = payload
            const deleteCommentStateCopy = {...state}
            deleteCommentStateCopy[postId].comments = deleteCommentStateCopy[postId].comments.filter(c=> c.id != commentId);   
            return {...deleteCommentStateCopy}
        case DELETE_POST:
            return {...state};
        case UPDATE_POST:
            return {...state, ...payload};
        case ADD_POST:
            return {...state, ...payload}
        case UPDATE_VOTE:
            let votePostId = payload.postId;
            let voteCount = payload.count;
            let updateVoteCopy = {...state}
            updateVoteCopy[votePostId].votes = voteCount;
            return {...updateVoteCopy}
        default:
            return state;
    }
}