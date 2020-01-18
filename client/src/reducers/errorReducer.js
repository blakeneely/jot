import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// Set initial state of app
const initialState = {
    msg: {},
     status: null,
     id: null
};

// Set cases for actions to fire
export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}