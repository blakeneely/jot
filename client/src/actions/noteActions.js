import axios from 'axios';
import { GET_NOTES, ADD_NOTE, DELETE_NOTE, NOTES_LOADING, TOGGLE_COMPLETED  } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Redux action to getNotes from database
export const getNotes = () => dispatch => {
    dispatch(setNotesLoading());
    axios
      .get('/api/notes')
      .then(res =>
        dispatch({
          type: GET_NOTES,
          payload: res.data
        }))
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
      );
};

// Redux action to addNote to database
export const addNote = note => (dispatch, getState) => {
    axios
    .post('/api/notes', note, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: ADD_NOTE,
            payload: res.data
        })    
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Redux action to deleteNote from database
export const deleteNote = id => (dispatch, getState) => {
    axios.delete(`/api/notes/${id}`, tokenConfig(getState))
    .then(res =>
        dispatch({
            type: DELETE_NOTE,
            payload: id
        })    
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const toggleCompleted = id => (dispatch, getState) => {
    axios.post(`api/notes/${id}`, tokenConfig(getState))
    .then(res =>
        dispatch({
            type: TOGGLE_COMPLETED,
            payload: id
        })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    );    
};

// Redux action to set loading time for animation later while database responds
export const setNotesLoading = () => {
    return {
        type: NOTES_LOADING
    }
}