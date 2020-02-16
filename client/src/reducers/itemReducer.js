import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ALL_USERS } from '../actions/types';

const initialState = {
    items: [],
    loading: false,
    all_users: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_USERS:
            return {
                ...state,
                all_users: action.payload,
            }
        default:
            return state;
    }
}