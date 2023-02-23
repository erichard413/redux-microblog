
import {combineReducers} from 'redux';
import postsReducer from './posts';
import titlesReducer from './titles';

const rootReducer = combineReducers({posts: postsReducer, titles: titlesReducer});

export default rootReducer;

