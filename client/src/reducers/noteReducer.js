import { GET_NOTES, ADD_NOTE, DELETE_NOTE, NOTES_LOADING, TOGGLE_COMPLETED } from '../actions/types';

const initialState = {
    notes: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        case DELETE_NOTE: 
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload)
            }
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case TOGGLE_COMPLETED:
            return {
                ...state
            }
        case NOTES_LOADING:
            return {
                ...state,
                loading: true
            }
        default :
            return state;
    }
};