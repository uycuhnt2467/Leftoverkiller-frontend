import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: [],
    loading: false,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        default:
            return state;
    }
};

export default reducer;
