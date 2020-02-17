import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ALL_USERS, DEL_REVIEW } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const delete_review = (review_to_edit) => dispatch  => {
    axios.post('/api/Restaurants/delete_review', review_to_edit)
    
}

export const get_users = () => dispatch => {
    axios.get('/api/users/get_users')
    .then(res => 
        dispatch ({
            type: GET_ALL_USERS,
            payload: res.data
        }))
}

export const getItems = () => dispatch => {
    dispatch(SetItemsLoading());
    axios
        .get('/api/Restaurants')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/Restaurants', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        ); 
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/Restaurants/${id}`, tokenConfig(getState)).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const add_review = (review) => (dispatch, getState) => {
    axios.post('/api/Restaurants/add_review', review, tokenConfig(getState))
}

export const SetItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}