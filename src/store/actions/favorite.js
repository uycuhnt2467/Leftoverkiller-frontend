import * as actionTypes from './actionTypes';
import axios from 'axios';



export const addFavorite = ( name ) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        recipeId: name
    };
};


export const removeFavorite = ( name ) => {
    return {
        type: actionTypes.REMOVE_FAVORITE,
        recipeId: name
    };
};