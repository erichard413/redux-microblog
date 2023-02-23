import {UPDATE_TITLE_VOTE, GET_TITLES} from './reducerKeywords';
const INITIAL_STATE = {}

export default function titles(state=INITIAL_STATE, action) {
    let payload = action.payload;
    switch (action.type) {
        case GET_TITLES:
            return payload;
        case UPDATE_TITLE_VOTE:
            let votePostId = payload.postId;
            let voteCount = payload.count;
            let updateVoteCopy = {...state}
            updateVoteCopy[votePostId].votes = voteCount;
            return {...updateVoteCopy}
        default:
            return state;
    }
}