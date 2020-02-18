import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    IMAGE_SUCCESS
} from './types';

export const get_pic = (username) => dispatch => {
    
    axios.get('/api/users/get_pic', {
        params: {
            user: username
        }

    }).then(res => dispatch({
            type: IMAGE_SUCCESS,
            payload: res.data
    }))
}


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const get_username = (name) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name });

    axios.post('/api/users/query', body, config)
        .then(res => dispatch({
            type: CLEAR_ERRORS
        }))
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
            type: REGISTER_FAIL
            });
        });

}

export const register = ({ name, password, location}, file) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const data = new FormData() 
    data.append('file', file)
    axios.post('/api/users/upload_pic', data).then(res => {
    
        console.log(`res is ${res.data.path}`);

        const file = res.data.path;
        const body = JSON.stringify({ name, password, file, location });

        axios.post('/api/users', body, config)
            .then(res => dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            }))
            .catch(err => {
                dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
                );
                dispatch({
                type: REGISTER_FAIL
                });
            });
        })
}

export const facebooklogin = ( name, password, picture_url ) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, password, picture_url });

    axios.post('/api/users/facebook_login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(
              returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
              type: LOGIN_FAIL
            });
          });
      };

export const login = ({ name, password }) => dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ name, password });
    
        axios.post('/api/auth', body, config)
            .then(res => dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            }))
            .catch(err => {
                dispatch(
                  returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
                );
                dispatch({
                  type: LOGIN_FAIL
                });
              });
          };
    

    export const logout = () => {
        return {
            type: LOGOUT_SUCCESS
    };
};

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};

export const update_user = ({username, location, current_username}) => dispatch => {
    console.log(`username issss ${username}`)
    console.log(`location isss ${location}`)
    axios.get('/api/users/update_user', {
        params: {
            username,
            location,
            current_username: current_username
        }})
}
