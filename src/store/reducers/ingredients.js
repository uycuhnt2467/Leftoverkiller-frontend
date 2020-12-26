import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: [],
    loading: false,
};

const initializePantry = (state, action) => {
    return updateObject(state, { loading: true });
};

const addIngredients = (state, action) => {
    let updatedIngredients = [...state.ingredients];
    if (!state.ingredients.includes(action.ingredientName)) {
        updatedIngredients = [...state.ingredients, action.ingredientName];
    }

    return updateObject(state, {
        ingredients: updatedIngredients,
    });
};

const removeIngredient = (state, action) => {
    const updatedIngredients = state.ingredients.filter((val) => {
        return val !== action.ingredientName;
    });
    return updateObject(state, {
        ingredients: updatedIngredients,
    });
};

const clearPantry = (state, action) => {
    return updateObject(state, {
        ingredients: [],
        loading: false,
    });
};

const fetchPantryEnd = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.INITIALIZE_PANTRY:
            return initializePantry(state, action);
        case actionTypes.CLEAR_PANTRY:
            return clearPantry(state, action);
        case actionTypes.FETCH_FAVORITE_END:
            return fetchPantryEnd(state, action);
        default:
            return state;
    }
};

export default reducer;
