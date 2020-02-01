import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
    dispatch(SetItemsLoading());
    axios
        .get('/api/Restaurants')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
    );
};

export const addItem = item => dispatch => {
    axios
        .post('/api/Restaurants', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
};

export const deleteItem = (id) => dispatch => {
    axios.delete(`/api/Restaurants/${id}`).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
        )
};

export const SetItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}