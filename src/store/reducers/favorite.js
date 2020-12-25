import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    favorite_recipe_id: [],
    loading: false,
};

const initializeFavorite = (state, action) => {
    return updateObject(state, { loading: true });
};

const addFavorite = (state, action) => {
    let updatedFavorite = [...state.favorite_recipe_id];
    console.log(updatedFavorite);
    if (!state.favorite_recipe_id.includes(parseInt(action.recipeId))) {
        console.log("add new");
        updatedFavorite = [...updatedFavorite, parseInt(action.recipeId)];
    }
    console.log(updatedFavorite);
    return updateObject(state, {
        favorite_recipe_id: updatedFavorite,
        loading: false,
    });
};

const removeFavorite = (state, action) => {
    const updatedFavorite = state.favorite_recipe_id.filter((val) => {
        return val !== parseInt(action.recipeId);
    });
    console.log(updatedFavorite);
    return updateObject(state, {
        favorite_recipe_id: updatedFavorite,
        loading: false,
    });
};

const clearFavorite = (state, action) => {
    return updateObject(state, {
        favorite_recipe_id: [],
        loading: false,
    });
};

const fetchFavorite = (state, action) => {
    return updateObject(state, {
        favorite_recipe_id: action.favoriteIdArray,
        loading: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE:
            return addFavorite(state, action);
        case actionTypes.REMOVE_FAVORITE:
            return removeFavorite(state, action);
        case actionTypes.CLEAR_FAVORITE:
            return clearFavorite(state, action);
        case actionTypes.FETCH_FAVORITE:
            return fetchFavorite(state, action);
        case actionTypes.INITIALIZE_FAVORITE:
            return initializeFavorite(state, action);
        default:
            return state;
    }
};

export default reducer;
