import axios from 'axios';
import { returnErrors }from'./errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Verify token && load user
export const loadUser = () => (dispatch, getState) => {
    // Change user loading from false to true
    dispatch({ type: USER_LOADING });
    // Get user
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            // Send object with user and token
            payload: res.data
        }))
        .catch(err => {
            // Return any errors
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// Function to register user
export const register = ({ name, email, password }) => dispatch => {
    // Add headers value of content-type like in Postman
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Create request data to send
    const body =JSON.stringify({ name, email, password })

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            // return all user data to reducer
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        });
};

// Login user
export const login = ({ email, password }) => dispatch => {
    // Add headers value of content-type like in Postman
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Create request data to send
    const body =JSON.stringify({ email, password })

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            // return all user data to reducer
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        });
};

// Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/header and token
export const  tokenConfig = (getState) => {
        // Get token from local storage in auth reducer
        const token = getState().auth.token;
        // Set axios headers
        const config  = {
            headers: {
                // Set header just like in Postman
                "Content-type": "application/json"
            }
        };
        // If token exists then add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }   
        
        return config;
};