import { useReducer } from 'react';
import {
    UPDATE_NEW_LISTING_IMAGES
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_LISTING_IMAGES:
            return {
                ...state,
                newListingImages: [...action.newListingImages]
            };
        
        default:
            return state;
    };
};

export function useNewListingReducer(initialState) {
    return useReducer(reducer, initialState);
};