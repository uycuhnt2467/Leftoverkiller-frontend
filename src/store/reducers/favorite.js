import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    favorite_recipe: [],
    loading: false,
};

const initializeFavorite = (state, action) => {
    return updateObject(state, { loading: true });
};

const addFavorite = (state, action) => {
    let updatedFavorite = [...state.favorite_recipe];
    console.log("reducer add");
    console.log(updatedFavorite);
    console.log(action.recipe_info);
    let filter = updatedFavorite.filter(
        (val) => val.recipe_id === action.recipe_info.recipe_id
    );

    if (filter.length === 0) {
        console.log("add new");
        updatedFavorite = [...updatedFavorite, action.recipe_info];
    }
    console.log(updatedFavorite);

    return updateObject(state, {
        favorite_recipe: updatedFavorite,
        loading: false,
    });
};

const removeFavorite = (state, action) => {
    const updatedFavorite = state.favorite_recipe.filter((val) => {
        return parseInt(val.recipe_id) !== parseInt(action.recipeId);
    });
    console.log(updatedFavorite);
    return updateObject(state, {
        favorite_recipe: updatedFavorite,
        loading: false,
    });
};

const clearFavorite = (state, action) => {
    return updateObject(state, {
        favorite_recipe: [],
        loading: false,
    });
};

const fetchFavorite = (state, action) => {
    console.log("fetch");
    return updateObject(state, {
        favorite_recipe: action.favoriteArray,
        loading: false,
    });
};

const fetchFavrotieEnd = (state, action) => {
    return updateObject(state, {
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
        case actionTypes.FETCH_FAVORITE_END:
            return fetchFavrotieEnd(state, action);
        default:
            return state;
    }
};

export default reducer;
