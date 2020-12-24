import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    favorite_recipe_id: [],
    loading: false,
};

const addFavorite = (state, action) => {
    let updatedFavorite = [...state.favorite_recipe_id];
    if (!state.favorite_recipe_id.includes(action.recipeId)) {
        updatedFavorite = [...updatedFavorite, action.recipeId];
    }

    return updateObject(state, {
        favorite_recipe_id: updatedFavorite,
    });
};

const removeFavorite = (state, action) => {
    const updatedFavorite = state.favorite_recipe_id.filter((val) => {
        return val !== action.recipeId;
    });
    console.log(updatedFavorite);
    return updateObject(state, {
        favorite_recipe_id: updatedFavorite,
    });
};

const clearFavorite = (state, action) => {
    return initialState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE:
            return addFavorite(state, action);
        case actionTypes.REMOVE_FAVORITE:
            return removeFavorite(state, action);
        case actionTypes.CLEAR_FAVORITE:
            return clearFavorite(state, action)
        default:
            return state;
    }
};

export default reducer;
