import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const initializePantry = () => {
    return {
        type: actionTypes.INITIALIZE_PANTRY,
    };
};

export const clearPantry =() =>{
    return {
        type: actionTypes.CLEAR_PANTRY,
    }
}

export const fetchPantryEnd = () => {
    return {
        type: actionTypes.FETCH_PANTRY_END,
    };
};