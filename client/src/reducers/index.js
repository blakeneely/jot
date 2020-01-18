// Bring in reducers to combine
import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

// Combine all reducers for redux to use
export default combineReducers({
    note: noteReducer,
    error: errorReducer,
    auth: authReducer
});