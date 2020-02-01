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

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    };
};

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};

export const SetItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}