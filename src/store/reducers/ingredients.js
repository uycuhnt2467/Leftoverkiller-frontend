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

    let filter = updatedIngredients.filter(
        (val) => val.ingredient_id === action.ingredient_info.ingredient_id
    );
    if (filter.length === 0) {
        // console.log("add new");
        updatedIngredients = [...updatedIngredients, action.ingredient_info];
    }

    return updateObject(state, {
        ingredients: updatedIngredients,
    });
};

const removeIngredient = (state, action) => {
    const updatedIngredients = state.ingredients.filter((val) => {
        return parseInt(val.ingredient_id) !== parseInt(action.ingredient_id);
    });
    // console.log(updatedIngredients);
    return updateObject(state, {
        ingredients: updatedIngredients,
        loading: false,
    });
};

const clearPantry = (state, action) => {
    return updateObject(state, {
        ingredients: [],
        loading: false,
    });
};

const fetchPantry = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
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
        case actionTypes.FETCH_PANTRY_END:
            return fetchPantryEnd(state, action);
        case actionTypes.FETCH_PANTRY:
            return fetchPantry(state, action);
        default:
            return state;
    }
};

export default reducer;
